// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

import * as separator from 'src/components/ui/separator';
import * as dialog from 'src/components/ui/dialog';
import * as avatar from 'src/components/ui/avatar';
import * as accordion from 'src/components/ui/accordion';
import * as Header from 'src/components/structural/header/Header';
import * as Footer from 'src/components/structural/footer/Footer';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['separator', { ...separator }],
  ['dialog', { ...dialog }],
  ['avatar', { ...avatar }],
  ['accordion', { ...accordion }],
  ['Header', { ...Header }],
  ['Footer', { ...Footer }],
]);

export default componentMap;
