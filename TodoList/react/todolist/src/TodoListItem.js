import React from 'react'

function TodoListItem(props) {
    var deleteTodoItem = () => {
        props.deleteTodoItem(props.item);
    };
    var updateTodoItem = () => {
        props.updateTodoItem(props.item);
    };
    return (
        <li>
            <label>
                {props.item.value.toString() + ' '}
                {props.item.done ? "已办结" : "待办"}
                {" "}
                <button onClick={() => updateTodoItem()}>修改</button>
                <button onClick={() => deleteTodoItem()}>删除</button>
            </label>
        </li>
    )
}

export default TodoListItem