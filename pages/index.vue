<script setup lang="ts">
import GroceryItem from "~/components/GroceryItem.vue";
import Select from "~/components/ui/Select.vue";
import { groceryItems } from "~/mocks/items";
import type { Item } from "~/types/Item";
import SolarFridgeBoldDuotone from "~icons/solar/fridge-bold-duotone";

const items = ref<Item[]>(groceryItems);
const sortBy = ref("Most recent");
const sortOptions = ["Most recent", "Expiry date ⬆️", "Expiry date ⬇️", "Quantity ⬆️", "Quantity ⬇️"];

const itemsSorted = computed(() => {
    const _items = [...items.value];

    if (sortBy.value === "Expiry date ⬆️") {
        _items.sort((a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime());
    }

    if (sortBy.value === "Expiry date ⬇️") {
        _items.sort((a, b) => new Date(b.expiresAt).getTime() - new Date(a.expiresAt).getTime());
    }

    if (sortBy.value === "Quantity ⬆️") {
        _items.sort((a, b) => a.quantity - b.quantity);
    }

    if (sortBy.value === "Quantity ⬇️") {
        _items.sort((a, b) => b.quantity - a.quantity);
    }

    return _items;
});

const removeItem = (id: string) => {
    items.value = items.value.filter((item) => item.id !== id);
};
</script>

<template>
  <main class="flex-1 flex flex-col bg-orange-100/50">
    <h1
      class="text-center text-4xl font-black text-orange-400 tracking-widest uppercase flex items-center justify-center mt-6 mb-8"
    >
      <span>Fri</span>
      <SolarFridgeBoldDuotone class="text-3xl -ml-1 -mr-0.5" />
      <span>ge</span>
    </h1>
    <div class="flex items-center justify-end mb-4 px-2">
      <Select
        v-model="sortBy"
        :options="sortOptions"
      >
        <template #default>
          Sort by
        </template>
      </Select>
    </div>
    <ul class="grid grid-cols-1 gap-3 overflow-x-hidden px-2 pb-6">
      <li
        v-for="item in itemsSorted"
        :key="item.id"
      >
        <a :href="`/item/${item.id}`">
          <GroceryItem
            :item="item"
            @remove="removeItem(item.id)"
          />
        </a>
      </li>
    </ul>
  </main>
</template>
