
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AddToQuote from "@/components/AddToQuote";

import {
  products,
  getProductBySlug,
  getCategoryBySlug,
  getRelatedProducts,
  type Product,
} from "@/lib/products";

/* ==========================================
   BARK ORNAMENT - PRODUCT DETAIL PAGE
   Theme: Golden Coastal Luxury
   ========================================== */

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* ==========================================
   GENERATE PRODUCT ROUTES
   ========================================== */

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

/* ==========================================
   DYNAMIC SEO METADATA
   ========================================== */

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = getProductBySlug(slug, true);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: product.name,
    description: product.shortDescription,
    robots: {
      index: product.status === "published" &&
        !product.isDemo,
      follow: true,
    },
  };
}

/* ==========================================
   PRODUCT PHOTO PLACEHOLDER
   ========================================== */

function ProductPhotoPlaceholder({
  label,
  large = false,
}: {
  label: string;
  large?: boolean;
}) {
  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-[#D9C8B0] bg-gradient-to-br from-[#E9DDC9] via-[#F3E9D8] to-[#D7C2A0] p-6 text-center ${
        large
          ? "min-h-[340px] sm:min-h-[460px]"
          : "min-h-[110px] sm:min-h-[135px]"
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute -right-12 -top-12 h-44 w-44 rounded-full border border-[#C59A45]/30"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-14 -left-12 h-44 w-44 rounded-full border border-[#C59A45]/20"
      />

      <div className="relative z-10 flex flex-col items-center gap-3">
        <svg
          width={large ? 52 : 30}
          height={large ? 52 : 30}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#92744A"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
          />
          <circle
            cx="8.5"
            cy="8.5"
            r="1.5"
          />
          <path d="m21 15-5-5L5 21" />
        </svg>

        <span className="max-w-xs text-xs font-bold uppercase leading-6 tracking-[0.12em] text-[#725D43]">
          {label}
        </span>

        {large && (
          <span className="text-xs text-[#725D43]">
            Approved product photograph coming later
          </span>
        )}
      </div>
    </div>
  );
}

/* ==========================================
   SPECIFICATION DISPLAY
   ========================================== */

function SpecificationList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-[#E4D7C4] bg-white p-6 text-center">
      <h3 className="font-serif text-xl text-[#30251F]">
        {title}
      </h3>

      {items.length > 0 ? (
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-full bg-[#FAF7F0] px-4 py-2 text-sm text-[#30251F]"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm leading-7 text-[#74675E]">
          Specifications to be confirmed.
        </p>
      )}
    </div>
  );
}

/* ==========================================
   OTHER PRODUCT PREVIEW CARD
   ========================================== */

function RelatedProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E4D7C4] bg-white text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transform-none"
    >
      <div className="p-3">
        <ProductPhotoPlaceholder
          label={product.name}
        />
      </div>

      <div className="flex flex-1 flex-col items-center px-6 pb-7 pt-3">
        {product.isDemo && (
          <span className="mb-3 rounded-full bg-[#FAF7F0] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#87512C]">
            Development Preview
          </span>
        )}

        <h3 className="font-serif text-xl leading-snug text-[#30251F]">
          {product.name}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-7 text-[#74675E]">
          {product.shortDescription}
        </p>

        <span className="mt-5 text-sm font-bold text-[#B95016]">
          View Product Details →
        </span>
      </div>
    </Link>
  );
}

/* ==========================================
   MAIN DYNAMIC PRODUCT CONTENT

   URL-dependent params are resolved inside
   the Suspense boundary supplied by the
   exported page component below.
   ========================================== */

