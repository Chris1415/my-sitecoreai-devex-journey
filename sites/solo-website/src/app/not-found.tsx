import Link from 'next/link';
import { Suspense } from 'react';
import { connection } from 'next/server';
import { ErrorPage } from '@sitecore-content-sdk/nextjs';
import { getErrorPage } from 'src/lib/cached-functions';
import scConfig from 'sitecore.config';
import Layout from 'src/Layout';
import Providers from 'src/Providers';

async function NotFoundContent() {
  await connection();
  if (!scConfig.defaultSite) return null;
  const page = await getErrorPage(ErrorPage.NotFound, {
    site: scConfig.defaultSite,
    locale: scConfig.defaultLanguage,
  });
  if (!page) return null;
  return (
    <Providers page={page}>
      <Layout page={page} />
    </Providers>
  );
}

export default async function NotFound() {
  const content = await NotFoundContent();
  if (content) {
    return <Suspense fallback={<div />}>{content}</Suspense>;
  }

  return (
    <div style={{ padding: 10 }}>
      <h1>Page not found</h1>
      <p>This page does not exist.</p>
      <Link href="/">Go to the Home page</Link>
    </div>
  );
}
