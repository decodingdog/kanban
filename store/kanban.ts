import { ActionContext } from ".";
import { STATE } from "~/models/state";
import { TASK } from "~/models/task";
import { State, Task } from "~/types";

export interface KanbanState {
  stateList: State[];
}

export const state = (): KanbanState => ({
  stateList: [],
});

export const mutations = {
  setStateList(state: KanbanState, stateList: State[]) {
    state.stateList = stateList;
  },
};

export const actions = {
  /**
   * @param {number} state
   * @returns users 컬렉션 조회
   */
  async addState({}: ActionContext, title: string) {
    const { success } = await STATE.addState(title);
    return success;
  },
  async delState({}: ActionContext, key: string) {
    const { success } = await STATE.delState(key);
    return success;
  },
  async addTask({}: ActionContext, { key, task }: { key: string; task: Task }) {
    const { success } = await TASK.addTask(key, task);
    return success;
  },
  async updaetTask(
    {}: ActionContext,
    { key, task }: { key: string; task: Task }
  ) {
    const { success } = await TASK.updaetTask(key, task);
    return success;
  },
  async delTask({}: ActionContext, { key, task }: { key: string; task: Task }) {
    const { success } = await TASK.delTask(key, task);
    return success;
  },
};
