export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface FAQGroup {
  id: string;
  name: string;
  items: FAQItem[];
  expanded: boolean;
}

