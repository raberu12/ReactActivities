import { useState } from 'react'
import Delete from './Delete';

function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    const handleAddTodo = () => {
        if (newTodo) {
            setTodos([...todos, newTodo]);
            setNewTodo("");
        }
    };
    const handleDeleteTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    };
    return (
        <div>
            <h1>TODO LIST</h1>
            <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
            <button onClick={handleAddTodo} style={{margin: '1rem'}}>Add</button>
            <ul>
                {todos.map
                    ((todo, index) => (<li key={index}>{todo}<Delete index={index} onDelete={handleDeleteTodo}/></li>))}
            </ul>
        </div>
    );
}

export default Todo;