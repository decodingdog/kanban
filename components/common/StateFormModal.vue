<template>
  <v-dialog v-model="visible" width="auto">
    <v-card>
      <v-card-title>
        <span class="text-h5">New State</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="제목" v-model="title" required />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="onDismiss">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="onSave">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { SetupContext, ref, watch } from "vue";
import { useContext } from "@nuxtjs/composition-api";

interface IStateFormModalProps {
  visible: boolean;
}

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: IStateFormModalProps, { emit }: SetupContext) {
    const { store } = useContext();
    const title = ref<string>("");

    // init
    watch(props, (newVal) => {
      if (!newVal.visible) {
        title.value = "";
      }
    });

    const onSave = () => {
      if (title.value === "") {
        alert("제목을 입력해주요.");
        return;
      }

      store.dispatch("kanban/addState", title.value);
      emit("on-complete");
    };

    const onDismiss = () => {
      store.dispatch("modal/closeStateFormModal");
    };

    return { title, onSave, onDismiss };
  },
};
</script>

<style lang=""></style>
