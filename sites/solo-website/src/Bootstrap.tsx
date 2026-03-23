'use client';
import { useEffect, JSX } from 'react';
import { initContentSdk } from '@sitecore-content-sdk/core';
import {
  analyticsBrowserAdapter,
  analyticsPlugin,
} from '@sitecore-content-sdk/analytics-core';
import { eventsPlugin } from '@sitecore-content-sdk/events';
import {
  personalizeBrowserAdapter,
  personalizeBrowserPlugin,
} from '@sitecore-content-sdk/personalize';
import config from 'sitecore.config';

const Bootstrap = ({
  siteName,
  isPreviewMode,
}: {
  siteName: string;
  isPreviewMode: boolean;
}): JSX.Element | null => {
  useEffect(() => {
    if (isPreviewMode) {
      console.debug('Content SDK analytics are not initialized in edit and preview modes');
      return;
    }

    if (config.api.edge?.clientContextId) {
      initContentSdk({
        config: {
          contextId: config.api.edge.clientContextId,
          siteName: siteName || config.defaultSite,
        },
        plugins: [
          analyticsPlugin({
            options: {
              enableCookie: true,
              cookieDomain: window.location.hostname.replace(/^www\./, ''),
            },
            adapter: analyticsBrowserAdapter(),
          }),
          eventsPlugin(),
          personalizeBrowserPlugin({
            options: {
              enablePersonalizeCookie: true,
              webPersonalization: true,
            },
            adapter: personalizeBrowserAdapter(),
          }),
        ],
      });
    } else {
      console.error('Client Edge API settings missing from configuration');
    }
  }, [siteName, isPreviewMode]);

  return null;
};

export default Bootstrap;
