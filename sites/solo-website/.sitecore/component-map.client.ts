// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

import * as Header from 'src/components/global/header/Header';
import * as Footer from 'src/components/global/footer/Footer';
import * as TestimonialsSlider from 'src/components/content/testimonials/list/Testimonials.Slider';
import * as StatsTiles from 'src/components/content/stats/Stats.Tiles';
import * as StatsCards from 'src/components/content/stats/Stats.Cards';
import * as Stats from 'src/components/content/stats/Stats';
import * as useSearchField from 'src/components/content/search/useSearchField';
import * as useEvent from 'src/components/content/search/useEvent';
import * as GlobalSearch from 'src/components/content/search/GlobalSearch';
import * as Signup from 'src/components/content/newsletter/Signup';
import * as ReadMore from 'src/components/content/media/ReadMore';
import * as _hotspotMarker from 'src/components/content/media/images/_hotspotMarker';
import * as ImageList from 'src/components/content/media/images/ImageList';
import * as ImageHotspot from 'src/components/content/media/images/ImageHotspot';
import * as HighlightTeaser from 'src/components/content/highlight/teaser/HighlightTeaser';
import * as _HeroBannerIconed from 'src/components/content/hero/client/_HeroBanner.Iconed';
import * as BrandsSlider from 'src/components/content/brands/Brands.Slider';
import * as Brands from 'src/components/content/brands/Brands';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['Header', { ...Header }],
  ['Footer', { ...Footer }],
  ['Testimonials', { ...TestimonialsSlider }],
  ['Stats', { ...StatsTiles, ...StatsCards, ...Stats }],
  ['useSearchField', { ...useSearchField }],
  ['useEvent', { ...useEvent }],
  ['GlobalSearch', { ...GlobalSearch }],
  ['Signup', { ...Signup }],
  ['ReadMore', { ...ReadMore }],
  ['_hotspotMarker', { ..._hotspotMarker }],
  ['ImageList', { ...ImageList }],
  ['ImageHotspot', { ...ImageHotspot }],
  ['HighlightTeaser', { ...HighlightTeaser }],
  ['_HeroBanner', { ..._HeroBannerIconed }],
  ['Brands', { ...BrandsSlider, ...Brands }],
]);

export default componentMap;
