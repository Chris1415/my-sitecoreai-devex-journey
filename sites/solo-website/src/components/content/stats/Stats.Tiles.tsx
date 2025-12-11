"use client";

import { useEffect, useRef, useState } from "react";
import { Award, Code2, Calendar, FileText } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { getStats } from "../../../lib/data";

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    const steps = 60;
    const increment = end / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [end, duration, isVisible]);

  return { count, ref };
}

export function Tiles() {
  const stats = getStats();
  const years = useCountUp(stats.yearsExperience);
  const mvps = useCountUp(stats.mvpTitles);
  const posts = useCountUp(stats.blogPostsWritten);

  return (
    <section className="py-6 md:py-8">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
            Experience & Impact
          </h2>
          <p className="text-muted-foreground">
            A decade of Sitecore expertise and community contributions
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="group cursor-default transition-all hover:shadow-lg">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Calendar className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <div
                ref={years.ref}
                className="mb-2 text-4xl font-bold tabular-nums"
              >
                {years.count}+
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Years Experience
              </p>
            </CardContent>
          </Card>

          <Card className="group cursor-default transition-all hover:shadow-lg">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Award className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <div
                ref={mvps.ref}
                className="mb-2 text-4xl font-bold tabular-nums"
              >
                {mvps.count}
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                MVP Titles
              </p>
            </CardContent>
          </Card>

          <Card className="group cursor-default transition-all hover:shadow-lg">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Code2 className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <div className="mb-2 text-4xl font-bold">
                {stats.mainTechnology}
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Major Technology
              </p>
            </CardContent>
          </Card>

          <Card className="group cursor-default transition-all hover:shadow-lg">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <FileText className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <div
                ref={posts.ref}
                className="mb-2 text-4xl font-bold tabular-nums"
              >
                {posts.count}+
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Blog Posts Written
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
