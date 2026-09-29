function MemberCard({ name, role, openTasks }) {
  return (
    // JSX uses className, not class
    <article className="member-card">
      <h3>{name}</h3>
      <p>{role}</p>
      {/* 0 would show on screen, so compare first */}
      {openTasks > 0 && <span className="badge">Open tasks: {openTasks}</span>}
    </article>
  );
}
export default MemberCard;
