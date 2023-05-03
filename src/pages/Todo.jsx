import React from "react";
import { useParams, useLocation } from "react-router-dom";

export default function Todo() {
  const params = useParams();
  const location = useLocation();

  return (
    <div>
      <h2>Todo</h2>
    </div>
  );
}
