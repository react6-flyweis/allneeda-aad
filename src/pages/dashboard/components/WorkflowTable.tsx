import { Eye, Pencil, Search, TrendingUp, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateWorkflowModal from "./CreateWorkflowModal";
import WorkflowDetailModal, {
  type WorkflowDetails,
} from "./WorkflowDetailModal";

type WorkflowRow = {
  id: string;
  name: string;
  description: string;
  triggerEvent: string;
  isActive: boolean;
  lastRun: string;
  performance: string;
  runs: string;
  owner: string;
};

const workflowStatusMap = {
  active: {
    label: "Active",
    textClassName: "text-emerald-600",
  },
  inactive: {
    label: "Inactive",
    textClassName: "text-slate-500",
  },
} as const;

const workflows: WorkflowRow[] = [
  {
    id: "morning-post-bonus",
    name: "Morning Post Bonus",
    description: "Give $1 bonus to providers who post between 8-9 AM",
    triggerEvent: "provider.post_created",
    isActive: true,
    lastRun: "Dec 17, 2:15 PM",
    performance: "98.5%",
    runs: "342 runs",
    owner: "COO Team",
  },
  {
    id: "inactive-user-reminder",
    name: "Inactive User Reminder",
    description: "Send reminders to users inactive for 7 days",
    triggerEvent: "user.inactive",
    isActive: true,
    lastRun: "Dec 17, 3:30 AM",
    performance: "95.2%",
    runs: "1,245 runs",
    owner: "COO Team",
  },
  {
    id: "order-completion-rewards",
    name: "Order Completion Rewards",
    description: "Reward users with loyalty points when they complete an order",
    triggerEvent: "order.completed",
    isActive: true,
    lastRun: "Dec 17, 2:45 PM",
    performance: "99.1%",
    runs: "5,234 runs",
    owner: "COO Team",
  },
  {
    id: "campaign-budget-alert",
    name: "Campaign Budget Alert",
    description: "Pause campaign when 90% budget is spent",
    triggerEvent: "campaign.spent_threshold_reached",
    isActive: true,
    lastRun: "Dec 17, 1:00 PM",
    performance: "100%",
    runs: "87 runs",
    owner: "COO Team",
  },
  {
    id: "cart-abandonment-recovery",
    name: "Cart Abandonment Recovery",
    description: "Send reminder for abandoned carts over $20",
    triggerEvent: "cart.abandoned",
    isActive: true,
    lastRun: "Dec 17, 3:30 PM",
    performance: "94.8%",
    runs: "892 runs",
    owner: "COO Team",
  },
];

const workflowDetailsMap: Partial<Record<WorkflowRow["id"], WorkflowDetails>> =
  {
    "morning-post-bonus": {
      subtitle: "Give $1 bonus to providers who post between 8-9 AM",
      runCount: "342",
      successRate: "98.5%",
      lastRunFull: "Dec 17, 2025 2:15 PM",
      triggerSource: "Provider",
      triggerDescription: "Triggered when a provider creates a new post",
      conditions: [
        {
          field: "context.created_at_local",
          operator: "between_time",
          value: '{"start":"08:00","end":"09:00"}',
        },
        {
          field: "actor_type",
          operator: "equals",
          value: "provider",
        },
      ],
      actions: [
        {
          actionType: "wallet.add_credit",
          domain: "Finance",
          description: "Add credit to user or provider wallet",
          payload:
            '{\n  "amount": 1,\n  "currency": "USD",\n  "reason": "morning_post_bonus"\n}',
        },
        {
          actionType: "notification.send_push",
          domain: "Communication",
          description: "Send push notification",
          payload:
            '{\n  "title": "Bonus Earned!",\n  "message": "You earned $1 for posting during morning hours!"\n}',
        },
      ],
      metadata: {
        owner: "Automation Team",
        created: "Dec 1, 2025 3:30 PM",
        lastUpdated: "Dec 15, 2025 2:02 PM",
      },
    },
  };

export default function WorkflowTable() {
  return (
    <Card>
      <CardHeader className="p-3">
        <div className="flex items-center gap-2 mb-3">
          <Workflow className="size-5 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold leading-tight text-slate-900">
              Active Workflows
            </h2>
            <p className="text-xs text-slate-500">
              Manage your automation workflows — compact view enabled.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="relative flex-1 lg:max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-2 size-3 -translate-y-1/2 text-slate-500" />
            <Input
              placeholder="Search workflows..."
              className="h-8.5 rounded-md border-0 bg-slate-100/80 pl-8 text-sm focus-visible:ring-1 focus-visible:ring-slate-300"
            />
          </div>

          <Select defaultValue="all-status">
            <SelectTrigger className="h-8.5 w-full rounded-md border-0 bg-slate-100/80 text-sm lg:w-32">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-events">
            <SelectTrigger className="h-8.5 w-full rounded-md border-0 bg-slate-100/80 text-sm lg:w-36">
              <SelectValue placeholder="All Events" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-events">All Events</SelectItem>
              <SelectItem value="provider-post-created">
                provider.post_created
              </SelectItem>
              <SelectItem value="user-inactive">user.inactive</SelectItem>
              <SelectItem value="order-completed">order.completed</SelectItem>
            </SelectContent>
          </Select>

          <CreateWorkflowModal />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table className="border-collapse text-sm">
          <TableHeader>
            <TableRow className="border-0">
              <TableHead className="px-4 py-2 text-xs font-semibold text-slate-800 border-b border-slate-300 bg-white">
                Name
              </TableHead>
              <TableHead className="px-3 py-2 text-xs font-semibold text-slate-800 border-b border-slate-300">
                Trigger Event
              </TableHead>
              <TableHead className="px-3 py-2 text-xs font-semibold text-slate-800 border-b border-slate-300">
                Status
              </TableHead>
              <TableHead className="px-3 py-2 text-xs font-semibold text-slate-800 border-b border-slate-300">
                Last Run
              </TableHead>
              <TableHead className="px-3 py-2 text-xs font-semibold text-slate-800 border-b border-slate-300">
                Performance
              </TableHead>
              <TableHead className="px-3 py-2 text-xs font-semibold text-slate-800 border-b border-slate-300">
                Owner
              </TableHead>
              <TableHead className="px-3 py-2 text-xs font-semibold text-slate-800 border-b border-slate-300">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {workflows.map((workflow) => {
              const status = workflow.isActive
                ? workflowStatusMap.active
                : workflowStatusMap.inactive;

              return (
                <TableRow
                  key={workflow.id}
                  className="group hover:bg-slate-50/50"
                >
                  <TableCell className="px-4 py-2 align-top">
                    <p className="text-sm font-medium text-slate-900">
                      {workflow.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {workflow.description}
                    </p>
                  </TableCell>

                  <TableCell className="px-3 py-2 align-top">
                    <span className="inline-flex rounded-full border border-slate-500 bg-white px-2 py-px text-[0.7rem] text-slate-800">
                      {workflow.triggerEvent}
                    </span>
                  </TableCell>

                  <TableCell className="px-3 py-2 align-top">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={workflow.isActive}
                        aria-label={`${workflow.name} status`}
                        className="data-[state=checked]:bg-[#10b981]"
                      />
                      <span
                        className={`text-xs font-medium ${status.textClassName}`}
                      >
                        {status.label}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="px-3 py-2 text-sm font-medium text-slate-800 align-top">
                    {workflow.lastRun}
                  </TableCell>

                  <TableCell className="px-3 py-2 align-top">
                    <div>
                      <p className="inline-flex items-center gap-1 text-sm font-medium text-slate-800">
                        <TrendingUp
                          className="size-3 text-[#10b981]"
                          strokeWidth={2.5}
                        />
                        {workflow.performance}
                      </p>
                      <p className="text-[0.7rem] text-slate-500 mt-0.5 font-medium">
                        {workflow.runs}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="px-3 py-2 text-sm font-medium text-slate-800 align-top">
                    {workflow.owner}
                  </TableCell>

                  <TableCell className="px-3 py-2 align-top">
                    <div className="flex items-center gap-1">
                      <WorkflowDetailModal
                        workflow={workflow}
                        details={workflowDetailsMap[workflow.id]}
                      >
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="h-8 w-8 p-0 text-slate-700 hover:bg-transparent hover:text-slate-900"
                        >
                          <Eye className="size-4" />
                        </Button>
                      </WorkflowDetailModal>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="h-8 w-8 p-0 text-slate-700 hover:bg-transparent hover:text-slate-900"
                      >
                        <Pencil className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
