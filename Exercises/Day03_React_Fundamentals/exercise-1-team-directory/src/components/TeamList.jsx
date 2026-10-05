import MemberCard from "./MemberCard";

function TeamList({ team }) {
  return (
    <div className="team-list">
      {team.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}

export default TeamList;