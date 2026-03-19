import { isDesignLibraryPreviewData } from "@sitecore-content-sdk/nextjs/editing";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { SiteInfo } from "@sitecore-content-sdk/nextjs";
import sites from ".sitecore/sites.json";
import { routing } from "src/i18n/routing";
import scConfig from "sitecore.config";
import client from "src/lib/sitecore-client";
import Layout, { RouteFields } from "src/Layout";
import components from "src/component-map";
import Providers from "src/Providers";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{
    site: string;
    locale: string;
    path?: string[];
    [key: string]: string | string[] | undefined;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const revalidate = 600;

const LOG_PREFIX = "[page]";

async function DynamicPageContent({
  site,
  locale,
  path,
  searchParams,
}: {
  site: string;
  locale: string;
  path?: string[];
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const draft = await draftMode();
  console.log(
    `${LOG_PREFIX} Render | path: /${(path ?? []).join("/")} | site: ${site} | locale: ${locale} | draft: ${draft.isEnabled} | at: ${new Date().toISOString()}`,
  );

  let page;
  if (draft.isEnabled) {
    const editingParams = await searchParams;
    if (isDesignLibraryPreviewData(editingParams)) {
      page = await client.getDesignLibraryData(editingParams);
    } else {
      page = await client.getPreview(editingParams);
    }
  } else {
    page = await client.getPage(path ?? [], { site, locale });
  }

  // If the page is not found, return a 404
  if (!page) {
    console.log("Erro Page for path", path);
    notFound();
  }

  // Fetch the component data from Sitecore (Likely will be deprecated)
  const componentProps = await client.getComponentData(
    page.layout,
    {},
    components,
  );

  return (
    <NextIntlClientProvider>
      <Providers page={page} componentProps={componentProps}>
        <Layout page={page} />
      </Providers>
    </NextIntlClientProvider>
  );
}

export default async function Page({ params, searchParams }: PageProps) {
  const { site, locale, path } = await params;

  setRequestLocale(`${site}_${locale}`);

  return (
    /*<Suspense fallback={<div></div>}>*/
      <DynamicPageContent
        site={site}
        locale={locale}
        path={path}
        searchParams={searchParams}
      />
    /*</Suspense>*/
  );
}

export const generateStaticParams = async () => {
  if (process.env.NODE_ENV !== "development" && scConfig.generateStaticPaths) {
    return await client.getAppRouterStaticParams(
      sites.map((site: SiteInfo) => site.name),
      routing.locales.slice(),
    );
  }

  return [
    {
      site: sites[0]?.name || "default",
      locale: routing.defaultLocale || scConfig.defaultLanguage,
      path: [],
    },
  ];
};

// Metadata fields for the page.
export const generateMetadata = async ({ params }: PageProps) => {
  const { path, site, locale } = await params;

  // The same call as for rendering the page. Should be cached by default react behavior
  const page = await client.getPage(path ?? [], { site, locale });
  return {
    title:
      (
        page?.layout.sitecore.route?.fields as RouteFields
      )?.Title?.value?.toString() || "Page",
  };
};
