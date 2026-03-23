import { type NextRequest } from "next/server";
import {
  defineProxy,
  AppRouterMultisiteProxy,
  PersonalizeProxy,
  RedirectsProxy,
  LocaleProxy,
} from "@sitecore-content-sdk/nextjs/proxy";
import sites from ".sitecore/sites.json";
import scConfig from "sitecore.config";
import { routing } from "./i18n/routing";

export default function proxy(req: NextRequest) {
  const locale = new LocaleProxy({
    sites,
    locales: routing.locales.slice(),
    skip: () => false,
  });

  const multisite = new AppRouterMultisiteProxy({
    sites,
    ...scConfig.multisite,
    skip: () => false,
  });

  const redirects = new RedirectsProxy({
    sites,
    ...scConfig.api.edge,
    ...scConfig.api.local,
    ...scConfig.redirects,
    skip: () => false,
  });

  const personalize = new PersonalizeProxy({
    sites,
    ...scConfig.api.edge,
    ...scConfig.personalize,
    skip: () => false,
  });

  return defineProxy(locale, multisite, redirects, personalize).exec(req);
}

export const config = {
  matcher: [
    "/",
    "/((?!api/|sitemap|robots|_next/|images|healthz|sitecore/api/|-/|favicon.ico|sc_logo.svg|placeholder.svg).*)",
  ],
};
