"use strict";

const sliders = ["General", "Red Dot", "2x Scope", "4x Scope", "Sniper Scope", "Free Look"];
const presets = {
  balanced: [174, 164, 146, 126, 73, 111],
  rush: [184, 174, 151, 128, 73, 119],
  precision: [159, 149, 136, 116, 67, 102]
};
const dragOffsets = { short: 11, normal: 0, long: -12 };
const scopeWeights = [1, 0.9, 0.65, 0.5, 0.3, 0.6];
const storageKey = "aimforge.profile.v1";
const byId = (id) => document.getElementById(id);
const clamp = (value) => Math.min(200, Math.max(0, Math.round(value)));
const form = byId("profile-form");
const scopePicker = byId("tune-scope");
const status = byId("result-status");
let profile = null;
let swipes = [];
let gesture = null;
const tuningHistory = [];

sliders.forEach((label, index) => scopePicker.add(new Option(label, index)));

function hasHot60i(model) {
  return /^(?:(?:infinix)?hot60i(?:4g)?|(?:infinix)?x6728b)$/.test(model.toLowerCase().replace(/[^a-z0-9]/g, ""));
}

function createPreset(inputs, samples) {
  const measuredDrag = samples.length === 3
    ? Math.round(Math.min(14, Math.max(-14, (0.46 - [...samples].sort((a, b) => a - b)[1]) * 50)))
    : dragOffsets[inputs.drag];
  const fingerOffset = { 2: 2, 3: 0, 4: -3 }[inputs.fingers];
  // A conservative starting adjustment for observed stutter. Calibrate again once stable.
  const performanceOffset = inputs.smoothness === "choppy" ? -4 : 0;
  const offsets = measuredDrag + fingerOffset + performanceOffset;
  return presets[inputs.style].map((base, index) => clamp(base + offsets * scopeWeights[index]));
}

function performanceSettings(inputs) {
  const ram = Number.parseInt(inputs.ram, 10);
  const freeSpace = inputs.freeSpace === "" ? null : Number(inputs.freeSpace);
  const reportedStutter = inputs.smoothness === "choppy";
  const lowRam = ram > 0 && ram <= 4;
  const conservative = reportedStutter || (inputs.smoothness === "unknown" && lowRam);
  const graphics = conservative || inputs.smoothness !== "smooth" ? "Smooth" : "Keep current";
  const fps = conservative ? "Normal to start" : "Highest stable";
  const tips = [conservative
    ? "Test for 10 minutes at Normal FPS. If it stays smooth as the phone warms up, try one FPS step higher."
    : "Compare FPS options one at a time. If camera motion starts to stutter, return to the last stable setting."];
  if (conservative) {
    tips.push("Close unused apps and compare gameplay with screen recording turned off.");
  }
  if (freeSpace !== null && freeSpace < 5) {
    tips.push("Free some internal storage before installing updates or recording. Back up personal files before removing them.");
  } else if (freeSpace === null && inputs.storage) {
    tips.push("Your selected storage is total capacity. Check available storage in phone settings if updates or recording cause issues.");
  }
  if (inputs.game === "max" && conservative) {
    tips.push("If MAX keeps stuttering at Smooth graphics, test the standard Free Fire client if it is available in your region.");
  }
  if (inputs.refresh || hasHot60i(inputs.model)) {
    tips.push("Display refresh rate and in-game FPS are separate. Keep the same display mode during calibration.");
  }
  return { graphics, fps, tips };
}

function renderValues() {
  const rows = sliders.map((label, index) => {
    const row = document.createElement("div");
    const title = document.createElement("dt");
    const value = document.createElement("dd");
    const meter = document.createElement("meter");
    title.textContent = label;
    value.textContent = profile.values[index];
    meter.max = 200;
    meter.value = profile.values[index];
    meter.setAttribute("aria-hidden", "true");
    row.append(title, value, meter);
    return row;
  });
  byId("values").replaceChildren(...rows);
  byId("undo-tuning").disabled = tuningHistory.length === 0;
}

function renderProfile() {
  const { inputs } = profile;
  byId("profile-label").textContent = inputs.model + " · " + (inputs.game === "max" ? "Free Fire MAX" : "Free Fire");
  const { graphics, fps, tips } = performanceSettings(inputs);
  byId("graphics-setting").textContent = graphics;
  byId("fps-setting").textContent = fps;
  byId("performance-list").replaceChildren(...tips.map((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    return item;
  }));
  byId("result-empty").hidden = true;
  byId("result-content").hidden = false;
  byId("copy-fallback").hidden = true;
  status.textContent = "";
  tuningHistory.length = 0;
  scopePicker.value = "0";
  renderValues();
  byId("result-title").focus({ preventScroll: true });
  byId("result").scrollIntoView({ block: "nearest" });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputs = Object.fromEntries(new FormData(form));
  inputs.model = inputs.model.trim();
  if (!inputs.model) {
    form.elements.model.reportValidity();
    return;
  }
  profile = { inputs, values: createPreset(inputs, swipes), swipes: [...swipes] };
  renderProfile();
});

