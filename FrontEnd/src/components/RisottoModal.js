import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../assert/styles/style.scss'

class RisottoModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var { isShow, onHide, body, title, dialogClassName, size } = this.props;
        return (
            <Modal animation="true" size={size ?? "lg"} dialogClassName={dialogClassName} show={isShow} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {body}
                </Modal.Body>
            </Modal>
        )
    }
}

export default RisottoModal;