async function ProductDetailContent({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  // Explicitly allow development previews.
  // These are NOT confirmed inventory.
  const product = getProductBySlug(slug, true);

  if (!product) {
    notFound();
  }

  const category = getCategoryBySlug(
    product.categorySlug
  );

  const relatedInCategory = getRelatedProducts(
    product,
    3,
    true
  );

  // Our current demo data has one product per
  // category. Provide other preview suggestions
  // when no same-category products are present.
  const relatedProducts =
    relatedInCategory.length > 0
      ? relatedInCategory
      : products
          .filter((item) => item.id !== product.id)
          .slice(0, 3);

  const hasVerifiedOptions =
    product.materials.length > 0 ||
    product.sizes.length > 0 ||
    product.finishes.length > 0;

  return (
    <>
      {/* ====================================
          1. PRODUCT HERO
          ==================================== */}

      <section className="relative overflow-hidden bg-[#30251F] px-5 py-16 text-center text-[#FAF7F0] sm:py-20">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#C59A45]/20"
        />

        <div className="relative mx-auto max-w-4xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#E3B65D]">
            Bark Ornament Product Collection
          </p>

          <h1 className="font-serif text-4xl leading-tight text-[#FAF7F0] sm:text-5xl">
            {product.name}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#E9DDC9]">
            {product.shortDescription}
          </p>

          <nav
            aria-label="Breadcrumb"
            className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-[#E9DDC9]"
          >
            <Link
              href="/"
              className="hover:text-white hover:underline"
            >
              Home
            </Link>

            <span aria-hidden="true">/</span>

            <Link
              href="/products"
              className="hover:text-white hover:underline"
            >
              Products
            </Link>

            {category && (
              <>
                <span aria-hidden="true">/</span>

                <Link
                  href={`/products?category=${category.slug}`}
                  className="hover:text-white hover:underline"
                >
                  {category.name}
                </Link>
              </>
            )}

            <span aria-hidden="true">/</span>

            <span
              aria-current="page"
              className="text-[#E3B65D]"
            >
              {product.name}
            </span>
          </nav>
        </div>
      </section>

      {/* ====================================
          2. PRODUCT PHOTOGRAPHY
          ==================================== */}

      <section className="section bg-[#FAF7F0]">
        <div className="container">
          <div className="mx-auto max-w-5xl text-center">
            <p className="eyebrow">
              Product Gallery
            </p>

            <h2 className="font-serif text-3xl text-[#30251F] sm:text-4xl">
              Explore the Product
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#74675E]">
              Actual product photography will be
              added after images are approved.
            </p>

            <div className="mt-10">
              <ProductPhotoPlaceholder
                label={product.name}
                large
              />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-5">
              <ProductPhotoPlaceholder
                label="Additional View"
              />

              <ProductPhotoPlaceholder
                label="Material Detail"
              />

              <ProductPhotoPlaceholder
                label="Product Finish"
              />
            </div>

            <p className="mt-5 text-xs leading-6 text-[#74675E]">
              These are placeholder panels, not
              actual product photographs or
              an interactive image gallery.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================
          3. PRODUCT INFORMATION
          ==================================== */}

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            {product.isDemo && (
              <span className="mb-6 inline-flex rounded-full border border-[#C59A45] bg-[#FAF7F0] px-5 py-2 text-xs font-bold uppercase tracking-wide text-[#87512C]">
                Development Preview — Not Verified Inventory
              </span>
            )}

            <p className="eyebrow">
              Product Information
            </p>

            <h2 className="font-serif text-3xl text-[#30251F] sm:text-4xl">
              {product.name}
            </h2>

            {category && (
              <p className="mt-4 text-sm font-semibold text-[#B95016]">
                {category.name}
              </p>
            )}

            <p className="mt-7 text-base leading-8 text-[#74675E]">
              {product.description}
            </p>

            <div className="mt-8 rounded-xl border border-[#E4D7C4] bg-[#FAF7F0] p-6">
              <h3 className="font-serif text-xl text-[#30251F]">
                Product Availability
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#74675E]">
                {product.isDemo
                  ? "This record is for website development only. Product availability, specifications and supply options have not been confirmed."
                  : "Please contact Bark Ornament to confirm current availability and product requirements."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================
          4. MATERIALS AND SPECIFICATIONS
          ==================================== */}

      <section className="section bg-[#E9DDC9]">
        <div className="container">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="eyebrow">
              Product Specifications
            </p>

            <h2 className="font-serif text-3xl text-[#30251F] sm:text-4xl">
              Materials, Sizes & Finishes
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#74675E]">
              Specifications will be displayed
              after the product information is verified.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <SpecificationList
              title="Materials"
              items={product.materials}
            />

            <SpecificationList
              title="Available Sizes"
              items={product.sizes}
            />

            <SpecificationList
              title="Finishing Options"
              items={product.finishes}
            />
          </div>

          {!hasVerifiedOptions && (
            <p className="mt-7 text-center text-sm text-[#74675E]">
              No approved technical specifications
              have been added yet.
            </p>
          )}

          <div className="mt-9 text-center">
            <p className="text-sm font-medium text-[#30251F]">
              Customization:
              {" "}
              <span className="font-normal text-[#74675E]">
                {product.isDemo
                  ? "To be confirmed"
                  : product.customizable
                    ? "Customization options may be available"
                    : "Contact us to discuss requirements"}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ====================================
          5. QUOTATION INFORMATION
          ==================================== */}

      <section className="bg-[#FAF7F0] px-5 py-16 text-center sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">
            Product Enquiries
          </p>

          <h2 className="font-serif text-3xl text-[#30251F] sm:text-4xl">
            Interested in This Product?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#74675E]">
            Add this product to your quotation basket
            and specify your preferred quantity,
            materials, sizes and customization.
          </p>

          <div className="mt-10">
            <AddToQuote product={product} />
          </div>

          <Link
            href="/products"
            className="btn btn-primary mt-8"
          >
            Browse More Products →
          </Link>
        </div>
      </section>

      {/* ====================================
          6. RELATED PRODUCT SUGGESTIONS
          ==================================== */}

      {relatedProducts.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="eyebrow">
                Discover More
              </p>

              <h2 className="font-serif text-3xl text-[#30251F] sm:text-4xl">
                {relatedInCategory.length > 0
                  ? "Related Products"
                  : "Other Product Previews"}
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#74675E]">
                Explore additional product records
                in our developing catalogue.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((item) => (
                <RelatedProductCard
                  key={item.id}
                  product={item}
                />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/products"
                className="btn btn-secondary"
              >
                View Full Catalogue →
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

/* ==========================================
   SUSPENSE BOUNDARY FOR URL PARAMS

   Provides an immediate loading shell
   while URL-dependent product information
   is resolved.

   Preserves the existing product page,
   SEO and catalogue functionality.
   ========================================== */

export default function ProductDetailPage({
  params,
}: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <section
          className="flex min-h-[320px] items-center justify-center bg-[#FAF7F0] px-5 py-20 text-center"
          role="status"
          aria-live="polite"
        >
          <div className="mx-auto max-w-xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#B95016]">
              Bark Ornament Product Collection
            </p>

            <p className="font-serif text-2xl text-[#30251F] sm:text-3xl">
              Loading product details...
            </p>
          </div>
        </section>
      }
    >
      <ProductDetailContent params={params} />
    </Suspense>
  );
}
