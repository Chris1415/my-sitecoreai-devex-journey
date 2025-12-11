"use client";

import { useState, useEffect } from "react";
import { Card } from "../../../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "../../../../components/ui/button";

const testimonials = [
  {
    quote:
      "Christian is such a joy to work with! He combines his Sitecore expertise with strong communication skills, passion, and a pragmatic approach. Dedicated to building great software, Christian always puts the developer experience first and shows great empathy for all stakeholders.",
    author: "Akos Csernak",
    role: "Senior Programmer Writer",
    company: "Sitecore",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    quote:
      "I had the privilege of working with Christian at Sitecore for over three years. As a Solutions Architect, Christian consistently demonstrated exceptional technical expertise, strategic thinking and client-facing skills. His ability to build high-quality integrations and re-usable assets made him an invaluable asset to our team.",
    author: "Cormac Hampson Ph.D.",
    role: "Head of Solution Consulting, EMEA",
    company: "Sitecore",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    quote:
      "I am delighted to recommend Christian, who is an exceptional source of knowledge and consistently professional. His dedication to being helpful is remarkable; even when he encounters a topic he's unfamiliar with, he offers valuable tips and, impressively, often follows up with additional insights after taking the time to learn more about it.",
    author: "Jonathan Rauner",
    role: "Senior Sales Engineer",
    company: "Sitecore",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    quote:
      "I've been working with Christian now for a year at Sitecore and it's an absolute pleasure. Christian supports me on Discovery Calls and Demos as Solution Engineer and brings in his expertise as long-standing Sitecore MVP. I am always amazed how he uses his skills when making presentations to clients and prospects.",
    author: "Marie-Christin Grigoleit",
    role: "Developer Relations",
    company: "Sitecore",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    quote:
      "Super developer who can also do consulting in system architecture or solution design. Acts proactively and is very good at getting to know the customer's needs. Highly recommended.",
    author: "Thomas Kühner",
    role: "Product Owner",
    company: "Alnatura",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    quote:
      "Excellent skills in .NET, Consultation, and Requirements Engineering. He understood all our needs and more as our Sitecore Consultant on several projects. Difficult tasks that were hard to pin down were easily taken up by Christian and delivered always in-time and with outstanding high-quality.",
    author: "Markus Heckler",
    role: "Senior Software Engineer",
    company: "Migros",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    quote:
      "I had the pleasure of working together with Christian. He is a reliable and open minded team player, an intelligent, focused developer and a solution-oriented, encouraged consultant. During our time he build up his commerce knowledge in self studies and then took over a leading position in our commerce projects.",
    author: "Christian Handel",
    role: "Director Digital Platforms",
    company: "ecx.io",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    quote:
      "I highly enjoyed working together with Christian. He is a reliable and open minded team player, an intelligent, focused developer and a solution-oriented, encouraged consultant. I am happy to see he became one of the leading experts in Sitecore Commerce in the DACH region.",
    author: "Daniela Militaru",
    role: "Senior Solution Engineer",
    company: "Sitecore",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    quote: `I’m grateful for the opportunity to work with Christian.
He consistently demonstrates exceptional vision and a strong technical understanding of complex platform-level products such as the Sitecore Content SDK and JSS.
Christian combines product ownership with deep technical awareness, which allows him to make well-grounded decisions and anticipate challenges early.
  [...]
I highly recommend Christian as a Technical Product Manager. His leadership, technical insight, and reliability make him a valuable partner for any engineering team.`,
    author: "Illia Kovalenko",
    role: "Lead Developer| JJSS - Content SDK",
    company: "Sitecore",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
];

export function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    if (!isAutoplayActive) return;

    const timer = setInterval(() => {
      setDirection("right");
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoplayActive]);

  const goToNext = () => {
    setIsAutoplayActive(false);
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setIsAutoplayActive(false);
    setDirection("left");
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index: number) => {
    setIsAutoplayActive(false);
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 py-10 md:py-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            What People Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Trusted by industry professionals and leaders worldwide
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl">
            <Card
              key={currentIndex}
              className="relative border-2 bg-card/50 p-8 shadow-2xl backdrop-blur-sm transition-all duration-700 md:p-12 lg:p-16"
              style={{
                animation: `slideIn${
                  direction === "right" ? "Right" : "Left"
                } 0.7s ease-out`,
              }}
            >
              <div className="mb-8 flex items-center justify-center gap-2">
                {Array.from({ length: currentTestimonial.rating }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="h-6 w-6 fill-primary text-primary"
                    />
                  )
                )}
              </div>

              <blockquote className="mb-12 text-center text-xl leading-relaxed md:text-2xl lg:text-3xl">
                <span className="text-4xl text-primary/30">&quot;</span>
                {currentTestimonial.quote}
                <span className="text-4xl text-primary/30">&quot;</span>
              </blockquote>

              <div className="flex flex-col items-center justify-center gap-6 border-t border-border pt-8">
                <Avatar className="h-20 w-20 border-4 border-primary/20 shadow-lg">
                  <AvatarImage
                    src={currentTestimonial.avatar || "/placeholder.svg"}
                    alt={currentTestimonial.author}
                  />
                  <AvatarFallback className="text-2xl">
                    {currentTestimonial.author[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <div className="text-xl font-bold">
                    {currentTestimonial.author}
                  </div>
                  <div className="text-base text-muted-foreground">
                    {currentTestimonial.role} at {currentTestimonial.company}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-xl transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground md:-translate-x-20"
            onClick={goToPrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-background shadow-xl transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground md:translate-x-20"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="mt-12 flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`group relative h-3 transition-all duration-300 ${
                index === currentIndex ? "w-12" : "w-3 hover:w-6"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary"
                    : "bg-primary/20 group-hover:bg-primary/40"
                }`}
              >
                {index === currentIndex && (
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      animation: isAutoplayActive
                        ? "progressBar 6s linear"
                        : "none",
                    }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          {currentIndex + 1} / {testimonials.length}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes progressBar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
