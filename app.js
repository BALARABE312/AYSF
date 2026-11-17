document.addEventListener("DOMContentLoaded", () => {
  const config = window.NYSF_CONFIG || {};
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
  document.querySelectorAll("[data-email-link]").forEach(el => {
    el.href = `mailto:${config.contactEmail || "nysf@example.com"}`;
    el.textContent = config.contactEmail || "nysf@example.com";
  });
  document.querySelectorAll("[data-email-text]").forEach(el => el.textContent = config.contactEmail || "NYSF contact email");
  document.querySelectorAll("[data-whatsapp-link]").forEach(el => {
    const number = (config.whatsappNumber || "").replace(/\D/g, "");
    el.href = number ? `https://wa.me/${number}?text=${encodeURIComponent("Hello NYSF, I would like to make an enquiry.")}` : "#";
    el.target = "_blank"; el.rel = "noopener";
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (menuToggle && nav) menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "×" : "☰";
  });

  const params = new URLSearchParams(location.search);
  const typeSelect = document.getElementById("memberType");
  if (typeSelect && params.get("type") === "team") typeSelect.value = "Team";
  const updateRegistrationFields = () => {
    if (!typeSelect) return;
    const type = typeSelect.value;
    document.querySelectorAll(".athlete-fields").forEach(el => el.classList.toggle("hidden", type !== "Athlete"));
    document.querySelectorAll(".team-fields").forEach(el => el.classList.toggle("hidden", !["Team", "Academy"].includes(type)));
  };
  if (typeSelect) { typeSelect.addEventListener("change", updateRegistrationFields); updateRegistrationFields(); }

  const registrationForm = document.getElementById("registrationForm");
  if (registrationForm) registrationForm.addEventListener("submit", e => {
    e.preventDefault();
    const message = document.getElementById("registrationMessage");
    const data = Object.fromEntries(new FormData(registrationForm).entries());
    message.classList.remove("hidden");
    message.innerHTML = `<strong>Demo submission prepared.</strong><p>Thank you, ${escapeHTML(data.fullName || "applicant")}. Your ${escapeHTML((data.memberType || "registration").toLowerCase())} request has been validated in this browser only. It has <b>not</b> been sent to NYSF. Connect a secure backend to receive applications.</p>`;
    message.scrollIntoView({behavior:"smooth", block:"nearest"});
  });

  const contactForm = document.getElementById("contactForm");
  if (contactForm) contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const recipient = config.contactEmail || "nysf@example.com";
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const category = document.getElementById("contactCategory").value;
    const urgency = document.getElementById("urgency").value;
    const subject = document.getElementById("contactSubject").value.trim();
    const body = `Name: ${name}\nReply email: ${email}\nCategory: ${category}\nPriority: ${urgency}\n\n${document.getElementById("contactMessage").value.trim()}`;
    const status = document.getElementById("contactMessageStatus");
    status.classList.remove("hidden");
    status.innerHTML = `<strong>Your email draft is ready.</strong><p>If your email app does not open, copy the message details and send them to ${escapeHTML(recipient)}.</p>`;
    window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(`[NYSF ${category}] ${subject}`)}&body=${encodeURIComponent(body)}`;
  });

  const athleteSearch = document.getElementById("athleteSearch");
  const positionFilter = document.getElementById("positionFilter");
  const athleteCards = [...document.querySelectorAll("#athleteGrid .athlete-card")];
  const filterAthletes = () => {
    const query = (athleteSearch?.value || "").toLowerCase();
    const position = positionFilter?.value || "";
    let visible = 0;
    athleteCards.forEach(card => {
      const match = `${card.dataset.name} ${card.dataset.position} ${card.dataset.state}`.toLowerCase().includes(query) && (!position || card.dataset.position === position);
      card.classList.toggle("hidden", !match); if (match) visible++;
    });
    document.getElementById("athleteEmpty")?.classList.toggle("hidden", visible > 0);
  };
  athleteSearch?.addEventListener("input", filterAthletes); positionFilter?.addEventListener("change", filterAthletes);

  const teamSearch = document.getElementById("teamSearch");
  const teamCards = [...document.querySelectorAll("#teamGrid .team-card")];
  teamSearch?.addEventListener("input", () => {
    const query = teamSearch.value.toLowerCase(); let visible = 0;
    teamCards.forEach(card => { const match = `${card.dataset.name} ${card.dataset.state}`.toLowerCase().includes(query); card.classList.toggle("hidden", !match); if(match) visible++; });
    document.getElementById("teamEmpty")?.classList.toggle("hidden", visible > 0);
  });

  const competitionFilter = document.getElementById("competitionFilter");
  competitionFilter?.addEventListener("change", () => {
    const value = competitionFilter.value; let visible = 0;
    document.querySelectorAll("#competitionList .competition-card").forEach(card => { const match = !value || card.dataset.status === value; card.classList.toggle("hidden", !match); if(match) visible++; });
    document.getElementById("competitionEmpty")?.classList.toggle("hidden", visible > 0);
  });

  const modal = document.getElementById("athleteModal");
  document.querySelectorAll(".athlete-detail").forEach(btn => btn.addEventListener("click", () => {
    document.getElementById("modalTitle").textContent = btn.dataset.athlete;
    document.getElementById("modalSubtitle").textContent = "Youth player · Sample profile · Statistics are illustrative";
    modal?.classList.remove("hidden"); document.body.classList.add("modal-open");
  }));
  const closeModal = () => { modal?.classList.add("hidden"); document.body.classList.remove("modal-open"); };
  modal?.querySelector(".modal-close")?.addEventListener("click", closeModal);
  modal?.addEventListener("click", e => { if(e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });

  document.getElementById("exportDashboard")?.addEventListener("click", () => {
    const report = `NYSF SAMPLE ATHLETE SUMMARY\n\nProfile: Sample Athlete\nPosition: Forward | Age group: U-17\nAppearances: 18\nGoals: 12\nAssists: 7\nSample coach rating: 8.1/10\n\nDevelopment goals:\n- Improve weaker-foot finishing\n- Review off-ball movement with a coach\n- Follow an age-appropriate fitness plan\n\nDISCLAIMER: Illustrative demo data only. Not an official NYSF record.`;
    const blob = new Blob([report], {type:"text/plain;charset=utf-8"});
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "NYSF-sample-athlete-summary.txt"; a.click(); URL.revokeObjectURL(url);
  });
});
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}