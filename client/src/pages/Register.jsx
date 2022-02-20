import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { Logo, FormRow, Alert } from "../components";

const initialState = {
  username: "",
  email: "",
  password: "",
  isLoggedIn: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  // const { user, isLoading, showAlert, displayAlert, setupUser } =
  //   useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, isLoggedIn } = values;
  };

  const toggleMember = () => {
    setValues({ ...values, isLoggedIn: !values.isLoggedIn });
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isLoggedIn ? "Login" : "Register"}</h3>
        {/* {showAlert && <Alert />} */}
        {!values.isLoggedIn && (
          <FormRow
            type="text"
            name="username"
            value={values.username}
            handleChange={handleChange}
          />
        )}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          {values.isLoggedIn ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isLoggedIn ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
