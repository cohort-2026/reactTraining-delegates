import MemberCard from "./MemberCard.jsx";

function TeamList({ members }) {
  return (
    <ul className="team-list">
      {members.map((member) => (
        // key lets React tell these list items apart
        <li key={member.id}>
          <MemberCard {...member} />
        </li>
      ))}
    </ul>
  );
}
export default TeamList;
