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
  </v-app>
</template>

<script lang="ts">
import { ref } from "vue";

import AppBar from "~/components/layouts/default/AppBar.vue";

export default {
  setup() {
    const scrollRef = ref<null | Element>(null);

    return { scrollRef };
  },
  components: { AppBar },
};
</script>
