<script setup lang="ts">
import FridgeItem from "@/components/FridgeItem.vue";
import type { Item } from "../../types/Item";
import { ref } from "vue";
import { groceryItems } from "../../mocks/items";

const items = ref<Item[]>(groceryItems);

const removeItem = (id: string) => {
    items.value = items.value.filter((item) => item.id !== id);
};
</script>

<template>
  <main class="flex-1 flex flex-col bg-orange-100/50 px-2 py-6">
    <h1 class="text-center text-4xl font-black text-orange-400 tracking-widest uppercase mb-6">Fridge</h1>
    <ul class="grid grid-cols-1 gap-3">
      <li v-for="item in items" :key="item.id">
        <FridgeItem :item="item" @remove="removeItem(item.id)" />
      </li>
    </ul>
  </main>
</template>
