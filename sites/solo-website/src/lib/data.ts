import articlesData from "../data/articles.json";
import eventsData from "../data/events.json";
import statsData from "../data/stats.json";
import productsData from "../data/products.json";
import authorsData from "../data/authors.json";
import faqsData from "../data/faqs.json";

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  bodyHtml: string;
  author: string;
  date: string;
  tags: string[];
  heroImage: string;
  isTop: boolean;
  originalUrl: string;
}

export interface Speaker {
  name: string;
  role: string;
  avatar: string;
}

export interface AgendaItem {
  timeStart: string;
  timeEnd: string;
  title: string;
  description: string;
  speakers: Speaker[];
}

export interface EventLocation {
  name: string;
  street?: string;
  city: string;
  country: string;
  mapUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location: EventLocation;
  agenda: AgendaItem[];
  heroImage: string;
  registrationUrl?: string;
}

export interface Stats {
  yearsExperience: number;
  mvpTitles: number;
  mainTechnology: string;
  blogPostsWritten: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  image: string;
  featured: boolean;
  inStock: boolean;
  stock: number;
  colors: string[];
  sizes: string[];
  material: string;
  details: string[];
}

// Author interface
export interface Author {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  avatar: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  expertise: string[];
  articlesCount: number;
  joined: string;
}

export interface FAQ {
  id: string;
  slug: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  order: number;
}

// Article utilities
export function getAllArticles(): Article[] {
  return articlesData as Article[];
}

export function getArticles(): Article[] {
  return getAllArticles();
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articlesData.find((article) => article.slug === slug) as
    | Article
    | undefined;
}

export function getLatestArticles(limit = 3): Article[] {
  const articles = [...articlesData] as Article[];
  return articles
    .filter((article) => !article.isTop)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getTopArticle(): Article | undefined {
  return articlesData.find((article) => article.isTop) as Article | undefined;
}

export function getRelatedArticles(
  currentSlug: string,
  tags: string[],
  limit = 3
): Article[] {
  return articlesData
    .filter((article) => article.slug !== currentSlug)
    .filter((article) => article.tags.some((tag) => tags.includes(tag)))
    .slice(0, limit) as Article[];
}

export function getArticlesByTag(tag: string): Article[] {
  return articlesData.filter((article) =>
    article.tags.includes(tag)
  ) as Article[];
}

// Event utilities
export function getAllEvents(): Event[] {
  return eventsData as Event[];
}

export function getEventById(id: string): Event | undefined {
  return eventsData.find((event) => event.id === id) as Event | undefined;
}

export function getUpcomingEvents(): Event[] {
  const now = new Date();
  return eventsData
    .filter((event) => new Date(event.startDateTime) > now)
    .sort(
      (a, b) =>
        new Date(a.startDateTime).getTime() -
        new Date(b.startDateTime).getTime()
    ) as Event[];
}

export function getPastEvents(): Event[] {
  const now = new Date();
  return eventsData
    .filter((event) => new Date(event.startDateTime) <= now)
    .sort(
      (a, b) =>
        new Date(b.startDateTime).getTime() -
        new Date(a.startDateTime).getTime()
    ) as Event[];
}

export function getNextUpcomingEvent(): Event | undefined {
  const upcoming = getUpcomingEvents();
  return upcoming.length > 0 ? upcoming[0] : undefined;
}

// Stats utilities
export function getStats(): Stats {
  return statsData as Stats;
}

// Date formatting utilities
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const dateFormat = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(start);

  const timeFormat = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${dateFormat}, ${timeFormat.format(start)} - ${timeFormat.format(
    end
  )}`;
}

// Product utilities
export function getAllProducts(): Product[] {
  return productsData as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return productsData.find((product) => product.slug === slug) as
    | Product
    | undefined;
}

export function getFeaturedProducts(limit = 3): Product[] {
  return productsData
    .filter((product) => product.featured)
    .slice(0, limit) as Product[];
}

export function getProductsByCategory(category: string): Product[] {
  return productsData.filter(
    (product) => product.category === category
  ) as Product[];
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return productsData.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
  ) as Product[];
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

// Author utilities
export function getAllAuthors(): Author[] {
  return authorsData as Author[];
}

export function getAuthors(): Author[] {
  return authorsData as Author[];
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return authorsData.find((author) => author.slug === slug) as
    | Author
    | undefined;
}

export function getArticlesByAuthor(authorName: string): Article[] {
  return articlesData.filter(
    (article) => article.author === authorName
  ) as Article[];
}

export function getAllFAQs(): FAQ[] {
  return faqsData as FAQ[];
}

export function getFAQBySlug(slug: string): FAQ | undefined {
  return faqsData.find((faq) => faq.slug === slug) as FAQ | undefined;
}

export function getFAQsByCategory(category: string): FAQ[] {
  return faqsData
    .filter((faq) => faq.category === category)
    .sort((a, b) => a.order - b.order) as FAQ[];
}

export function getFAQCategories(): string[] {
  const categories = new Set(faqsData.map((faq) => faq.category));
  return Array.from(categories).sort();
}

export function searchFAQs(query: string): FAQ[] {
  const lowerQuery = query.toLowerCase();
  return faqsData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(lowerQuery) ||
      faq.answer.toLowerCase().includes(lowerQuery) ||
      faq.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  ) as FAQ[];
}
