"use client";

import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Field, Text } from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";
import { getLucideIcon } from "lib/iconUtils";
import { LucideIcon } from "lucide-react";

interface SignupProps extends ComponentProps {
  fields: {
    Icon: Field<string>;
    Title: Field<string>;
    Description: Field<string>;
    EmailPlaceholder: Field<string>;
    ButtonText: Field<string>;
    SuccessMessage: Field<string>;
  };
}

export function Default({ fields }: SignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [Icon, setIcon] = useState<LucideIcon | null>(null);

  // Initialize icon on client-side to avoid hydration mismatch
  useEffect(() => {
    setIcon(getLucideIcon(fields.Icon.value));
  }, [fields.Icon.value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo functionality
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div className="border-y border-border bg-muted/30 py-12 z-50">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            {Icon && <Icon className="h-6 w-6 text-primary" />}
          </div>
          <h2 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
            <Text field={fields.Title} />
          </h2>
          <p className="mb-6 text-muted-foreground">
            <Text field={fields.Description} />
          </p>

          {status === "success" ? (
            <p className="text-sm font-medium text-primary">
              <Text field={fields.SuccessMessage} />
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 sm:flex-row"
            >
              <Input
                type="email"
                placeholder={fields.EmailPlaceholder.value}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
                aria-label="Email address"
              />

              <Button type="submit" className="whitespace-nowrap">
                <Text field={fields.ButtonText} />
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
