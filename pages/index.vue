<template>
  <v-row fluid :style="{ flexWrap: 'nowrap', overflowX: 'scroll' }">
    <v-col
      v-for="status in statusList"
      :key="status.statusNm"
      cols="12"
      sm="4"
      md="3"
      class="mt-5 mx-2 pa-0"
    >
      <v-card color="#EEEEEE" class="pa-2">
        <v-card-title :style="{ color: '#878787' }">
          <span>{{ status.statusNm }}</span>
          <v-spacer />
          <v-icon @click="delStatus">mdi-close</v-icon>
        </v-card-title>
        <v-btn
          :style="{
            width: '100%',
            backgroundColor: 'initial',
            boxShadow: 'none',
            justifyContent: 'center',
            alignItems: 'center',
          }"
          @click="addTask"
        >
          <v-icon>mdi-add</v-icon>
          <span>Add task</span>
        </v-btn>
        <v-card
          v-for="task in status.tasks"
          :key="`${status.statusNm}_${task.taskId}`"
          class="my-2"
        >
          <v-card-title>{{ task.title }}</v-card-title>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { ref } from "vue";

interface Task {
  taskId: number;
  statusId: number;
  title: string;
  cn: string;
  registDt: string;
}

interface Status {
  statusId: number;
  statusNm: string;
  tasks: Task[];
}

export default {
  setup() {
    const statusList = ref<Status[]>([
      {
        statusId: 0,
        statusNm: "Todo",
        tasks: [
          {
            taskId: 0,
            statusId: 0,
            title: "dd",
            cn: "dd",
            registDt: "2022-03-10",
          },
        ],
      },
      {
        statusId: 1,
        statusNm: "In progress",
        tasks: [],
      },
      {
        statusId: 2,
        statusNm: "Done",
        tasks: [],
      },
      {
        statusId: 3,
        statusNm: "Test",
        tasks: [],
      },
    ]);

    const delStatus = () => {
      console.log("delete status");
    };

    const addTask = () => {
      console.log("add task");
    };

    return { statusList, delStatus, addTask };
  },
};
</script>

<style></style>
