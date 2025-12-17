import { TextField } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";
import { QuoteIcon } from "lucide-react";
import { Text } from "@sitecore-content-sdk/nextjs";
import { NewsData } from "../news/Details/NewsDetails";

interface QuoteProps extends ComponentProps {
  fields: {
    Quote: TextField;
  };
}

export default function Default({ fields, page }: QuoteProps) {
  const { Quote } = fields;
  const quote =
    (page.layout.sitecore.route?.fields as unknown as NewsData)?.Quote || Quote;

    if (page?.layout?.sitecore?.context?.itemPath?.includes("Partial-Designs")) {
        return <div>Quote not found</div>;
      } 

  return (
    <>
      {/* Pull Quote Section */}
      <div className="group/quote relative my-10 cursor-default overflow-hidden transition-all duration-500 hover:scale-[1.01]">
        {/* Background with gradient - Light & Dark mode */}
        <div className="absolute inset-0 bg-linear-to-br from-red-50 via-stone-100 to-amber-50/50 transition-all duration-500 group-hover/quote:from-red-100 group-hover/quote:via-stone-50 dark:from-red-950 dark:via-stone-900 dark:to-neutral-950 dark:group-hover/quote:from-red-900 dark:group-hover/quote:via-stone-800" />

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Decorative blurred orbs - Light & Dark mode */}
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-red-300/40 blur-3xl transition-all duration-700 group-hover/quote:bg-red-400/50 group-hover/quote:blur-2xl dark:bg-red-600/25 dark:group-hover/quote:bg-red-500/35" />
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-red-200/30 blur-3xl transition-all duration-700 group-hover/quote:bg-red-300/40 dark:bg-red-800/20 dark:group-hover/quote:bg-red-600/30" />
        <div className="absolute left-1/3 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-amber-300/20 blur-3xl transition-all duration-500 group-hover/quote:bg-amber-400/30 dark:bg-amber-500/10 dark:group-hover/quote:bg-amber-400/15" />

        <div className="relative px-4 py-8 md:px-8 md:py-10 lg:px-12 lg:py-12">
          <blockquote className="mx-auto max-w-4xl text-center">
            {/* Decorative quote icon */}
            <div className="mb-6 flex justify-center">
              <div className="rounded-full border border-red-300/50 bg-red-100/80 p-4 backdrop-blur-sm transition-all duration-300 group-hover/quote:border-red-400/60 group-hover/quote:bg-red-200/80 group-hover/quote:shadow-lg group-hover/quote:shadow-red-300/30 dark:border-red-400/20 dark:bg-red-500/10 dark:group-hover/quote:border-red-400/40 dark:group-hover/quote:bg-red-500/20 dark:group-hover/quote:shadow-red-500/20">
                <QuoteIcon className="h-8 w-8 text-red-600 transition-transform duration-300 group-hover/quote:scale-110 dark:text-red-400" />
              </div>
            </div>

            {/* Quote text */}
            <p className="text-balance text-2xl font-medium italic leading-relaxed text-stone-800 transition-colors duration-300 group-hover/quote:text-stone-900 dark:text-white/90 dark:group-hover/quote:text-white md:text-3xl lg:text-4xl">
              <Text as="span" field={quote} />
            </p>

            {/* Decorative line */}
            <div className="mx-auto mt-8 h-px w-32 bg-linear-to-r from-transparent via-red-400/50 to-transparent transition-all duration-500 group-hover/quote:w-48 group-hover/quote:via-red-500/70 dark:via-red-500/50 dark:group-hover/quote:via-red-400/70" />
          </blockquote>
        </div>
      </div>
    </>
  );
}
