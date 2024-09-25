<script setup lang="ts">
import { ref } from "vue";

import FridgeItem from "@/components/FridgeItem.vue";
import { groceryItems } from "@@/mocks/items";
import type { Item } from "@@/types/Item";
import SolarFridgeBoldDuotone from "~icons/solar/fridge-bold-duotone";

const items = ref<Item[]>(groceryItems);

const removeItem = (id: string) => {
    items.value = items.value.filter((item) => item.id !== id);
};
</script>

<template>
  <main class="flex-1 flex flex-col bg-orange-100/50 px-2 py-6">
    <h1 class="text-center text-4xl font-black text-orange-400 tracking-widest uppercase flex items-center justify-center mb-6">
        <span>Fri</span>
        <SolarFridgeBoldDuotone class="text-3xl -ml-1 -mr-0.5" />
        <span>ge</span>
    </h1>
    <ul class="grid grid-cols-1 gap-3">
      <li v-for="item in items" :key="item.id">
        <a :href="`/item/${item.id}`">
          <FridgeItem :item="item" @remove="removeItem(item.id)" />
        </a>
      </li>
    </ul>
  </main>
</template>
