import { useState } from "react";
import Todo from "./Todo";

const todos= [
    { id: 1, name: "バナナオレを飲む"},
    { id: 2, name: "トイレ掃除をする"},
    { id: 3, name: "朝夜に散歩に行く"},
    { id: 4, name: "特売の肉を買う"},
    { id: 5, name: "すずめに赤い実をあげる"},
    { id: 6, name: "JSの教科書を読む"},
    { id: 7, name: "オアシスに行く"},
]

function App(){
    const [ todos, setTodos ] = useState([]);
    const [ input, setInput ] = useState("");

    const handleAdd = () => {
        if (input.trim() === "") return;

        setTodos([
            ...todos,
            {
                id: Date.now(),
                text: input,
                done: false,
            },
        ]);

        setInput("");

    };

    const handleToggle = (id) => {
        setTodos(
            todos.map((todo) =>
            todo.id === id
            ? { ...todo, done: !todo.done }
            : todo
            )
        );
    };

    const  handleDelete = (id) => {
        setTodos(
            todo.filter((todo) => todo.id !== id)
        );
    };

    return(
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                Todoリスト
            </h1>

            <div>
                <input
                    className="border rounded px-3 py-2"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter"){
                            handleAdd();
                        }
                    }}
                />

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleAdd}>
                    追加
                </button>
            </div>

            <ul className="space-y-2">
                {todo.map((todo) => (
                    <Todo
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    />
                ))}
            </ul>
        </main>
    );
}

export default App;