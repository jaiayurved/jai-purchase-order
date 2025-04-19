
import { useState, useEffect } from "react";
import identifyDealer from "../utils/identifyDealer";

export default function useDealer(phone = "9929988408") {
  const [dealer, setDealer] = useState(null);

  useEffect(() => {
    const foundDealer = identifyDealer(phone);
    if (foundDealer) {
      setDealer(foundDealer);
    }
  }, [phone]);

  return dealer;
}
