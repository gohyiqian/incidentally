import Wrapper from "../assets/wrappers/TicketInfo";

const TicketInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      {text === "high" && (
        <span className="text" style={{ color: "red" }}>
          {text}
        </span>
      )}
      {text !== "high" && <span className="text">{text}</span>}
    </Wrapper>
  );
};

export default TicketInfo;
