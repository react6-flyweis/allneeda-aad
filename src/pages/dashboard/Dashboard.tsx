import { Activity, CheckCircle2, Workflow } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/common_components/PageHeader";
import WorkflowTable from "@/pages/dashboard/components/WorkflowTable";

type OverviewStat = {
  title: string;
  value: string;
  delta: string;
  deltaClassName: string;
  icon: React.ComponentType<{ className?: string }>;
  iconClassName: string;
};

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
              <Card key={stat.title} className="gap-0 py-3">
                <CardContent className="px-3 flex gap-2 items-center">
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-white ring-1 ring-slate-200">
                    <StatIcon className={`size-6 ${stat.iconClassName}`} />
                  </span>
                  <div>
                    <p className="text-xs text-slate-700">{stat.title}</p>
                    <p className="text-2xl font-semibold leading-none text-slate-900">
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

      <WorkflowTable />
    </div>
  );
}

export default Dashboard;
