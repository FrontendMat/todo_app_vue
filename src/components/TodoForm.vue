<template>
    <form @submit.prevent class="bg-white p-6 rounded-lg shadow-card mb-8">
        <input
            v-model="title"
            type="text"
            class="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter title"
        />
        <textarea
            v-model="description"
            class="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter description"
            rows="3"
        ></textarea>
        <button
            v-if="!isEditing"
            @click="addTodo"
            type="submit"
            class="w-full bg-primary-500 text-white py-3 px-6 rounded-md hover:bg-primary-600 shadow-button"
        >
            Add Todo
        </button>
        <div v-else class="flex space-x-3">
            <button
                @click="cancelEditing"
                type="button"
                class="w-full bg-danger-500 text-white p-3 rounded-md hover:bg-danger-600 shadow-button"
            >
                Cancel
            </button>
            <button
                @click="updateTodo"
                type="submit"
                class="w-full bg-success-500 text-white p-3 rounded-md hover:bg-success-600 shadow-button"
            >
                Update
            </button>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        todoToEdit: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            title: "",
            description: "",
        };
    },

    emits: {
        "add-todo": (value) => typeof value === "object" && value !== null,
        "update-todo": (value) => typeof value === "object" && value !== null,
        "cancel-edit": null,
    },
    watch: {
        todoToEdit(todo) {
            if (!todo) return;
            this.title = todo.title;
            this.description = todo.description;
        },
    },
    computed: {
        isEditing() {
            return !!this.todoToEdit;
        },
    },
    methods: {
        addTodo() {
            if (!this.validateForm()) {
                alert("Please, enter a title and description");
                return;
            }

            const newData = {
                title: this.title,
                description: this.description,
            };

            this.$emit("add-todo", newData);
            this.resetForm();
        },
        updateTodo() {
            if (!this.validateForm()) {
                alert("Please, enter a title and description");
                return;
            }

            const editedData = {
                id: this.todoToEdit.id,
                title: this.title,
                description: this.description,
            };

            this.$emit("update-todo", editedData);
            this.resetForm();
        },
        cancelEditing() {
            this.resetForm();
            this.$emit("cancel-edit");
        },
        resetForm() {
            this.title = "";
            this.description = "";
        },
        validateForm() {
            return this.title.length > 0 && this.description.length > 0;
        },
    },
};
</script>
