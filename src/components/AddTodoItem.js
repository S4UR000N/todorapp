import React from "react"

function AddTodoItem(props) {
    return (
        <section>
            <input
                type="text"
                name="inputText"
                value={props.state.inputText}
                onChange={e => props.handleChange(e)}
            />
            <button className="btn btn-primary btn-sm addBtn" onClick={e => props.handleClick(e, props.state.inputText)}>add</button>
        </section>
    )
}

export default AddTodoItem
