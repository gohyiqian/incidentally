import { useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const UserProfile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();
  console.log(user);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  console.log(user._id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email) {
      displayAlert();
      return;
    }
    updateUser({ username, email }, user._id);
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="username"
            value={username}
            handleChange={(e) => setUsername(e.target.value)}
          />

          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          <button className="btn btn-block" type="submit">
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default UserProfile;
