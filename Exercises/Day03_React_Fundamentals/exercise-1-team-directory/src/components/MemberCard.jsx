function MemberCard({ member }) {
  return (
    <div className="member-card">
      <h2>{member.name}</h2>
      <p>{member.role}</p>

      {member.openTasks > 0 && (
        <span className="badge">
          Open tasks: {member.openTasks}
        </span>
      )}
    </div>
  );
}

export default MemberCard;