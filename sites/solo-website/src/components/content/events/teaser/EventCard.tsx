import Link from "next/link";
import Image from "next/image";
import { Badge } from "components/ui/badge";
import { Card, CardContent } from "components/ui/card";
import { formatDate, getNextUpcomingEvent } from "lib/data";
import { Calendar, MapPin } from "lucide-react";

export function Default() {
  const event = getNextUpcomingEvent();

  if (!event) {
    return <></>;
  }

  const isPast = new Date(event.startDateTime) < new Date();
  return (
    <Link href={`/events/${event.id}`} className="group block">
      <Card
        className={`h-full overflow-hidden transition-all hover:shadow-lg ${
          isPast ? "opacity-75" : ""
        }`}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={event.heroImage || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge
            className={`absolute left-4 top-4 ${
              isPast ? "bg-muted text-muted-foreground" : "bg-primary"
            }`}
          >
            {isPast ? "Past" : "Upcoming"}
          </Badge>
        </div>

        <CardContent className="p-6">
          <h3 className="mb-3 text-balance text-xl font-bold tracking-tight group-hover:text-primary">
            {event.title}
          </h3>

          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {event.description}
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 flex-shrink-0 text-primary" />
              <span>{formatDate(event.startDateTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
              <span className="truncate">{event.location.name}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
