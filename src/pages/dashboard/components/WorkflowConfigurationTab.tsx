import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import type { WorkflowSummary, WorkflowDetails } from "./WorkflowDetailTypes";

export default function WorkflowConfigurationTab({
  workflow,
  details,
}: {
  workflow: WorkflowSummary;
  details: WorkflowDetails;
}) {
  return (
    <TabsContent value="configuration" className="space-y-3 pr-3">
      <Card className="rounded-xl border-slate-200 p-4">
        <h3 className="text-lg font-medium text-slate-900">Trigger Event</h3>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge className="rounded-md px-2 py-0.5 text-sm">
            {workflow.triggerEvent}
          </Badge>
          <Badge variant="outline" className="rounded-md px-2 py-0.5 text-sm">
            {details.triggerSource}
          </Badge>
        </div>
        <p className="mt-3 text-sm text-slate-600">
          {details.triggerDescription}
        </p>
      </Card>

      <Card className="rounded-xl border-slate-200 p-4">
        <h3 className="text-lg font-medium text-slate-900">
          Conditions ({details.conditions.length})
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Filters that determine when the workflow executes
        </p>
        <div className="mt-3 space-y-2">
          {details.conditions.map((condition) => (
            <div
              key={`${condition.field}-${condition.operator}`}
              className="flex flex-wrap items-center gap-2 rounded-md bg-slate-100 px-3 py-2"
            >
              <span className="text-sm font-medium text-slate-800">
                {condition.field}
              </span>
              <Badge variant="outline" className="rounded-md text-sm">
                {condition.operator}
              </Badge>
              <span className="text-sm text-slate-700">{condition.value}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="rounded-xl border-slate-200 p-4">
        <h3 className="text-lg font-medium text-slate-900">
          Actions ({details.actions.length})
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Actions executed when conditions match
        </p>

        <div className="mt-3 space-y-3">
          {details.actions.map((action, actionIndex) => (
            <div
              key={`${action.actionType}-${action.domain}`}
              className="rounded-lg border border-slate-200 bg-white p-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="rounded-md px-2 text-sm">
                  {actionIndex + 1}
                </Badge>
                <span className="text-sm font-medium text-slate-800">
                  {action.actionType}
                </span>
                <Badge variant="secondary" className="rounded-md px-2 text-sm">
                  {action.domain}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                {action.description}
              </p>
              <pre className="mt-2 overflow-x-auto rounded-md bg-slate-100 p-3 text-sm text-slate-700">
                {action.payload}
              </pre>
            </div>
          ))}
        </div>
      </Card>

      <Card className="rounded-xl border-slate-200 p-4">
        <h3 className="text-lg font-medium text-slate-900">Metadata</h3>
        <div className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
          <p>
            <span className="font-medium text-slate-500">Owner:</span>{" "}
            {details.metadata.owner}
          </p>
          <p>
            <span className="font-medium text-slate-500">Created:</span>{" "}
            {details.metadata.created}
          </p>
          <p>
            <span className="font-medium text-slate-500">Last Updated:</span>{" "}
            {details.metadata.lastUpdated}
          </p>
        </div>
      </Card>
    </TabsContent>
  );
}
