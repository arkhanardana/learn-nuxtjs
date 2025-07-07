<script lang="ts" setup>
import { useCounterStore } from "~/store/use-counter";

definePageMeta({
  layout: "dashboard",
});

const firstName = ref("Arkhan");
const lastName = ref("Ardana");
const fullName = computed(() => `${firstName.value} ${lastName.value}`);

const counter = useCounterStore();
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
    <h1 class="text-3xl font-bold mb-6 text-center text-teal-700">
      Welcome To Post Management
    </h1>

    <div class="w-full max-w-md bg-white p-6 rounded-xl shadow space-y-4">
      <input
        v-model="firstName"
        type="text"
        placeholder="First Name"
        class="w-full px-4 py-2 border border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
      />
      <input
        v-model="lastName"
        type="text"
        placeholder="Last Name"
        class="w-full px-4 py-2 border border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
      />

      <button
        @click="counter.increment"
        class="px-4 py-2 bg-teal-500 items-center text-white rounded-lg cursor-pointer"
      >
        +
      </button>
      <button
        @click="counter.double"
        class="ml-4 px-4 py-2 bg-teal-500 items-center text-white rounded-lg cursor-pointer"
      >
        * 2
      </button>
      <h2 class="text-center text-lg font-semibold text-gray-800 line-clamp-2">
        Full Name: {{ fullName }}
      </h2>

      <h2 class="text-center text-lg font-semibold text-gray-800 line-clamp-2">
        {{ counter.count }}
      </h2>
    </div>
  </div>
</template>
