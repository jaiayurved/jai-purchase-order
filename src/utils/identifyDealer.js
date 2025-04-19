const dealerCodeMap = {
  "1234": {
    "Phone Number": " ",
    "Dealer Name": "Dealer",
    "Type": "WLD",
    "WLD Category": "WLD-HairCare",
    "Favorites": []
  },
  "ASHISH99": {
    "Phone Number": "9929988408",
    "Dealer Name": "ASHISH MEDICAL",
    "Type": "WLD",
    "WLD Category": "WLD-SkinCare",
    "Favorites": []
  }
};

const identifyDealer = (enteredCode) => {
  const matchedDealer = dealerCodeMap[enteredCode];
  if (matchedDealer) {
    console.log("✅ Code matched:", matchedDealer["Dealer Name"]);
    return matchedDealer;
  } else {
    // ⛔ No alert here. Just return null.
    return null;
  }
};

export default identifyDealer;
