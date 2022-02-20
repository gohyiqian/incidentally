const createTicket = async (req, res) => {
  res.send("create ticket");
};

const getAllTickets = async (req, res) => {
  res.send("all tickets");
};

const getTicket = async (req, res) => {
  res.send("one ticket");
};

const updateTicket = async (req, res) => {
  res.send("update ticket");
};

const deleteTicket = async (req, res) => {
  res.send("delete ticket");
};

export { createTicket, getAllTickets, getTicket, updateTicket, deleteTicket };
