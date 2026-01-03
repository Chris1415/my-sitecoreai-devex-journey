import { SitecoreClient } from "@sitecore-content-sdk/nextjs/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion";
import { Card } from "components/ui/card";
import { ComponentProps } from "lib/component-props";
import { getAllFAQs, getFAQCategories } from "lib/data";
import sitecoreClient from "lib/sitecore-client";

interface FaqsProps extends ComponentProps {
  fields: {
    Groups: {
      fields: {
        id: string;
      };
    }[];
  };
}

interface FaqGroupResult {
  item: {
    name: string;
    children: {
      results: {
        name: string;
        id: string;
        question: {
          jsonValue: string;
        };
        answer: {
          jsonValue: string;
        };
      }[];
    };
  };
}

const faqGroupQuery = `
  query GetFaqs($datasource: String!, $language: String!) {
  item(path: $datasource, language: $language) {
  name
    children {
      results {
        name
        id
        question: field(name: "Question") {
          jsonValue
        }
        answer: field(name: "Answer") {
          jsonValue
        }
      }
    }
  }
}
`;

export async function Default({ fields }: FaqsProps) {
  const { Groups } = fields;
  const groupIds = Groups.map((group) => group.fields.id);
  const cmsFaqs: FaqGroupResult[] = [];
  groupIds.forEach(async (groupId) => {
    const faqs = await sitecoreClient.getData<FaqGroupResult>(faqGroupQuery, {
      datasource: groupId,
      language: "en",
    });
    cmsFaqs.push(faqs);
  });

  const faqs = getAllFAQs();
  const categories = getFAQCategories();
  return (
    <>
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl space-y-12">
            {categories.map((category) => {
              const categoryFaqs = faqs.filter(
                (faq) => faq.category === category
              );
              return (
                <div key={category}>
                  <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
                    {category}
                  </h2>
                  <Card className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {categoryFaqs.map((faq, index) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="text-left">
                            <span className="font-semibold">
                              {faq.question}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                            {faq.tags.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                {faq.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
