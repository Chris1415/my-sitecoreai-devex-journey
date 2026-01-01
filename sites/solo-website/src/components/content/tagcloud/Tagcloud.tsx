import { Badge } from "components/ui/badge";
import { Text, TextField } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";

export interface TagcloudProps extends ComponentProps {
  fields: {
    data: {
      datasource: {
        Title: {
          jsonValue: TextField;
        };
        children: {
          results: TagElement[];
        };
      };
    };
  };
}

export interface TagElement {
  Name: {
    jsonValue: TextField;
  };
}

export function Default({ fields, page, rendering, params }: TagcloudProps) {
  const { Title } = fields?.data?.datasource;
  const Elements = fields?.data?.datasource?.children?.results;

  return (
    <div className="border-y border-border bg-muted/30 py-8 md:py-12 my-8">
      <div className="mx-auto px-4 md:px-8 lg:px-12">
        <div className="mx-auto">
          <h2 className="mb-8 text-3xl font-bold tracking-tight">
            <Text field={Title.jsonValue} />
          </h2>
          <div className="flex flex-wrap gap-3">
            {Elements.map((element) => (
              <Badge
                key={element.Name.jsonValue.value}
                variant="secondary"
                className="px-4 py-2"
              >
                <Text field={element.Name.jsonValue} />
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
