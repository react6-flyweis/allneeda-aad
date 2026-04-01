import { Save, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WorkflowFormValues } from "./CreateWorkflowModal";

type ReviewTabProps = {
  watchedValues: WorkflowFormValues;
};

export default function ReviewTab({ watchedValues }: ReviewTabProps) {
  return (
    <div className="rounded-lg border border-slate-300 bg-slate-100 p-3 sm:p-4">
      <h3 className="text-base font-medium text-slate-900">
        Review &amp; Save
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Review your workflow configuration
      </p>

      <div className="mt-5 space-y-4 rounded-lg bg-white p-4 text-slate-800">
        <div>
          <h4 className="text-sm font-semibold">Basic Info</h4>
          <p className="text-sm">
            Name:{" "}
            <span className="font-semibold">
              {watchedValues.workflowName || "-"}
            </span>
          </p>
          <p className="text-sm">
            Description:{" "}
            <span className="font-semibold">
              {watchedValues.description || "-"}
            </span>
          </p>
          <p className="text-sm">
            Owner:{" "}
            <span className="font-semibold">
              {watchedValues.ownerTeam || "-"}
            </span>
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Trigger</h4>
          <div className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold tracking-wide text-white">
            {watchedValues.triggerEvent || "No trigger selected"}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold">
            Conditions ({watchedValues.conditions?.length || 0})
          </h4>
          {watchedValues.conditions && watchedValues.conditions.length > 0 ? (
            <ul className="ml-4 list-disc text-sm">
              {watchedValues.conditions.map((condition, idx) => (
                <li key={`${condition.fieldPath}-${idx}`}>
                  {condition.fieldPath} {condition.operator} "{condition.value}"
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No conditions set</p>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold">
            Actions ({watchedValues.actions?.length || 0})
          </h4>
          {watchedValues.actions && watchedValues.actions.length > 0 ? (
            <ul className="ml-4 list-disc text-sm">
              {watchedValues.actions.map((action, idx) => (
                <li key={`${action.actionType}-${idx}`}>
                  {idx + 1}. {action.actionType}{" "}
                  {action.payload ? `- ${action.payload}` : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No actions added</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          type="button"
          className="h-9 rounded-md border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 text-sm"
          onClick={() => {
            console.log("Save as Draft", watchedValues);
          }}
        >
          <div className="flex items-center gap-2">
            <Save size={14} />
            Save as Draft
          </div>
        </Button>
        <Button
          type="button"
          className="h-9 rounded-md bg-slate-950 text-white hover:bg-slate-800 text-sm"
          onClick={() => {
            console.log("Activate Workflow", watchedValues);
          }}
        >
          <div className="flex items-center gap-2">
            <Play size={14} />
            Activate Workflow
          </div>
        </Button>
      </div>
    </div>
  );
}
