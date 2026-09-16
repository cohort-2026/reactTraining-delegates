function MemberCard({ name, role, openTasks }) {
  return (
    <article class="member-card">
      <h3>{name}</h3>
      <p>{role}</p>
      {openTasks && <span className="badge">Open tasks: {openTasks}</span>}
    </article>
  );
}
export default MemberCard;
