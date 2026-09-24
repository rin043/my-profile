function BookCard({ title, author, rating, comment }) {
    return (
    <div className="bg-white rounded-2xl shadow-2xl p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-gray-500">著者: {author}</p>
        <p>評価: {rating}</p>
        <p>コメント: {comment}</p>
    </div>
    );
}

export default BookCard;
