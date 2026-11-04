
/* ==========================================
   BARK ORNAMENT - QUOTATION BASKET

   File: src/lib/quote-basket.ts
   Version: 1

   Browser-side basket functionality.
   No checkout or public selling prices.
   ========================================== */

import {
  getProductBySlug,
  type Product,
} from "@/lib/products";

/* ==========================================
   TYPES
   ========================================== */

export type QuoteProductOptions = {
  material?: string;
  size?: string;
  finish?: string;
  customization?: string;
};

export type QuoteBasketItem = {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  categorySlug: string;
  quantity: number;
  options: QuoteProductOptions;
  notes: string;
};

export type QuoteBasket = {
  version: 1;
  items: QuoteBasketItem[];
};

/* ==========================================
   SETTINGS
   ========================================== */

export const QUOTE_STORAGE_KEY =
  "bark-ornament-quote-basket-v1";

export const QUOTE_BASKET_EVENT =
  "bark-ornament-quote-updated";

export const MAX_QUOTE_ITEMS = 100;
export const MAX_ITEM_QUANTITY = 1_000_000;

const MAX_OPTION_LENGTH = 200;
const MAX_NOTES_LENGTH = 2000;

/* ==========================================
   EMPTY BASKET
   ========================================== */

export function createEmptyBasket(): QuoteBasket {
  return {
    version: 1,
    items: [],
  };
}

/* ==========================================
   BASIC HELPERS
   ========================================== */

function cleanText(
  value: unknown,
  maxLength: number
): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function normalizeQuantity(
  quantity: unknown
): number {
  if (
    typeof quantity !== "number" ||
    !Number.isFinite(quantity)
  ) {
    return 1;
  }

  return Math.max(
    1,
    Math.min(
      MAX_ITEM_QUANTITY,
      Math.trunc(quantity)
    )
  );
}

function cleanOptions(
  options: QuoteProductOptions = {}
): QuoteProductOptions {
  return {
    material: cleanText(
      options.material,
      MAX_OPTION_LENGTH
    ),
    size: cleanText(
      options.size,
      MAX_OPTION_LENGTH
    ),
    finish: cleanText(
      options.finish,
      MAX_OPTION_LENGTH
    ),
    customization: cleanText(
      options.customization,
      MAX_OPTION_LENGTH
    ),
  };
}

/* ==========================================
   UNIQUE ITEM IDENTITY

   Products with different selected options
   are treated as separate basket entries.
   ========================================== */

function itemSignature(
  productId: string,
  options: QuoteProductOptions
): string {
  const normalized = cleanOptions(options);

  return JSON.stringify([
    productId,
    normalized.material ?? "",
    normalized.size ?? "",
    normalized.finish ?? "",
    normalized.customization ?? "",
  ]);
}

function createItemId(
  productId: string,
  options: QuoteProductOptions
): string {
  return itemSignature(productId, options);
}

/* ==========================================
   ADD PRODUCT TO BASKET

   Pass a product from products.ts.
   ========================================== */

export function addProductToBasket(
  basket: QuoteBasket,
  product: Product,
  quantity = 1,
  options: QuoteProductOptions = {},
  notes = ""
): QuoteBasket {
  const normalizedOptions = cleanOptions(options);
  const normalizedQuantity =
    normalizeQuantity(quantity);

  const id = createItemId(
    product.id,
    normalizedOptions
  );

  const existingItem = basket.items.find(
    (item) => item.id === id
  );

  // Same product and same options:
  // increase its requested quantity.
  if (existingItem) {
    return {
      version: 1,
      items: basket.items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(
                MAX_ITEM_QUANTITY,
                item.quantity + normalizedQuantity
              ),
              notes:
                cleanText(notes, MAX_NOTES_LENGTH) ||
                item.notes,
            }
          : item
      ),
    };
  }

  if (basket.items.length >= MAX_QUOTE_ITEMS) {
    return basket;
  }

  const newItem: QuoteBasketItem = {
    id,
    productId: product.id,
    productSlug: product.slug,
    productName: product.name,
    categorySlug: product.categorySlug,
    quantity: normalizedQuantity,
    options: normalizedOptions,
    notes: cleanText(notes, MAX_NOTES_LENGTH),
  };

  return {
    version: 1,
    items: [...basket.items, newItem],
  };
}

/* ==========================================
   UPDATE ITEM QUANTITY
   ========================================== */

export function updateBasketQuantity(
  basket: QuoteBasket,
  itemId: string,
  quantity: number
): QuoteBasket {
  // Quantity zero removes the item.
  if (
    Number.isFinite(quantity) &&
    Math.trunc(quantity) <= 0
  ) {
    return removeBasketItem(basket, itemId);
  }

  return {
    version: 1,
    items: basket.items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            quantity: normalizeQuantity(quantity),
          }
        : item
    ),
  };
}

/* ==========================================
   UPDATE ITEM NOTES
   ========================================== */

export function updateBasketNotes(
  basket: QuoteBasket,
  itemId: string,
  notes: string
): QuoteBasket {
  return {
    version: 1,
    items: basket.items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            notes: cleanText(
              notes,
              MAX_NOTES_LENGTH
            ),
          }
        : item
    ),
  };
}

/* ==========================================
   REMOVE PRODUCT
   ========================================== */

