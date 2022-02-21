import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/appContext";

const AllUsers = () => {
  const { user } = useAppContext();
  console.log(user);
  return (
    <Wrapper>
      <h3>all users</h3>
    </Wrapper>
  );
};

export default AllUsers;
