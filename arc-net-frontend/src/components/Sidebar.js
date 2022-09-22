import React, { useContext } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
function Sidebar() {
  const user = useSelector((state) => state.user);

  //
  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
    // console.log(payload);
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
      {members &&
        members.map((member) => (
          <ListGroup.Item key={member.id} style={{ cursor: "pointer" }}>
            {member.name}
          </ListGroup.Item>
        ))}
    </>
  );
}

export default Sidebar;
