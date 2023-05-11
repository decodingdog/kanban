import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import { useFetch } from "@nuxtjs/composition-api";
import { Store } from "vuex/types/index";
import { RootState } from "~/store";

import { State } from "~/types";
import { db } from "~/utils/firebase";

export const useStateListFetch = (store: Store<RootState>) => {
  return useFetch(async () => {
    const getStateList = async () => {
      const states = collection(db, "users/LTCFqVgoQudx3ZGJ5QUA/states");
      const q = query(states, orderBy("registDt"));
      const statesShapshot = await getDocs(q);

      const arr: State[] = statesShapshot.docs.map(
        (doc) => ({ ...doc.data(), key: doc.id } as State)
      );

      return arr;
    };

    const stateList = await getStateList();
    store.commit("kanban/setStateList", stateList);
  });
};
