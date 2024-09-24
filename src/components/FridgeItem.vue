<script setup lang="ts">
import Card from "@/components/ui/Card.vue";
import type { Item } from "../../types/Item";
import dayjs from "dayjs";
import { computed, ref } from "vue";
import { cn } from "@/utils/cn";
import { useSwipeAction } from "@/composables/useSwipeAction";
import SolarTrashBinTrashLinear from "~icons/solar/trash-bin-trash-linear";

type Props = {
    item: Item
}

type Emits = {
    (event: "remove"): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const elementRef = ref<HTMLElement | null>(null);

const expiresIn = computed(() => {
    const expiryDate = dayjs(props.item.expiresAt);
    return expiryDate.diff(dayjs(), "day");
});

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
        <div ref="elementRef" class="relative transition-all duration-75 ease-linear">
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
        </div>
    </div>
</template>
