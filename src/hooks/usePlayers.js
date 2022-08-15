import {useState, useEffect} from "react";
import lottery from "../lottery";

const usePlayers = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const getPlayers = async () => {
      const playersList = await getLotteryPlayers();
      setPlayers(playersList);
    };

    getPlayers();
  }, []);

  return { players };
};

const getLotteryPlayers = async () => {
    const playersList = await lottery.methods.getPlayers().call();
    return playersList;
  };

export default usePlayers;
