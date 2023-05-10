import { State, Task } from "~/types";

export const initialTask: Task = {
  taskId: 0,
  title: "",
  cn: "",
  registDt: "",
};

export const initialState: State = {
  stateId: 0,
  stateNm: "",
  order: 0,
  registDt: "",
  tasks: [],
};
