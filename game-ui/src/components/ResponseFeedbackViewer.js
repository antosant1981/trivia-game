import React, { Component } from 'react';

class ResponsFeedbackViewer extends Component {

    render() {
        
        if(this.props.feedback) {

            return (<div><p>Correct!</p></div>);
        
        } else {

            if(this.props.isCheckedOption) {

                return (<div><p>Wrong!</p></div>);
            }
        }

        return(<p/>);
    }
}

export default ResponsFeedbackViewer;