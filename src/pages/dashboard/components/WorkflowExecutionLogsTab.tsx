import { CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import type { ExecutionLog } from "./WorkflowDetailTypes";

export default function WorkflowExecutionLogsTab({
  executionLogs,
}: {
  executionLogs: ExecutionLog[];
}) {
  return (
    <TabsContent value="execution-logs" className="pr-3">
      <Card className="rounded-xl border-slate-200 p-4">
        <h3 className="text-lg font-medium text-slate-900">
          Execution History
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Recent workflow executions (last 50)
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-185 border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-300">
                <th className="px-3 py-3 text-left text-base font-medium text-slate-900">
                  Status
                </th>
                <th className="px-3 py-3 text-left text-base font-medium text-slate-900">
                  Timestamp
                </th>
                <th className="px-3 py-3 text-left text-base font-medium text-slate-900">
                  Details
                </th>
                <th className="px-3 py-3 text-left text-base font-medium text-slate-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {executionLogs.map((log) => (
                <tr
                  key={`${log.status}-${log.timestamp}`}
                  className="border-b border-slate-300 last:border-0"
                >
                  <td className="px-3 py-3 align-middle">
                    <div className="flex items-center gap-2 text-base text-slate-900">
                      {log.status === "success" ? (
                        <CheckCircle2 className="size-6 text-emerald-600" />
                      ) : (
                        <Circle className="size-6 text-slate-400" />
                      )}
                      <span>
                        {log.status === "success" ? "Success" : "Skipped"}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-base text-slate-900">
                    {log.timestamp}
                  </td>
                  <td className="px-3 py-3 text-base text-slate-900">
                    {log.details}
                  </td>
                  <td className="px-3 py-3 text-base text-slate-900">
                    {log.actions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </TabsContent>
  );
}
