import { ActionContext } from ".";
import { STATE } from "~/models/state";
import { TASK } from "~/models/task";
import { State, Task } from "~/types";

export interface KanbanState {
  stateList: State[];
  isDraggable: boolean;
}

export const state = (): KanbanState => ({
  stateList: [],
  isDraggable: true,
});

export const mutations = {
  setStateList(state: KanbanState, stateList: State[]) {
    state.stateList = stateList;
  },
  setDraggable(state: KanbanState, isDraggable: boolean) {
    state.isDraggable = isDraggable;
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
    { commit }: ActionContext,
    { key, task }: { key: string; task: Task }
  ) {
    // 데이터 업데이트되는 동안 Task Card 가 drag 되지않도록 정지
    commit("setDraggable", false);
    const { success } = await TASK.updaetTask(key, task);
    if (success) {
      commit("setDraggable", true);
    }
    return success;
  },
  async delTask(
    { commit }: ActionContext,
    { key, task }: { key: string; task: Task }
  ) {
    // 데이터 업데이트되는 동안 Task Card 가 drag 되지않도록 정지
    commit("setDraggable", false);
    const { success } = await TASK.delTask(key, task);
    if (success) {
      commit("setDraggable", true);
    }
    return success;
  },
};
