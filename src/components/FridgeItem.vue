<script setup lang="ts">
import Card from "@/components/ui/Card.vue";
import type { Item } from "../../types/Item";
import dayjs from "dayjs";
import {computed} from "vue";
import {cn} from "@/utils/cn";

type Props = {
  item: Item
}

const props = defineProps<Props>();

const expiresIn = computed(() => {
  const expiryDate = dayjs(props.item.expiryDate);
  return expiryDate.diff(dayjs(), "day");
});
</script>

<template>
  <Card>
    <div class="flex items-center gap-4">
      <p class="text-3xl">{{ item.emoji }}</p>
      <div>
        <p class="font-medium text-lg text-gray-500">{{ item.name }}</p>
        <p
          :class="cn('font-medium text-xs text-gray-400', {
            'text-red-500': expiresIn < 0,
            'text-orange-400': expiresIn <= 2 && expiresIn >= 0,
          })"
        >
          <span v-if="expiresIn > 0">Expires in {{ Math.abs(expiresIn) }} days</span>
          <span v-else-if="expiresIn === 0">Expires today</span>
          <span v-else>Expired {{ Math.abs(expiresIn) }} days ago</span>
        </p>
      </div>
      <div
        :class="cn('self-stretch w-4 -mx-4 -my-3 ml-auto', {
          'bg-green-300': item.quantity > 50,
          'bg-orange-300': item.quantity <= 50 && item.quantity > 20,
          'bg-red-300': item.quantity <= 20,
        })"
      >
      </div>
    </div>
  </Card>
</template>