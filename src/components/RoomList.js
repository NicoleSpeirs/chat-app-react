import React, { Component } from "react";


class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  render() {
     return (
       <ul>
       {this.state.rooms.map((room, index) =>
        <li
          className="room-names"
          key={room.key}
          onClick={()=> this.props.handleRoomSelect(room)}
          >
          {room.name}
        </li>
       )}

       </ul>);
  }
}

export default RoomList;
