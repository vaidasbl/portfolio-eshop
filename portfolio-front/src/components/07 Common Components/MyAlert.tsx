import React from "react";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { alertOff } from "../08 Reducers/alert";
import { useDispatch } from "react-redux";

const MyAlert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state: any) => state.alert.value);

  if (alert.active) {
    setTimeout(
      () => dispatch(alertOff({ type: alert.type, text: alert.text })),
      alert.time
    );
  }

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
