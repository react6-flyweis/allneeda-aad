import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import type { ConditionItem } from "./CreateWorkflowModal";

type ConditionsTabProps = {
  conditionDraft: { fieldPath: string; operator: string; value: string };
  setConditionDraft: React.Dispatch<
    React.SetStateAction<{ fieldPath: string; operator: string; value: string }>
  >;
  conditionFields: ConditionItem[];
  append: (value: {
    fieldPath: string;
    operator: string;
    value: string;
  }) => void;
  remove: (index: number) => void;
};

export default function ConditionsTab({
  conditionDraft,
  setConditionDraft,
  conditionFields,
  append,
  remove,
}: ConditionsTabProps) {
  function addCondition() {
    if (!conditionDraft.fieldPath || !conditionDraft.value) {
      return;
    }

    append({
      fieldPath: conditionDraft.fieldPath,
      operator: conditionDraft.operator,
      value: conditionDraft.value,
    });

    setConditionDraft({ fieldPath: "", operator: "equals", value: "" });
  }

  return (
    <div className="rounded-lg border border-slate-300 bg-white p-5">
      <h3 className="text-base font-medium text-slate-900">Conditions</h3>
      <p className="mt-1 text-sm text-slate-500">
        Add conditions to filter when the workflow should run (optional)
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-slate-900">Field Path</Label>
          <Select
            value={conditionDraft.fieldPath}
            onValueChange={(value) =>
              setConditionDraft((prev) => ({ ...prev, fieldPath: value }))
            }
          >
            <SelectTrigger className="h-10 w-full rounded-lg border-0 bg-slate-100">
              <SelectValue placeholder="Select field..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="actor_type">actor_type</SelectItem>
              <SelectItem value="user.email">user.email</SelectItem>
              <SelectItem value="user.is_active">user.is_active</SelectItem>
              <SelectItem value="order.total">order.total</SelectItem>
              <SelectItem value="campaign.spent">campaign.spent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label className="text-slate-900">Operator</Label>
          <Select
            value={conditionDraft.operator}
            onValueChange={(value) =>
              setConditionDraft((prev) => ({ ...prev, operator: value }))
            }
          >
            <SelectTrigger className="h-10 w-full rounded-lg border-0 bg-slate-100">
              <SelectValue placeholder="Equals" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="equals">equals</SelectItem>
              <SelectItem value="not_equals">not equals</SelectItem>
              <SelectItem value="contains">contains</SelectItem>
              <SelectItem value="greater_than">greater than</SelectItem>
              <SelectItem value="less_than">less than</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-2 space-y-1">
          <Label className="text-slate-900">Value</Label>
          <Input
            value={conditionDraft.value}
            onChange={(e) =>
              setConditionDraft((prev) => ({ ...prev, value: e.target.value }))
            }
            placeholder="Enter value..."
            className="h-10 rounded-lg border-0 bg-slate-100"
          />
        </div>
      </div>

      <div className="mt-3">
        <Button
          type="button"
          onClick={addCondition}
          className="h-10 w-full rounded-lg bg-slate-950 text-white hover:bg-slate-800"
        >
          <div className="flex items-center justify-center gap-2">
            <Plus size={14} />
            Add Condition
          </div>
        </Button>
      </div>

      <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-3">
        {conditionFields.length === 0 ? (
          <p className="text-sm text-slate-500">
            No conditions added. Workflow will run for all events.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {conditionFields.map((item, index) => (
              <div
                key={item.id}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2"
              >
                <span className="text-sm text-slate-700">
                  {item.fieldPath}{" "}
                  <span className="font-semibold text-slate-900">
                    {item.operator}
                  </span>{" "}
                  {item.value}
                </span>
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  variant="ghost"
                  className="h-6 w-6 p-0 text-red-500 hover:bg-red-100"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
