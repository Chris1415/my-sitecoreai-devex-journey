import {
  ImageField,
  RichTextField,
  TextField,
  Text,
  RichText,
} from "@sitecore-content-sdk/nextjs";
import { NewsData } from "components/content/news/Details/NewsDetails";
import { Button } from "components/ui/button";
import { Separator } from "components/ui/separator";
import { ComponentProps } from "lib/component-props";
import { isDesignView } from "lib/utils";
import Link from "next/link";

interface AuthorProps extends ComponentProps {
  fields: Author;
}

export interface Author {
  FirstName: TextField;
  LastName: TextField;
  Image: ImageField;
  AboutMe: RichTextField;
}

/**
 * Static fallback component for design view
 * Displays a preview of the Author Teaser component structure
 */
function DesignViewFallback() {
  return (
    <div className="mt-12 px-4 md:px-8 lg:px-12">
      <Separator className="mb-6" />
      <div className="mb-6">
        <h3 className="mb-2 text-2xl font-bold">About John Doe</h3>
        <div className="leading-relaxed text-muted-foreground">
          <p>
            This is a preview of the author teaser component. In design view, you can see the layout structure and styling that will be applied to actual author content. The author section displays information about the article author including their name, bio, and action buttons.
          </p>
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" disabled>
            View Profile (Coming Soon)
          </Button>
          <Button variant="ghost" size="sm" disabled>
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Default({ fields, page }: AuthorProps) {
  const author =
    (page.layout.sitecore.route?.fields as unknown as NewsData)?.Author
      ?.fields || fields;

  if (isDesignView(page)) {
    return <DesignViewFallback />;
  }

  return (
    <div className="mt-12 px-4 md:px-8 lg:px-12">
      <Separator className="mb-6" />
      <div className="mb-6">
        <h3 className="mb-2 text-2xl font-bold">
          About <Text field={author.FirstName} />{" "}
          <Text field={author.LastName} />
        </h3>
        <div className="leading-relaxed text-muted-foreground">
          <RichText field={author.AboutMe} />
        </div>
        <div className="mt-4 flex gap-2">
          {author && (
            <Button variant="outline" size="sm" asChild>
              <Link href="#">View Profile (Coming Soon)</Link>
            </Button>
          )}
          <Button variant="ghost" size="sm">
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
}
