import { doc, getDoc, updateDoc } from "firebase/firestore";
import moment from "moment";

import { State, Task } from "~/types";
import { db } from "~/utils/firebase";

export const TASK = {
  addTask: async (key: string, task: Task) => {
    try {
      const stateDoc = await doc(
        db,
        `users/LTCFqVgoQudx3ZGJ5QUA/states/${key}`
      );
      const stateSnapshot = await getDoc(stateDoc);
      const tasks = (stateSnapshot.data() as State).tasks;
      await updateDoc(stateDoc, {
        tasks: tasks.concat({
          ...task,
          registDt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        }),
      });

      return { success: true };
    } catch (e) {
      return { success: false };
    }
  },
  updaetTask: async (key: string, task: Task) => {
    try {
      const stateDoc = await doc(
        db,
        `users/LTCFqVgoQudx3ZGJ5QUA/states/${key}`
      );
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

      return { success: true };
    } catch (e) {
      return { success: false };
    }
  },
  delTask: async (key: string, task: Task) => {
    try {
      const stateDoc = await doc(
        db,
        `users/LTCFqVgoQudx3ZGJ5QUA/states/${key}`
      );
      const stateSnapshot = await getDoc(stateDoc);
      const tasks = (stateSnapshot.data() as State).tasks;
      await updateDoc(stateDoc, {
        tasks: tasks.filter((v) => v.registDt && v.registDt !== task.registDt),
      });

      return { success: true };
    } catch (e) {
      return { success: false };
    }
  },
};
