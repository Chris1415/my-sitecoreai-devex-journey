import { TextProps } from "./Text.Props";
import { RichText as SdkText } from "@sitecore-content-sdk/nextjs";

export async function Intro({ fields, params }: TextProps) {
  const { Text } = fields;
  if (!Text) {
    return <div>No Text Field to render</div>;
  }
  return (
    <div className={`prose prose-lg my-8 md:my-10 max-w-none ${params.styles}`}>
      <div className="text-lg leading-relaxed text-muted-foreground">
        <SdkText field={Text} />
      </div>
    </div>
  );
}
