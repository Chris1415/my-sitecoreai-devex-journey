// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as separator from 'src/components/ui/separator';
import * as input from 'src/components/ui/input';
import * as dialog from 'src/components/ui/dialog';
import * as card from 'src/components/ui/card';
import * as button from 'src/components/ui/button';
import * as badge from 'src/components/ui/badge';
import * as avatar from 'src/components/ui/avatar';
import * as accordion from 'src/components/ui/accordion';
import * as themeprovider from 'src/components/theming/theme-provider';
import * as Header from 'src/components/structural/header/Header';
import * as Footer from 'src/components/structural/footer/Footer';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', Form],
  ['separator', { ...separator, componentType: 'client' }],
  ['input', { ...input }],
  ['dialog', { ...dialog, componentType: 'client' }],
  ['card', { ...card }],
  ['button', { ...button }],
  ['badge', { ...badge }],
  ['avatar', { ...avatar, componentType: 'client' }],
  ['accordion', { ...accordion, componentType: 'client' }],
  ['theme-provider', { ...themeprovider, componentType: 'client' }],
  ['Header', { ...Header, componentType: 'client' }],
  ['Footer', { ...Footer, componentType: 'client' }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
]);

export default componentMap;
