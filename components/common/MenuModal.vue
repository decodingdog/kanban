<template>
  <v-dialog v-model="visible" width="auto">
    <v-card>
      <v-card-title> Dialog 1 </v-card-title>
      <v-card-text>
        <v-btn color="primary" class="ma-2" @click="openLevelModal">
          Set Level
        </v-btn>
      </v-card-text>
      <v-card-text>
        <v-btn color="primary" class="ma-2" @click="onDelete">
          Delete Task
        </v-btn>
      </v-card-text>
      <v-card-actions>
        <v-btn variant="text" @click="$emit('on-dismiss')"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { ref, PropType } from "vue";
import { initialTask } from "~/data/task";

import { Task } from "~/types";

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
  },
  setup() {
    const visible = ref<boolean>(false);

    const openLevelModal = () => {
      visible.value = true;
    };

    const closeLevelModal = () => {
      visible.value = false;
    };

    const onDelete = () => {
      console.log("delte task");
    };

    return { onDelete, openLevelModal, closeLevelModal };
  },
};
</script>

<style lang=""></style>
