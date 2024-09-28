<script setup lang="ts">
import FormattedExpiryDate from "~/components/FormattedExpiryDate.vue";
import QuantitySlider from "~/components/QuantitySlider.vue";
import { groceryItems } from "~/mocks/items";

const route = useRoute();

const item = computed(() => groceryItems.find((item) => item.id === route.params.id));

const quantity = ref(item.value?.quantity ?? 0);
</script>

<template>
  <div
    v-if="item"
    class="py-6"
  >
    <div class="text-center px-2">
      <p class="text-6xl">
        {{ item.emoji }}
      </p>
      <h1 class="text-gray-900 font-medium text-4xl leading-snug truncate mt-6">
        {{ item.name }}
      </h1>
      <FormattedExpiryDate
        :value="item.expiresAt"
        class="text-sm"
      />
    </div>
    <div class="mt-12 px-6">
      <p class="text-center text-gray-700 text-xl mb-8">
        How much remaining?
      </p>
      <QuantitySlider v-model="quantity">
        <template #thumb>
          <p class="font-medium text-5xl drop-shadow-md">
            {{ item.emoji }}
          </p>
        </template>
      </QuantitySlider>
    </div>
  </div>
</template>