const buildWhatsappMessage = (dealer, cart, qty) => {
  if (!dealer || cart.length === 0) return '';

  const date = new Date();
  const formattedDate = date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const lines = [
    `🪔 *Order from ${dealer["Dealer Name"] || "Unknown Dealer"}*`,
    `📞 ${dealer["Phone Number"] || "N/A"}`,
    `🕒 ${formattedDate}`,
    ``,
    `📦 Items:`,
    ...cart.map((item, i) => `${i + 1}. ${item.name} — ${qty[item.name] || 0} pcs`),
    ``,
    `🙏 धन्यवाद! कृपया WhatsApp में *Send* बटन दबाएं`,
  ];

  const message = lines.join("\n");
  const phone = '919829280873'; // Admin's WhatsApp number

  const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return whatsappURL;
};

export default buildWhatsappMessage;
