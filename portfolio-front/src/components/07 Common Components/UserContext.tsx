import React from "react";

type User = {
  isAuthenticated: boolean;
  _id: string | null;
  username: string | null;
  role: string | null;
};

type Reducer<User, Action> = (user: User, action: Action) => User;

type AlertType = "success" | "info" | "warning" | "error";

type Alert = {
  active: boolean;
  type: AlertType;
  text: string;
  time: number;
};

export interface UserContextInterface {
  user: User;
  dispatch: any;
  alert: Alert;
  handleAlert: (type: AlertType, text: string, time: number) => void;
}

const UserContext = React.createContext<UserContextInterface | null>(null);
export default UserContext;
