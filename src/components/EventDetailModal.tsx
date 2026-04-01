import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Event } from "@/data/events";

interface EventDetailModalProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function EventDetailModal({
  event,
  open,
  onOpenChange,
}: EventDetailModalProps) {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{event.name}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-125 w-full pr-4">
          <div className="space-y-6">
            {/* Category */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Category
              </h3>
              <Badge>{event.category}</Badge>
            </div>

            {/* Schema */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Schema</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                {event.fields.map((field) => (
                  <div key={field.name} className="flex items-center">
                    <span className="font-mono text-sm font-semibold text-gray-800">
                      {field.name}
                    </span>
                    <span className="ml-2 text-gray-500 text-sm">:</span>
                    <span className="ml-2 font-mono text-sm text-gray-600">
                      {field.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Example Payload */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Example Payload</h3>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-gray-800">
                  {JSON.stringify(event.examplePayload, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default EventDetailModal;
