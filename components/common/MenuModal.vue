<!-- Task Option Menu Component  -->
<template>
  <v-dialog :value="visible" width="auto">
    <v-card>
      <v-card-title>Menu</v-card-title>
      <v-card-text>
        <v-btn color="primary" class="ma-2" @click="delTask">
          Delete Task
        </v-btn>
      </v-card-text>
      <v-card-actions>
        <v-btn variant="text" @click="onDismiss"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { PropType, SetupContext, computed } from "vue";
import { initialTask } from "~/data";

import { Task } from "~/types";
import { useContext } from "@nuxtjs/composition-api";

interface IMenuModalProps {
  visible: boolean;
  task: Task;
  stateKey: string;
}

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    task: {
      type: Object as PropType<Task>,
      default() {
        return initialTask;
      },
    },
    stateKey: {
      type: String,
      default: "",
    },
  },
  setup(props: IMenuModalProps, { emit }: SetupContext) {
    const { store } = useContext();
    const key = computed(() => props.stateKey);

    const delTask = async () => {
      await store.dispatch("kanban/delTask", {
        key: key.value,
        task: props.task,
      });
      emit("on-refresh");
      onDismiss();
    };

    const onDismiss = () => {
      store.dispatch("modal/closeMenuModal");
    };

    return { delTask, onDismiss };
  },
};
</script>

<style lang=""></style>
