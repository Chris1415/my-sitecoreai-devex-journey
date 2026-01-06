import type { FAQGroup, FAQItem } from "@/types/faq";

/**
 * Service for FAQ data operations
 * This can be extended to integrate with Sitecore GraphQL API via Marketplace SDK
 */

// Mock data for development
const INITIAL_FAQ_DATA: FAQGroup[] = [
  {
    id: "1",
    name: "About",
    items: [
      {
        id: "1-1",
        question: "What is this project about?",
        answer:
          "This is a demonstration project showcasing modern Sitecore XM Cloud development practices, featuring headless architecture, AI integration, and best practices for building performant digital experiences.",
        order: 0,
      },
      {
        id: "1-2",
        question: "Who is Christian Hahn?",
        answer:
          "Christian Hahn is a Sitecore developer and content management specialist who created this demonstration project to showcase advanced Sitecore XM Cloud capabilities and modern development workflows.",
        order: 1,
      },
      {
        id: "1-3",
        question: "Why did Christian create this demonstration project?",
        answer:
          "This project was created to demonstrate real-world implementation patterns for Sitecore XM Cloud, including integration with modern tools like V0, Cursor AI, and advanced Next.js features. It serves as a learning resource for developers looking to build high-performance Sitecore applications.",
        order: 2,
      },
      {
        id: "1-4",
        question: "What can I learn from this project?",
        answer:
          "You can learn about headless CMS architecture, Next.js App Router best practices, Sitecore XM Cloud integration patterns, AI-assisted development workflows, performance optimization techniques, and how to achieve perfect Lighthouse scores in production applications.",
        order: 3,
      },
    ],
    expanded: true,
  },
  {
    id: "2",
    name: "Sitecore AI",
    items: [
      {
        id: "2-1",
        question: "What modern content management tools does Sitecore AI offer?",
        answer:
          "Sitecore AI offers a comprehensive suite of tools including XM Cloud for headless content management, AI-powered content recommendations, intelligent personalization engines, and automated content optimization. These tools help content teams work more efficiently while delivering personalized experiences.",
        order: 0,
      },
      {
        id: "2-2",
        question: "How do Pages and Design Studio improve content workflow?",
        answer:
          "Pages provides a visual page building experience with drag-and-drop components, while Design Studio offers advanced design capabilities for creating and managing component libraries. Together, they enable content authors and designers to create sophisticated pages without developer intervention, significantly speeding up content production.",
        order: 1,
      },
      {
        id: "2-3",
        question: "What is Agent Studio and how does it enhance content creation?",
        answer:
          "Agent Studio is an AI-powered assistant that helps content creators generate, optimize, and refine content directly within Sitecore. It can suggest improvements, generate variations, ensure brand consistency, and automate repetitive tasks, allowing content teams to focus on strategy and creativity.",
        order: 2,
      },
    ],
    expanded: false,
  },
  {
    id: "3",
    name: "Development Workflow",
    items: [
      {
        id: "3-1",
        question: "How does V0 fit into the brand and website creation process?",
        answer:
          "V0 serves as an AI-powered design and development assistant that accelerates the initial creation of UI components and pages. It integrates into the workflow by generating React components based on design requirements, which can then be customized and integrated with Sitecore XM Cloud for content management.",
        order: 0,
      },
      {
        id: "3-2",
        question: "What role does Content SDK play with V0 and Cursor?",
        answer:
          "Content SDK provides a type-safe interface between your Next.js application and Sitecore XM Cloud. When used with V0 and Cursor AI, it enables rapid development with full TypeScript support, GraphQL query generation, and automatic content model synchronization, ensuring your components always match your content structure.",
        order: 1,
      },
    ],
    expanded: false,
  },
  {
    id: "4",
    name: "Performance",
    items: [
      {
        id: "4-1",
        question: "How does the project maintain perfect Lighthouse scores?",
        answer:
          "Perfect Lighthouse scores are achieved through a combination of techniques: Server Components for reduced JavaScript payload, image optimization with Next.js Image component, strategic code splitting, efficient font loading, proper caching headers, minimal layout shift through skeleton screens, and careful third-party script management.",
        order: 0,
      },
    ],
    expanded: false,
  },
];

/**
 * Get initial FAQ data
 */
export function getInitialFAQData(): FAQGroup[] {
  return INITIAL_FAQ_DATA;
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
}

/**
 * Create a new FAQ group
 */
export function createGroup(name: string): FAQGroup {
  return {
    id: generateId(),
    name,
    items: [],
    expanded: true,
  };
}

/**
 * Create a new FAQ item
 */
export function createItem(
  groupId: string,
  question: string,
  answer: string,
  order: number
): FAQItem {
  return {
    id: `${groupId}-${generateId()}`,
    question,
    answer,
    order,
  };
}

/**
 * Export FAQ data to JSON format
 */
export function exportToJSON(groups: FAQGroup[]): string {
  const exportData = groups.map((group) => ({
    name: group.name,
    faqs: group.items.map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
  }));
  return JSON.stringify(exportData, null, 2);
}

/**
 * Download FAQ data as a JSON file
 */
export function downloadAsJSON(groups: FAQGroup[]): void {
  const json = exportToJSON(groups);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `faq-export-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Validate imported JSON data
 */
export function validateImportData(data: unknown): data is { name: string; faqs: { question: string; answer: string }[] }[] {
  if (!Array.isArray(data)) return false;
  
  return data.every(
    (group) =>
      typeof group === "object" &&
      group !== null &&
      typeof group.name === "string" &&
      Array.isArray(group.faqs) &&
      group.faqs.every(
        (faq: unknown) =>
          typeof faq === "object" &&
          faq !== null &&
          typeof (faq as { question?: unknown }).question === "string" &&
          typeof (faq as { answer?: unknown }).answer === "string"
      )
  );
}

/**
 * Parse imported JSON data into FAQGroup[]
 */
export function parseImportData(
  data: { name: string; faqs: { question: string; answer: string }[] }[]
): FAQGroup[] {
  return data.map((group) => ({
    id: generateId(),
    name: group.name,
    items: group.faqs.map((faq, index) => ({
      id: generateId(),
      question: faq.question,
      answer: faq.answer,
      order: index,
    })),
    expanded: false,
  }));
}

