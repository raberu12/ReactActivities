const Delete = ({ index, onDelete }) => {
    const handleDelete = () => {
        onDelete(index);
    }

    return (
        <button onClick={handleDelete}>
            Delete
        </button>
    );
};
export default Delete;  