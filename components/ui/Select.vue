<script setup lang="ts" generic="T">
import { tv } from "tailwind-variants";

import { cn } from "~/assets/utils/cn";
import RadixIconsCaretSort from "~icons/radix-icons/caret-sort";

const variants = tv({
    base: "bg-white active:bg-gray-50 rounded-lg ring-1 ring-gray-200 text-sm shadow-md text-gray-700 outline-0 cursor-pointer select-none pl-3 pr-8 py-2",
});

type Props = {
    options: T[];
};

const modelValue = defineModel<T>();

defineProps<Props>();

const onChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    modelValue.value = target.value as T;
};
</script>

<template>
  <div class="relative">
    <select
      :value="modelValue"
      :class="cn(variants(), 'appearance-none')"
      v-bind="$attrs"
      @change="onChange"
    >
      <option
        value=""
        disabled
        selected
      >
        <slot name="default" />
      </option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
    <RadixIconsCaretSort class="absolute top-1/2 right-2 -translate-y-1/2 size-5 text-gray-700 pointer-events-none" />
  </div>
</template>