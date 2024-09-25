<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const itemId = computed(() => route.params.item_id);
</script>

<template>
  <div class="text-center mt-16">{{ itemId }}</div>
</template>