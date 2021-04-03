import React from 'react';
import TodoItem from "./TodoItem"
import todosData from "./../todosData"
import './App.css';

class App extends React.Component {
    // constructor
    constructor(props) {
        super(props)
        this.state = {
            todos: todosData,
            inputText: "",
        }
        this.textInput = React.createRef()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    // methods
    handleSubmit(e) {
        e.preventDefault()
    }
    handleChange(e, id) {
        if(!id) {
            const {name, value} = e.target
            return this.setState({[name]: value})
        }
        this.setState((prevState) => {
            const updatedTodos = prevState.todos.map((todo) => {
                if(todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo
            })
            return {
                todos: updatedTodos
            }
        })
    }
    handleClick(e, inputText) {
        if(inputText) {
            // 1. Make a shallow copy of the items
            let items = [...this.state.todos]
            // 2. Make a shallow copy of the item you want to mutate
            let item = {...items[items.length-1]}
            // 3. Replace the property you're intested in
            item.id = item.id+1
            item.text = inputText
            item.completed = false
            // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
            items[items.length] = item
            // 5. Set the state to our new copy
            this.setState({todos: items})
        }
    }

    // render jsx
    render() {
        const todoItems = this.state.todos.map(item => <TodoItem key={item.id} item={item} handleChange={this.handleChange}/>)

        return (
            <div className="App">
                <main>
                    <form className="todo-list" onSubmit={this.handleSubmit}>
                        {todoItems}
                        <button>save</button> {/* cs - custom style*/}
                    </form>

                    <form className="todo-list" onSubmit={this.handleSubmit}>
                        <section>
                        <input
                            type="text"
                            name="inputText"
                            value={this.state.inputText}
                            onChange={e => this.handleChange(e)}
                        />
                        <button onClick={e => this.handleClick(e, this.state.inputText)}>add</button>
                        </section>
                    </form>
                </main>
            </div>
        )
    }
}

export default App

/*
handleClick(clickOption, e) {
    switch(clickOption) {
        case "add":
            if(this.state.newTodoItem) {
                // 1. Make a shallow copy of the items
                let items = [...this.state.todos];
                // 2. Make a shallow copy of the item you want to mutate
                let item = {...items[items.length-1]};
                // 3. Replace the property you're intested in
                item.id = item.id+1
                item.text = this.textInput // target is button not input element
                item.completed = false

                // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                // items[1] = item;
                console.log(items);
                console.log(item);
                console.log(e.target);
                // 5. Set the state to our new copy
                // this.setState({items});
            }
        break;
        case "save":
            this.setState(prevState => {
                return {
                    ...prevState,
                    isSaving: !prevState.isSaving
                }
        })
        break;
        default:
            return null
    }
}
*/
