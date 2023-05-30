import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import moment from "moment";

import { db } from "~/utils/firebase";

export const STATE = {
  addState: async (title: string) => {
    try {
      const states = collection(db, "users/LTCFqVgoQudx3ZGJ5QUA/states");
      await addDoc(states, {
        stateNm: title,
        registDt: moment(new Date()).format("yyyy-MM-dd HH:mm:ss"),
        tasks: [],
      });

      return { success: true };
    } catch (e) {
      return { success: false };
    }
  },
  delState: async (key: string) => {
    try {
      const stateDoc = await doc(
        db,
        `users/LTCFqVgoQudx3ZGJ5QUA/states/${key}`
      );
      await deleteDoc(stateDoc);

      return { success: true };
    } catch (e) {
      return { success: false };
    }
  },
};
