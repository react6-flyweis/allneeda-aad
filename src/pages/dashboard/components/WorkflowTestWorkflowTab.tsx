import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TestTube } from "lucide-react";

export default function WorkflowTestWorkflowTab({
  testPayload,
}: {
  testPayload: string;
}) {
  return (
    <TabsContent value="test-workflow" className="pr-3">
      <Card className="rounded-xl border-slate-200 p-4">
        <h3 className="text-lg font-medium text-slate-900">Test Workflow</h3>
        <p className="mt-1 text-sm text-slate-600">
          Test your workflow with a sample event payload (dry run mode)
        </p>

        <div className="mt-5 space-y-2">
          <p className="text-base text-slate-900">Event Payload (JSON)</p>
          <pre className="min-h-55 overflow-x-auto rounded-xl bg-slate-100 p-4 text-sm text-slate-600">
            {testPayload}
          </pre>
        </div>

        <Button className="mt-4 h-11 rounded-xl bg-slate-950 px-5 text-base font-medium text-white hover:bg-slate-900">
          <TestTube className="size-4" />
          Run Test
        </Button>
      </Card>
    </TabsContent>
  );
}
