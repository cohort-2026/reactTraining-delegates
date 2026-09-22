function MemberCard({ name, role, openTasks }) {
  return (
    <article className="member-card">
      <h3>{name}</h3>
      <p>{role}</p>
      {openTasks > 0 && (<span className="badge">Open tasks: {openTasks}</span>)}
    </article>
  );
}
export default MemberCard;
