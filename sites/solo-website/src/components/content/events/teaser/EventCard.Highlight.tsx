import Link from "next/link";
import Image from "next/image";
import { Button } from "components/ui/button";
import { Card, CardContent } from "components/ui/card";
import { Badge } from "components/ui/badge";
import { Calendar, MapPin, ArrowRight, ExternalLink } from "lucide-react";
import { formatDateRange } from "lib/data";
import { getNextUpcomingEvent } from "lib/data";

export function Highlight() {
  const event = getNextUpcomingEvent();
  if (!event) {
    return (
      <section className="py-12 md:py-16">
        <div className="px-4 md:px-8 lg:px-12">
          <div className="mb-6 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">
              Next Upcoming Event
            </h2>
          </div>

          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-4 text-lg text-muted-foreground">
                No upcoming events scheduled
              </p>
              <Button asChild variant="outline">
                <Link href="/events">View All Events</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="mb-6 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">
            Next Upcoming Event
          </h2>
        </div>

        <Card className="overflow-hidden border-2">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative aspect-[16/9] overflow-hidden md:aspect-auto">
              <Image
                src={event.heroImage || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover"
              />
              <Badge className="absolute left-4 top-4 bg-primary">
                <Calendar className="mr-1 h-3 w-3" />
                Upcoming
              </Badge>
            </div>

            <CardContent className="flex flex-col justify-center p-6 md:p-8">
              <h3 className="mb-4 text-balance text-2xl font-bold tracking-tight md:text-3xl">
                {event.title}
              </h3>

              <p className="mb-6 text-muted-foreground">{event.description}</p>

              <div className="mb-6 space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">
                      {formatDateRange(event.startDateTime, event.endDateTime)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">{event.location.name}</p>
                    <p className="text-muted-foreground">
                      {event.location.city}, {event.location.country}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild className="flex-1">
                  <Link href={`/events/${event.id}`}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                {event.registrationUrl && (
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Register
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}
