import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  ListChecks,
  XCircle,
} from "lucide-react";
import PageHeader from "@/components/common_components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type StatCard = {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  iconWrapperClassName: string;
};

type ExecutionStatus = "success" | "failed" | "skipped";

type ExecutionLog = {
  id: number;
  status: ExecutionStatus;
  workflow: string;
  event: string;
  timestamp: string;
  details: string;
  actions: string[];
  error?: string;
};

const statCards: StatCard[] = [
  {
    title: "Total Executions",
    value: "8",
    subtitle: "--",
    icon: ListChecks,
    iconWrapperClassName: "bg-blue-100 text-blue-600",
  },
  {
    title: "Successful",
    value: "5",
    subtitle: "62.5% success rate",
    icon: CheckCircle2,
    iconWrapperClassName: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Failed",
    value: "1",
    subtitle: "12.5% failure rate",
    icon: XCircle,
    iconWrapperClassName: "bg-rose-100 text-rose-600",
  },
  {
    title: "Skipped",
    value: "2",
    subtitle: "Conditions not met",
    icon: Clock3,
    iconWrapperClassName: "bg-slate-200 text-slate-600",
  },
];

const statusConfig: Record<
  ExecutionStatus,
  {
    label: string;
    badgeClassName: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  success: {
    label: "Success",
    badgeClassName: "bg-emerald-600 text-white border-emerald-700",
    icon: CheckCircle2,
  },
  failed: {
    label: "Failed",
    badgeClassName: "bg-rose-600 text-white border-rose-700",
    icon: XCircle,
  },
  skipped: {
    label: "Skipped",
    badgeClassName: "bg-slate-100 text-slate-700 border-slate-300",
    icon: AlertCircle,
  },
};

const executionLogs: ExecutionLog[] = [
  {
    id: 1,
    status: "success",
    workflow: "Morning Post Bonus",
    event: "provider.post_created",
    timestamp: "Dec 17, 2:15:14 PM",
    details: "Bonus: $1 credited",
    actions: ["wallet.add_credit", "notification.send_push"],
  },
  {
    id: 2,
    status: "success",
    workflow: "Morning Post Bonus",
    event: "provider.post_created",
    timestamp: "Dec 17, 2:02:01 PM",
    details: "Bonus: $1 credited",
    actions: ["wallet.add_credit", "notification.send_push"],
  },
  {
    id: 3,
    status: "skipped",
    workflow: "Morning Post Bonus",
    event: "provider.post_created",
    timestamp: "Dec 17, 4:32:40 PM",
    details: "Time outside 8-9 AM range",
    actions: [],
  },
  {
    id: 4,
    status: "success",
    workflow: "Inactive User Reminder",
    event: "user.inactive",
    timestamp: "Dec 17, 3:30:15 AM",
    details: "Reminder sent to inactive user",
    actions: [
      "notification.send_email",
      "notification.send_push",
      "crm.add_tag",
    ],
  },
  {
    id: 5,
    status: "success",
    workflow: "Order Completion Rewards",
    event: "order.completed",
    timestamp: "Dec 17, 2:45:22 PM",
    details: "100 points added",
    actions: ["loyalty.add_points"],
  },
  {
    id: 6,
    status: "success",
    workflow: "Campaign Budget Alert",
    event: "campaign.spent_threshold_reached",
    timestamp: "Dec 17, 1:00:45 PM",
    details: "Campaign paused at 90% budget",
    actions: ["campaign.pause", "notification.send_email"],
  },
  {
    id: 7,
    status: "failed",
    workflow: "Cart Abandonment Recovery",
    event: "cart.abandoned",
    timestamp: "Dec 17, 3:30:12 PM",
    details: "Failed to send push notification",
    actions: ["notification.send_push"],
    error: "Error: User has disabled push notifications",
  },
  {
    id: 8,
    status: "skipped",
    workflow: "Order Completion Rewards",
    event: "order.completed",
    timestamp: "Dec 17, 1:50:00 PM",
    details: "Order total below $25 threshold",
    actions: [],
  },
];

function Monitoring() {
  return (
    <div className="space-y-4">
      <section>
        <PageHeader
          title="Monitoring & Logs"
          subtitle="Track workflow execution history and performance metrics"
        />

        <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat) => {
            const StatIcon = stat.icon;

            return (
              <Card key={stat.title} className="gap-0 py-3">
                <CardContent className="px-3 flex items-center gap-2">
                  <span
                    className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full ${stat.iconWrapperClassName}`}
                  >
                    <StatIcon className="size-5" />
                  </span>

                  <div>
                    <p className="text-xs text-slate-700">{stat.title}</p>
                    <p className="text-2xl font-semibold leading-none text-slate-900">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {stat.subtitle}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Card className="gap-0 py-0 overflow-hidden">
        <CardHeader className="px-4 py-3 border-b border-slate-200 space-y-1">
          <div className="flex items-start gap-2">
            <ListChecks className="size-4 text-blue-600 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Recent Execution Logs
              </h3>
              <p className="text-xs text-slate-500">
                Last 20 workflow executions across all workflows
              </p>
            </div>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <Table className="min-w-215">
            <TableHeader>
              <TableRow className="bg-white hover:bg-white">
                <TableHead className="px-3 py-2.5 text-sm font-semibold text-slate-700">
                  Status
                </TableHead>
                <TableHead className="px-3 py-2.5 text-sm font-semibold text-slate-700">
                  Workflow
                </TableHead>
                <TableHead className="px-3 py-2.5 text-sm font-semibold text-slate-700">
                  Event
                </TableHead>
                <TableHead className="px-3 py-2.5 text-sm font-semibold text-slate-700">
                  Timestamp
                </TableHead>
                <TableHead className="px-3 py-2.5 text-sm font-semibold text-slate-700">
                  Details
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {executionLogs.map((log) => {
                const config = statusConfig[log.status];
                const StatusIcon = config.icon;

                return (
                  <TableRow key={log.id} className="bg-white hover:bg-slate-50">
                    <TableCell className="px-3 py-2.5">
                      <Badge
                        className={`${config.badgeClassName} px-2 py-0 text-[11px]`}
                      >
                        <StatusIcon className="size-3" />
                        {config.label}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-3 py-2.5 text-sm font-medium text-slate-800">
                      {log.workflow}
                    </TableCell>

                    <TableCell className="px-3 py-2.5">
                      <Badge
                        variant="outline"
                        className="rounded-full border-slate-300 bg-slate-50 px-2 py-0 text-[11px] text-slate-700"
                      >
                        {log.event}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-3 py-2.5 text-sm font-medium text-slate-700">
                      {log.timestamp}
                    </TableCell>

                    <TableCell className="px-3 py-2.5 whitespace-normal max-w-[320px]">
                      <p className="text-sm font-medium leading-snug text-slate-800">
                        {log.details}
                      </p>
                      {log.actions.length > 0 && (
                        <p className="text-xs leading-snug text-slate-500">
                          Actions: {log.actions.join(", ")}
                        </p>
                      )}
                      {log.error && (
                        <p className="text-xs font-medium leading-snug text-rose-500">
                          {log.error}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

export default Monitoring;
