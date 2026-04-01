import {
  Activity,
  CheckCircle2,
  Eye,
  GitBranch,
  Pencil,
  Search,
  TrendingUp,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import PageHeader from "@/components/common_components/PageHeader";

type OverviewStat = {
  title: string;
  value: string;
  delta: string;
  deltaClassName: string;
  icon: React.ComponentType<{ className?: string }>;
  iconClassName: string;
};

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

const stats: OverviewStat[] = [
  {
    title: "Total Workflows",
    value: "6",
    delta: "5 active • 1 inactive",
    deltaClassName: "text-emerald-600",
    icon: Workflow,
    iconClassName: "text-blue-600",
  },
  {
    title: "Runs (24h)",
    value: "2,847",
    delta: "Across all active workflows",
    deltaClassName: "text-slate-500",
    icon: Activity,
    iconClassName: "text-emerald-500",
  },
  {
    title: "Success Rate",
    value: "96.8%",
    delta: "91 failed in last 24h",
    deltaClassName: "text-rose-500",
    icon: CheckCircle2,
    iconClassName: "text-violet-500",
  },
];

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

function Dashboard() {
  return (
    <div className="space-y-4">
      <section>
        <PageHeader
          title="Dashboard Overview"
          subtitle="Monitor and manage all automation workflows across Allneeda platforms"
        />

        <div className="grid gap-2.5 md:grid-cols-3">
          {stats.map((stat) => {
            const StatIcon = stat.icon;

            return (
              <Card key={stat.title} className="gap-0 py-3.5">
                <CardContent className="px-3.5 flex gap-3 items-center">
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-white ring-1 ring-slate-200">
                    <StatIcon className={`size-6 ${stat.iconClassName}`} />
                  </span>
                  <div className="">
                    <p className="text-sm text-slate-700">{stat.title}</p>

                    <p className="text-[1.65rem] font-semibold leading-none text-slate-900">
                      {stat.value}
                    </p>
                    <p
                      className={`mt-0.5 text-xs font-medium ${stat.deltaClassName}`}
                    >
                      {stat.delta}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Card className="gap-0 py-0">
        <CardContent className="px-0 py-0">
          <div className="border-b border-slate-200 px-5 py-4">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="inline-flex size-6 items-center justify-center rounded-md bg-blue-50">
                <GitBranch className="size-3.5 text-blue-600" />
              </span>
              <h2 className="text-2xl font-semibold leading-none tracking-tight text-slate-900">
                Active Workflows
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 border-b border-slate-200 px-5 py-3.5 lg:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search workflows..."
                className="h-11 rounded-lg border-slate-200 bg-slate-50 pl-9 text-sm"
              />
            </div>

            <Select defaultValue="all-status">
              <SelectTrigger className="h-11 w-full rounded-lg border-slate-200 bg-slate-50 text-sm lg:w-42.5">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-events">
              <SelectTrigger className="h-11 w-full rounded-lg border-slate-200 bg-slate-50 text-sm lg:w-42.5">
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
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="h-12 px-5 text-[15px] font-medium text-slate-800">
                  Name
                </TableHead>
                <TableHead className="h-12 text-[15px] font-medium text-slate-800">
                  Trigger Event
                </TableHead>
                <TableHead className="h-12 text-[15px] font-medium text-slate-800">
                  Status
                </TableHead>
                <TableHead className="h-12 text-[15px] font-medium text-slate-800">
                  Last Run
                </TableHead>
                <TableHead className="h-12 text-[15px] font-medium text-slate-800">
                  Performance
                </TableHead>
                <TableHead className="h-12 text-[15px] font-medium text-slate-800">
                  Owner
                </TableHead>
                <TableHead className="h-12 pr-5 text-[15px] font-medium text-slate-800">
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
                    className="border-slate-200 align-top"
                  >
                    <TableCell className="px-5 py-3.5 align-top">
                      <p className="text-[1.05rem] font-medium text-slate-800">
                        {workflow.name}
                      </p>
                      <p className="mt-0.5 text-sm text-slate-600">
                        {workflow.description}
                      </p>
                    </TableCell>

                    <TableCell className="py-3.5 align-top">
                      <span className="inline-flex rounded-full border border-slate-400 px-3 py-0.5 text-sm text-slate-800">
                        {workflow.triggerEvent}
                      </span>
                    </TableCell>

                    <TableCell className="py-3.5 align-top">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={workflow.isActive}
                          aria-label={`${workflow.name} status`}
                        />
                        <span
                          className={`text-base font-medium ${status.textClassName}`}
                        >
                          {status.label}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="py-3.5 text-base font-medium text-slate-800 align-top">
                      {workflow.lastRun}
                    </TableCell>

                    <TableCell className="py-3.5 align-top">
                      <div>
                        <p className="inline-flex items-center gap-1.5 text-base font-semibold text-slate-800">
                          <TrendingUp className="size-4 text-emerald-600" />
                          {workflow.performance}
                        </p>
                        <p className="text-sm text-slate-600">
                          {workflow.runs}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell className="py-3.5 text-base font-medium text-slate-800 align-top">
                      {workflow.owner}
                    </TableCell>

                    <TableCell className="pr-5 py-3.5 align-top">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="h-9 w-9 p-0 text-slate-700 hover:bg-transparent hover:text-slate-900"
                        >
                          <Eye className="size-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="h-9 w-9 p-0 text-slate-700 hover:bg-transparent hover:text-slate-900"
                        >
                          <Pencil className="size-5" />
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
    </div>
  );
}

export default Dashboard;
