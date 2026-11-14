"use strict";

const config = window.aimForgeStore;
const orderMessage = "Hi Gaming Lokuu Optimize, මට Infinix Hot 60i 4G Full Optimization Pack එක රු. 1,500ට ගන්න ඕන.";

function whatsappOrderUrl(raw) {
  const digits = raw.trim().replace(/[\s()-]/g, "").replace(/^\+/, "");
  const number = /^07\d{8}$/.test(digits) ? "94" + digits.slice(1) : digits;
  if (!/^[1-9]\d{7,14}$/.test(number)) return null;

  const url = new URL("https://wa.me/" + number);
  url.searchParams.set("text", orderMessage);
  return url;
}

const orderUrl = whatsappOrderUrl(config.whatsappNumber);
if (orderUrl) {
  const order = document.getElementById("order-link");
  order.href = orderUrl.href;
  order.hidden = false;
  document.getElementById("order-status").hidden = true;
  document.getElementById("delivery").hidden = false;
}

function httpsUrl(raw) {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && !url.username && !url.password ? url : null;
  } catch {
    return null;
  }
}

const generatorUrl = httpsUrl(config.generatorUrl);
if (generatorUrl) {
  const generator = document.getElementById("generator-link");
  generator.href = generatorUrl.href;
  generator.hidden = false;
}
