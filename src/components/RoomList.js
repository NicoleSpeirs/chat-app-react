import React from "react";
import "./RoomList.css";

class RoomList extends React.Component {
  state = {
    rooms: [],
    newRoomName: "",
    creating: false
  }
  roomsRef = this.props.firebase.database().ref("rooms");
  // this.handleChange = this.handleChange.bind(this);
  // this.createRoom = this.createRoom.bind(this);


  componentDidMount = () => {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }


  handleChange = (e) => {
    this.setState({
      newRoomName: e.target.value
    });
  }


  createRoom = (e) => {
    e.preventDefault();
    this.roomsRef.push({ name: this.state.newRoomName });
    this.setState({
      newRoomName: "",
      creating: false
    });
  }



  render() {
    return (
      <div>
        <ul>
          {this.state.rooms.map(room => (
            <li className="room-name" key={room.key} onClick={() => this.props.handleRoomSelect(room)}>
              {room.name}
            </li>
          ))}
        </ul>
        <div>
          <button onClick={(e)=>this.setState({creating:true})}>new room</button>
        </div>

        {(this.state.creating) ? <div className="new-room">
          <form onSubmit={(e)=>this.createRoom(e)}>
            <fieldset>
              <legend>Create new room</legend>

              <p>
                <label>Enter Room Name:</label>
                <input
                type="text"
                value={this.state.newRoomName}
                onChange={this.handleChange}
                />
              </p>
              <p><input type="submit" value="submit" /></p>
            </fieldset>
          </form>
        </div> : ''}
      </div>
    );
  }
}

export default RoomList;
