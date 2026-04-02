import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import type { Event } from "@/data/events";

interface AddEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingCategories: string[];
  onAddEvent: (event: Event) => void;
}

interface NewField {
  id: string;
  name: string;
  type: string;
}

const defaultField: NewField = { id: "1", name: "", type: "string" };
const fieldTypes = ["string", "number", "boolean", "object", "array"];

function AddEventModal({
  open,
  onOpenChange,
  existingCategories,
  onAddEvent,
}: AddEventModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<NewField[]>([defaultField]);

  const handleAddField = () => {
    setFields((prev) => [
      ...prev,
      { id: String(prev.length + 1), name: "", type: "string" },
    ]);
  };

  const handleRemoveField = (id: string) => {
    setFields((prev) =>
      prev.length === 1 ? prev : prev.filter((item) => item.id !== id),
    );
  };

  const handleFieldChange = (
    id: string,
    key: keyof Omit<NewField, "id">,
    value: string,
  ) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id !== id ? field : { ...field, [key]: value },
      ),
    );
  };

  const clearForm = () => {
    setName("");
    setCategory("");
    setNewCategory("");
    setDescription("");
    setFields([defaultField]);
  };

  const handleSubmit = () => {
    const chosenCategory = newCategory.trim() || category || "Uncategorized";
    const sanitizedName = name.trim();
    const newEvent: Event = {
      id: sanitizedName
        ? sanitizedName.replace(/\s+/g, "_").toLowerCase()
        : `event_${Date.now()}`,
      name: sanitizedName || "New Event",
      category: chosenCategory,
      description: description.trim(),
      fields: fields
        .filter((field) => field.name.trim())
        .map((field) => ({ name: field.name.trim(), type: field.type })),
      examplePayload: {},
    };

    onAddEvent(newEvent);
    onOpenChange(false);
    clearForm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[640px] max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-7">
        <DialogHeader className="space-y-1.5">
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Add New Event
          </DialogTitle>
          <DialogDescription className="text-base text-gray-500">
            Enter the details for the new event.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-3">
          <div className="space-y-2">
            <label className="text-base font-medium text-gray-900">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Event Name"
              className="h-11 bg-slate-100 border border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-base font-medium text-gray-900">
              Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-11 w-full bg-slate-100">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {existingCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">
              Or type a new category name below:
            </p>
            <Input
              value={newCategory}
              placeholder="Enter new category..."
              onChange={(e) => setNewCategory(e.target.value)}
              className="h-11 bg-slate-100 border border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-base font-medium text-gray-900">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event Description"
              className="min-h-[100px] resize-none bg-slate-100 border border-gray-200"
            />
          </div>

          <div className="space-y-3">
            <p className="text-base font-medium text-gray-900">Schema</p>
            <div className="space-y-3">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_140px_40px] items-center"
                >
                  <Input
                    value={field.name}
                    onChange={(e) =>
                      handleFieldChange(field.id, "name", e.target.value)
                    }
                    placeholder="Field Key"
                    className="h-10 bg-slate-100 border border-gray-200"
                  />

                  <Select
                    value={field.type}
                    onValueChange={(value) =>
                      handleFieldChange(field.id, "type", value)
                    }
                  >
                    <SelectTrigger className="h-10 w-full bg-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => handleRemoveField(field.id)}
                    disabled={fields.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="h-10 gap-2"
                onClick={handleAddField}
              >
                <Plus className="h-4 w-4" />
                Add Field
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-3">
          <Button type="button" className="" onClick={handleSubmit}>
            Add Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddEventModal;
