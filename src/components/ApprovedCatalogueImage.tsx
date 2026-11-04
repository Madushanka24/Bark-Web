
import ApprovedProductImage from "@/components/ApprovedProductImage";

import {
  getApprovedProductMainImage,
} from "@/lib/approved-product-images";

import type { Product } from "@/lib/products";

/**
 * BARK ORNAMENT — FILE 108
 *
 * Approved Catalogue Image
 *
 * File:
 * src/components/ApprovedCatalogueImage.tsx
 *
 * Theme: Golden Coastal Luxury
 *
 * PURPOSE
 * - Display a product's approved primary photograph.
 * - Use its actual catalogue slug for image lookup.
 * - Show a placeholder when no image is configured.
 * - Support catalogue, related and featured cards.
 * - Reuse the existing approved-photography component.
 *
 * SAFETY
 * - No product data modifications.
 * - No invented product images.
 * - No remote image URLs.
 * - No database or API requests.
 * - No quotation or email operations.
 * - No client state or browser effects.
 *
 * An approved photo does not establish that
 * its product is verified inventory.
 */

type CatalogueImageVariant =
  | "card"
  | "related"
  | "featured";

type CatalogueImageProduct = Pick<
  Product,
  "slug" | "name"
>;

export type ApprovedCatalogueImageProps = {
  /**
   * Actual catalogue product.
   * Its slug determines the photograph.
   */
  product: CatalogueImageProduct;

  /**
   * Controls the intended display context.
   */
  variant?: CatalogueImageVariant;

  /**
   * Optional layout classes.
   * Applied to the outer image container.
   */
  className?: string;

  /**
   * Optional image styling.
   */
  imageClassName?: string;

  /**
   * Optional responsive image sizes.
   */
  sizes?: string;
};

/**
 * Responsive image sizing for each card.
 *
 * The browser receives the correct sizes
 * hint when an approved image is displayed.
 */

const defaultSizes: Record<
  CatalogueImageVariant,
  string
> = {
  card:
    "(max-width: 640px) 100vw, " +
    "(max-width: 1024px) 50vw, 33vw",

  related:
    "(max-width: 640px) 100vw, " +
    "(max-width: 1024px) 50vw, 33vw",

  featured:
    "(max-width: 1024px) 100vw, 50vw",
};

/**
 * Displays the approved image associated
 * with the supplied product.
 *
 * No manual photo override is accepted.
 *
 * The approved-product-images registry
 * remains the single source for product
 * photography assignments.
 */

export default function ApprovedCatalogueImage({
  product,
  variant = "card",
  className = "",
  imageClassName = "",
  sizes,
}: ApprovedCatalogueImageProps) {
  const photo = getApprovedProductMainImage(
    product.slug
  );

  const aspect =
    variant === "featured"
      ? "hero"
      : "landscape";

  const minimumHeight =
    variant === "featured"
      ? "min-h-[300px] sm:min-h-[420px]"
      : variant === "related"
        ? "min-h-[150px] sm:min-h-[190px]"
        : "min-h-[200px] sm:min-h-[230px]";

  return (
    <ApprovedProductImage
      label={product.name}
      photo={photo}
      aspect={aspect}
      fit="contain"
      sizes={sizes ?? defaultSizes[variant]}
      className={[
        minimumHeight,
        "border border-[#D9C8B0]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      imageClassName={imageClassName}
    />
  );
}
