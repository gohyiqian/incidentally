import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddTicket = () => {
  const {
    // isLoading,
    user,
    isEditing,
    showAlert,
    displayAlert,
    title,
    description,
    project,
    ticketType,
    priority,
    status,
    createTicket,
    handleChange,
    clearValues,
    statusOptions,
    ticketTypeOptions,
    priorityOptions,
  } = useAppContext();

  console.log(user._id);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !project) {
      displayAlert();
      return;
    }
    // if (isEditing) {
    //   editTitle();
    //   return;
    // }
    createTicket(user._id);
  };
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit ticket" : "add ticket"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* title */}
          <FormRow
            type="text"
            name="title"
            value={title}
            handleChange={handleJobInput}
          />
          {/* description */}
          <FormRow
            type="text"
            name="description"
            value={description}
            handleChange={handleJobInput}
          />
          {/* project */}
          <FormRow
            type="text"
            name="project"
            value={project}
            handleChange={handleJobInput}
          />
          {/* ticket type */}
          <FormRowSelect
            name="ticketType"
            labelText="ticket type"
            value={ticketType}
            handleChange={handleJobInput}
            list={ticketTypeOptions}
          />
          {/* ticket priority */}
          <FormRowSelect
            name="priority"
            labelText="priority"
            value={priority}
            handleChange={handleJobInput}
            list={priorityOptions}
          />
          {/* ticket status
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          /> */}
          {/* btn container */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddTicket;
