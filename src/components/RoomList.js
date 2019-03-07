import React, { Component } from "react";
import "./RoomList.css";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: "",

    };
    this.roomsRef = this.props.firebase.database().ref("rooms");
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  handleClick(e) {
    this.setState({
      newRoomName: e.target.value
    });
  }

  handleChange(e) {
    this.setState({
      newRoomName: e.target.value
    });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomRef.push({ name: this.state.newRoomName });
    this.setState({
      newRoomName: ""
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.rooms.map(room => (
            <li className="room-names" key={room.key}>
              {room.name}
            </li>
          ))}
        </ul>
        <div>
          <button onClick={this.handleClick}>new room</button>
        </div>

        <div className="new-room">
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <legend>Create new room</legend>
              <br />

              <label>Enter Room Name:</label>
              <br />
              <input
                type="text"
                value={this.state.newRoomName}
                onChange={this.handleChange}
              />
              <br />
              <input type="submit" value="submit" />
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default RoomList;
