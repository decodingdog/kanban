import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import moment from "moment";

import { State, Task } from "~/types";
import { db } from "~/utils/firebase";
import { ActionContext } from ".";

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
  addState({ rootState }: ActionContext, title: string) {
    const states = collection(db, "users/LTCFqVgoQudx3ZGJ5QUA/states");
    addDoc(states, {
      stateNm: title,
      registDt: moment(new Date()).format("yyyy-MM-dd HH:mm:ss"),
      tasks: [],
    });
  },
  async delState({ rootState }: ActionContext, key: string) {
    const stateDoc = await doc(db, `users/LTCFqVgoQudx3ZGJ5QUA/states/${key}`);
    await deleteDoc(stateDoc);
  },
  async addTask(
    { rootState }: ActionContext,
    { key, task }: { key: string; task: Task }
  ) {
    const stateDoc = await doc(db, `users/LTCFqVgoQudx3ZGJ5QUA/states/${key}`);
    const stateSnapshot = await getDoc(stateDoc);
    const tasks = (stateSnapshot.data() as State).tasks;
    await updateDoc(stateDoc, {
      tasks: tasks.concat({
        ...task,
        registDt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      }),
    });
  },
  async updaetTask(
    { rootState }: ActionContext,
    { key, task }: { key: string; task: Task }
  ) {
    const stateDoc = await doc(db, `users/LTCFqVgoQudx3ZGJ5QUA/states/${key}`);
    const stateSnapshot = await getDoc(stateDoc);
    const tasks = (stateSnapshot.data() as State).tasks.map((v) => {
      if (task.registDt === v.registDt) {
        return { ...v, ...task };
      }
      return v;
    });
    await updateDoc(stateDoc, {
      tasks,
    });
  },
  async delTask(
    { rootState }: ActionContext,
    { key, task }: { key: string; task: Task }
  ) {
    const stateDoc = await doc(db, `users/LTCFqVgoQudx3ZGJ5QUA/states/${key}`);
    const stateSnapshot = await getDoc(stateDoc);
    const tasks = (stateSnapshot.data() as State).tasks;
    await updateDoc(stateDoc, {
      tasks: tasks.filter((v) => v.registDt && v.registDt !== task.registDt),
    });
  },
};
