<script setup lang="ts">
import { tv } from "tailwind-variants";

import { cn } from "@/utils/cn";

const variants = tv({
    base: "bg-white rounded-xl ring-1 ring-gray-200 shadow-lg overflow-hidden",
    variants: {
        size: {
            sm: "px-3 py-2",
            md: "px-4 py-3",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

type Props = {
    size?: keyof typeof variants.variants["size"];
};

defineProps<Props>();
</script>

<template>
  <article :class="cn(variants({ size }))">
    <slot />
  </article>
</template>
