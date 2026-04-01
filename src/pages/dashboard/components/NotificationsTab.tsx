import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { WorkflowFormValues } from "./CreateWorkflowModal";
import type { UseFormRegister } from "react-hook-form";

type NotificationsTabProps = {
  register: UseFormRegister<WorkflowFormValues>;
};

export default function NotificationsTab({ register }: NotificationsTabProps) {
  return (
    <div className="rounded-lg border border-slate-300 bg-slate-100 p-3 sm:p-4">
      <h3 className="text-base font-medium text-slate-900">Notifications</h3>
      <p className="mt-1 text-sm text-slate-500">
        Add optional notes for alerting after workflow execution
      </p>

      <div className="mt-4 space-y-2">
        <Label className="text-slate-900">Notification Notes</Label>
        <Textarea
          {...register("notifications")}
          placeholder="Example: send summary to COO and Growth Slack channels"
          className="h-24 rounded-lg border-0 bg-slate-200 py-1.5 placeholder:text-slate-500"
        />
      </div>
    </div>
  );
}
