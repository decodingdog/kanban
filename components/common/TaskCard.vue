<template>
  <v-card
    class="my-5 px-3 rounded-lg"
    draggable="true"
    @dragstart="onDragStart"
    @click="openFormModal"
  >
    <v-row>
      <v-col>
        <Level :value="task.level" />
      </v-col>
      <v-col>
        <v-spacer />
      </v-col>
      <v-col>
        <v-icon class="float-right" @click.stop="openMenuModal"
          >mdi-dots-horizontal</v-icon
        >
      </v-col>
    </v-row>
    <v-card-title css="task-title">{{ task.title }}</v-card-title>
  </v-card>
</template>

<script lang="ts">
import { PropType, SetupContext } from "vue";
import { EmitsOptions } from "vue/types/v3-setup-context";
import { useContext } from "@nuxtjs/composition-api";

import Level from "./Level.vue";
import { Task } from "~/types";
import { initialTask } from "~/data";

interface ITaskCardProps {
  stateKey: string;
  task: Task;
}

export default {
  props: {
    stateKey: {
      type: String,
      default: "",
      required: true,
    },
    task: {
      type: Object as PropType<Task>,
      default() {
        return initialTask;
      },
    },
  },
  setup(
    { stateKey, task }: ITaskCardProps,
    { emit }: SetupContext<EmitsOptions>
  ) {
    const { store } = useContext();

    const onDragStart = () => {
      emit("on-selected-item");
    };

    const openMenuModal = () => {
      store.dispatch("modal/openMenuModal", { stateKey, task });
    };

    const openFormModal = () => {
      store.dispatch("modal/openFormModal", {
        mode: "modify",
        task,
        stateKey,
      });
    };

    return {
      onDragStart,
      openMenuModal,
      openFormModal,
    };
  },
  components: { Level },
};
</script>

<style lang="scss" scoped>
.task-title {
  color: $none-color;
}
</style>
