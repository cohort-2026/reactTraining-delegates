function MemberCard({ name, role, openTasks }) {
  return (
    <article className="member-card">
      <h3>{name}</h3>
      <p>{role}</p>
      {/* {openTasks && <span className="badge">Open tasks: {openTasks}</span>} */}
      {openTasks === 0 ? <span></span> : <span className="badge">Open tasks: {openTasks}</span>}
    </article>
  );
}
export default MemberCard;
