import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CategoryModal = (props) => {
  //object destructuring to get the props
  const { title, changeTitle, value, saveHandler, showModal, closeModal } =
    props;

  return (
    <Modal centered show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Enter new title for {title} :</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            {/* passing the value to the input field */}
            <Form.Control
              type="text"
              placeholder="Enter Category Title"
              value={value}
              onChange={(event) => changeTitle(event)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        {/* passing the saveHandler to the save button */}
        <Button variant="primary" onClick={saveHandler}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryModal;
