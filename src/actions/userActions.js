import { UPDATE_USER } from "../constants";

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: user,
  };
};
