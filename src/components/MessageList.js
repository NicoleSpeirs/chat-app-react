import React from "react";
import "./style.css";

class MessageList extends React.Component {
  state = {
    messages: [],
    newMessage: ""
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

  getRoomMessages = () =>
    this.state.messages.filter(
      message => message.roomId === this.props.currentRoom.key
    );
  createMessage = e => {
    e.preventDefault();
    if (!this.state.newMessage) {
      return false;
    }

    const messageProps = {
      content: this.state.newMessage,
      roomId: this.props.currentRoom.key,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: this.props.user ? this.props.user.displayName : "Guest"
    };

    this.messagesRef.push(messageProps);

    this.setState({
      newMessage: ""
    });
  };

  handleChange = e => {
    this.setState({
      newMessage: e.target.value
    });
  };

  formatTime = time => {
    return new Date(time).toTimeString().split(" ")[0];
  };

  render() {
    return (
      <div className="Active Room">
      <span className="display-current-room">{this.props.currentRoom.name}</span>
        <div className="messages">
          {this.getRoomMessages().map(message => {
            return (
              <div className="message-display" key={message.key}>
                <span className="msg-name">{message.username}:</span>
                <span className="msg-content">{message.content}</span>
                <span className="msg-time">{this.formatTime(message.sentAt)}</span>
              </div>
            );
          })}
        </div>
        <form className="new-message" onSubmit={this.createMessage}>
          <input
            className="new-message-field"
            type="text"
            placeholder="Write your message here..."
            value={this.state.newMessage}
            onChange={this.handleChange}
          />
          <input className="button" type="submit" value="Send" />
        </form>
      </div>
    );
  }
}

export default MessageList;
