// ============================================================
// REVELASHION™ — interactions prototype
// ============================================================

// Données catalogue (remplacer les prix ici)
const PRODUITS = {
  aftersun:    { nom: "Aftersun™",    sousTitre: "Regard naturel retour de plage",    prix: "26€", badge: "accès anticipé" },
  wetlift:     { nom: "Wetlift™",     sousTitre: "Wet look, sortie de baignade",      prix: "26€", badge: "accès anticipé" },
  primer:      { nom: "Le Primer™",   sousTitre: "Prolonge la tenue jusqu'à 5 jours", prix: "14€", badge: null },
  applicateur: { nom: "Applicateur™", sousTitre: "Pince de pose précision",           prix: "12€", badge: "exclu revelashion" },
  saltkit:     { nom: "Salt Kit™",    sousTitre: "Aftersun™ + Wetlift™ + Primer™",    prix: "58€", badge: "exclu revelashion" },
};

const HAIR_MATCH = [
  { num: "01", nom: "Black™" },
  { num: "02", nom: "Brown™" },
  { num: "03", nom: "Blonde™" },
  { num: "04", nom: "Copper™" },
];

document.addEventListener("DOMContentLoaded", () => {
  // chaque init vérifie la présence de son élément : OK sur les 3 pages
  initHeader();
  initMarquee();
  initMegaMenu();
  initReveals();
  initUgc();
  initAccordeons();
  initLogoGeant();
  initBoutique();
  initFiche();
});

function initHeader() {
  const entete = document.querySelector(".entete");
  if (!entete) return;
  addEventListener("scroll", () => entete.classList.toggle("est-scrolle", scrollY > 24), { passive: true });
}

function initMarquee() {
  const annonce = document.querySelector("[data-marquee]");
  if (!annonce) return;
  const btn = annonce.querySelector("[data-marquee-toggle]");
  btn.addEventListener("click", () => {
    const pause = annonce.classList.toggle("est-pause");
    btn.textContent = pause ? "▶" : "⏸";
    btn.setAttribute("aria-label", pause ? "Relancer le bandeau" : "Mettre en pause le bandeau");
  });
}

// ------------------------------------------------------------
// Méga-menu : ouverture (Shop / burger), onglets + souligné animé
// ------------------------------------------------------------
function initMegaMenu() {
  const menu = document.querySelector("[data-menu]");
  if (!menu) return;

  const declencheur = document.querySelector("[data-menu-declencheur]");
  const burger = document.querySelector("[data-burger]");
  const voile = document.querySelector("[data-menu-voile]");
  const souligne = menu.querySelector("[data-souligne]");
  const onglets = [...menu.querySelectorAll("[data-onglet]")];
  const panneaux = [...menu.querySelectorAll("[data-panneau]")];

  menu.hidden = false;   // visibilité gérée en CSS (.est-ouvert)
  voile.hidden = false;
  voile.style.pointerEvents = "none";

  function ouvrir(etat) {
    menu.classList.toggle("est-ouvert", etat);
    burger?.classList.toggle("est-ouvert", etat);
    document.body.classList.toggle("menu-ouvert", etat);
    voile.style.opacity = etat ? "1" : "0";
    voile.style.pointerEvents = etat ? "auto" : "none";
    declencheur?.setAttribute("aria-expanded", etat);
    burger?.setAttribute("aria-expanded", etat);
    if (etat) requestAnimationFrame(positionnerSouligne);
  }
  const estOuvert = () => menu.classList.contains("est-ouvert");

  declencheur?.addEventListener("click", () => ouvrir(!estOuvert()));
  burger?.addEventListener("click", () => ouvrir(!estOuvert()));
  voile.addEventListener("click", () => ouvrir(false));
  addEventListener("keydown", (e) => { if (e.key === "Escape") ouvrir(false); });

  // Onglets
  function positionnerSouligne() {
    const actif = menu.querySelector(".menu__onglet.est-actif");
    if (!actif || !souligne) return;
    souligne.style.left = `${actif.offsetLeft}px`;
    souligne.style.width = `${actif.offsetWidth}px`;
  }
  onglets.forEach((onglet) => {
    onglet.addEventListener("click", () => {
      onglets.forEach((o) => {
        o.classList.toggle("est-actif", o === onglet);
        o.setAttribute("aria-selected", o === onglet);
      });
      panneaux.forEach((p) => {
        const actif = p.dataset.panneau === onglet.dataset.onglet;
        p.hidden = !actif;
        p.classList.toggle("est-actif", actif);
      });
      positionnerSouligne();
    });
  });
  addEventListener("resize", positionnerSouligne);

  // mobile menu close buttons (inside menu markup)
  const closeButtons = menu.querySelectorAll("[data-menu-close]");
  closeButtons.forEach((btn) => btn.addEventListener("click", () => ouvrir(false)));
}

// ------------------------------------------------------------
// Apparitions au scroll (.reveal → .est-visible)
// ------------------------------------------------------------
function initReveals() {
  const cibles = document.querySelectorAll(".reveal");
  if (!cibles.length) return;
  const observeur = new IntersectionObserver((entrees) => {
    entrees.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("est-visible");
        observeur.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });
  cibles.forEach((c) => observeur.observe(c));
}

