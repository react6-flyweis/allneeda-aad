import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import type { ActionItem } from "./CreateWorkflowModal";

type ActionsTabProps = {
  actionDraft: { actionType: string; payload: string };
  setActionDraft: React.Dispatch<
    React.SetStateAction<{ actionType: string; payload: string }>
  >;
  actionFields: ActionItem[];
  appendAction: (value: { actionType: string; payload: string }) => void;
  removeAction: (index: number) => void;
};

export default function ActionsTab({
  actionDraft,
  setActionDraft,
  actionFields,
  appendAction,
  removeAction,
}: ActionsTabProps) {
  function addAction() {
    if (!actionDraft.actionType) {
      return;
    }

    appendAction({
      actionType: actionDraft.actionType,
      payload: actionDraft.payload,
    });

    setActionDraft({ actionType: "", payload: "" });
  }

  return (
    <div className="rounded-lg border border-slate-300 bg-white p-5">
      <h3 className="text-base font-medium text-slate-900">Add Actions</h3>
      <p className="mt-1 text-sm text-slate-500">
        Define what actions should be performed when the workflow triggers
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <div className="space-y-1 sm:col-span-1">
          <Label className="text-slate-900">Action Type</Label>
          <Select
            value={actionDraft.actionType}
            onValueChange={(value) =>
              setActionDraft((prev) => ({ ...prev, actionType: value }))
            }
          >
            <SelectTrigger className="h-10 w-full rounded-lg border-0 bg-slate-100">
              <SelectValue placeholder="Select an action..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wallet.add_credit">
                wallet.add_credit
              </SelectItem>
              <SelectItem value="campaign.pause">campaign.pause</SelectItem>
              <SelectItem value="notification.send">
                notification.send
              </SelectItem>
              <SelectItem value="report.generate">report.generate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1 sm:col-span-2">
          <Label className="text-slate-900">Payload (JSON)</Label>
          <Textarea
            value={actionDraft.payload}
            onChange={(e) =>
              setActionDraft((prev) => ({ ...prev, payload: e.target.value }))
            }
            placeholder='e.g., {"amount": 10, "reason": "Bonus"}'
            className="h-24 rounded-lg border-0 bg-slate-100 py-1.5 placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="mt-3">
        <Button
          type="button"
          onClick={addAction}
          className="h-10 w-full rounded-lg bg-slate-950 text-white hover:bg-slate-800"
        >
          <div className="flex items-center justify-center gap-2">
            <Plus size={14} />
            Add Action
          </div>
        </Button>
      </div>

      <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-3">
        {actionFields.length === 0 ? (
          <p className="text-sm text-slate-500">
            No actions added. Add at least one action to continue.
          </p>
        ) : (
          <div className="space-y-2">
            {actionFields.map((item, index) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-2 rounded-lg border border-slate-300 bg-white p-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {index + 1}. {item.actionType}
                  </p>
                  <p className="text-xs text-slate-600">
                    {item.payload || "No payload provided"}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-red-500 hover:bg-red-100"
                  onClick={() => removeAction(index)}
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
