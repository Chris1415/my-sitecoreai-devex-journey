// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

import * as Header from 'src/components/global/header/Header';
import * as Footer from 'src/components/global/footer/Footer';
import * as TestimonialsSlider from 'src/components/content/testimonials/list/Testimonials.Slider';
import * as StatsTiles from 'src/components/content/stats/Stats.Tiles';
import * as Stats from 'src/components/content/stats/Stats';
import * as Signup from 'src/components/content/newsletter/Signup';
import * as ImageList from 'src/components/content/media/images/ImageList';
import * as BrandsSlider from 'src/components/content/brands/Brands.Slider';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['Header', { ...Header }],
  ['Footer', { ...Footer }],
  ['Testimonials', { ...TestimonialsSlider }],
  ['Stats', { ...StatsTiles, ...Stats }],
  ['Signup', { ...Signup }],
  ['ImageList', { ...ImageList }],
  ['Brands', { ...BrandsSlider }],
]);

export default componentMap;