export function removeBasketItem(
  basket: QuoteBasket,
  itemId: string
): QuoteBasket {
  return {
    version: 1,
    items: basket.items.filter(
      (item) => item.id !== itemId
    ),
  };
}

/* ==========================================
   CLEAR BASKET
   ========================================== */

export function clearBasket(): QuoteBasket {
  return createEmptyBasket();
}

/* ==========================================
   BASKET SUMMARY
   ========================================== */

export function getBasketItemCount(
  basket: QuoteBasket
): number {
  return basket.items.length;
}

export function getBasketTotalQuantity(
  basket: QuoteBasket
): number {
  return basket.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

export function isBasketEmpty(
  basket: QuoteBasket
): boolean {
  return basket.items.length === 0;
}

/* ==========================================
   VALIDATE BROWSER-STORED ITEMS

   Only accept product IDs that still
   exist in the development catalogue.

   This is client-side integrity checking,
   NOT server-side security validation.
   ========================================== */

function restoreItem(
  value: unknown
): QuoteBasketItem | null {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return null;
  }

  const record = value as Record<string, unknown>;

  if (typeof record.productSlug !== "string") {
    return null;
  }

  const product = getProductBySlug(
    record.productSlug,
    true
  );

  if (!product) {
    return null;
  }

  if (
    typeof record.productId !== "string" ||
    record.productId !== product.id
  ) {
    return null;
  }

  const rawOptions =
    typeof record.options === "object" &&
    record.options !== null &&
    !Array.isArray(record.options)
      ? (record.options as QuoteProductOptions)
      : {};

  const options = cleanOptions(rawOptions);

  return {
    id: createItemId(product.id, options),
    productId: product.id,
    productSlug: product.slug,
    productName: product.name,
    categorySlug: product.categorySlug,
    quantity: normalizeQuantity(
      record.quantity
    ),
    options,
    notes: cleanText(
      record.notes,
      MAX_NOTES_LENGTH
    ),
  };
}

/* ==========================================
   READ BASKET FROM LOCAL STORAGE
   ========================================== */

export function loadQuoteBasket(): QuoteBasket {
  if (typeof window === "undefined") {
    return createEmptyBasket();
  }

  try {
    const stored = window.localStorage.getItem(
      QUOTE_STORAGE_KEY
    );

    if (!stored) {
      return createEmptyBasket();
    }

    const parsed: unknown = JSON.parse(stored);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("version" in parsed) ||
      !("items" in parsed)
    ) {
      return createEmptyBasket();
    }

    if (
      parsed.version !== 1 ||
      !Array.isArray(parsed.items)
    ) {
      return createEmptyBasket();
    }

    const restoredItems: QuoteBasketItem[] = [];
    const seen = new Set<string>();

    for (const rawItem of parsed.items.slice(
      0,
      MAX_QUOTE_ITEMS
    )) {
      const item = restoreItem(rawItem);

      if (!item) {
        continue;
      }

      if (seen.has(item.id)) {
        const existing = restoredItems.find(
          (entry) => entry.id === item.id
        );

        if (existing) {
          existing.quantity = Math.min(
            MAX_ITEM_QUANTITY,
            existing.quantity + item.quantity
          );
        }

        continue;
      }

      seen.add(item.id);
      restoredItems.push(item);
    }

    return {
      version: 1,
      items: restoredItems,
    };
  } catch {
    // Invalid JSON or unavailable browser
    // storage should not crash the website.
    return createEmptyBasket();
  }
}

/* ==========================================
   SAVE BASKET TO LOCAL STORAGE
   ========================================== */

export function saveQuoteBasket(
  basket: QuoteBasket
): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.setItem(
      QUOTE_STORAGE_KEY,
      JSON.stringify(basket)
    );

    window.dispatchEvent(
      new Event(QUOTE_BASKET_EVENT)
    );

    return true;
  } catch {
    // Storage may be disabled or full.
    return false;
  }
}

/* ==========================================
   CONVENIENCE OPERATIONS

   These functions load the current basket,
   update it, and save the result.
   ========================================== */

export function addProductToSavedBasket(
  product: Product,
  quantity = 1,
  options: QuoteProductOptions = {},
  notes = ""
): QuoteBasket {
  const current = loadQuoteBasket();

  const updated = addProductToBasket(
    current,
    product,
    quantity,
    options,
    notes
  );

  saveQuoteBasket(updated);
  return updated;
}

export function removeFromSavedBasket(
  itemId: string
): QuoteBasket {
  const updated = removeBasketItem(
    loadQuoteBasket(),
    itemId
  );

  saveQuoteBasket(updated);
  return updated;
}

export function updateSavedBasketQuantity(
  itemId: string,
  quantity: number
): QuoteBasket {
  const updated = updateBasketQuantity(
    loadQuoteBasket(),
    itemId,
    quantity
  );

  saveQuoteBasket(updated);
  return updated;
}

export function updateSavedBasketNotes(
  itemId: string,
  notes: string
): QuoteBasket {
  const updated = updateBasketNotes(
    loadQuoteBasket(),
    itemId,
    notes
  );

  saveQuoteBasket(updated);
  return updated;
}

export function clearSavedBasket(): QuoteBasket {
  const empty = createEmptyBasket();

  saveQuoteBasket(empty);
  return empty;
}
