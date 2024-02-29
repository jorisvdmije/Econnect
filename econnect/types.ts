export type Groep = {
  groep: string;
  tarief: number;
};

export type EconnectItem = {
  id: string;
  description: string;
  tariefEconnect: number;
  tarief: number;
  status: string;
  taskDate: string;
  taskType: string;
  studentName: string;
  workflowId: string | null;
};

export type WorkflowItem = {
  id: number;
  amount: number;
  price: number;
  taskDate: string;
  description: string;
  amountAssigned: number;
};
