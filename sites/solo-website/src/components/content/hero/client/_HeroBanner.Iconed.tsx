"use client";
import { HelpCircle, LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getLucideIcon } from "lib/iconUtils";
import { TextField, useSitecore, Text } from "@sitecore-content-sdk/nextjs";

export function HeroBannerIcon({ icon }: { icon: TextField }) {
  const [IconComponent, setIconComponent] = useState<LucideIcon | null>(null);
  const FallbackIcon = HelpCircle;
  const UsedIcon = IconComponent || FallbackIcon;
  const iconValue = String(icon?.value || "");
  const sitecoreContext = useSitecore();
  const isEditing = sitecoreContext?.page?.mode?.isEditing;

  useEffect(() => {
    const newIcon = getLucideIcon(iconValue);
    setIconComponent(() => newIcon);
  }, [iconValue]);

  return (
    <>
      <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
        <UsedIcon className="h-8 w-8 text-primary" />
        {isEditing && <Text className="pl-2 inline-block" field={icon} />}
      </div>
    </>
  );
}
