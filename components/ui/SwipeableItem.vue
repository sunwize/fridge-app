<script setup lang="ts">
import { cn } from "~/assets/utils/cn";
import { useSwipeAction } from "~/composables/useSwipeAction";
import SolarCartLarge3Linear from "~icons/solar/cart-large-3-linear";
import SolarTrashBinTrashLinear from "~icons/solar/trash-bin-trash-linear";

type Emits = {
    (event: "remove"): void;
};

const emit = defineEmits<Emits>();

const elementRef = ref<HTMLElement | null>(null);

const { isSwipedLeft, isSwipedRight } = useSwipeAction(elementRef, {
    onSwipeLeft: () => {
        emit("remove");
    },
    onSwipeRight: () => {
        console.log("Swiped right");
    },
});
</script>

<template>
  <div class="relative rounded-xl bg-gradient-to-r from-green-400 via-white to-red-400">
    <div class="absolute top-1/2 left-5 -translate-y-1/2">
      <SolarCartLarge3Linear
        :class="cn('text-white size-10', {
          'animate-jiggle': isSwipedRight
        })"
      />
    </div>
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
