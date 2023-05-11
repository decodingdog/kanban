export type TLevel = "high" | "medium" | "low" | "none";

export interface Task {
  title: string;
  cn: string;
  level: TLevel;
  registDt: string;
}

export interface State {
  key: string;
  stateNm: string;
  tasks: Task[];
  registDt: string;
}

export interface User {
  key: string;
  email: string;
  title: string;
}
