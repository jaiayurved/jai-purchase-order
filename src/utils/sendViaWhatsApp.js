
const sendViaWhatsApp = (phone, message) => {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phone}?text=${encodedMessage}`;
  window.open(url, '_blank');
};

export default sendViaWhatsApp;
