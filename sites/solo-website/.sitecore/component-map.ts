// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as Container from 'src/components/structual/container/Container';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as Header from 'src/components/global/header/Header';
import * as Footer from 'src/components/global/footer/Footer';
import * as TestimonialsSlider from 'src/components/content/testimonials/list/Testimonials.Slider';
import * as Testimonials from 'src/components/content/testimonials/list/Testimonials';
import * as StatsTiles from 'src/components/content/stats/Stats.Tiles';
import * as Stats from 'src/components/content/stats/Stats';
import * as ProductCard from 'src/components/content/products/teaser/ProductCard';
import * as Products from 'src/components/content/products/list/Products';
import * as ProductTiles from 'src/components/content/products/list/Product.Tiles';
import * as Signup from 'src/components/content/newsletter/Signup';
import * as NewsCardProps from 'src/components/content/news/Teaser/NewsCardProps';
import * as NewsCardTop from 'src/components/content/news/Teaser/NewsCard.Top';
import * as NewsCard from 'src/components/content/news/Teaser/NewsCard';
import * as NewsGrid from 'src/components/content/news/List/News.Grid';
import * as News from 'src/components/content/news/List/News';
import * as NewsDetails from 'src/components/content/news/Details/NewsDetails';
import * as HighlightsTiles from 'src/components/content/highlight/Highlights.Tiles';
import * as Highlights from 'src/components/content/highlight/Highlights';
import * as HeroBannerBranded from 'src/components/content/hero/HeroBanner.Branded';
import * as HeroBanner from 'src/components/content/hero/HeroBanner';
import * as EventCardHighlight from 'src/components/content/events/teaser/EventCard.Highlight';
import * as EventCard from 'src/components/content/events/teaser/EventCard';
import * as BrandsSlider from 'src/components/content/brands/Brands.Slider';
import * as Brands from 'src/components/content/brands/Brands';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', Form],
  ['Container', { ...Container }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['Header', { ...Header, componentType: 'client' }],
  ['Footer', { ...Footer, componentType: 'client' }],
  ['Testimonials', { ...TestimonialsSlider, ...Testimonials }],
  ['Stats', { ...StatsTiles, ...Stats, componentType: 'client' }],
  ['ProductCard', { ...ProductCard }],
  ['Products', { ...Products }],
  ['Product', { ...ProductTiles }],
  ['Signup', { ...Signup, componentType: 'client' }],
  ['NewsCardProps', { ...NewsCardProps }],
  ['NewsCard', { ...NewsCardTop, ...NewsCard }],
  ['News', { ...NewsGrid, ...News }],
  ['NewsDetails', { ...NewsDetails }],
  ['Highlights', { ...HighlightsTiles, ...Highlights }],
  ['HeroBanner', { ...HeroBannerBranded, ...HeroBanner }],
  ['EventCard', { ...EventCardHighlight, ...EventCard }],
  ['Brands', { ...BrandsSlider, ...Brands }],
]);

export default componentMap;
