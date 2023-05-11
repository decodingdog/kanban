<template>
  <v-dialog :value="visible" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">New Task</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-select
                :items="['none', 'low', 'medium', 'high']"
                label="Level"
                v-model="form.level"
                required
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Title*"
                v-model="form.title"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea label="Desription" v-model="form.cn" />
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
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
import { PropType, SetupContext, watch, reactive, computed } from "vue";
import { defineComponent, useContext } from "@nuxtjs/composition-api";

import { initialTask } from "~/data";
import { Task } from "~/types";
import { TMode } from "~/types/modal";

interface IFormModalProps {
  visible: boolean;
  mode: TMode;
  stateKey: string;
  task: Task;
}

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true,
    },
    mode: {
      type: String as PropType<TMode>,
      default: "regist",
      required: true,
    },
    stateKey: {
      type: String,
      default: "",
      required: true,
    },
    task: {
      type: Object as PropType<Task>,
      default: initialTask,
    },
  },
  setup(props: IFormModalProps, { emit }: SetupContext) {
    let form = reactive<Task>(props.task);
    const key = computed(() => props.stateKey);
    const { store } = useContext();

    watch(props, (newVal) => {
      if (newVal.visible) {
        form.title = newVal.task.title;
        form.cn = newVal.task.cn;
        form.registDt = newVal.task.registDt;
        form.level = newVal.task.level;
      }
    });

    const onSave = async () => {
      if (form.title === "") {
        alert("제목을 입력해주세요.");
        return;
      }

      if (props.mode === "regist") {
        await store.dispatch("kanban/addTask", { key: key.value, task: form });
      } else {
        await store.dispatch("kanban/updaetTask", {
          key: key.value,
          task: form,
        });
      }

      emit("on-complete");
    };

    const onDismiss = () => {
      store.dispatch("modal/closeFormModal");
    };

    return { form, onSave, onDismiss };
  },
});
</script>

<style lang=""></style>
