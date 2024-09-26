<script setup lang="ts">
import dayjs from "dayjs";
import { computed } from "vue";

import Card from "@/components/ui/Card.vue";
import SwipeableItem from "@/components/ui/SwipeableItem.vue";
import { cn } from "@/utils/cn";
import type { Item } from "@@/types/Item";

type Props = {
    item: Item;
};

type Emits = {
    (event: "remove"): void;
};

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const expiresIn = computed(() => {
    const expiryDate = dayjs(props.item.expiresAt);
    return expiryDate.diff(dayjs(), "day");
});
</script>

<template>
  <SwipeableItem @remove="emit('remove')">
    <Card>
      <div class="flex items-center gap-4">
        <p class="text-3xl w-10 text-center shrink-0">
          {{ item.emoji }}
        </p>
        <div
          class="truncate"
          test="1"
        >
          <p class="font-medium text-lg text-gray-500 truncate">
            {{ item.name }}
          </p>
          <p
            :class="
              cn('font-medium text-xs text-gray-400', {
                'text-red-500': expiresIn < 0,
                'text-orange-400': expiresIn <= 2 && expiresIn >= 0,
              })
            "
          >
            <span v-if="expiresIn > 0">
              Expires in {{ Math.abs(expiresIn) }} days
            </span>
            <span v-else-if="expiresIn === 0">Expires today</span>
            <span v-else>Expired {{ Math.abs(expiresIn) }} days ago</span>
          </p>
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
