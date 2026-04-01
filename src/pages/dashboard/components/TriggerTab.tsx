import {
  Controller,
  type UseFormStateReturn,
  type Control,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { WorkflowFormValues } from "./CreateWorkflowModal";

type TriggerTabProps = {
  control: Control<WorkflowFormValues>;
  formState: UseFormStateReturn<WorkflowFormValues>;
};

export default function TriggerTab({ control, formState }: TriggerTabProps) {
  return (
    <div className="rounded-lg border border-slate-300 bg-slate-100 p-3 sm:p-4">
      <h3 className="text-base font-medium text-slate-900">Trigger Setup</h3>
      <p className="mt-1 text-sm text-slate-500">
        Define when this workflow should start
      </p>

      <div className="mt-5 space-y-4">
        <div className="space-y-2">
          <Label className="text-slate-900">Trigger Event *</Label>
          <Controller
            control={control}
            name="triggerEvent"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-10 w-full rounded-lg border-0 bg-slate-200">
                  <SelectValue placeholder="Select trigger event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="provider.post_created">
                    provider.post_created
                  </SelectItem>
                  <SelectItem value="user.inactive">user.inactive</SelectItem>
                  <SelectItem value="order.completed">
                    order.completed
                  </SelectItem>
                  <SelectItem value="campaign.spent_threshold_reached">
                    campaign.spent_threshold_reached
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {formState.errors.triggerEvent ? (
            <p className="text-sm text-red-600">
              {formState.errors.triggerEvent.message}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
