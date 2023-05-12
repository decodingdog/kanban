<template>
  <v-row fluid :style="{ flexWrap: 'nowrap', overflowX: 'scroll' }">
    <v-col
      v-for="state in stateList"
      :key="state.key"
      cols="12"
      sm="4"
      md="3"
      class="mt-5 mx-2 pa-0"
    >
      <StateCard
        :state="state"
        @on-selected-item="onSelectedItem"
        @on-change-state="onChangeState"
        @on-refresh="onRefresh"
      />
    </v-col>
    <v-col>
      <button @click="openStateFormModal">
        <v-icon>mdi-plus-circle</v-icon>
      </button>
    </v-col>
    <StateFormModal
      :visible="stateFormModal.visible"
      @on-complete="completeStateFormModal"
    />
    <FormModal
      :visible="formModal.visible"
      :stateKey="formModal.stateKey"
      :mode="formModal.mode"
      :task="formModal.task"
      @on-complete="completeFormModal"
    />
    <MenuModal
      :visible="menuModal.visible"
      :task="menuModal.task"
      :stateKey="menuModal.stateKey"
      @on-refresh="onRefresh"
    />
  </v-row>
</template>

<script lang="ts">
import { ComputedRef, computed, reactive } from "vue";
import { useContext } from "@nuxtjs/composition-api";

import { initialTask } from "~/data";
import { State, Task } from "~/types";
import { Form, Menu, StateForm } from "~/types/modal";
import { useStateListFetch } from "~/hooks/useStateListFetch";
import StateCard from "~/components/common/StateCard.vue";
import FormModal from "~/components/common/FormModal.vue";
import StateFormModal from "~/components/common/StateFormModal.vue";
import MenuModal from "~/components/common/MenuModal.vue";

export default {
  setup() {
    const { store } = useContext();
    const { $fetch } = useStateListFetch(store);
    const formModal: ComputedRef<Form> = computed(() => store.state.modal.form);
    const menuModal: ComputedRef<Menu> = computed(() => store.state.modal.menu);
    const stateFormModal: ComputedRef<StateForm> = computed(
      () => store.state.modal.stateForm
    );

    const stateList: ComputedRef<State[]> = computed(
      () => store.state.kanban.stateList
    );
    const selectedItem = reactive<{ key: string; task: Task }>({
      key: "",
      task: initialTask,
    });

    const onRefresh = () => {
      $fetch();
    };

    const openStateFormModal = () => {
      if (stateList.value.length === 5) {
        alert("열은 총 5개까지만 만들 수 있습니다.");
        return;
      }
      store.dispatch("modal/openStateFormModal");
    };

    const closeStateFormModal = () => {
      store.dispatch("modal/closeStateFormModal");
    };

    const completeStateFormModal = () => {
      closeStateFormModal();
      onRefresh();
    };

    const completeFormModal = () => {
      store.dispatch("modal/closeFormModal");
      onRefresh();
    };

    const onSelectedItem = ({ key, task }: { key: string; task: Task }) => {
      selectedItem.key = key;
      selectedItem.task = task;
    };

    const onChangeState = async (nextKey: string) => {
      if (nextKey === selectedItem.key) return;

      // add task
      await store.dispatch("kanban/addTask", {
        key: nextKey,
        task: selectedItem.task,
      });

      // delete task
      await store.dispatch("kanban/delTask", {
        key: selectedItem.key,
        task: selectedItem.task,
      });

      // init
      selectedItem.key = "";
      selectedItem.task = initialTask;
      onRefresh();
    };

    return {
      stateList,
      menuModal,
      formModal,
      stateFormModal,
      openStateFormModal,
      closeStateFormModal,
      completeStateFormModal,
      completeFormModal,
      onRefresh,
      onChangeState,
      onSelectedItem,
    };
  },
  components: { FormModal, StateCard, StateFormModal, MenuModal },
};
</script>

<style></style>
