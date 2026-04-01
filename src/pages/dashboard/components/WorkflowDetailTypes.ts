export type WorkflowSummary = {
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

export type WorkflowCondition = {
  field: string;
  operator: string;
  value: string;
};

export type WorkflowAction = {
  actionType: string;
  domain: string;
  description: string;
  payload: string;
};

export type WorkflowDetails = {
  subtitle: string;
  runCount: string;
  successRate: string;
  lastRunFull: string;
  triggerSource: string;
  triggerDescription: string;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  metadata: {
    owner: string;
    created: string;
    lastUpdated: string;
  };
};

export type ExecutionLog = {
  status: "success" | "skipped";
  timestamp: string;
  details: string;
  actions: string;
};
