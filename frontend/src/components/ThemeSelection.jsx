import React, { useContext } from "react";
import "../styles/ThemeSelection.scss";
import StateContext from "../contexts/StateContext";
import UnderstandInterventionModal from "./UnderstandInterventionModal";
import AnticipateReleaseModal from "./AnticipateReleaseModal";
import CheckListModal from "./CheckListModal";
import AdministrativeModal from "./AdministrativeModal";
import PrepareMyArrivateModal from "./PrepareMyArrivateModal";

function ThemeSelection() {
  const { activeTheme, setActiveTheme } = useContext(StateContext);

  const themeButton = [
    {
      label: "understand",
      className:
        activeTheme === "understand"
          ? "understand-button active"
          : "understand-button",
      action: () => setActiveTheme("understand"),
      themeName: "Comprendre mon opération",
    },
    {
      label: "administrative",
      className:
        activeTheme === "administrative"
          ? "administrative-button active"
          : "administrative-button",
      action: () => setActiveTheme("administrative"),
      themeName: "Finir les démarches administratives",
    },
    {
      label: "prepare",
      className:
        activeTheme === "prepare" ? "prepare-button active" : "prepare-button",
      action: () => setActiveTheme("prepare"),
      themeName: "Préparer mon arrivée en toute sérénité",
    },
    {
      label: "anticipate",
      className:
        activeTheme === "anticipate"
          ? "anticipate-button active"
          : "anticipate-button",
      action: () => setActiveTheme("anticipate"),
      themeName: "Anticiper ma sortie",
    },
    {
      label: "checklist",
      className:
        activeTheme === "checklist"
          ? "checklist-button active"
          : "checklist-button",
      action: () => setActiveTheme("checklist"),
      themeName: "Ma check-list avant le départ à la Clinique",
    },
  ];

  let CurrentModaleTheme;
  switch (activeTheme) {
    case "understand":
      CurrentModaleTheme = <UnderstandInterventionModal />;
      break;
    case "administrative":
      CurrentModaleTheme = <AdministrativeModal />;
      break;
    case "prepare":
      CurrentModaleTheme = <PrepareMyArrivateModal />;
      break;
    case "anticipate":
      CurrentModaleTheme = <AnticipateReleaseModal />;
      break;
    case "checklist":
      CurrentModaleTheme = <CheckListModal />;
      break;
    default:
      break;
  }

  return (
    <>
      <div className="theme-container">
        {themeButton.map((theme) => (
          <button
            key={theme.label}
            type="button"
            className={theme.className}
            onClick={theme.action}
          >
            <p>{theme.themeName}</p>
          </button>
        ))}
      </div>
      {CurrentModaleTheme}
    </>
  );
}

export default ThemeSelection;
