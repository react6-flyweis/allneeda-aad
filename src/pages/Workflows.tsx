import PageHeader from "@/components/common_components/PageHeader";
import WorkflowTable from "@/pages/dashboard/components/WorkflowTable";

export default function Workflows() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="All Workflows"
        subtitle="Create, edit, and manage trigger-based automation workflows"
      />
      <WorkflowTable />
    </div>
  );
}
