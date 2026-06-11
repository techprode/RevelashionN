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
  initCarrousels();
  initHairMatchStrip();
  initReveals();
  initAccordeons();
  initFiltres();
  initFicheProduit();
});

function initHeader() {}
function initMarquee() {}
function initMegaMenu() {}
function initCarrousels() {}
function initShowcase() {}
function initHairMatchStrip() {}
function initReveals() {}
function initAccordeons() {}
function initFiltres() {}
function initFicheProduit() {}
