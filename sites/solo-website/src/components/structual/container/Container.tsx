import React, { JSX } from "react";
import { ComponentProps } from "lib/component-props";
import componentMap from "src/component-map";
import { AppPlaceholder } from "@sitecore-content-sdk/nextjs";

interface ContainerProps extends ComponentProps {
  params: ComponentProps["params"] & {
    BackgroundImage?: string;
    DynamicPlaceholderId: string;
  };
}

const Container = ({
  params,
  rendering,
  page,
}: ContainerProps): JSX.Element => {
  const {
    styles,
    RenderingIdentifier: id,
    BackgroundImage: backgroundImage,
    DynamicPlaceholderId,
  } = params;
  const phKey = `container-${DynamicPlaceholderId}`;

  // Extract the mediaurl from rendering parameters
  const mediaUrlPattern = new RegExp(/mediaurl=\"([^"]*)\"/, "i");

  let backgroundStyle: { [key: string]: string } = {};

  if (backgroundImage && backgroundImage.match(mediaUrlPattern)) {
    const mediaUrl = backgroundImage.match(mediaUrlPattern)?.[1] || "";

    backgroundStyle = {
      backgroundImage: `url('${mediaUrl}')`,
    };
  }

  return (
    <div className={`component container-default ${styles}`} id={id}>
      <div className="component-content" style={backgroundStyle}>
        <div className="flex flex-wrap items-stretch">
          <AppPlaceholder
            name={phKey}
            rendering={rendering}
            page={page}
            componentMap={componentMap}
          />
        </div>
      </div>
    </div>
  );
};

export const Default = ({
  params,
  rendering,
  page,
}: ContainerProps): JSX.Element => {
  const styles = params?.styles?.split(" ");

  return styles?.includes("container") ? (
    <div className="mx-auto max-w-7xl px-2 md:px-4 lg:px-6">
      <Container params={params} rendering={rendering} page={page} />
    </div>
  ) : (
    <Container params={params} rendering={rendering} page={page} />
  );
};
