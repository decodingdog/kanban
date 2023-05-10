<template>
  <v-card
    color="#EEEEEE"
    class="pa-2"
    @drop.prevent="onDrop"
    @dragenter.prevent
    @dragover.prevent
  >
    <v-card-title :style="{ color: '#878787' }">
      <span>{{ state.stateNm }}</span>
      <v-spacer />
      <v-icon @click="delStatus">mdi-close</v-icon>
    </v-card-title>
    <v-btn class="add-btn" @click="addTask">
      <v-icon>mdi-add</v-icon>
      <span>Add task</span>
    </v-btn>
    <TaskCard
      v-for="task in state.tasks"
      :key="`${state.stateId}_${task.taskId}`"
      :task="task"
      @on-selected-item="handleSelectedItem(task)"
    />
  </v-card>
</template>

<script lang="ts">
import { PropType, SetupContext, inject } from "vue";
import { EmitsOptions } from "vue/types/v3-setup-context";

import { PROVIDE_KEY } from "~/const";
import { FormProvide, State, Task } from "~/types";
import { initialTask, initialState } from "~/data/task";
import TaskCard from "./TaskCard.vue";

interface IStateCardProps {
  state: State;
}

export default {
  props: {
    state: {
      type: Object as PropType<State>,
      default: initialState,
      required: true,
    },
  },
  setup({ state }: IStateCardProps, { emit }: SetupContext<EmitsOptions>) {
    const formModal = inject<FormProvide>(PROVIDE_KEY.form);

    const delStatus = () => {
      if (!confirm("삭제하시겠습니까?")) return;

      console.log(state.stateId);
      console.log("delete status");
    };

    const addTask = () => {
      formModal?.open("regist", initialTask);
    };

    const onDrop = () => {
      emit("on-change-state", state.stateId);
    };

    const handleSelectedItem = (task: Task) => {
      emit("on-selected-item", task);
    };

    return { delStatus, addTask, onDrop, handleSelectedItem };
  },
  components: { TaskCard },
};
</script>

<style scoped>
.add-btn {
  width: 100%;
  background-color: initial;
  box-shadow: none;
  justify-content: center;
  align-items: center;
}
</style>
