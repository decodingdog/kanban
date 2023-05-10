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
              <v-text-field
                label="Title"
                v-model="title"
                required
              ></v-text-field>
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
import { SetupContext, ref } from "vue";
import { EmitsOptions } from "vue/types/v3-setup-context";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }: SetupContext<EmitsOptions>) {
    const title = ref<string>("");

    const onDismiss = () => {
      emit("on-dismiss");
    };

    const onSave = () => {
      emit("on-complete");
    };

    return { title, onDismiss, onSave };
  },
};
</script>

<style lang=""></style>
