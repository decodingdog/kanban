<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-if="!isEdit" class="ml-2">
        {{ title }}
      </v-toolbar-title>
      <v-text-field
        v-else
        v-mode="title"
        placeholder="제목을 입력해주세요."
        outlined
        hide-details
      />
      <v-icon class="ml-2" @click="isEdit = !isEdit">
        mdi-{{ isEdit ? "check-circle-outline" : "pencil-circle-outline" }}
      </v-icon>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "제목",
      isEdit: false,
    };
  },
};
</script>
