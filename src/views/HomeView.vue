<script setup lang="ts">
import FridgeItem from "@/components/FridgeItem.vue";
import type { Item } from "../../types/Item";
import { ref } from "vue";
import dayjs from "dayjs";

const items = ref<Item[]>([
  {
    name: "Milk",
    type: "dairy",
    quantity: 100,
    emoji: "🥛",
    expiryDate: dayjs().add(5, "day").toISOString(),
  },
  {
    name: "Eggs",
    type: "dairy",
    quantity: 50,
    emoji: "🥚",
    expiryDate: dayjs().add(7, "day").toISOString(),
  },
  {
    name: "Bread",
    type: "bakery",
    quantity: 20,
    emoji: "🍞",
    expiryDate: dayjs().add(3, "day").toISOString(),
  },
  {
    name: "Banana",
    type: "fruit",
    quantity: 80,
    emoji: "🍌",
    expiryDate: dayjs().subtract(2, "day").toISOString(),
  },
  {
    name: "Apple",
    type: "fruit",
    quantity: 60,
    emoji: "🍎",
    expiryDate: dayjs().toISOString(),
  },
  {
    name: "Orange",
    type: "fruit",
    quantity: 40,
    emoji: "🍊",
    expiryDate: dayjs().add(6, "day").toISOString(),
  },
]);
</script>

<template>
  <main class="flex-1 flex flex-col bg-orange-100/50 px-2 pt-6 pb-3">
    <h1 class="text-center text-4xl font-black text-orange-400 tracking-widest uppercase mb-6">Fridge</h1>
    <ul class="grid grid-cols-1 gap-3">
      <li v-for="item in items" :key="item.id">
        <FridgeItem :item="item" />
      </li>
    </ul>
  </main>
</template>
