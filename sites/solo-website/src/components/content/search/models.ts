import { SearchDocument } from '@sitecore-content-sdk/search';

/**
 * Article from the search index (matches what the CMS delivers).
 */
export interface SearchArticle extends SearchDocument {
  Content: string;
  Excerpt: string;
  ExternalUrl: string;
  Id: string;
  KeyTakeaway1: string;
  KeyTakeaway2: string;
  KeyTakeaway3: string;
  KeyTakeaway4: string;
  KeyTakeaway5: string;
  NavigationTitle: string;
  PublishDate: string;
  Quote: string;
  ReadTime: number;
  Subtitle: string;
  Title: string;
  sc_item_id: string;
}

/**
 * FAQ item from the search index (matches what the CMS delivers).
 */
export interface SearchFaq extends SearchDocument {
  Question: string;
  Answer: string;
  sc_item_id: string;
}

/**
 * Person from the search index (matches what the CMS delivers).
 */
export interface SearchPerson extends SearchDocument {
  FirstName: string;
  LastName: string;
  AboutMe: string;
  sc_item_id: string;
}

export interface SearchField {
  searchIndex: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldsMapping: any;
}
