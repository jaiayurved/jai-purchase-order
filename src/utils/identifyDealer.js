const dealerCodeMap = {
  "1234": {
    "Phone Number": " ",
    "Dealer Name": "Dealer",
  },
  "ASHISH99": {
    "Phone Number": "9929988408",
    "Dealer Name": "ASHISH MEDICAL",
  }
};

const identifyDealer = (enteredCode) => {
  const matchedDealer = dealerCodeMap[enteredCode];
  if (matchedDealer) {
    console.log("✅ Code matched:", matchedDealer["Dealer Name"]);
    return matchedDealer;
  } else {
    return null;
  }
};

// 🛡️ ADD this new function:
export const checkLoginCode = (enteredCode) => {
  return dealerCodeMap.hasOwnProperty(enteredCode);
};

export default identifyDealer;
