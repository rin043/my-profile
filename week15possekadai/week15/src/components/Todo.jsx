function Todo({ todo, onToggle, onDelete }) {
    return (
        <li className="flex items-center gap-2">
            <span className={`flex-1 cursor-pointer ${
                    todo.done ? "line-through text-gray-400": ""}`}
                    onClick={() => onToggle(todo.id)}>
                {todo.text}
            </span>

            <button className="border px-3 py-1 rounded"
                    onClick={() => onDelete(todo.id)}>
                削除
            </button>
        </li>
    );
}

export default Todo;