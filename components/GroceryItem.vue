<script setup lang="ts">
import dayjs from "dayjs";

import { cn } from "~/assets/utils/cn";
import Card from "~/components/ui/Card.vue";
import SwipeableItem from "~/components/ui/SwipeableItem.vue";
import type { Item } from "~/types/Item";

type Props = {
    item: Item;
};

type Emits = {
    (event: "remove"): void;
};

defineProps<Props>();

const emit = defineEmits<Emits>();
</script>

<template>
  <SwipeableItem @remove="emit('remove')">
    <Card class="select-none">
      <div class="flex items-center gap-4">
        <p class="text-3xl w-10 text-center shrink-0">
          {{ item.emoji }}
        </p>
        <div class="truncate">
          <p class="font-medium text-lg text-gray-500 truncate">
            {{ item.name }}
          </p>
          <FormattedExpiryDate :value="item.expiresAt" />
        </div>
        <div
          :class="
            cn('self-stretch w-4 shrink-0 -mx-4 -my-3 ml-auto', {
              'bg-green-300': item.quantity > 50,
              'bg-orange-300': item.quantity <= 50 && item.quantity > 20,
              'bg-red-300': item.quantity <= 20,
            })
          "
        />
      </div>
    </Card>
  </SwipeableItem>
</template>
