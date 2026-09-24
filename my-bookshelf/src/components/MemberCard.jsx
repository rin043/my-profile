function MemberCard({ name, role, message }) {
    return (
        <div className="bg-white rounded-2xl shadow-2xl p-4">
            <h2 className="text-lg font-bold">{name}</h2>
            <p className="text-gray-500">{role}</p>
            <p>{message}</p>
        </div>
    );
}

export default MemberCard;