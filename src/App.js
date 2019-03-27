import React from "react";
import "./App.css";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import User from "./components/User";
import * as firebase from "firebase";

//Initialize Firebase
var config = {
  apiKey: "AIzaSyDeUwmQXFEWAQwvaoMwXR_fkCtS8ZETBS0",
  authDomain: "chat-app-react-90ef8.firebaseapp.com",
  databaseURL: "https://chat-app-react-90ef8.firebaseio.com",
  projectId: "chat-app-react-90ef8",
  storageBucket: "chat-app-react-90ef8.appspot.com",
  messagingSenderId: "746853531179"
};
firebase.initializeApp(config);

class App extends React.Component {
  state = {
    currentRoom: {},
    user: null
  };

  handleRoomSelect = room => {
    this.setState({ currentRoom: room });
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  render() {
    return (
      <div className="App">
        <main>
          <div className="chat-container">
            <div className="left-container">
              <h1>Bloc Chat</h1>
              <RoomList
                firebase={firebase}
                handleRoomSelect={this.handleRoomSelect}
              />
            </div>
            <div className="right-container">
              <User
                firebase={firebase}
                user={this.state.user}
                setUser={this.setUser}
              />
              <MessageList
                firebase={firebase}
                currentRoom={this.state.currentRoom}
                user={this.state.user}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;

// (
//   <div className="App">
//     <div className="chat-container">
//       <RoomList></RoomList>
//       <MessageList></MessageList>
//     </div>
//   </div>
// )
