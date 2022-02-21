import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { ImProfile, ImTicket } from "react-icons/im";
import { FiUsers } from "react-icons/fi";

const links = [
  { id: 1, text: "profile", path: "profile", icon: <ImProfile /> },
  { id: 2, text: "add ticket", path: "add-ticket", icon: <ImTicket /> },
  { id: 3, text: "all tickets", path: "all-tickets", icon: <MdQueryStats /> },
  { id: 4, text: "stats", path: "/", icon: <IoBarChartSharp /> },
  { id: 5, text: "all users", path: "all", icon: <FiUsers /> },
];

export default links;
