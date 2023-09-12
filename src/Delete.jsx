const Delete = ({ index, onDelete }) => {
    const handleDelete = () => {
        onDelete(index);
    }

    return (
        <button onClick={handleDelete}>
            DELETE
        </button>
    );
};
export default Delete;  