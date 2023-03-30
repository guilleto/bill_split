import React, { useState } from "react";
import "./CardBackground.css";
export default function CardBack({ childrens }) {
  return (
    <div className="card">
      <h2 class="card-title">Attach your bill</h2>
      {childrens ? childrens : "Ingrese Archivo"}
    </div>
  );
}
