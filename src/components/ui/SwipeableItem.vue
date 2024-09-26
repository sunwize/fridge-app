<script setup lang="ts">
import { ref } from "vue";

import { useSwipeAction } from "@/composables/useSwipeAction";
import { cn } from "@/utils/cn";
import SolarTrashBinTrashLinear from "~icons/solar/trash-bin-trash-linear";

type Emits = {
    (event: "remove"): void;
};

const emit = defineEmits<Emits>();

const elementRef = ref<HTMLElement | null>(null);

const { isSwipedLeft } = useSwipeAction(elementRef, {
    canSwipeRight: false,
    onSwipeLeft: () => {
        emit("remove");
    },
});
</script>

<template>
  <div class="relative rounded-xl bg-red-400">
    <div class="absolute top-1/2 right-5 -translate-y-1/2">
      <SolarTrashBinTrashLinear
        :class="cn('text-white size-10', {
          'animate-jiggle': isSwipedLeft
        })"
      />
    </div>
    <div
      ref="elementRef"
      class="relative transition-all duration-75 ease-linear will-change-transform"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.animate-jiggle {
    animation: jiggle 150ms infinite;
}

@keyframes jiggle {
    0%, 100% {
        transform: rotate(-5deg);
    }
    50% {
        transform: rotate(5deg);
    }
}
</style>
