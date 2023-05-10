<template>
  <v-app>
    <AppBar :scrollRef="scrollRef" />
    <v-main>
      <v-container fluid ref="scrollRef">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer fixed app>
      <span data-test="year">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

    <MenuModal
      :visible="menuModal.visible"
      :task="menuModal.task"
      @on-dismiss="menuModal.close"
    />
    <FormModal
      :visible="formModal.visible"
      :mode="formModal.mode"
      :task="formModal.task"
      @on-dismiss="formModal.close"
    />
  </v-app>
</template>

<script lang="ts">
import { provide, reactive, ref } from "vue";

import { PROVIDE_KEY } from "~/const";
import AppBar from "~/components/layouts/default/AppBar.vue";
import MenuModal from "~/components/common/MenuModal.vue";
import FormModal from "~/components/common/FormModal.vue";
import { initialTask } from "~/data/task";
import { Task, MenuProvide, FormProvide, TMode } from "~/types";

export default {
  setup() {
    const scrollRef = ref<null | Element>(null);

    const menuModal = reactive<MenuProvide>({
      visible: false,
      task: initialTask,
      open: (task: Task) => {
        menuModal.visible = true;
        menuModal.task = task;
      },
      close: () => {
        menuModal.visible = false;
        menuModal.task = initialTask;
      },
    });

    const formModal = reactive<FormProvide>({
      visible: false,
      mode: "regist",
      task: initialTask,
      open: (mode: TMode, task: Task) => {
        formModal.visible = true;
        formModal.mode = mode;
        formModal.task = task;
      },
      close: () => {
        formModal.visible = false;
        formModal.mode = "regist";
        formModal.task = initialTask;
      },
    });

    // provide
    provide<MenuProvide>(PROVIDE_KEY.menu, menuModal);
    provide<FormProvide>(PROVIDE_KEY.form, formModal);

    return { scrollRef, menuModal, formModal };
  },
  components: { AppBar, MenuModal, FormModal },
};
</script>
