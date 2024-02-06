import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import TodoForm from './TodoForm.js';
import TodoList from './TodoList.js';

function App() {
  /* var todoItems = [
    { id: 0, value: 'React', done: false, delete: false }
  ]; */
  var [state, setState] = useState({ todoItems: [] });
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/items')
      .then(response => {
        setState({ todoItems: [...response.data] });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  var addTodoItem = (value) => {
    var newItem = {
      id: state.todoItems.length,
      value: value,
      done: false,
      delete: false
    };
    axios.post('http://127.0.0.1:8000/items', {
      todoItem: newItem
    })
      .then(response => {
        setState({ todoItems: [...response.data] });
      })
      .catch(error => {
        console.log(error);
      });
  };

  var deleteTodoItem = (item) => {
    axios.delete('http://127.0.0.1:8000/items', {
      data: {
        id: item.id
      }
    })
      .then(response => {
        setState({ todoItems: [...response.data] })
      })
  };

  var updateTodoItem = (item) => {
    item.done = !item.done;
    setState({ todoItems: [...state.todoItems] });
  };

  return (
    <div>
      <h1>TodoList</h1>
      <TodoForm addTodoItem={addTodoItem} />
      <TodoList todoItems={state.todoItems} deleteTodoItem={deleteTodoItem} updateTodoItem={updateTodoItem} />
    </div>
  );
}

export default App;
