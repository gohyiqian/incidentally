import moment from "moment";
import { FaCalendarAlt } from "react-icons/fa";
import { BsTools } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Ticket";
import TicketInfo from "./TicketInfo";

const Ticket = ({
  _id,
  title,
  description,
  ticketType,
  createdAt,
  priority,
  status,
}) => {
  const { setEditTicket, deleteTicket } = useAppContext();

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{description.charAt(0)}</div>
        <div className="info">
          <p>{description}</p>
          <p>{title}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <TicketInfo icon={<FaCalendarAlt />} text={date} />
          <TicketInfo icon={<BsTools />} text={ticketType} />
          <TicketInfo icon={<FiAlertTriangle />} text={status} />
          <TicketInfo icon={<FiAlertTriangle />} text={priority} />
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/dashboard/add-ticket"
              className="btn edit-btn"
              onClick={() => setEditTicket(_id)}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteTicket(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Ticket;
