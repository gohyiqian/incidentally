import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Ticket from "./Ticket";
import Wrapper from "../assets/wrappers/TicketsContainer";
import PageBtnContainer from "./PageBtnContainer";

const TicketsContainer = () => {
  const {
    getTickets,
    tickets,
    isLoading,
    page,
    totalTickets,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    getTickets();
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort]);
  if (isLoading) {
    return <Loading center />;
  }

  if (tickets.length === 0) {
    return (
      <Wrapper>
        <h2>No tickets to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalTickets} tickets{tickets.length > 1 && "s"} found
      </h5>

      <div className="jobs">
        {tickets.map((ticket) => {
          return <Ticket key={ticket._id} {...ticket} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default TicketsContainer;
