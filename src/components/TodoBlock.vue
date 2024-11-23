<template>
    <div class="max-w-2xl mx-auto p-6 rounded-xl">
        <h1
            class="text-primary-500 text-3xl font-heading font-bold text-center mb-8"
        >
            Your Daily Manager
        </h1>
        <todo-form
            @add-todo="addTodo"
            @update-todo="updateTodo"
            @cancel-edit="cancelEditing"
            :todo-to-edit="todoToEdit"
        />
        <ul v-if="todos.length > 0" class="space-y-4">
            <todo-item
                v-for="todo in todos"
                :key="todo.id"
                :todo="todo"
                :edit-id="todoToEdit?.id"
                @edit-todo="editTodo"
                @delete-todo="deleteTodo"
                @change-status="changeStatus"
            />
        </ul>
        <div v-else class="text-center text-gray-500 mt-4">
            No tasks available. Add a new right now!
        </div>
    </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import TodoForm from "./TodoForm.vue";
import { TODOS_KEY } from "@/lib/consts";

export default {
    components: { TodoItem, TodoForm },
    data() {
        return {
            todos: [],
            todoToEdit: null,
        };
    },
    mounted() {
        const todosData = localStorage.getItem(TODOS_KEY);

        if (todosData) {
            this.todos = JSON.parse(todosData);
        }
    },
    watch: {
        todos() {
            localStorage.setItem(TODOS_KEY, JSON.stringify(this.todos));
        },
    },
    methods: {
        addTodo(todo) {
            const newTodo = {
                id: Date.now(),
                title: todo.title,
                description: todo.description,
                isDone: false,
            };

            this.todos = [...this.todos, newTodo];
        },
        deleteTodo(id) {
            this.todos = this.todos.filter((item) => item.id !== id);
        },
        updateTodo(todo) {
            this.todos = this.todos.map((item) =>
                item.id === todo.id ? todo : item,
            );

            this.$nextTick().then((this.todoToEdit = null));
        },
        changeStatus(todo) {
            this.todos = this.todos.map((item) => {
                const isCurrentTodo = item.id === todo.id;
                return isCurrentTodo ? { ...item, isDone: todo.isDone } : item;
            });
        },
        editTodo(todo) {
            this.todoToEdit = { ...todo };
        },
        cancelEditing() {
            this.todoToEdit = null;
        },
    },
};
</script>
