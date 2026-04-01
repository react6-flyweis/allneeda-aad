import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInfoTab from "./BasicInfoTab";
import TriggerTab from "./TriggerTab";
import ConditionsTab from "./ConditionsTab";
import ActionsTab from "./ActionsTab";
import NotificationsTab from "./NotificationsTab";
import ReviewTab from "./ReviewTab";

const workflowFormSchema = z.object({
  workflowName: z.string().min(1, "Workflow name is required"),
  description: z.string().optional(),
  ownerTeam: z.string().min(1, "Owner team is required"),
  triggerEvent: z.string().min(1, "Trigger event is required"),
  conditions: z
    .array(
      z.object({
        fieldPath: z.string().min(1, "Field path is required"),
        operator: z.string().min(1, "Operator is required"),
        value: z.string().min(1, "Value is required"),
      }),
    )
    .optional(),
  actions: z
    .array(
      z.object({
        actionType: z.string().min(1, "Action type is required"),
        payload: z.string().optional(),
      }),
    )
    .optional(),
  actionPlan: z.string().optional(),
  notifications: z.string().optional(),
});

export type WorkflowFormValues = z.infer<typeof workflowFormSchema>;

export type ConditionItem = {
  id: string;
  fieldPath: string;
  operator: string;
  value: string;
};

export type ActionItem = {
  id: string;
  actionType: string;
  payload?: string;
};

const steps = [
  "basic-info",
  "trigger",
  "conditions",
  "actions",
  "notifications",
  "review",
] as const;

const tabLabels: Record<(typeof steps)[number], string> = {
  "basic-info": "Basic Info",
  trigger: "Trigger",
  conditions: "Conditions",
  actions: "Actions",
  notifications: "Notifications",
  review: "Review",
};

export default function CreateWorkflowModal() {
  const [activeTab, setActiveTab] =
    useState<(typeof steps)[number]>("basic-info");
  const [conditionDraft, setConditionDraft] = useState({
    fieldPath: "",
    operator: "equals",
    value: "",
  });
  const [actionDraft, setActionDraft] = useState({
    actionType: "",
    payload: "",
  });

  const { register, control, handleSubmit, watch, trigger, reset, formState } =
    useForm<WorkflowFormValues>({
      resolver: zodResolver(workflowFormSchema),
      defaultValues: {
        workflowName: "",
        description: "",
        ownerTeam: "aad",
        triggerEvent: "",
        conditions: [],
        actions: [],
        actionPlan: "",
        notifications: "",
      },
      mode: "onChange",
    });

  const {
    fields: conditionFields,
    append,
    remove,
  } = useFieldArray({ control, name: "conditions" });
  const {
    fields: actionFields,
    append: appendAction,
    remove: removeAction,
  } = useFieldArray({ control, name: "actions" });

  const watchedValues = watch();

  function moveStep(direction: "next" | "prev") {
    const currentIndex = steps.indexOf(activeTab);
    if (direction === "prev" && currentIndex > 0) {
      setActiveTab(steps[currentIndex - 1]);
      return;
    }

    if (direction === "next" && currentIndex < steps.length - 1) {
      setActiveTab(steps[currentIndex + 1]);
    }
  }

  async function handleNext() {
    if (activeTab === "basic-info") {
      const isValid = await trigger(["workflowName", "ownerTeam"]);
      if (!isValid) return;
    }

    if (activeTab === "trigger") {
      const isValid = await trigger(["triggerEvent"]);
      if (!isValid) return;
    }

    if (activeTab === "actions" && actionFields.length === 0) {
      return;
    }

    moveStep("next");
  }

  function handleClose() {
    reset();
    setActiveTab("basic-info");
    setConditionDraft({ fieldPath: "", operator: "equals", value: "" });
    setActionDraft({ actionType: "", payload: "" });
  }

  function onSubmit(values: WorkflowFormValues) {
    console.log("Create workflow", values);
    handleClose();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8 rounded-lg bg-[#1a56ff] px-3 font-medium text-white hover:bg-blue-700">
          Create
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-5xl max-h-[90vh] overflow-y-auto bg-[#E8F1FF] "
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as (typeof steps)[number])
            }
          >
            <TabsList className="grid h-8 w-full grid-cols-6 rounded-lg bg-slate-300/70 p-1">
              {steps.map((step) => (
                <TabsTrigger
                  key={step}
                  value={step}
                  className="rounded-md text-sm data-[state=active]:bg-white data-[state=active]:text-slate-900"
                >
                  {tabLabels[step]}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="basic-info" className="mt-4">
              <BasicInfoTab
                register={register}
                control={control}
                formState={formState}
              />
            </TabsContent>

            <TabsContent value="trigger" className="mt-4">
              <TriggerTab control={control} formState={formState} />
            </TabsContent>

            <TabsContent value="conditions" className="mt-4">
              <ConditionsTab
                conditionDraft={conditionDraft}
                setConditionDraft={setConditionDraft}
                conditionFields={conditionFields}
                append={append}
                remove={remove}
              />
            </TabsContent>

            <TabsContent value="actions" className="mt-4">
              <ActionsTab
                actionDraft={actionDraft}
                setActionDraft={setActionDraft}
                actionFields={actionFields}
                appendAction={appendAction}
                removeAction={removeAction}
              />
            </TabsContent>

            <TabsContent value="notifications" className="mt-4">
              <NotificationsTab register={register} />
            </TabsContent>

            <TabsContent value="review" className="mt-4">
              <ReviewTab watchedValues={watchedValues} />
            </TabsContent>
          </Tabs>

          <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <DialogClose asChild>
              <Button
                type="button"
                onClick={handleClose}
                variant="outline"
                className="h-8 min-w-28 rounded-md border-slate-300 bg-slate-100 text-slate-900 hover:bg-slate-100 text-sm"
              >
                Close
              </Button>
            </DialogClose>

            <div className="flex items-center gap-3 sm:ml-auto">
              <Button
                type="button"
                variant="secondary"
                onClick={() => moveStep("prev")}
                disabled={activeTab === "basic-info"}
                className="h-8 min-w-28 rounded-md bg-slate-400 text-white hover:bg-slate-500 text-sm"
              >
                Previous
              </Button>

              {activeTab === "review" ? (
                <Button
                  type="submit"
                  className="h-8 min-w-28 rounded-md bg-slate-950 text-white hover:bg-slate-800 text-sm"
                >
                  Create
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="h-10 min-w-28 rounded-lg bg-slate-950 text-white hover:bg-slate-800"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
