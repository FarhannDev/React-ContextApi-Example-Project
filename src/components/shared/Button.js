import React from "react";
import { Link } from "react-router-dom";

export default function Button({ name, icon = "", urlRedirect = "/" }) {
  return (
    <Link to={urlRedirect} className="button-action btn btn-lg btn-danger">
      {name}
      <i className={`ms-2 ${icon}`}></i>
    </Link>
  );
}
