import { TextProps } from "./Text.Props";
import { RichText as SdkText } from "@sitecore-content-sdk/nextjs";

export async function Default({ fields }: TextProps) {
  const { Text } = fields;
  if (!Text) {
    return <div>No Text Field to render</div>;
  }
  return (
    <div className="mx-auto my-8 md:my-10 max-w-3xl text-center">
      <div className="text-lg">
        <SdkText field={Text} />
      </div>
    </div>
  );
}
