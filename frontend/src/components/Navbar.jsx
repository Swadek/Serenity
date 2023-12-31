import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.scss";
import avatar from "../assets/avatar.svg";
import StateContext from "../contexts/StateContext";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function navbar() {
  const navigate = useNavigate();

  const {
    linkToActive,
    setLinkToActive,
    isMenuOpen,
    setIsMenuOpen,
    setActiveModal,
    activeTheme,
    setActiveTheme,
    isNotDesktop,
  } = useContext(StateContext);
  const { userInfo, logoutHandler } = useContext(AuthFunctionContext);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navbarLinks = [
    {
      role: "admin",
      className: linkToActive === "Home" ? "active-navbar" : "nav-serenity",
      label: "Praticiens",
      icon: "users",
      action: () => {
        setLinkToActive("Home");
        setIsMenuOpen(false);
        setActiveModal("Praticiens");
      },
    },
    {
      role: "practician",
      className: linkToActive === "Home" ? "active-navbar" : "nav-serenity",
      label: "Patients",
      icon: "users",
      action: () => {
        setLinkToActive("Home");
        setIsMenuOpen(false);
        setActiveModal("Patients");
      },
    },
    {
      role: "patient",
      className: linkToActive === "Home" ? "active-navbar" : "nav-serenity",
      label: "Ma préparation",
      icon: "poll-h",
      action: () => {
        setLinkToActive("Home");
        setIsMenuOpen(false);
        setActiveModal("Ma préparation");
        if (isNotDesktop) {
          setActiveTheme(null);
        } else {
          setActiveTheme("understand");
        }
      },
    },
    {
      role: "practician",
      className:
        linkToActive === "Interventions" ? "active-navbar" : "nav-serenity",
      label: "Interventions",
      icon: "file-medical-alt",
      action: () => {
        setLinkToActive("Interventions");
        setIsMenuOpen(false);
        setActiveModal("Interventions");
      },
    },
    {
      role: "practician",
      className:
        linkToActive === "Ressources" ? "active-navbar" : "nav-serenity",
      label: "Ressources",
      icon: "folder-tree",
      action: () => {
        setLinkToActive("Ressources");
        setIsMenuOpen(false);
        setActiveModal("Ressources");
      },
    },
    {
      role: "all",
      className:
        linkToActive === "Mon compte" ? "active-navbar" : "nav-serenity",
      label: "Mon compte",
      icon: "circle-user",
      action: () => {
        setLinkToActive("Mon compte");
        setIsMenuOpen(false);
        setActiveModal("Mon compte");
      },
    },
    {
      role: "patient",
      className:
        linkToActive === "Mon praticien" ? "active-navbar" : "nav-serenity",
      label: "Mon praticien",
      icon: "user-md",
      action: () => {
        setLinkToActive("Mon praticien");
        setIsMenuOpen(false);
        setActiveModal("Mon praticien");
      },
    },
    {
      role: "all",
      className:
        linkToActive === "Formulaire" ? "active-navbar" : "nav-serenity",
      label: "Formulaire",
      icon: "document-signed",
      action: () => {
        setLinkToActive("Formulaire");
        setIsMenuOpen(false);
        setActiveModal("Formulaire");
      },
    },
    {
      role: "all",
      className: linkToActive === "A propos" ? "active-navbar" : "nav-serenity",
      label: "A propos",
      icon: "info",
      action: () => {
        setLinkToActive("A propos");
        setIsMenuOpen(false);
        setActiveModal("A propos");
      },
    },
  ];
  return (
    <div className="header-navbar">
      <div
        className={
          activeTheme === null
            ? "header-avatar"
            : "header-avatar header-avatar-hidden"
        }
      >
        <img src={avatar} alt="avatar" className="admin-avatar" />
        <span className="admin-name">
          {userInfo.firstname} {userInfo.lastname}
        </span>
      </div>
      <div className="navbar-serenity">
        <button
          type="button"
          onClick={() => {
            setLinkToActive("Home");
            setIsMenuOpen(false);
            setActiveTheme(null);
          }}
        >
          <i alt="Home" className="fi fi-rr-home home-icon-mobile" />
        </button>
        <button className="menu-burger" type="button" onClick={toggleMenu}>
          <i alt="Menu" className="fi fi-rr-menu-burger menu-burger-icon" />
        </button>
        <button
          className={isMenuOpen ? "bg-burger" : "burger-invisible"}
          onClick={() => setIsMenuOpen(false)}
          type="button"
          aria-label="Close Menu Burger"
        />
        <ul
          className={
            isMenuOpen ? "links burger-visible" : "links burger-invisible"
          }
        >
          <div className="list-item-navbar">
            {navbarLinks
              .filter(
                (link) =>
                  link.role === `${userInfo.role}` || link.role === "all"
              )
              .map((link) => (
                <li key={link.label} className="list-navbar">
                  <button
                    className={link.className}
                    type="button"
                    onClick={link.action}
                  >
                    <div className="button-content">
                      <i
                        alt={link.label}
                        className={`fi fi-rr-${link.icon} link-icon`}
                      />
                      {link.label}
                    </div>
                  </button>
                </li>
              ))}
          </div>
          <div className="list-item-navbar logout">
            <button
              className="nav-serenity"
              alt="Déconnexion"
              type="button"
              onClick={() => {
                logoutHandler();
                setIsMenuOpen(false);
                setLinkToActive("Home");
                if (isNotDesktop) {
                  setActiveTheme(null);
                } else {
                  setActiveTheme("understand");
                }
                navigate("/");
              }}
            >
              <div className="button-content">
                <i alt="Déconnexion" className="fi fi-rr-exit link-icon" />
                Déconnexion
              </div>
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default navbar;
