import {useState, useEffect} from "react";
import lottery from "../lottery";

const useManager = () => {
  const [managerAddress, setManagerAddress] = useState("");

  useEffect(() => {
    const getManagerAddress = async () => {
      const managerAddress = await lottery.methods.manager().call();
      setManagerAddress(managerAddress);
    };

    getManagerAddress();
  }, []);

  return {managerAddress};
};

export default useManager;
