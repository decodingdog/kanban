<template>
  <v-row fluid :style="{ flexWrap: 'nowrap', overflowX: 'scroll' }">
    <v-col
      v-for="state in stateList"
      :key="state.stateId"
      cols="12"
      sm="4"
      md="3"
      class="mt-5 mx-2 pa-0"
    >
      <StateCard
        :state="state"
        @on-selected-item="onSelectedItem"
        @on-change-state="onChangeState"
      />
    </v-col>
    <v-col>
      <button @click="openStateFormModal">
        <v-icon>mdi-plus-circle</v-icon>
      </button>
    </v-col>
    <StateFormModal
      :visible="stateFormModal.visible"
      @on-dismiss="closeStateFormModal"
      @on-complete="completeStateFormModal"
    />
  </v-row>
</template>

<script lang="ts">
import { reactive, ref } from "vue";

import { State, Task } from "~/types";
import StateCard from "~/components/common/StateCard.vue";
import FormModal from "~/components/common/FormModal.vue";
import StateFormModal from "~/components/common/StateFormModal.vue";

export default {
  setup() {
    const selectedItem = ref<Task | null>(null);
    const stateList = ref<State[]>([
      {
        stateId: 0,
        stateNm: "Todo",
        tasks: [
          {
            taskId: 0,
            stateId: 0,
            title: "안녕하세요",
            cn: "안녕하세요.....",
            registDt: "2022-03-10",
          },
          {
            taskId: 1,
            stateId: 0,
            title: "안녕하세요",
            cn: "안녕하세요.....",
            registDt: "2022-03-10",
          },
        ],
      },
      {
        stateId: 1,
        stateNm: "In progress",
        tasks: [],
      },
      {
        stateId: 2,
        stateNm: "Done",
        tasks: [],
      },
      {
        stateId: 3,
        stateNm: "Test",
        tasks: [],
      },
    ]);
    const stateFormModal = reactive<{ visible: boolean }>({ visible: false });

    const onSelectedItem = (task: Task) => {
      selectedItem.value = task;
    };

    const onChangeState = (nextStateId: number) => {
      if (selectedItem.value?.stateId === nextStateId) return;

      stateList.value = stateList.value.map((state: State) => {
        let tasks = state.tasks;

        if (selectedItem.value?.stateId === state.stateId) {
          tasks = state.tasks.filter(
            (task: Task) => selectedItem.value?.taskId !== task.taskId
          );
        } else if (nextStateId === state.stateId) {
          tasks = [
            ...state.tasks,
            { ...selectedItem.value, stateId: state.stateId } as Task,
          ];
        }

        return { ...state, tasks };
      });
      selectedItem.value = null;
    };

    const openStateFormModal = () => {
      stateFormModal.visible = true;
    };

    const completeStateFormModal = () => {
      // refresh state list
    };

    const closeStateFormModal = () => {
      stateFormModal.visible = false;
    };

    return {
      stateList,
      stateFormModal,
      onChangeState,
      onSelectedItem,
      openStateFormModal,
      completeStateFormModal,
      closeStateFormModal,
    };
  },
  components: { FormModal, StateCard, StateFormModal },
};
</script>

<style></style>
