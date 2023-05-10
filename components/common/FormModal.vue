<template>
  <v-dialog v-model="visible" persistent width="1024">
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
                required
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Title*" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea label="Desription" />
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
import { PropType, SetupContext } from "vue";
import { EmitsOptions } from "vue/types/v3-setup-context";
import { initialTask } from "~/data/task";
import { TMode, Task, IFormModalProps } from "~/types";

export default {
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
    task: {
      type: Object as PropType<Task>,
      default() {
        return initialTask;
      },
    },
  },
  setup({ mode, task }: IFormModalProps, { emit }: SetupContext<EmitsOptions>) {
    const onSave = () => {
      console.log(mode);
      console.log(task);

      if (mode === "regist") {
      } else {
      }

      onDismiss();
    };

    const onDismiss = () => {
      emit("on-dismiss");
    };

    return { onSave, onDismiss };
  },
};
</script>

<style lang=""></style>
