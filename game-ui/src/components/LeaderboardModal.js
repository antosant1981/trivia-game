import React, { Component } from "react";
import ReactModal from "react-modal";
import "../styles/tables.css";

class LeaderboardModal extends Component {
  render() {
    return (
        <ReactModal
          isOpen={this.props.showLeaderboardModal}
          ariaHideApp={false}
          contentLabel="This is your ranking"
        >
          <div className="app-container">
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Highest score</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {this.props.playersRanking.data.map((item) => {
                  return (
                    <tr key={item.username}>
                      <td>{item.username}</td>
                      <td>{item.score}</td>
                      <td>{item.highestScoreDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p>
            <button onClick={this.props.handleCloseLeaderboardModal}>
              Close
            </button>
          </p>
        </ReactModal>
      );
    }
}

export default LeaderboardModal;
