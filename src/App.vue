<template>
    <section class="min-h-screen bg-secondary-100 w-full">
        <todo-block />
    </section>
</template>
<script>
import TodoBlock from "@/components/TodoBlock.vue";

export default {
    components: { TodoBlock },
};
</script>
