
import Link from "next/link";
import type { Metadata } from "next";

/* ==========================================
   BARK ORNAMENT - HOMEPAGE
   Theme: Golden Coastal Luxury
   ========================================== */

export const metadata: Metadata = {
  title: "Customized Hospitality Products",
  description:
    "Discover Bark Ornament's customized hospitality products, including printing, stationery, wooden accessories, packaging, crafts and gifts for hotels and resorts.",
};

/* ==========================================
   PRODUCT CATEGORY DATA
   These are category previews, not product listings.
   ========================================== */

const categories = [
  {
    number: "01",
    name: "Printing & Corporate Stationery",
    description:
      "Printed materials and stationery solutions for hospitality businesses.",
    slug: "printing-stationery",
  },
  {
    number: "02",
    name: "Menus & Guest Service Products",
    description:
      "Menu presentation and guest-facing products for hotels and resorts.",
    slug: "menus-guest-service",
  },
  {
    number: "03",
    name: "Tags, Stickers & Cards",
    description:
      "Custom tags, labels, stickers and printed cards.",
    slug: "tags-stickers-cards",
  },
  {
    number: "04",
    name: "Bags & Packaging",
    description:
      "Branded bags and packaging for hospitality applications.",
    slug: "bags-packaging",
  },
  {
    number: "05",
    name: "Wooden Products & Crafts",
    description:
      "Wooden accessories, decorative items and hospitality crafts.",
    slug: "wooden-products",
  },
  {
    number: "06",
    name: "Cane & Natural Products",
    description:
      "Natural-material crafts and accessories for hospitality spaces.",
    slug: "cane-natural",
  },
  {
    number: "07",
    name: "Ceramic, Pottery & Laksha",
    description:
      "Craft-based decorative and functional product collections.",
    slug: "ceramic-pottery-laksha",
  },
  {
    number: "08",
    name: "Candles & Party Products",
    description:
      "Selected decorative products and event accessories.",
    slug: "candles-party",
  },
  {
    number: "09",
    name: "Gifts & Promotional Products",
    description:
      "Customized gifts and branded promotional merchandise.",
    slug: "gifts-promotional",
  },
  {
    number: "10",
    name: "Laundry & Hotel Operations",
    description:
      "Selected operational products and hospitality supplies.",
    slug: "laundry-operations",
  },
];

const markets = [
  {
    country: "Maldives",
    description:
      "Customized product solutions for resort and hospitality requirements.",
  },
  {
    country: "Seychelles",
    description:
      "Hospitality products for hotel and resort operations.",
  },
  {
    country: "Sri Lanka",
    description:
      "Locally supported customized hospitality product requirements.",
  },
];

const insights = [
  {
    title: "Understanding Paper Types Used in Hospitality Printing",
    description:
      "Learn about common paper choices and their applications.",
  },
  {
    title: "What Does GSM Mean and Why Does It Matter?",
    description:
      "Understand paper weight and how it influences product selection.",
  },
  {
    title: "Sea Freight vs Air Freight",
    description:
      "Explore important considerations when planning transportation.",
  },
];

/* ==========================================
   REUSABLE SECTION HEADING
   ========================================== */

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div
      className={
        centered
          ? "mx-auto mb-12 max-w-3xl text-center"
          : "mb-12 max-w-3xl"
      }
    >
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#B95016]">
        {eyebrow}
      </p>

      <h2 className="font-serif text-3xl leading-tight text-[#30251F] sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-8 text-[#74675E]">
          {description}
        </p>
      )}
    </div>
  );
}

/* ==========================================
   PHOTOGRAPH PLACEHOLDER
   Replace with approved product photos later.
   ========================================== */

function PhotoPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={
        "relative flex min-h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-[#E9DDC9] via-[#F1E7D6] to-[#D6C19E] p-6 " +
        className
      }
    >
      <div
        aria-hidden="true"
        className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[#C59A45]/30"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full border border-[#C59A45]/20"
      />

      <div className="relative z-10 flex max-w-xs flex-col items-center gap-3 text-center">
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#94764B"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>

        <span className="text-[11px] font-semibold uppercase leading-5 tracking-[0.14em] text-[#725D43]">
          {label}
        </span>

        <span className="text-xs text-[#725D43]">
          Approved photography coming later
        </span>
      </div>
    </div>
  );
}

/* ==========================================
   HOMEPAGE
   ========================================== */

