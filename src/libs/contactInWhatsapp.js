export const contactInWhatsApp = (contact) => {
  const phoneNumber = "9779861331125"; // add country code, digits only

  const message =`${contact.message}`;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
};