function resetGesture() {
  gesture = null;
}

const pad = byId("swipe-pad");
const swipeStatus = byId("swipe-status");
function updateSwipeStatus() {
  swipeStatus.textContent = swipes.length === 3 ? "3 of 3 swipes recorded. Ready to generate." : swipes.length + " of 3 swipes recorded";
}
pad.addEventListener("pointerdown", (event) => {
  const rect = pad.getBoundingClientRect();
  if (!event.isPrimary || event.button !== 0 || swipes.length >= 3 || event.clientY < rect.bottom - 40) return;
  gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, height: rect.height };
  pad.setPointerCapture(event.pointerId);
});
pad.addEventListener("pointerup", (event) => {
  if (!gesture || event.pointerId !== gesture.id) return;
  const distance = gesture.y - event.clientY;
  const sideways = Math.abs(gesture.x - event.clientX);
  if (distance >= 12 && sideways < distance) {
    swipes.push(Math.min(1, distance / gesture.height));
    updateSwipeStatus();
  } else {
    swipeStatus.textContent = "Swipe farther upward. " + swipes.length + " of 3 recorded.";
  }
  resetGesture();
});
pad.addEventListener("pointercancel", resetGesture);
pad.addEventListener("lostpointercapture", resetGesture);
byId("reset-swipes").addEventListener("click", () => {
  swipes = [];
  resetGesture();
  updateSwipeStatus();
});
form.elements.drag.addEventListener("change", () => {
  if (swipes.length) {
    swipes = [];
    resetGesture();
    updateSwipeStatus();
  }
});

document.querySelectorAll("[data-tune]").forEach((button) => button.addEventListener("click", () => {
  const index = Number(scopePicker.value);
  const oldValue = profile.values[index];
  const newValue = clamp(oldValue + Number(button.dataset.tune));
  if (newValue === oldValue) {
    status.textContent = sliders[index] + " is already at " + oldValue + ".";
    return;
  }
  tuningHistory.push({ index, oldValue });
  profile.values[index] = newValue;
  byId("copy-fallback").hidden = true;
  renderValues();
  status.textContent = sliders[index] + " set to " + newValue + ". Try it again in the Training Ground.";
}));

byId("undo-tuning").addEventListener("click", () => {
  const { index, oldValue } = tuningHistory.pop();
  profile.values[index] = oldValue;
  byId("copy-fallback").hidden = true;
  renderValues();
  status.textContent = sliders[index] + " restored to " + oldValue + ".";
});

byId("copy-settings").addEventListener("click", async () => {
  const lines = sliders.map((label, index) => label + ": " + profile.values[index]);
  const { graphics, fps } = performanceSettings(profile.inputs);
  const currentText = [
    "Headshot Tuner · Gaming Lokuu Optimize — " + profile.inputs.model,
    ...lines,
    "Graphics: " + graphics,
    "In-game FPS: " + fps
  ].join("\n");
  const fallback = byId("copy-fallback");
  try {
    await navigator.clipboard.writeText(currentText);
    fallback.hidden = true;
    status.textContent = "Settings copied.";
  } catch {
    fallback.value = currentText;
    fallback.hidden = false;
    fallback.focus();
    fallback.select();
    status.textContent = "Copy the selected text using your device’s copy command.";
  }
});

function savedProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved?.inputs && typeof saved.inputs.model === "string" && saved.inputs.model.trim() &&
        Object.hasOwn(presets, saved.inputs.style) && Array.isArray(saved.values) &&
        saved.values.length === sliders.length && saved.values.every((value) =>
          Number.isInteger(value) && value >= 0 && value <= 200)) return saved;
  } catch {
    return null;
  }
  return null;
}

byId("save-profile").addEventListener("click", () => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(profile));
    byId("load-profile").hidden = false;
    status.textContent = "Profile saved in this browser.";
  } catch {
    status.textContent = "Browser storage is unavailable. Copy your settings to keep them.";
  }
});
byId("load-profile").hidden = !savedProfile();
byId("load-profile").addEventListener("click", () => {
  const saved = savedProfile();
  if (!saved) {
    byId("load-profile").hidden = true;
    return;
  }
  for (const name of new FormData(form).keys()) {
    if (typeof saved.inputs[name] === "string") form.elements[name].value = saved.inputs[name];
  }
  swipes = Array.isArray(saved.swipes) ? saved.swipes.filter((value) => Number.isFinite(value) && value > 0 && value <= 1).slice(0, 3) : [];
  updateSwipeStatus();
  profile = saved;
  renderProfile();
  status.textContent = "Saved profile loaded.";
});
