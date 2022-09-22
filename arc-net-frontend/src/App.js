import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import { AppContext, socket } from "./context/appContext";

function App() {
  const user = useSelector((state) => state.user);

  // all of these components need to have access to provider
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});

  return (
    <AppContext.Provider
      value={
        (socket,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        messages,
        setMessages,
        privateMemberMsg,
        setPrivateMemberMsg,
        newMessages,
        setNewMessages,
        rooms,
        setRooms)
      }
    >
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* hide login page when users already signed up or logged in */}
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
