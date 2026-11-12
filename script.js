(function () {
  const nav = document.getElementById("nav");
  const toggle = nav && nav.querySelector(".menu-toggle");
  const menu = document.getElementById("menu");
  if (!nav || !toggle || !menu) return;

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };

  toggle.addEventListener("click", () => {
    setOpen(!nav.classList.contains("is-open"));
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
})();

(function () {
  const video = document.getElementById("kraken-video");
  const btn = document.getElementById("unmute-btn");
  if (!video || !btn) return;

  const setSound = (on) => {
    video.muted = !on;
    btn.classList.toggle("is-on", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.setAttribute("aria-label", on ? "Silenciar" : "Activar sonido");
  };

  btn.addEventListener("click", () => {
    const on = video.muted;
    setSound(on);
    if (video.paused) video.play().catch(() => {});
  });

  const tryPlay = () => video.play().catch(() => {});
  if (video.readyState >= 2) tryPlay();
  else video.addEventListener("canplay", tryPlay, { once: true });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) tryPlay();
  });
})();
