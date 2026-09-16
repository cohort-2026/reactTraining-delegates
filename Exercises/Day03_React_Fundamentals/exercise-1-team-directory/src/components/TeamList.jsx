import MemberCard from "./MemberCard.jsx";

function TeamList({ members }) {
  return (
    <ul className="team-list">
      {members.map((member) => (
        <li>
          <MemberCard {...member} />
        </li>
      ))}
    </ul>
  );
}
export default TeamList;
