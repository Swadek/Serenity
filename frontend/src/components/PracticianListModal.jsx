import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../styles/PracticianListModal.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Buttonadd from "./Buttonadd";
import StateContext from "../contexts/StateContext";
import AuthFunctionContext from "../contexts/AuthFunctionContext";
import HeaderLocation from "./HeaderLocation";

function PracticianListModal() {
  const [practicians, setPracticians] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { userToken, userInfo } = useContext(AuthFunctionContext);
  const { role } = userInfo;
  const [selectedPractician, setSelectedPractician] = useState(null);
  const {
    showSuccessMessageModification,
    setShowSuccessMessageModification,
    showSuccessMessageAdd,
    setShowSuccessMessageAdd,
  } = useContext(StateContext);

  const [modalInputs, setModalInputs] = useState({
    firstname: "",
    lastname: "",
    mail: "",
    adeli_number: "",
    administrator_id: "",
  });
  // gestion of modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setShowSuccessMessageModification(false);
  };

  const handleTrClick = (practician) => {
    setSelectedPractician(practician);
    setModalInputs(practician);
    handleShow(true);
    setShowSuccessMessageAdd(false);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setModalInputs((prevModalInputs) => ({
      ...prevModalInputs,
      [name]: value,
    }));
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (selectedPractician) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/admins/practicians/${
            selectedPractician.id
          }`,
          modalInputs
        )
        .then((response) => {
          // Update practitioner data in the state
          const updatedPracticians = practicians.map((practician) => {
            if (practician.id === selectedPractician.id) {
              return response.data;
            }
            return practician;
          });
          setPracticians(updatedPracticians);
          setShowSuccessMessageModification(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/admins/practicians`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Role: `${role}`,
        },
      })
      .then((response) => {
        const promises = response.data.map((practician) =>
          Promise.all([
            axios.get(
              `${
                import.meta.env.VITE_BACKEND_URL
              }/admins/practicians/countintervention/${practician.id}`,
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                  Role: `${role}`,
                },
              }
            ),
            axios.get(
              `${
                import.meta.env.VITE_BACKEND_URL
              }/admins/practicians/countressource/${practician.id}`,
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                  Role: `${role}`,
                },
              }
            ),
          ])
        );

        Promise.all(promises)
          .then((countResponses) => {
            const updatedPracticians = response.data.map(
              (practician, index) => ({
                ...practician,
                countIntervention:
                  countResponses[index][0].data.interventionCount,
                countRessource: countResponses[index][1].data.ressourceCount,
              })
            );
            setPracticians(updatedPracticians);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [showSuccessMessageModification, showSuccessMessageAdd]);
  return (
    <>
      <HeaderLocation />
      <div className="practician-list-container">
        <div className="practician-list">
          <div className="practician-list-header">
            <input
              className="search-input"
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="button" className="delete-button">
              <i className="fi fi-rr-trash" />
            </button>
          </div>
          <div className="practician-list-body">
            <table className="practician-list-table">
              <thead className="practician-list-table-header">
                <tr>
                  <th>Nom</th>
                  <th>Mail</th>
                  <th>Poste</th>
                  <th>Téléphone</th>
                  <th>
                    Nombre
                    <br />
                    Interventions
                  </th>
                  <th>
                    Nombre
                    <br />
                    Ressources
                  </th>
                </tr>
              </thead>
              <tbody className="practician-list-table-body">
                {practicians
                  .filter(
                    (practician) =>
                      practician.lastname &&
                      practician.lastname
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                  )
                  .map((practician) => (
                    <tr
                      key={practician.id}
                      onClick={() => handleTrClick(practician)}
                    >
                      <td>
                        {practician.firstname} {practician.lastname}
                      </td>
                      <td>{practician.mail}</td>
                      <td>{practician.speciality}</td>
                      <td>{practician.phone}</td>
                      <td>{practician.countIntervention}</td>
                      <td>{practician.countRessource}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modifier un praticien</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleFormSubmit} encType="multipart/form-data">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    defaultValue={modalInputs.firstname}
                    autoFocus
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    defaultValue={modalInputs.lastname}
                    autoFocus
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="mail"
                    defaultValue={modalInputs.mail}
                    autoFocus
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput4"
                >
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
                    <span className="success-message">
                      Modification effectuée !
                    </span>
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
          <div className="practician-list-footer">
            <Buttonadd />
          </div>
        </div>
      </div>
    </>
  );
}

export default PracticianListModal;
