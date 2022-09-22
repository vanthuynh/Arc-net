import React, { useContext } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";

function Sidebar() {
  const user = useSelector((state) => state.user);

  //
  const {
    socket,
    members,
    setMembers,
    rooms,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  // if no user logged in, hide sidebar
  if (!user) {
    return <></>;
  }
  return (
    <>
      <h2> Available Rooms </h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroup.Item key={idx}>{room}</ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Members</h2>
      {members.map((mempber) => (
        <ListGroup.Item key={members.id} style={{ cursor: "pointer" }}>
          {members.name}
        </ListGroup.Item>
      ))}
    </>
  );
}

export default Sidebar;
