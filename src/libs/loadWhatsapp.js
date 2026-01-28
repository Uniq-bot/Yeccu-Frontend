const loadWa = () => {
  const phoneNumber = "9779861331125"; // digits only, country code required

  window.open(
    `https://wa.me/${phoneNumber}`,
    "_blank",
    "noopener,noreferrer"
  );
};
export default loadWa;