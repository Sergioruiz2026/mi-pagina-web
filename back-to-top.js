(() => {
  const button = document.createElement("button");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  button.type = "button";
  button.className = "back-to-top";
  button.textContent = "↑";
  button.setAttribute("aria-label", "Volver arriba");
  button.setAttribute("aria-hidden", "true");
  button.title = "Volver arriba";
  button.tabIndex = -1;
  button.style.cssText = [
    "position:fixed",
    "right:18px",
    "bottom:calc(88px + env(safe-area-inset-bottom, 0px))",
    "z-index:1000",
    "width:48px",
    "height:48px",
    "display:grid",
    "place-items:center",
    "padding:0",
    "border:0",
    "border-radius:50%",
    "background:#a12750",
    "color:#fff",
    "font:600 1.65rem/1 system-ui,sans-serif",
    "box-shadow:0 6px 16px rgba(0,0,0,.24)",
    "cursor:pointer",
    "opacity:0",
    "visibility:hidden",
    "transform:translateY(10px)",
    reducedMotion ? "transition:none" : "transition:opacity .2s ease,transform .2s ease,visibility .2s ease"
  ].join(";");

  const updateVisibility = () => {
    const visible = window.scrollY > 400;
    button.style.opacity = visible ? "1" : "0";
    button.style.visibility = visible ? "visible" : "hidden";
    button.style.transform = visible ? "translateY(0)" : "translateY(10px)";
    button.tabIndex = visible ? 0 : -1;
    button.setAttribute("aria-hidden", String(!visible));
  };

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });
  window.addEventListener("scroll", updateVisibility, { passive: true });
  document.body.append(button);
  updateVisibility();
})();
