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
      currentRoom: {}
    };

handleRoomSelect = room => {
  this.setState({ currentRoom: room});
};

setUser = user => {
  this.setState({
    user: user,
  });
}

  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
        <main>
          <User firebase={firebase} user={this.state.user} setUser={this.setUser} />
          <RoomList firebase={firebase}  handleRoomSelect={this.handleRoomSelect} />
          <MessageList firebase={firebase} currentRoom={this.state.currentRoom}  />
        </main>
      </div>
    );
  }
}

export default App;
