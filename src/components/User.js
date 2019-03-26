import React from "react";

class User extends React.Component {

  componentDidMount = () => {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut = () => {
    this.props.firebase.auth().signOut();
  }


  render() {
    return (
      <div>
        <section className="user">
          <button
            type="button"
            className="sign-in"
            onClick={this.signIn}
          >
          Sign In
          </button>
          <button
            type="button"
            className="sign-out"
            onClick={this.signOut}
            >
          Sign Out
          </button>
        </section>
          Current User:
          {this.props.user ? this.props.user.displayName : 'Guest'}
        <section>
        </section>
      </div>
    );
  }
}


export default User;
