"use strict";

const orderConfig = window.gamingLokuu;
const number = orderConfig.whatsappNumber.replace(/[\s()+-]/g, "");

function updateWhatsApp() {
  if (!/^[1-9]\d{7,14}$/.test(number)) return;

  const contact = new URL("https://wa.me/" + number);
  contact.searchParams.set("text", language === "si"
    ? "Hi Gaming Lokuu Optimize, මට Headshot Tuner එක ගැන ප්‍රශ්නයක් තියෙනවා."
    : "Hi Gaming Lokuu Optimize, I have a question about Headshot Tuner.");
  document.querySelector("[data-contact-link]").href = contact.href;

  const orderLink = document.querySelector("[data-order-link]");
  if (!orderLink) return;

  const checkout = new URL("https://wa.me/" + number);
  const price = orderConfig.priceLkr.toLocaleString("en-LK");
  checkout.searchParams.set("text", language === "si"
    ? "Hi Gaming Lokuu Optimize, මට " + orderConfig.packName + " එක රු. " + price + "ට ගන්න ඕන."
    : "Hi Gaming Lokuu Optimize, I would like to order the " + orderConfig.packName + " for LKR " + price + ".");
  orderLink.href = checkout.href;
  orderLink.hidden = false;
  document.getElementById("order-unavailable").hidden = true;
}
updateWhatsApp();
document.addEventListener("localechange", updateWhatsApp);
