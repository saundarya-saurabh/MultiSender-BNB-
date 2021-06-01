import React, { Component } from 'react';

//Importing Modal
import ModalVideo from 'react-modal-video';
import '../../../node_modules/react-modal-video/scss/modal-video.scss';

class ModalSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.openModal.bind(this)
    }
    
    openModal() {
        this.setState({ isOpen: true })
    }

    render() {
        return (
            <React.Fragment>
                <ModalVideo channel={this.props.channel} isOpen={this.state.isOpen} videoId={this.props.videoId} onClose={() => this.setState({isOpen: false})} />
            </React.Fragment>
        );
    }
}

export default ModalSection;