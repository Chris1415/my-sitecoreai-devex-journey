import { Field } from "@sitecore-content-sdk/nextjs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion";
import { Card } from "components/ui/card";
import { ComponentProps } from "lib/component-props";
import sitecoreClient from "lib/sitecore-client";

interface FaqsProps extends ComponentProps {
  fields: {
    Groups: {
      id: string;
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
          jsonValue: Field<string>;
        };
        answer: {
          jsonValue: Field<string>;
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
  const groupIds = Groups.map((group) => group.id);
  const cmsFaqs: FaqGroupResult[] = [];
  await Promise.all(
    groupIds.map(async (groupId) => {
      const faqs = await sitecoreClient.getData<FaqGroupResult>(faqGroupQuery, {
        datasource: groupId,
        language: "en",
      });
      cmsFaqs.push(faqs);
    })
  );

  return (
    <>
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl space-y-12">
            {cmsFaqs.map((category) => {
              if (!category?.item?.children?.results?.length) {
                return null;
              }
              return (
                <div key={category.item.name}>
                  <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
                    {category.item.name}
                  </h2>
                  <Card className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {category?.item?.children?.results?.map((faq) => {
                        return (
                          <AccordionItem key={faq.id} value={faq.id}>
                            <AccordionTrigger className="text-left">
                              <span className="font-semibold px-2 mx-1">
                                {faq?.question?.jsonValue?.value}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-muted-foreground leading-relaxed mt-2">
                                {faq?.answer?.jsonValue?.value}
                              </p>
                              {/* {faq.tags.length > 0 && (
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
                            )} */}
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
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
