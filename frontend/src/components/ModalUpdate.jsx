// import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../styles/PracticianListModal.scss";
// import StateContext from "../contexts/StateContext";

function ModalUpdate({
  show,
  handleClose,
  handleFormSubmit,
  handleInputChange,
  modalInputs,
  showSuccessMessageModification,
}) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier un praticien</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              defaultValue={modalInputs.firstname}
              autoFocus
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              defaultValue={modalInputs.lastname}
              autoFocus
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="mail"
              defaultValue={modalInputs.mail}
              autoFocus
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Numero ADELI</Form.Label>
            <Form.Control
              type="text"
              name="adeli_number"
              defaultValue={modalInputs.adeli_number}
              autoFocus
              onChange={handleInputChange}
            />
          </Form.Group>
          <input
            type="hidden"
            name="administrator_id"
            defaultValue={modalInputs.administrator_id}
            onChange={handleInputChange}
          />
          <input
            type="hidden"
            name="password"
            defaultValue={modalInputs.password}
            onChange={handleInputChange}
          />
          <Modal.Footer>
            {showSuccessMessageModification && (
              <span className="success-message">Modification effectuée !</span>
            )}
            <Button variant="danger" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" variant="primary">
              Modifier
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalUpdate;

ModalUpdate.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  modalInputs: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    mail: PropTypes.string.isRequired,
    adeli_number: PropTypes.number.isRequired,
    administrator_id: PropTypes.number.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  showSuccessMessageModification: PropTypes.bool.isRequired,
};
