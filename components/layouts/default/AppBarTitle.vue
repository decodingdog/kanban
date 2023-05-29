<!-- 상단 헤더 제목 -->
<template>
  <v-toolbar-title v-if="!isEdit" class="ml-2">
    {{ title }}
  </v-toolbar-title>
  <v-text-field
    v-else
    v-model="title"
    placeholder="제목을 입력해주세요."
    outlined
    hide-details
    @change="onChangeTitle"
  />
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: { isEdit: { type: Boolean, default: false } },
  setup() {
    const title = ref<string>("Kanban 보드");

    const onChangeTitle = (value: string) => {
      title.value = value;
    };
    return { title, onChangeTitle };
  },
};
</script>

<style lang=""></style>
