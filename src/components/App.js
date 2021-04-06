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
            url: ""
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
        // add new task
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
            return this.setState({todos: items})
        }
        /* Save todo list */
        // remove task
        const todoItems = this.state.todos.filter(item => !item.completed ? item : false)
        if(todoItems.length !== this.state.todos.length) {
            // fetch random meme
            const fetchURL = async () => {
                try {
                    const res = await fetch("https://meme-api.herokuapp.com/gimme")
                    const data = await res.json()
                    await this.setState({todos: todoItems, url: data.url}) // update DOM
                }
                catch {
                    console.log("bzzz 🐝")
                }
            }
            fetchURL()
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
                        <button onClick={this.handleClick}>save</button> {/* cs - custom style*/}
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
                    </form><br /><br />
                    <section className="memeCon">
                        <span className="memeHol">
                            <h2>Fetch Rand Meme</h2>
                            {this.state.url
                             ?
                                <img id="meme" src={this.state.url} />
                             :
                                null
                            }
                        </span>
                    </section>
                </main>
            </div>
        )
    }
}

export default App

/*
// save task to filesystem
let data = ["todosData = " + JSON.stringify(this.state.todos) + " export default todosData"],
    filename = "todosData.js",
    type = "application/javascript",
    file = new Blob(data, {type: type}),
    a = document.createElement("a"),
    url = URL.createObjectURL(file)
a.href = url
a.download = filename
document.body.appendChild(a)
a.click()
setTimeout(function() {
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
}, 0);
*/
