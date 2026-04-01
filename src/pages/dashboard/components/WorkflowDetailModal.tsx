import { ArrowLeft, Activity, CheckCircle2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkflowConfigurationTab from "./WorkflowConfigurationTab";
import WorkflowExecutionLogsTab from "./WorkflowExecutionLogsTab";
import WorkflowTestWorkflowTab from "./WorkflowTestWorkflowTab";
import type {
  WorkflowSummary,
  WorkflowDetails,
  ExecutionLog,
} from "./WorkflowDetailTypes";

type WorkflowDetailModalProps = {
  workflow: WorkflowSummary;
  details?: WorkflowDetails;
  children: React.ReactNode;
};

function WorkflowDetailModal({
  workflow,
  details,
  children,
}: WorkflowDetailModalProps) {
  const resolvedDetails = details ?? getDefaultDetails(workflow);

  const executionLogs: ExecutionLog[] = [
    {
      status: "success",
      timestamp: "Dec 17, 2025 2:15:14 PM",
      details: "Bonus: $1 credited",
      actions: "wallet.add_credit, notification.send_push",
    },
    {
      status: "success",
      timestamp: "Dec 17, 2025 2:02:01 PM",
      details: "Bonus: $1 credited",
      actions: "wallet.add_credit, notification.send_push",
    },
    {
      status: "skipped",
      timestamp: "Dec 17, 2025 4:32:40 PM",
      details: "Time outside 8-9 AM range",
      actions: "-",
    },
  ];

  const testPayload = `{
  "event_name": "provider.post_created",
  "actor_id": "prov_123",
  "context": {
    "post_id": "post_456",
    "category": "food",
    "created_at_local": "2025-12-15T08:34:59-05:00"
  }
}`;

  const statCards = [
    {
      id: "runs",
      title: "Total Runs",
      value: resolvedDetails.runCount,
      icon: Activity,
    },
    {
      id: "success",
      title: "Success Rate",
      value: resolvedDetails.successRate,
      icon: CheckCircle2,
    },
    {
      id: "last-run",
      title: "Last Run",
      value: resolvedDetails.lastRunFull,
      icon: TrendingUp,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-h-[88vh] overflow-y-auto bg-[#E8F1FF] p-4 sm:max-w-4xl sm:p-5"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="mt-0.5 h-8 w-8 rounded-full text-slate-700 hover:bg-slate-200/70"
              >
                <ArrowLeft className="size-4" />
              </Button>
            </DialogClose>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold text-slate-900">
                  {workflow.name}
                </h2>
                <Badge
                  variant={workflow.isActive ? "default" : "secondary"}
                  className="rounded-md px-2 py-0.5 text-sm"
                >
                  {workflow.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                {resolvedDetails.subtitle}
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {statCards.map((stat) => (
              <Card
                key={stat.id}
                className="rounded-xl border-slate-200 gap-0 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-600">{stat.title}</p>
                  <stat.icon className="size-4 text-slate-400" />
                </div>
                <p className="mt-3 text-xl font-semibold text-slate-900">
                  {stat.value}
                </p>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="configuration" className="gap-3">
            <TabsList className="h-10 rounded-lg bg-white/90 p-1">
              <TabsTrigger value="configuration" className="text-sm">
                Configuration
              </TabsTrigger>
              <TabsTrigger value="execution-logs" className="text-sm">
                Execution Logs
              </TabsTrigger>
              <TabsTrigger value="test-workflow" className="text-sm">
                Test Workflow
              </TabsTrigger>
            </TabsList>

            <WorkflowConfigurationTab
              workflow={workflow}
              details={resolvedDetails}
            />
            <WorkflowExecutionLogsTab executionLogs={executionLogs} />
            <WorkflowTestWorkflowTab testPayload={testPayload} />
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getDefaultDetails(workflow: WorkflowSummary): WorkflowDetails {
  return {
    subtitle: workflow.description,
    runCount: workflow.runs.replace(" runs", ""),
    successRate: workflow.performance,
    lastRunFull: workflow.lastRun,
    triggerSource: "System",
    triggerDescription: `Triggered when ${workflow.triggerEvent} is emitted.`,
    conditions: [
      {
        field: "context.actor_type",
        operator: "equals",
        value: "provider",
      },
      {
        field: "context.region",
        operator: "in",
        value: '["us", "ca"]',
      },
    ],
    actions: [
      {
        actionType: "notification.send_push",
        domain: "Communication",
        description: "Send push notification to the relevant user.",
        payload:
          '{\n  "title": "Workflow Triggered",\n  "message": "An automated rule was executed."\n}',
      },
    ],
    metadata: {
      owner: workflow.owner,
      created: "Dec 1, 2025 3:30 PM",
      lastUpdated: "Dec 15, 2025 2:02 PM",
    },
  };
}

export type { WorkflowDetails };
export default WorkflowDetailModal;
