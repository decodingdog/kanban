import { collection, query, where, getDocs } from "firebase/firestore";
import { ActionContext as VuexActionContext } from "vuex/types/index";

import { User } from "~/types";
import { db } from "~/utils/firebase";
import { KanbanState } from "./kanban";

interface IndexState {
  userInfo: User;
}

export interface RootState extends IndexState {
  kanban: KanbanState;
}

export type ActionContext = VuexActionContext<RootState, RootState>;

export const state = (): IndexState => ({
  userInfo: {
    email: "",
    key: "",
    title: "",
  },
});

export const mutations = {
  setUserInfo(state: IndexState, userInfo: User) {
    state.userInfo = userInfo;
  },
};

export const actions = {
  async login(
    { commit }: ActionContext,
    { email, password }: { email: string; password: string }
  ) {
    const users = collection(db, "users");
    const q = query(
      users,
      where("email", "==", email),
      where("password", "==", password)
    );
    const queryShapshot = await getDocs(q);
    const user: User[] = queryShapshot.docs.map(
      (doc) =>
        ({
          key: doc.id,
          ...doc.data(),
        } as User)
    );

    if (user.length > 0) {
      commit("setUserInfo", user[0]);
    }
  },
};
