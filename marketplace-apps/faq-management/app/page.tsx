import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HelpCircle, FolderOpen, Sparkles, Zap } from "lucide-react";
import { PreviewToggle } from "@/components/preview-toggle";

export default function IntroPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header Section */}
      <div className="container mx-auto px-6 py-20 max-w-6xl">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-linear-to-br from-violet-500 to-purple-600 mb-8 shadow-xl shadow-violet-500/20">
            <HelpCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight">
            FAQ Manager
          </h1>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            The ultimate FAQ management solution for XM Cloud. Create, organize,
            and maintain your knowledge base without ever leaving your
            environment. No Content Editor needed—just intuitive, streamlined
            FAQ management that&apos;s ready to use across your entire instance.
          </p>
        </div>

        {/* Overview Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-10 mb-20 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            App Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-lg font-medium text-foreground">Title</div>
              <div className="text-xl text-muted-foreground">FAQ Manager</div>
            </div>
            <div className="space-y-2">
              <div className="text-lg font-medium text-foreground">Author</div>
              <div className="text-xl text-muted-foreground">Christian Hahn</div>
            </div>
            <div className="space-y-2">
              <div className="text-lg font-medium text-foreground">Version</div>
              <div className="text-xl text-muted-foreground">1.0</div>
            </div>
            <div className="space-y-2">
              <div className="text-lg font-medium text-foreground">Released</div>
              <div className="text-xl text-muted-foreground">January 2026</div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <div className="text-lg font-medium text-foreground">Extension Points</div>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-base font-medium bg-violet-500 text-white">
                  Full Page
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Purple Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 text-center shadow-sm hover:shadow-md transition-shadow hover:border-violet-200 dark:hover:border-violet-800">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-violet-100 dark:bg-violet-950/30 mb-6">
              <FolderOpen className="w-8 h-8 text-violet-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Organized Groups</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Structure your FAQs into logical groups for easy navigation and
              management
            </p>
          </div>
          {/* Teal Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 text-center shadow-sm hover:shadow-md transition-shadow hover:border-teal-200 dark:hover:border-teal-800">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-teal-100 dark:bg-teal-950/30 mb-6">
              <Sparkles className="w-8 h-8 text-teal-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Intuitive Interface</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Clean, modern UI designed for efficiency with expand/collapse,
              inline editing, and more
            </p>
          </div>
          {/* Amber Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 text-center shadow-sm hover:shadow-md transition-shadow hover:border-amber-200 dark:hover:border-amber-800">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-amber-100 dark:bg-amber-950/30 mb-6">
              <Zap className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Import & Export</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Seamlessly import existing FAQs or export your content for backup
              and migration
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="max-w-3xl mx-auto">
          <Card className="group hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
            <CardHeader className="pb-6 pt-8 px-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-violet-500 text-white">
                  Full Page
                </span>
              </div>
              <CardTitle className="text-3xl font-bold mt-4">
                FAQ Management Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 px-8 pb-8">
              <PreviewToggle />
              <CardDescription className="text-xl leading-relaxed">
                Your centralized hub for all FAQ content. Create and manage FAQ
                groups, add questions and answers with a beautiful editing
                experience, and keep your knowledge base organized. Features
                include collapsible groups, quick search, bulk operations,
                import/export capabilities, and seamless integration with your
                XM Cloud instance.
              </CardDescription>
              <Link href="/full-screen" className="block">
                <Button className="w-full h-14 text-lg font-semibold bg-linear-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300">
                  Launch FAQ Manager
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Logo */}
      <div className="fixed bottom-4 right-4 z-50">
        <Image
          src="https://hachweb.wordpress.com/wp-content/uploads/2025/08/2022-05-03-09_10_13-receipt-stickerapp-removebg-preview.png"
          alt="Logo Christian Hahn"
          width={40}
          height={20}
        />
      </div>
    </div>
  );
}
