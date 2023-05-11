import { State, Task } from "~/types";

export const initialTask: Task = {
  title: "",
  cn: "",
  level: "none",
  registDt: "",
};

export const initialState: State = {
  key: "",
  stateNm: "",
  registDt: "",
  tasks: [],
};
