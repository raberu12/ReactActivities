import { useEffect, useState } from 'react'
import Delete from './Delete';
import "./main.css"

function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [disableAdd, setDisableAdd] = useState(false);

    useEffect(() => {
        setDisableAdd((newTodo === "" || !/^[a-zA-z\s]+$/.test(newTodo)))
    }, [newTodo]);

    const handleAddTodo = () => {
        if (newTodo && /^[a-zA-z\s]+$/.test(newTodo)) {
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
        <div className='card'>
            <h1>TO DO LIST</h1>
            <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
            <button onClick={handleAddTodo} disabled={disableAdd}>Add</button>
            <ul>
                {todos.map
                    ((todo, index) => (<li key={index}>
                        <span>{todo}</span>
                    <Delete index={index} onDelete={handleDeleteTodo} />
                    </li>))}
            </ul>
        </div>
    );
}

export default Todo;