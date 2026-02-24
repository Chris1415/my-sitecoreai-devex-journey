import type { NextjsContentSdkComponent } from "@sitecore-content-sdk/nextjs";
import baseComponentMap from ".sitecore/component-map";
import * as Image from "src/components/content/media/Image";
import * as MediaText from "src/components/content/media/MediaText";
import * as MediaLeft from "src/components/content/media/MediaText.MediaLeft";
import * as Youtube from "src/components/content/media/Youtube";

const componentMap = new Map<string, NextjsContentSdkComponent>(baseComponentMap);

componentMap.set("Image", { ...Image });
componentMap.set("MediaText", { ...MediaText, ...MediaLeft });
componentMap.set("Media Text", { ...MediaText, ...MediaLeft });
componentMap.set("Youtube", { ...Youtube });
componentMap.set("YouTube", { ...Youtube });

export { componentMap };
export default componentMap;

