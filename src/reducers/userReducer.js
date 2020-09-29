import { UPDATE_USER } from '../constants';

export default function(state = "", action) {
  switch (action.type) {
    case UPDATE_USER: return action.payload;
    default: return state;
  };
};