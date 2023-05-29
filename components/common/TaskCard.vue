<!-- Taks 정보 Card Component -->
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

    /**
     * drag 처음 감지 되었을때 호출되는 함수
     * drag 된 아이템의 정보를 저장한다.
     */
    const onDragStart = () => {
      emit("on-selected-item");
    };

    /**
     * Menu Option 모달 오픈 함수
     * 메뉴목록: [삭제기능]
     * State Key 와 Task 정보를 넘긴다
     */
    const openMenuModal = () => {
      store.dispatch("modal/openMenuModal", { stateKey, task });
    };

    /**
     * Task 수정을 위한 모달 오픈 함수
     */
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
