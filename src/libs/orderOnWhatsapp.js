export const orderOnWhatsApp = (product) => {
  const phoneNumber = "9861331125";

  const message = `
Hello, I want to order this product:

🛍 Product: ${product.productName}
💰 Price: Rs. ${product.price}
🖼 Image: ${product.productImage}
  `;

  const encodedMessage = encodeURIComponent(message);

  window.open(
    `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
    "_blank"
  );
};
