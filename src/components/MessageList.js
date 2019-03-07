import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  this.messagesRef = this.props.firebase.database().ref("message");
  }

  componentDidMount() {
    this.messageRef.on("child_added", snapshot => {
      const message = snapshot.val();
      console.log(message);
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }


}

export default MessageList;