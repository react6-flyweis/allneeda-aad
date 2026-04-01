import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { events, categories, type Event } from "@/data/events";
import EventDetailModal from "@/components/EventDetailModal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function EventCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter events based on search and category
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || event.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Group events by category
  const eventsByCategory = useMemo(() => {
    return filteredEvents.reduce(
      (acc, event) => {
        if (!acc[event.category]) {
          acc[event.category] = [];
        }
        acc[event.category].push(event);
        return acc;
      },
      {} as Record<string, Event[]>,
    );
  }, [filteredEvents]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  return (
    <div className="">
      {/* Header */}
      <div className="">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Event Catalog</h1>
            <p className="text-gray-500 mt-1">
              Browse all available events that can trigger workflows
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Event
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 items-center bg-white p-4 rounded-lg">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search workflows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Events Content */}
      <div className="mt-8">
        {Object.keys(eventsByCategory).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No events found matching your search.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((category) => {
              const categoryEvents = eventsByCategory[category];
              if (!categoryEvents) return null;

              return (
                <Card key={category}>
                  <CardHeader className="">
                    <h2 className="text-xl font-bold text-gray-900 ">
                      {category}
                    </h2>
                    <p className="text-gray-500">
                      Lorem ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </CardHeader>

                  <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryEvents.map((event) => (
                      <button
                        key={event.id}
                        onClick={() => handleEventClick(event)}
                        className="text-left bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
                      >
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {event.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {event.fields.map((field) => (
                            <Badge
                              key={field.name}
                              variant="secondary"
                              className="text-xs"
                            >
                              {field.name}
                            </Badge>
                          ))}
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}

export default EventCatalog;
