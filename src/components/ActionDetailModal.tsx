import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Action } from "@/data/actions";

interface ActionDetailModalProps {
  action: Action | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ActionDetailModal({
  action,
  open,
  onOpenChange,
}: ActionDetailModalProps) {
  if (!action) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {action.name}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[500px] w-full pr-4">
          <div className="space-y-6">
            <p className="text-gray-600">{action.description}</p>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Category
              </h3>
              <Badge>{action.category}</Badge>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Parameters
              </h3>
              <div className="space-y-3">
                {action.fields.map((field) => (
                  <div
                    key={field.name}
                    className="rounded-xl border border-gray-200 p-3 bg-white"
                  >
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="font-medium text-gray-800">
                        {field.name}
                      </span>
                      {field.required !== false ? (
                        <Badge
                          variant="destructive"
                          className="text-xs px-2 py-1"
                        >
                          Required
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="text-xs px-2 py-1"
                        >
                          Optional
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs px-2 py-1">
                        {field.type}
                      </Badge>
                    </div>
                    <div className="mt-1 text-xs text-gray-500 space-y-1">
                      {field.description && <p>{field.description}</p>}
                      {field.defaultValue !== undefined && (
                        <p>Default: {String(field.defaultValue)}</p>
                      )}
                      {field.options?.length ? (
                        <p>Options: {field.options.map((o) => o).join(", ")}</p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Example Payload
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-gray-800">
                  {JSON.stringify(action.examplePayload, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default ActionDetailModal;
