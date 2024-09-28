<script lang="ts" setup>
import dayjs from "dayjs";

import { cn } from "~/assets/utils/cn";

type Props = {
  value: string;
  class: string;
};

const props = defineProps<Props>();

const expiresIn = computed(() => {
    const expiryDate = dayjs(props.value);
    return expiryDate.diff(dayjs(), "day");
});
</script>

<template>
  <p
    :class="
      cn('font-medium text-xs text-gray-400', {
        'text-red-500': expiresIn < 0,
        'text-orange-400': expiresIn <= 2 && expiresIn >= 0,
      }, props.class)
    "
  >
    <span v-if="expiresIn > 0">
      Expires in {{ Math.abs(expiresIn) }} days
    </span>
    <span v-else-if="expiresIn === 0">Expires today</span>
    <span v-else>Expired {{ Math.abs(expiresIn) }} days ago</span>
  </p>
</template>