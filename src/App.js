import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ChatProvider } from "./context/chatContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./middleware/ProtectedRoute";
import AdminProtectedRoute from "./middleware/AdminProtectedRoute";
import Homepage from "./components/HomePage/homePage";
import ChatPage from "./components/ChatPage/chatPage";
import AdminPage from "./components/AdminDashboard/adminPage";

function App() {
  return (
    <ChatProvider>
      <ChakraProvider>
        <div className="App">
          <Router>
            <Routes>
              <Route exact path="/" element={<Homepage />}></Route>
              <Route
                exact
                path="/admin"
                element={<AdminProtectedRoute element={<AdminPage />} />}
              ></Route>
              <Route
                exact
                path="/chat"
                element={<PrivateRoute element={<ChatPage />} />}
              ></Route>
            </Routes>
          </Router>
          <ToastContainer />
        </div>
      </ChakraProvider>
    </ChatProvider>
  );
}

export default App;
