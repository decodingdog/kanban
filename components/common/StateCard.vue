<!-- Progress State Card Component -->
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
      <v-icon @click="delState">mdi-close</v-icon>
    </v-card-title>
    <v-btn class="add-btn" @click="addTask">
      <v-icon>mdi-add</v-icon>
      <span>Add task</span>
    </v-btn>
    <TaskCard
      v-for="task in state.tasks"
      :key="`${state.key}_${task.registDt}`"
      :stateKey="state.key"
      :task="task"
      @on-selected-item="handleSelectedItem(state.key, task)"
    />
  </v-card>
</template>

<script lang="ts">
import { PropType, SetupContext } from "vue";
import { EmitsOptions } from "vue/types/v3-setup-context";
import { useContext } from "@nuxtjs/composition-api";

import { State, Task } from "~/types";
import { initialTask, initialState } from "~/data";
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
    const { store } = useContext();

    const addTask = () => {
      store.dispatch("modal/openFormModal", {
        mode: "regist",
        stateKey: state.key,
        task: initialTask,
      });
    };

    const onDrop = () => {
      emit("on-change-state", state.key);
    };

    const handleSelectedItem = (key: string, task: Task) => {
      emit("on-selected-item", { key, task });
    };

    const delState = async () => {
      if (!confirm("삭제하시겠습니까?")) return;

      await store.dispatch("kanban/delState", state.key);
      emit("on-refresh");
    };

    return { addTask, onDrop, handleSelectedItem, delState };
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
