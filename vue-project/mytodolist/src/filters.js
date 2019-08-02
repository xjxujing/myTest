export const filters = {
    all(todos) {
      return todos;
    },
    // 返回待办事项的数组(completed为false)
    active(todos) {
      return todos.filter(todo => {
        return !todo.completed;
      });
    },
    // 返回完成事项的数组(complated为true)
    completed(todos) {
      return todos.filter(todo => {
        return todo.completed;
      });
    }
  };