import {
  Controller,
  type UseFormRegister,
  type UseFormStateReturn,
  type Control,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { WorkflowFormValues } from "./CreateWorkflowModal";

type BasicInfoTabProps = {
  register: UseFormRegister<WorkflowFormValues>;
  control: Control<WorkflowFormValues>;
  formState: UseFormStateReturn<WorkflowFormValues>;
};

export default function BasicInfoTab({
  register,
  control,
  formState,
}: BasicInfoTabProps) {
  return (
    <div className="rounded-lg border border-slate-300 bg-slate-100 p-3 sm:p-4">
      <h3 className="text-base font-medium text-slate-900">
        Basic Information
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Set up the basic details of your workflow
      </p>

      <div className="mt-4 space-y-3">
        <div className="space-y-1.5">
          <Label className="text-slate-900">Workflow Name *</Label>
          <Input
            {...register("workflowName")}
            placeholder="e.g., Morning Post Bonus..."
            className="h-9 rounded-lg border-0 bg-slate-200 placeholder:text-slate-500"
          />
          {formState.errors.workflowName ? (
            <p className="text-sm text-red-600">
              {formState.errors.workflowName.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <Label className="text-slate-900">Description</Label>
          <Input
            {...register("description")}
            placeholder="Describe what this workflow does..."
            className="h-24 rounded-lg border-0 bg-slate-200 py-1.5 placeholder:text-slate-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-slate-900">Owner Team</Label>
          <Controller
            control={control}
            name="ownerTeam"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-10 w-full rounded-lg border-0 bg-slate-200">
                  <SelectValue placeholder="Select owner team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aad">
                    Allneeda Automation Department (AAD)
                  </SelectItem>
                  <SelectItem value="coo">COO Team</SelectItem>
                  <SelectItem value="growth">Growth Team</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {formState.errors.ownerTeam ? (
            <p className="text-sm text-red-600">
              {formState.errors.ownerTeam.message}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
