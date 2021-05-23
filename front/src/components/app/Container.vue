<template>
  <div>
    <InputMessage/>
    <ul v-if="todos.length">
      <MessageList
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @remove="removeTodo"
      />
    </ul>
    <p v-else>Nothing left in the list. Add a new todo in the input above.</p>
  </div>
</template>

<script>
import InputMessage from "../app/InputMessage.vue";
import MessageList from "../app/MessageList.vue";

let nextTodoId = 1;

export default {
    name:'Container',
  components: {
    InputMessage,
    MessageList,
  },
  data() {
    return {
      newTodoText: "",
      todos: [
        {
          id: nextTodoId++,
          text: "Learn Vue",
        },
        {
          id: nextTodoId++,
          text: "Learn about single-file components",
        },
        {
          id: nextTodoId++,
          text: "Fall in love",
        },
      ],
    };
  },
  methods: {
    addTodo() {
      const trimmedText = this.newTodoText.trim();
      if (trimmedText) {
        this.todos.push({
          id: nextTodoId++,
          text: trimmedText,
        });
        this.newTodoText = "";
      }
    },
    removeTodo(idToRemove) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== idToRemove;
      });
    },
  },
};
</script>