export type TLevel = "high" | "medium" | "low" | "none";

export interface Task {
  taskId: number;
  title: string;
  cn: string;
  registDt: string;
}

export interface State {
  stateId: number;
  stateNm: string;
  tasks: Task[];
  order: number;
  registDt: string;
}

export type TMode = "regist" | "modify";

export interface IFormModalProps {
  visible: boolean;
  mode: TMode;
  task: Task;
}

export interface IMenuModalProps {
  visible: boolean;
  task: Task;
}

export interface MenuProvide extends IMenuModalProps {
  open: (task: Task) => void;
  close: () => void;
}

export interface FormProvide extends IFormModalProps {
  open: (mode: TMode, task: Task) => void;
  close: () => void;
}
