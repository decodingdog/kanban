import { Form, Menu, StateForm, TMode } from "~/types/modal";
import { initialTask } from "~/data";
import { ActionContext } from ".";
import { Task } from "~/types";

export interface ModalState {
  menu: Menu;
  form: Form;
  stateForm: StateForm;
}

export const state = (): ModalState => ({
  menu: {
    visible: false,
    task: initialTask,
    stateKey: "",
  },
  form: {
    visible: false,
    mode: "regist",
    stateKey: "",
    task: initialTask,
    completed: false,
  },
  stateForm: {
    visible: false,
    completed: false,
  },
});

export const mutations = {
  setModal(
    state: ModalState,
    { name, modalInfo }: { name: string; modalInfo: Menu | Form | StateForm }
  ) {
    state[name] = { ...state[name], ...modalInfo };
  },
};

export const actions = {
  openMenuModal(
    { commit }: ActionContext,
    { stateKey, task }: { stateKey: string; task: Task }
  ) {
    commit("setModal", {
      name: "menu",
      modalInfo: { visible: true, task, stateKey },
    });
  },
  closeMenuModal({ commit }: ActionContext) {
    commit("setModal", {
      name: "menu",
      modalInfo: { visible: false, task: initialTask, stateKey: "" },
    });
  },
  openFormModal(
    { commit }: ActionContext,
    { mode, task, stateKey }: { mode: TMode; task: Task; stateKey: string }
  ) {
    commit("setModal", {
      name: "form",
      modalInfo: { visible: true, mode, task, stateKey, completed: false },
    });
  },
  closeFormModal({ commit }: ActionContext) {
    commit("setModal", {
      name: "form",
      modalInfo: {
        visible: false,
        mode: "regist",
        task: initialTask,
        stateKey: "",
      },
    });
  },
  openStateFormModal({ commit }: ActionContext) {
    commit("setModal", {
      name: "stateForm",
      modalInfo: { visible: true, completed: false },
    });
  },
  closeStateFormModal({ commit }: ActionContext) {
    commit("setModal", {
      name: "stateForm",
      modalInfo: { visible: false },
    });
  },
};
