import React, { Component } from "react";
import "./App.css";
import RoomList from "./components/RoomList";
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

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
        <main>
          <RoomList firebase={firebase} />
        </main>
      </div>
    );
  }
}

export default App;
