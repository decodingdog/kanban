import { Task } from ".";

export type TMode = "regist" | "modify";

export interface Modal {
  visible: boolean;
}

export interface Menu extends Modal {
  task: Task;
  stateKey: string;
}

export interface Form extends Modal {
  mode: TMode;
  stateKey: string;
  task: Task;
  completed: boolean;
}

export interface StateForm extends Modal {
  completed: boolean;
}
