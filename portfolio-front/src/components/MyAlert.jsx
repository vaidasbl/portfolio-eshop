import React, { useContext } from "react";
import Alert from "@mui/material/Alert";
import { UserContext } from "./UserContext";

const MyAlert = () => {
  const { alert } = useContext(UserContext);
  return (
    <div
      className={alert.active ? "notification-active" : "notification-passive"}
    >
      <Alert severity={alert.type} variant="outlined">
        {alert.text}
      </Alert>
    </div>
  );
};

export default MyAlert;
