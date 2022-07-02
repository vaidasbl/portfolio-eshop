import React, { useContext } from "react";
import Alert from "@mui/material/Alert";
import UserContext from "../07 Common Components/UserContext";

const MyAlert = () => {
  const context = useContext(UserContext);

  if (context !== null) {
    const { alert } = context;
    return (
      <div
        className={
          alert.active ? "notification-active" : "notification-passive"
        }
      >
        <Alert severity={alert.type} variant="outlined">
          {alert.text}
        </Alert>
      </div>
    );
  } else {
    return <div>CONTEXT IS NULL</div>;
  }
};

export default MyAlert;
