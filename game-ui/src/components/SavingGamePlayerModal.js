import React, { Component } from "react";
import ReactModal from "react-modal";

class SavingGamePlayerModal extends Component {
  render() {
    return (
      <ReactModal
        isOpen={this.props.showSavingModal}
        ariaHideApp={false}
        contentLabel="Save your game"
      >
        <div>
          <h3>We will save your score!</h3>
          Insert Username and Password please
          <h4>if you type a new passord, the existing one will be overwtitten!</h4>
        </div>

        <fieldset>
          <p>
            <label>Username</label>&nbsp;&nbsp;&nbsp;
            <input type="text" name="username" onChange={this.props.handleUsernameChange}/>
          </p>
          <p>
            <label>Password</label>&nbsp;&nbsp;&nbsp;
            <input type="password" name="password" onChange={this.props.handlePasswordChange}/>
          </p>
          <p>
            <button onClick={this.props.handleSubmitPlayer}>Save</button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={this.props.handleCloseSavingPlayerModal}>Close</button>
          </p>
        </fieldset>
      </ReactModal>
    );
  }
}

export default SavingGamePlayerModal;