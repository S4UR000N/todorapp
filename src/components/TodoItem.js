import React from "react"

function TodoItem(props) {
    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={props.item.completed}
                onChange={e => props.handleChange(e, props.item.id)}
            />
            <p className={props.item.completed ? "completed-style" : null}>{props.item.text}</p>
        </div>
    )
}

export default TodoItem
