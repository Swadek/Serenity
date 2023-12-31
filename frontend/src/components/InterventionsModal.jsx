/* eslint-disable camelcase */
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "../styles/InterventionsModal.scss";
import Swal from "sweetalert2";
import AuthFunctionContext from "../contexts/AuthFunctionContext";
import StateContext from "../contexts/StateContext";
import ModalAddIntervention from "./ModalAddIntervention";

function InterventionsModal() {
  const { userInfo, userToken } = useContext(AuthFunctionContext);
  const { interventions, setInterventions, interventionAdded } =
    useContext(StateContext);
  const { id, role } = userInfo;
  const [isLoaded, setIsLoaded] = useState(false);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/practicians/${id}/interventions`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Role: `${role}`,
          },
        }
      )
      .then((response) => {
        setInterventions(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [interventionAdded]);

  const handleDeleteButtonClick = (idInterventionToDelete) => {
    Swal.fire({
      title: "Êtes-vous sûr de vouloir supprimer cette intervention ?",
      text: "Vous ne pourrez pas annuler cette action !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      background: "#242731",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Non, annuler !",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/practicians/${id}/delete/interventions/${idInterventionToDelete}/ressources`,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
                Role: `${role}`,
              },
            }
          )
          .then(() => {
            axios
              .delete(
                `${
                  import.meta.env.VITE_BACKEND_URL
                }/practicians/${id}/interventions/${idInterventionToDelete}`,
                {
                  headers: {
                    Authorization: `Bearer ${userToken}`,
                    Role: `${role}`,
                  },
                }
              )
              .catch((error) => console.error(error));
            const updateInterventions = interventions.filter(
              (el) => el.id !== idInterventionToDelete
            );
            setInterventions(updateInterventions);
            Swal.fire({
              background: "#242731",
              position: "center",
              icon: "success",
              title: "L'intervention a été supprimée",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.error(
              `Error deleting intervention with ID ${idInterventionToDelete}:`,
              error
            );
            Swal.fire({
              background: "#242731",
              position: "center",
              icon: "error",
              title: "Une erreur est survenue lors de la suppression.",
              showConfirmButton: false,
              timer: 2000,
            });
          });
      }
    });
  };

  const handleAddIntervention = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container-interventions">
      <div className="tab-button-intervention">
        <table className="tab-interventions">
          <thead className="tab-head-interventions">
            <tr className="tab-titles">
              <th>Nom de l'intervention</th>
              <th>Durée</th>
              <th>Anesthésie</th>
              <th> </th>
            </tr>
          </thead>
          <tbody className="tab-body-interventions">
            {isLoaded ? (
              interventions.map((intervention) => (
                <tr key={intervention.id} className="intervention-row">
                  <td>{intervention.name}</td>
                  <td>{intervention.duration}</td>
                  <td>{intervention.anesthesia}</td>
                  <td>
                    <button
                      className="delete-intervention-button"
                      type="button"
                      onClick={() => handleDeleteButtonClick(intervention.id)}
                    >
                      <i className="fi fi-rr-trash" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div>
                <p className="no-interventions">
                  Pas encore d'interventions ajoutées.
                </p>
              </div>
            )}
          </tbody>
        </table>
      </div>
      <button
        className="add-intervention-button"
        type="button"
        onClick={handleAddIntervention}
      >
        Ajouter intervention
      </button>
      {showModal && <ModalAddIntervention closeModal={closeModal} />}
    </div>
  );
}

export default InterventionsModal;