export default function HomePage() {
  return (
    <>
      {/* =====================================
          1. HERO SECTION
          ===================================== */}

      <section
        aria-labelledby="home-hero-title"
        className="relative overflow-hidden bg-[#30251F] text-[#FAF7F0]"
      >
        <div
          aria-hidden="true"
          className="absolute -left-40 -top-40 h-96 w-96 rounded-full border border-[#C59A45]/20"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-40 right-0 h-96 w-96 rounded-full border border-[#C59A45]/10"
        />

        <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 px-5 py-20 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div className="animate-fade-up">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-[#E3B65D]">
              Bark Ornament (Pvt) Ltd
            </p>

            <h1
              id="home-hero-title"
              className="max-w-2xl font-serif text-4xl leading-[1.12] text-[#FAF7F0] sm:text-5xl lg:text-6xl xl:text-[4.6rem]"
            >
              Thoughtfully Crafted
              <span className="block text-[#E3B65D]">
                for Hospitality.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#E9DDC9] sm:text-lg">
              Customized printing, wooden accessories,
              packaging, crafts and hospitality products
              for hotels and resorts.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#B95016] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#963E10]"
              >
                Explore Our Products
                <span className="ml-3" aria-hidden="true">
                  →
                </span>
              </Link>

              <Link
                href="/request-quotation"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#C59A45] px-7 py-3 text-sm font-bold text-[#FAF7F0] transition-colors hover:bg-[#C59A45] hover:text-[#30251F]"
              >
                Request a Quotation
              </Link>
            </div>

            <p className="mt-12 border-l-2 border-[#C59A45] pl-4 text-sm leading-7 text-[#E9DDC9]">
              Hospitality product solutions for Maldives,
              Seychelles and Sri Lanka.
            </p>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute -inset-4 rounded-2xl border border-[#C59A45]/25" />

            <PhotoPlaceholder
              label="Hospitality Product Collection"
              className="min-h-[350px] rounded-xl sm:min-h-[460px] lg:min-h-[530px]"
            />

            <div className="absolute -bottom-5 left-4 right-4 rounded-lg bg-[#FAF7F0] px-6 py-5 shadow-xl sm:left-8 sm:right-auto">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#B95016]">
                Our Focus
              </p>

              <p className="font-serif text-xl text-[#30251F]">
                Customized Hospitality Products
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          2. COMPANY INTRODUCTION
          ===================================== */}

      <section className="section bg-[#FAF7F0]">
        <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <PhotoPlaceholder
              label="Company and Production Photography"
              className="min-h-[330px] rounded-xl sm:min-h-[440px]"
            />
          </div>

          <div>
            <p className="eyebrow">Who We Are</p>

            <h2 className="font-serif text-3xl leading-tight text-[#30251F] sm:text-4xl lg:text-5xl">
              Details That Elevate Hospitality.
            </h2>

            <p className="mt-7 text-base leading-8 text-[#74675E]">
              Bark Ornament (Pvt) Ltd is a Sri Lankan
              supplier of customized products for the
              hospitality industry.
            </p>

            <p className="mt-4 text-base leading-8 text-[#74675E]">
              Our range includes printed materials,
              wooden accessories, packaging, decorative
              crafts, gifts and selected operational supplies
              for hotels and resorts.
            </p>

            <Link
              href="/about"
              className="mt-7 inline-flex min-h-11 items-center gap-3 border-b-2 border-[#C59A45] py-2 text-sm font-bold text-[#B95016] transition-colors hover:border-[#B95016]"
            >
              Discover Bark Ornament
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================
          3. PRODUCT COLLECTIONS
          ===================================== */}

      <section className="section bg-[#E9DDC9]">
        <div className="container">
          <SectionHeading
            eyebrow="Our Product Collections"
            title="Explore Hospitality Products"
            description="Discover our main product categories and explore customized solutions for hotel and resort requirements."
            centered
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="group overflow-hidden rounded-xl border border-[#D9C8B0] bg-[#FAF7F0] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B95016] motion-reduce:transform-none"
              >
                <PhotoPlaceholder
                  label={category.name}
                  className="min-h-[210px] transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transform-none"
                />

                <div className="p-6">
                  <p className="mb-3 text-xs font-bold tracking-[0.15em] text-[#B95016]">
                    COLLECTION {category.number}
                  </p>

                  <h3 className="font-serif text-xl leading-snug text-[#30251F]">
                    {category.name}
                  </h3>

                  <p className="mt-3 min-h-[52px] text-sm leading-7 text-[#74675E]">
                    {category.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#B95016]">
                    Explore Collection
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="btn btn-primary"
            >
              View All Product Categories
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================
          4. CUSTOM HOSPITALITY SOLUTIONS
          ===================================== */}

      <section className="section bg-[#FAF7F0]">
        <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">
              Customized Hospitality Solutions
            </p>

            <h2 className="font-serif text-3xl leading-tight text-[#30251F] sm:text-4xl lg:text-5xl">
              Products Tailored to Your Requirements.
            </h2>

            <p className="mt-6 text-base leading-8 text-[#74675E]">
              Every hospitality environment has its own
              functional and brand requirements. Explore
              product options for printing, materials,
              dimensions and finishing.
            </p>

            <div className="mt-8 space-y-5">
              {[
                "Customized printing and branding",
                "Material and finishing options",
                "Product sizes and specifications",
                "Hospitality-focused product selection",
              ].map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E9DDC9] text-sm text-[#B95016]"
                  >
                    ✓
                  </span>

                  <p className="mb-0 text-sm font-medium text-[#30251F]">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/hospitality-solutions"
              className="btn btn-primary mt-9"
            >
              Explore Our Solutions
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <PhotoPlaceholder
            label="Custom Hospitality Product Photography"
            className="min-h-[350px] rounded-xl sm:min-h-[500px]"
          />
        </div>
      </section>

      {/* =====================================
          5. MARKETS
          ===================================== */}

      <section className="section bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="Our Markets"
            title="Hospitality Across the Indian Ocean"
            description="Bark Ornament serves hospitality customers in three key markets."
            centered
          />

          <div className="grid gap-6 md:grid-cols-3">
            {markets.map((market) => (
              <div
                key={market.country}
                className="rounded-xl border border-[#E4D7C4] bg-[#FAF7F0] p-8 transition-shadow duration-300 hover:shadow-lg"
              >
                <div
                  aria-hidden="true"
                  className="mb-7 h-1 w-14 rounded-full bg-[#C59A45]"
                />

                <h3 className="font-serif text-2xl text-[#30251F]">
                  {market.country}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#74675E]">
                  {market.description}
                </p>

                <Link
                  href="/markets"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#B95016] hover:underline"
                >
                  Explore Our Markets
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================
          6. KNOWLEDGE CENTRE
          ===================================== */}

      <section className="section bg-[#E9DDC9]">
        <div className="container">
          <SectionHeading
            eyebrow="Hospitality Knowledge"
            title="Insights for Better Product Decisions"
            description="Explore practical information about hospitality printing, packaging, materials and logistics."
            centered
          />

          <div className="grid gap-6 md:grid-cols-3">
            {insights.map((article, index) => (
              <article
                key={article.title}
                className="overflow-hidden rounded-xl bg-[#FAF7F0] shadow-sm"
              >
                <PhotoPlaceholder
                  label={`Knowledge Article ${index + 1}`}
                  className="min-h-[190px]"
                />

                <div className="p-7">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#B95016]">
                    Knowledge Centre
                  </p>

                  <h3 className="font-serif text-xl leading-snug text-[#30251F]">
                    {article.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#74675E]">
                    {article.description}
                  </p>

                  <span className="mt-5 inline-block text-xs font-semibold text-[#74675E]">
                    Article preview
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/insights" className="btn btn-dark">
              Explore Knowledge Centre
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================
          7. FINAL ENQUIRY SECTION
          ===================================== */}

      <section className="relative overflow-hidden bg-[#30251F] py-20 text-[#FAF7F0] md:py-28">
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#C59A45]/20"
        />

        <div className="container relative z-10 text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#E3B65D]">
            Let's Work Together
          </p>

          <h2 className="mx-auto max-w-3xl font-serif text-3xl leading-tight text-[#FAF7F0] sm:text-4xl lg:text-5xl">
            Have a Hospitality Project in Mind?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#E9DDC9]">
            Tell us about the products, quantities,
            materials and customization you need.
            Start your enquiry with Bark Ornament.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/request-quotation"
              className="btn btn-primary"
            >
              Request a Quotation
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#C59A45] px-7 py-3 text-sm font-bold text-[#FAF7F0] transition-colors hover:bg-[#C59A45] hover:text-[#30251F]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
