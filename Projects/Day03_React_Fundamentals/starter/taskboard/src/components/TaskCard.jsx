function TaskCard({ task }) {
    return (
        <article>
            <h3>{task.title}</h3>
            {task.assignee && <p>Assignee: {task.assignee}</p>}
            <p>Points: {task.points}</p>
        </article>
    );
}

export default TaskCard;