import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import { type Action, type ActionField } from "@/data/actions";

interface AddActionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAction?: (action: Action) => void;
}

interface NewActionParameter {
  id: string;
  name: string;
  type: string;
  description: string;
  required: boolean;
}

const defaultParameter: NewActionParameter = {
  id: "1",
  name: "",
  type: "string",
  description: "",
  required: false,
};

function AddActionModal({
  open,
  onOpenChange,
  onAddAction,
}: AddActionModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [parameters, setParameters] = useState<NewActionParameter[]>([
    defaultParameter,
  ]);

  const handleAddParameter = () => {
    setParameters((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        name: "",
        type: "string",
        description: "",
        required: false,
      },
    ]);
  };

  const handleRemoveParameter = (id: string) => {
    setParameters((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleParameterChange = (
    id: string,
    key: keyof Omit<NewActionParameter, "id">,
    value: string | boolean,
  ) => {
    setParameters((prev) =>
      prev.map((item) =>
        item.id !== id
          ? item
          : {
              ...item,
              [key]: value,
            },
      ),
    );
  };

  const handleSubmit = () => {
    const newAction: Action = {
      id: name || `custom.${Date.now()}`,
      name: name || "New Action",
      category: category || "Uncategorized",
      description,
      fields: parameters.map(
        (p) =>
          ({
            name: p.name,
            type: p.type,
            required: p.required,
            description: p.description,
          }) as ActionField,
      ),
      examplePayload: {},
    };

    if (onAddAction) onAddAction(newAction);
    onOpenChange(false);
    setName("");
    setCategory("");
    setDescription("");
    setParameters([defaultParameter]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-175 max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-7">
        <DialogHeader className="space-y-1.5">
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Add New Action
          </DialogTitle>
          <DialogDescription className="text-base text-gray-500">
            Enter the details for the new action.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-base font-medium text-gray-900">Name</label>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-11 bg-slate-100 border border-gray-200"
              placeholder="Enter action name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-base font-medium text-gray-900">
              Category
            </label>
            <Input
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-11 bg-slate-100 border border-gray-200"
              placeholder="Enter category"
            />
          </div>

          <div className="space-y-2">
            <label className="text-base font-medium text-gray-900">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="min-h-24 resize-none bg-slate-100 border border-gray-200"
              placeholder="Describe the action"
            />
          </div>

          <div className="space-y-3">
            <p className="text-base font-medium text-gray-900">Parameters</p>

            <div className="space-y-3 rounded-xl border border-gray-200 p-4 sm:p-5">
              {parameters.map((parameter) => (
                <div
                  key={parameter.id}
                  className="rounded-lg border border-gray-100 p-4"
                >
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[104px_1fr] sm:items-center">
                      <label className="text-base font-medium text-gray-900">
                        Name
                      </label>
                      <Input
                        value={parameter.name}
                        onChange={(event) =>
                          handleParameterChange(
                            parameter.id,
                            "name",
                            event.target.value,
                          )
                        }
                        className="h-10 bg-slate-100 border border-gray-200"
                        placeholder="field name"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[104px_1fr] sm:items-center">
                      <label className="text-base font-medium text-gray-900">
                        Type
                      </label>
                      <Input
                        value={parameter.type}
                        onChange={(event) =>
                          handleParameterChange(
                            parameter.id,
                            "type",
                            event.target.value,
                          )
                        }
                        className="h-10 bg-slate-100 border border-gray-200"
                        placeholder="string"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[104px_1fr] sm:items-center">
                      <label className="text-base font-medium text-gray-900">
                        Description
                      </label>
                      <Input
                        value={parameter.description}
                        onChange={(event) =>
                          handleParameterChange(
                            parameter.id,
                            "description",
                            event.target.value,
                          )
                        }
                        className="h-10 bg-slate-100 border border-gray-200"
                        placeholder="field description"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[104px_1fr] sm:items-center">
                      <label className="text-base font-medium text-gray-900">
                        Required
                      </label>
                      <Checkbox
                        checked={parameter.required}
                        onCheckedChange={(checked) =>
                          handleParameterChange(
                            parameter.id,
                            "required",
                            Boolean(checked),
                          )
                        }
                      />
                    </div>

                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="h-10 w-10 rounded-lg"
                      onClick={() => handleRemoveParameter(parameter.id)}
                      disabled={parameters.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-10 gap-2 rounded-xl text-base"
              onClick={handleAddParameter}
            >
              <Plus className="h-4 w-4" />
              Add Parameter
            </Button>
          </div>
        </div>

        <DialogFooter className="justify-end pt-1">
          <Button
            type="button"
            className="h-11 rounded-xl px-7 text-base"
            onClick={handleSubmit}
          >
            Add Action
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddActionModal;
