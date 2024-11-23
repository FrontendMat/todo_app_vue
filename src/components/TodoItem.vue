<template>
    <li
        class="bg-white p-4 rounded-lg shadow-card"
        :class="{ 'opacity-50': todoIsDone }"
    >
        <div class="flex items-start justify-between gap-2">
            <div>
                <h3 class="text-lg font-heading text-primary-600 font-bold">
                    {{ todo.title }}
                </h3>
                <p class="text-sm text-secondary-600 my-4">
                    {{ todo.description }}
                </p>
            </div>
        </div>
        <div
            class="flex justify-between items-center border-t border-secondary-300 pt-2"
        >
            <button
                :disabled="isBtnDisabled"
                :class="{ 'opacity-50': isBtnDisabled }"
                class="text-primary-500 hover:text-primary-700 font-semibold border border-primary-500 p-2 rounded-md"
                @click="editItem"
            >
                Edit
            </button>
            <button
                @click="changeStatus"
                class="text-success-500 hover:text-success-700 font-semibold border border-successƒ-500 p-2 rounded-md"
            >
                Done
            </button>
            <button
                :disabled="isBtnDisabled"
                :class="{ 'opacity-50': isBtnDisabled }"
                class="text-danger-500 hover:text-danger-700 font-semibold border border-danger-500 p-2 rounded-md"
                @click="deleteItem"
            >
                Delete
            </button>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true,
        },
        editId: {
            type: Number,
            required: false,
            default: null,
        },
    },

    emits: {
        "edit-todo": (value) => typeof value === "object" && value !== null,
        "delete-todo": (id) => typeof id === "number",
        "update-todo": (value) => typeof value === "object" && value !== null,
        "change-status": (value) => typeof value === "object" && value !== null,
    },

    methods: {
        editItem() {
            const todo = { ...this.todo, isEditing: !this.todo.isEditing };
            this.$emit("edit-todo", todo);
        },
        deleteItem() {
            this.$emit("delete-todo", this.todo.id);
        },
        changeStatus() {
            const currentTodo = {
                id: this.todo.id,
                isDone: !this.todo.isDone,
            };

            this.$emit("change-status", currentTodo);
        },
    },

    computed: {
        isEditing() {
            return this.todo.id === this.editId;
        },
        todoIsDone() {
            return this.todo.isDone;
        },
        isBtnDisabled() {
            return this.todoIsDone || this.isEditing;
        },
    },
};
</script>
