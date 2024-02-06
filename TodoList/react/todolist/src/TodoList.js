import React from 'react'
import TodoListItem from './TodoListItem'

function TodoList(props) {
    var deleteTodoItem=(item)=>{
        props.deleteTodoItem(item);
    };
    var updateTodoItem=(item)=>{
        props.updateTodoItem(item);
    };
    return (
        <ul>
            {props.todoItems.map((item) => {
                if (item.delete) return;
                return <TodoListItem key={item.id} item={item} deleteTodoItem={deleteTodoItem} updateTodoItem={updateTodoItem} />
            })}
        </ul>
    )
}

export default TodoList