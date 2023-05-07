<template>
  <v-app-bar fixed app>
    <AppBarTitle :isEdit="isEdit" />
    <v-icon class="ml-2" @click="isEdit = !isEdit" data-test="editIcon">
      mdi-{{ isEdit ? "check-circle-outline" : "pencil-circle-outline" }}
    </v-icon>
    <v-spacer />
    <button @mousedown="onScrollStart('left')" @mouseup="onScrollEnd">
      <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
    </button>
    <button @mousedown="onScrollStart('right')" @mouseup="onScrollEnd">
      <v-icon>mdi-arrow-right-bold-circle-outline</v-icon>
    </button>
  </v-app-bar>
</template>

<script lang="ts">
import { ref, computed } from "vue";

import AppBarTitle from "./AppBarTitle.vue";

interface IAppBarProps {
  scrollRef: null | Element;
}

export default {
  props: ["scrollRef"],
  setup(props: IAppBarProps) {
    const isEdit = ref<boolean>(false);
    const timeout = ref<null | NodeJS.Timer>(null);
    const scrollRef = computed(() => props.scrollRef);

    const onScrollStart = (flag: "left" | "right") => {
      const el = scrollRef.value?.firstChild as Element;
      const x = flag === "left" ? -10 : 10;

      timeout.value = setInterval(() => {
        el.scrollTo(el.scrollLeft + x, 0);
      }, 10);
    };

    const onScrollEnd = () => {
      clearInterval(timeout.value as NodeJS.Timer);
    };

    return {
      isEdit,
      timeout,
      onScrollStart,
      onScrollEnd,
    };
  },
  components: { AppBarTitle },
};
</script>

<style lang=""></style>
