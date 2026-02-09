"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Search, Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "components/ui/button";
import { getThemeVariant } from "lib/theme-config";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Articles", href: "/articles" },
  { name: "Events", href: "/events" },
  { name: "Products", href: "/products" },
  { name: "FAQ", href: "/faq" },
  { name: "Me", href: "/Me" },
  { name: "Impressum", href: "/impressum" },
];

export function Default() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const themeVariant = getThemeVariant();
  const logoPath = `/images/logo/${themeVariant}/hahn-solo-${
    theme === "dark" ? "white" : "black"
  }.png`;

  return (
    <>
      <div className="">
        <div className="max-w-[1440px] mx-auto flex h-16 items-center justify-between px-4 md:px-8 lg:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logoPath}
              alt="SOLO"
              width={120}
              height={32}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-foreground/80"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border md:hidden bg-background/95 backdrop-blur">
            <nav className="flex flex-col gap-4 px-4 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors hover:text-primary ${
                    pathname === item.href
                      ? "text-primary"
                      : "text-foreground/80"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                variant="outline"
                className="justify-start bg-transparent"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </nav>
          </div>
        )}
      </div>

      {/* Placeholder for Search Dialog */}
      {/* <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} /> */}
    </>
  );
}
