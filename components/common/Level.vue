<!-- Task Level Component : value 별 색상 및 제목 출력 -->
<template>
  <div :class="`level-${value} rounded-pill`">
    <span>{{ capitalize(value) }}</span>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";

import { TLevel } from "~/types";
import { capitalize } from "~/utils/string";

export default {
  props: {
    value: {
      type: String as PropType<TLevel>,
      default: "none",
    },
  },
  setup() {
    return { capitalize };
  },
};
</script>

<style lang="scss" scoped>
.level-high {
  @include level;

  background-color: $high-color;
}
.level-medium {
  @include level;

  background-color: $medium-color;
}
.level-low {
  @include level;

  background-color: $low-color;
}
.level-none {
  @include level;

  background-color: $none-color;
}
</style>
