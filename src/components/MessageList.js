import React from "react";

class MessageList extends React.Component {
  state = {
    messages: [],
    // roomMessages: [],
    newMessage: ''
  };
  messagesRef = this.props.firebase.database().ref("messages");

  componentDidMount = () => {
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({
        messages: this.state.messages.concat(message)
      });
    });
  };

  // componentDidUpdate = (prevProps) => {
  //   if (prevProps.currentRoom.key !== this.props.currentRoom.key) {
  //     this.setState({
  //       roomMessages: this.getRoomMessages()
  //     })
  //   }
  // }

  getRoomMessages = () => (
    this.state.messages.filter(
      message => (message.roomId === this.props.currentRoom.key)
    )
  )
  createMessage = e => {
    e.preventDefault();
    if (!this.state.newMessage) {return false};

    const messageProps = {
      content: this.state.newMessage,
      roomId: this.props.currentRoom.key,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: this.props.user ? this.props.user.displayName : "Guest"
    }

    this.messagesRef.push(messageProps);

    this.setState({
      newMessage: ''
    });
  };

  handleChange = e => {
    this.setState({
      newMessage: e.target.value
    });
  };

  formatTime = (time) => {
    return new Date(time).toTimeString().split(' ')[0]
  }



  render() {
    const {currentRoom} = this.props;

    return (
      <div className="Active Room">
        <li>{this.props.currentRoom.name}</li>
        <form className="new-message" onSubmit={this.createMessage}>
          <input
            type="text"
            placeholder="New Message"
            value={this.state.newMessage}
            onChange={this.handleChange}
          />
          <input type="submit" value="Send" />
        </form>
        {this.getRoomMessages().map(message => {
          return (
            <div key={message.key}>
              <li>{message.content}</li>
              <li>{this.formatTime(message.sentAt)}</li>
              <li>{message.username}</li>
              {
                currentRoom
                ? <li>current room: {currentRoom.name}</li>
                : null
              }
            </div>
          );
        })}
      </div>
    );
  }
}

export default MessageList;
