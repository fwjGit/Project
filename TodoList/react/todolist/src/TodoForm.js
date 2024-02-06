import React from 'react'
import { useRef } from 'react'

function TodoForm(props) {
    var todoListValue = useRef();
    var addTodoItem = () => {
        props.addTodoItem(todoListValue.current.value);
        todoListValue.current.value = '';
    };
    return (
        <div>
            <input type='text' placeholder='add or search something...' ref={todoListValue} />
            <button type='submit' onClick={() => addTodoItem()}>添加</button>
        </div>
    )
}

export default TodoForm
