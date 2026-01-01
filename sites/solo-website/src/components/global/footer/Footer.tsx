"use client";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { getThemeVariant } from "lib/theme-config";

const footerLinks = {
  community: [
    { name: "User Groups", href: "#" },
    { name: "Marketplace", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Slack Community", href: "#" },
  ],
  resources: [
    { name: "Blog", href: "/articles" },
    { name: "Events", href: "/events" },
    { name: "GitHub", href: "#" },
    { name: "Learning Paths", href: "#" },
  ],
  legal: [
    { name: "Impressum", href: "/impressum" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Use", href: "#" },
    { name: "Code of Conduct", href: "#" },
  ],
};

export function Default() {
  const { theme } = useTheme();
  const themeVariant = getThemeVariant();
  const logoPath = `/images/logo/${themeVariant}/hahn-solo-${
    theme === "light" ? "black" : "white"
  }.png`;
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="px-4 py-12 md:px-8 md:py-16 lg:px-12">
        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          {/* Community Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Community
            </h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Christian Hahn. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <Image
                src={logoPath}
                alt="SOLO"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
