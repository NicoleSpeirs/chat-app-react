import React from "react";

class User extends React.Component {
  componentDidMount = () => {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  };

  signIn = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  };

  signOut = () => {
    this.props.firebase.auth().signOut();
  };

  render() {
    return (
      <div>
        <section className="user">
          {this.props.user ? (
            <button
              type="button"
              className="sign-out button"
              onClick={this.signOut}
            >
              Sign Out
            </button>
          ) : (
            <button
              type="button"
              className="sign-in button"
              onClick={this.signIn}
            >
              Sign In
            </button>
          )}
        </section>
        <span className="displayed-name">
          {this.props.user ? this.props.user.displayName : "Guest"}
        </span>
        <section />
      </div>
    );
  }
}

export default User;
