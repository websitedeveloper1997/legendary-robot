// Leads are emailed to this address via FormSubmit. The first submission sends a one-time
// activation email to this inbox; click the link in it and later leads arrive automatically.
const LEAD_EMAIL = "wellcarehomecareservices@gmail.com";
document.querySelector(".menu")?.addEventListener("click", e => {
  const o = document.querySelector("nav").classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", o);
});
document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => document.querySelector("nav").classList.remove("open")));
document.querySelectorAll("form.lead").forEach(f => f.addEventListener("submit", async e => {
  e.preventDefault();
  const msg = f.querySelector(".msg"), btn = f.querySelector("button");
  msg.className = "msg"; msg.textContent = "";
  if (f.querySelector(".hp input").value) return;
  if (!f.checkValidity()) { f.reportValidity(); return; }
  const data = Object.fromEntries(new FormData(f)); delete data.website;
  data._subject = "New strategy session request - CareOps Foundry"; data._template = "table"; data._captcha = "false";
  btn.disabled = true; btn.textContent = "Sending...";
  try {
    const r = await fetch("https://formsubmit.co/ajax/" + LEAD_EMAIL, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
    const j = await r.json();
    if (!r.ok || j.success === "false") throw 0;
    f.reset(); msg.className = "msg ok"; msg.textContent = "Thank you. We received your request and will contact you to schedule your session.";
  } catch { msg.className = "msg err"; msg.textContent = "Could not send. Please try again or call (346) 243-1484."; }
  btn.disabled = false; btn.textContent = "Request my session";
}));
