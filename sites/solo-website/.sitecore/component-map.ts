// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as Container from 'src/components/structual/container/Container';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as Header from 'src/components/global/header/Header';
import * as Footer from 'src/components/global/footer/Footer';
import * as TextProps from 'src/components/content/text/Text.Props';
import * as TextIntro from 'src/components/content/text/Text.Intro';
import * as TextDivider from 'src/components/content/text/Text.Divider';
import * as Text from 'src/components/content/text/Text';
import * as TestimonialsSlider from 'src/components/content/testimonials/list/Testimonials.Slider';
import * as Testimonials from 'src/components/content/testimonials/list/Testimonials';
import * as Tagcloud from 'src/components/content/tagcloud/Tagcloud';
import * as StatsTiles from 'src/components/content/stats/Stats.Tiles';
import * as StatsCards from 'src/components/content/stats/Stats.Cards';
import * as Stats from 'src/components/content/stats/Stats';
import * as Quote from 'src/components/content/quote/Quote';
import * as ProductCard from 'src/components/content/products/teaser/ProductCard';
import * as Products from 'src/components/content/products/list/Products';
import * as ProductTiles from 'src/components/content/products/list/Product.Tiles';
import * as Signup from 'src/components/content/newsletter/Signup';
import * as NewsCardProps from 'src/components/content/news/Teaser/NewsCardProps';
import * as NewsCardTop from 'src/components/content/news/Teaser/NewsCard.Top';
import * as NewsCard from 'src/components/content/news/Teaser/NewsCard';
import * as NewsGrid from 'src/components/content/news/List/News.Grid';
import * as News from 'src/components/content/news/List/News';
import * as NewsRelatedNews from 'src/components/content/news/Details/NewsRelatedNews';
import * as NewsKeyTakeaways from 'src/components/content/news/Details/NewsKeyTakeaways';
import * as NewsDetailsContent from 'src/components/content/news/Details/NewsDetailsContent';
import * as NewsDetails from 'src/components/content/news/Details/NewsDetails';
import * as NewsContainer from 'src/components/content/news/Conainer/NewsContainer';
import * as ImageList from 'src/components/content/media/images/ImageList';
import * as HighlightTeaserWrapper from 'src/components/content/highlight/teaser/HighlightTeaserWrapper';
import * as HighlightTeaser from 'src/components/content/highlight/teaser/HighlightTeaser';
import * as HighlightsTiles from 'src/components/content/highlight/list/Highlights.Tiles';
import * as HighlightsList from 'src/components/content/highlight/list/Highlights.List';
import * as Highlights from 'src/components/content/highlight/list/Highlights';
import * as HeroBannerMinimal from 'src/components/content/hero/HeroBanner.Minimal';
import * as HeroBannerBranded from 'src/components/content/hero/HeroBanner.Branded';
import * as HeroBanner from 'src/components/content/hero/HeroBanner';
import * as EventCardHighlight from 'src/components/content/events/teaser/EventCard.Highlight';
import * as EventCard from 'src/components/content/events/teaser/EventCard';
import * as BrandsSlider from 'src/components/content/brands/Brands.Slider';
import * as Brands from 'src/components/content/brands/Brands';
import * as AuthorTeaser from 'src/components/content/author/teaser/AuthorTeaser';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', Form],
  ['Container', { ...Container }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['Header', { ...Header, componentType: 'client' }],
  ['Footer', { ...Footer, componentType: 'client' }],
  ['Text', { ...TextProps, ...TextIntro, ...TextDivider, ...Text }],
  ['Testimonials', { ...TestimonialsSlider, ...Testimonials }],
  ['Tagcloud', { ...Tagcloud }],
  ['Stats', { ...StatsTiles, ...StatsCards, ...Stats, componentType: 'client' }],
  ['Quote', { ...Quote }],
  ['ProductCard', { ...ProductCard }],
  ['Products', { ...Products }],
  ['Product', { ...ProductTiles }],
  ['Signup', { ...Signup, componentType: 'client' }],
  ['NewsCardProps', { ...NewsCardProps }],
  ['NewsCard', { ...NewsCardTop, ...NewsCard }],
  ['News', { ...NewsGrid, ...News }],
  ['NewsRelatedNews', { ...NewsRelatedNews }],
  ['NewsKeyTakeaways', { ...NewsKeyTakeaways }],
  ['NewsDetailsContent', { ...NewsDetailsContent }],
  ['NewsDetails', { ...NewsDetails }],
  ['NewsContainer', { ...NewsContainer }],
  ['ImageList', { ...ImageList, componentType: 'client' }],
  ['HighlightTeaserWrapper', { ...HighlightTeaserWrapper }],
  ['HighlightTeaser', { ...HighlightTeaser, componentType: 'client' }],
  ['Highlights', { ...HighlightsTiles, ...HighlightsList, ...Highlights }],
  ['HeroBanner', { ...HeroBannerMinimal, ...HeroBannerBranded, ...HeroBanner }],
  ['EventCard', { ...EventCardHighlight, ...EventCard }],
  ['Brands', { ...BrandsSlider, ...Brands, componentType: 'client' }],
  ['AuthorTeaser', { ...AuthorTeaser }],
]);

export default componentMap;
