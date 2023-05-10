<template>
  <v-card
    class="my-5 px-3 rounded-lg"
    draggable="true"
    @dragstart="onDragStart"
    @click="openFormModal"
  >
    <v-row>
      <v-col>
        <Level :value="'none'" />
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
import { PropType, SetupContext, inject } from "vue";
import { EmitsOptions } from "vue/types/v3-setup-context";

import { PROVIDE_KEY } from "~/const";
import Level from "./Level.vue";
import { Task, MenuProvide, FormProvide } from "~/types";
import { initialTask } from "~/data/task";

interface ITaskCardProps {
  task: Task;
}

export default {
  props: {
    task: {
      type: Object as PropType<Task>,
      default() {
        return initialTask;
      },
    },
  },
  setup({ task }: ITaskCardProps, { emit }: SetupContext<EmitsOptions>) {
    const menuModal = inject<MenuProvide>(PROVIDE_KEY.menu);
    const formModal = inject<FormProvide>(PROVIDE_KEY.form);

    const onDragStart = () => {
      emit("on-selected-item");
    };

    const openMenuModal = () => {
      menuModal?.open(task);
    };

    const openFormModal = () => {
      formModal?.open("modify", task);
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
