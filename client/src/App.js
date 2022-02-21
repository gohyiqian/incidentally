import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Posts from "./components/Posts";
import {
  HomePage,
  ErrorPage,
  RegisterPage,
  Dashboard,
  UserProfile,
  AllUsers,
  AddTicket,
  AllTickets,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<UserProfile />} />
          <Route path="all" element={<AllUsers />} />
          <Route path="all-tickets" element={<AllTickets />} />
          <Route path="add-ticket" element={<AddTicket />} />
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
