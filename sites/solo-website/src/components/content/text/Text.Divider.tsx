import { Text as SdkText, RichText } from "@sitecore-content-sdk/nextjs";
import { TextProps } from "./Text.Props";

export async function Divider({ fields }: TextProps) {
  if (!fields) return null;
  const { Title, Text } = fields;
  return (
    <div className="mx-auto my-8 md:my-10 max-w-3xl text-center">
      <h2 className="mb-4 text-xl font-bold tracking-tight md:text-2xl lg:text-3xl">
        <SdkText field={Title} />
      </h2>
      {Text != null && (
        <div className="text-lg text-muted-foreground">
          <RichText field={Text} />
        </div>
      )}
    </div>
  );
}
