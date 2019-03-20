import React from "react";

class User extends React.Component {

  signIn = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut = () => {
    this.props.firebase.auth().signOut();
  }


  render() {
    return (
      <div className="user">
        <button
        type="button"
        className="sign-in"
        onClick={this.signIn}
        Sign In
        >
        </button>
      </div>
      <div className="sign-out">
      </div>
    );
  }
}


export default User;
