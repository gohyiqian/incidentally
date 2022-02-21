import moment from "moment";
import { FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Ticket";
import TicketInfo from "./TicketInfo";

const Ticket = ({ _id, title, description, ticketType, createdAt, status }) => {
  //   const { setEditJob, deleteJob } = useAppContext();

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{title.charAt(0)}</div>
        <div className="info">
          <p>{description}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <TicketInfo icon={<FaCalendarAlt />} text={date} />
          <TicketInfo icon={<FaBriefcase />} text={ticketType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link to="/add-job" className="btn edit-btn">
              Edit
            </Link>
            <button type="button" className="btn delete-btn">
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Ticket;