// ------------------------------------------------------------
// Galerie UGC : flèches ← →
// ------------------------------------------------------------
function initUgc() {
  const piste = document.querySelector("[data-ugc-piste]");
  if (!piste) return;
  const pas = () => piste.querySelector(".ugc__photo").offsetWidth + 14;
  document.querySelector("[data-ugc-prec]")?.addEventListener("click", () => piste.scrollBy({ left: -pas(), behavior: "smooth" }));
  document.querySelector("[data-ugc-suiv]")?.addEventListener("click", () => piste.scrollBy({ left: pas(), behavior: "smooth" }));
}

// ------------------------------------------------------------
// Accordéon mission : un seul item ouvert à la fois
// ------------------------------------------------------------
function initAccordeons() {
  const items = [...document.querySelectorAll("[data-accordeon]")];
  items.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) items.forEach((autre) => { if (autre !== item) autre.open = false; });
    });
  });
}

// ------------------------------------------------------------
// Logo géant footer : lettres qui montent à l'entrée en vue
// ------------------------------------------------------------
function initLogoGeant() {
  const logo = document.querySelector("[data-logo-geant]");
  if (!logo) return;
  const texte = logo.textContent.trim();
  logo.textContent = "";
  [...texte].forEach((lettre, i) => {
    const span = document.createElement("span");
    span.textContent = lettre;
    span.style.transitionDelay = `${i * 35}ms`;
    logo.appendChild(span);
  });
  const observeur = new IntersectionObserver((entrees) => {
    entrees.forEach((e) => {
      if (e.isIntersecting) {
        logo.classList.add("est-visible");
        observeur.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observeur.observe(logo);
}

// ------------------------------------------------------------
// Boutique : segments + pastilles/chips sélectionnables
// ------------------------------------------------------------
function initBoutique() {
  const segments = [...document.querySelectorAll("[data-segment]")];
  segments.forEach((seg) => {
    seg.addEventListener("click", () => {
      segments.forEach((s) => {
        s.classList.toggle("est-actif", s === seg);
        s.setAttribute("aria-selected", s === seg);
      });
    });
  });

  // pastilles Hair Match™ des cards (sélection visuelle)
  document.querySelectorAll("[data-hairmatch]").forEach((groupe) => {
    const pastilles = [...groupe.querySelectorAll(".pastille:not(.est-epuise)")];
    pastilles.forEach((p) => p.addEventListener("click", () =>
      pastilles.forEach((x) => x.classList.toggle("est-active", x === p))));
  });

  // chips longueurs des cards
  document.querySelectorAll(".produit__chips").forEach((groupe) => {
    const chips = [...groupe.querySelectorAll(".chip")];
    chips.forEach((c) => c.addEventListener("click", () =>
      chips.forEach((x) => x.classList.toggle("est-actif", x === c))));
  });
}

// ------------------------------------------------------------
// Fiche produit : carrousel points, nuancier, Reveal Box™
// ------------------------------------------------------------
function initFiche() {
  const fiche = document.querySelector("[data-fiche]");
  if (!fiche) return;

  // Carrousel : point actif suit le scroll
  const carrousel = document.querySelector("[data-fiche-carrousel]");
  const points = [...document.querySelectorAll("[data-fiche-points] span")];
  carrousel?.addEventListener("scroll", () => {
    const i = Math.round(carrousel.scrollLeft / carrousel.clientWidth);
    points.forEach((pt, j) => pt.classList.toggle("est-actif", j === i));
  }, { passive: true });

  // Nuancier Hair Match™ : met à jour le libellé COULEUR
  const libelleCouleur = document.querySelector("[data-fiche-couleur]");
  const nuances = [...document.querySelectorAll("[data-fiche-nuancier] .pastille")];
  nuances.forEach((n) => {
    n.addEventListener("click", () => {
      nuances.forEach((x) => x.classList.toggle("est-active", x === n));
      if (libelleCouleur) libelleCouleur.textContent = n.dataset.couleur;
    });
  });

  // Reveal Box™ : ajouts → compteurs + total (-50% à partir de 5 articles)
  const OBJECTIF = 5;
  let articles = 0;
  let total = 0;
  const majCompteurs = () => {
    document.querySelectorAll("[data-fiche-compte]").forEach((el) => el.textContent = articles);
    document.querySelectorAll("[data-fiche-restant]").forEach((el) => el.textContent = Math.max(0, OBJECTIF - articles));
    const reduit = articles >= OBJECTIF ? total / 2 : total;
    const elTotal = document.querySelector("[data-fiche-total]");
    if (elTotal) elTotal.textContent = `€${reduit.toFixed(2).replace(".", ",").replace(",00", "")}`;
  };
  document.querySelectorAll(".longueur__add:not(.est-epuise)").forEach((btn) => {
    btn.addEventListener("click", () => {
      articles += 1;
      total += Number(btn.dataset.prix || 0);
      btn.textContent = "Ajouté ✓";
      setTimeout(() => { btn.textContent = "Ajouter"; }, 1200);
      majCompteurs();
    });
  });
}
