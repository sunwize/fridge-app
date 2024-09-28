<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "radix-vue";

const modelValue = defineModel<number>();

const value = ref([modelValue.value ?? 0]);

watch(value, (value) => {
    modelValue.value = value[0];
});
</script>

<template>
  <SliderRoot
    v-model="value"
    class="relative flex items-center select-none touch-none h-5"
    :max="100"
    :step="1"
  >
    <SliderTrack class="relative bg-orange-400 grow rounded-full h-3">
      <SliderRange class="absolute bg-green-400 rounded-full h-full" />
    </SliderTrack>
    <SliderThumb class="outline-0 cursor-pointer">
      <slot name="thumb" />
    </SliderThumb>
  </SliderRoot>
</template>