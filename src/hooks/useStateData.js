import { useContext } from "react";
import { StateData } from "./StateContext";

const useStateData = () => {
  return useContext(StateData);
};

export default useStateData;
