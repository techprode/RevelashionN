# REVELASHION™ Prototype Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire le prototype statique REVELASHION™ (homepage + méga-menu produits + page collection Salt Series™ + fiche produit Aftersun™) conforme à la spec `docs/superpowers/specs/2026-06-11-revelashion-prototype-design.md`.

**Architecture:** Site statique multi-pages sans build : 3 fichiers HTML partageant un `css/styles.css` (design tokens → base → composants → sections) et un `js/main.js` (interactions par modules-fonctions, initialisées par présence des éléments dans le DOM). Header/footer/méga-menu dupliqués dans chaque page (contrainte statique, conversion Shopify ensuite).

**Tech Stack:** HTML5, CSS vanilla (custom properties, scroll-snap, grid), JS vanilla (IntersectionObserver, pointer events), Google Fonts (Inter + Michroma, fallbacks système). Zéro dépendance.

**Vérification:** Pas de framework de test (prototype visuel statique). Chaque tâche se termine par une vérification navigateur explicite (`open index.html`) + critères observables listés. Commits fréquents.

---

## Référence contenu (source unique — utilisée par toutes les tâches)

**Palette (tokens):** `--blanc:#FFFFFF` · `--noir:#0C0C0C` · `--gris-carte:#F5F5F3` · `--gris-ligne:#E5E5E1` · `--gris-texte:#6B6B66` · `--vert:#1B4D3E` · `--vert-voile:#EAF2ED`

**Catalogue:**

| id | Nom | Sous-titre | Prix | Badge | HairMatch |
|---|---|---|---|---|---|
| aftersun | Aftersun™ | Regard naturel retour de plage | 26€ | accès anticipé | oui |
| wetlift | Wetlift™ | Wet look, sortie de baignade | 26€ | accès anticipé | oui |
| primer | Le Primer™ | Prolonge la tenue jusqu'à 5 jours | 14€ | — | non |
| applicateur | Applicateur™ | Pince de pose précision | 12€ | exclu revelashion | non |
| saltkit | Salt Kit™ | Aftersun™ + Wetlift™ + Primer™ | 58€ | exclu revelashion | oui |

**Teasers:** Pilates™ `bientôt` · Tennis™ `bientôt` · Entrepreneur™ `rentrée` · Student™ `rentrée` · Modulash™ `septembre`

**Hair Match™:** `01 Black™ #1A1A1A` · `02 Brown™ #5C4332` · `03 Blonde™ #C9A66B` · `04 Copper™ #A65A33`

**Marquee:** `LANCEMENT OFFICIEL — 05.07.2026 • REJOINS LE REVEAL CLUB™ • LIVRAISON OFFERTE DÈS 45€ •`

---

### Task 1: Scaffold + design tokens + base CSS

**Files:**
- Create: `css/styles.css`
- Create: `js/main.js`
- Create: `index.html` (squelette)

- [ ] **Step 1: Créer `index.html` squelette** — doctype, `lang="fr"`, meta viewport, `<title>revelashion™ — La première marque LashCare™</title>`, lien Google Fonts (`Inter:wght@400;500;600;700` + `Michroma`), lien `css/styles.css`, `<script src="js/main.js" defer>`, body vide avec commentaire `<!-- sections injectées aux tâches suivantes -->`.

- [ ] **Step 2: Écrire la base de `css/styles.css`** — dans cet ordre :
  1. `:root` avec les 7 tokens couleur ci-dessus + `--font-base:'Inter',Helvetica,Arial,sans-serif` + `--font-display:'Michroma',monospace` + `--radius-carte:16px` + `--transition:0.25s cubic-bezier(.4,0,.2,1)` + largeur conteneur `--conteneur:1440px`.
  2. Reset minimal (`*{box-sizing:border-box;margin:0}`, `img,svg{display:block}`, `button{font:inherit;background:none;border:0;cursor:pointer}`, `a{color:inherit;text-decoration:none}`).
  3. Base : `body{font-family:var(--font-base);color:var(--noir);background:var(--blanc);font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased}`.
  4. Utilitaires : `.conteneur{max-width:var(--conteneur);margin-inline:auto;padding-inline:clamp(16px,3vw,40px)}`, `.label{font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:600}`, `.mot-display{font-family:var(--font-display);text-transform:lowercase}`.
  5. Composants boutons : `.btn` (pilule, border 1px noir, uppercase 12px, letter-spacing .08em, padding 14px 28px, radius 999px, `position:relative`, transition) ; `.btn:hover{background:var(--noir);color:var(--blanc)}` ; **surpiqûre** : `.btn::after{content:"";position:absolute;inset:-5px;border:1.5px dashed var(--vert);border-radius:999px;opacity:0;transition:opacity var(--transition)}` ; `.btn:hover::after{opacity:1}` ; variantes `.btn--plein` (fond noir texte blanc), `.btn--blanc` (border/texte blancs pour héros), `.btn--achat` (fond `--vert-voile`, texte noir, pleine largeur, sans border).
  6. Badge : `.badge{font-family:var(--font-display);font-size:10px;background:var(--noir);color:var(--blanc);padding:6px 12px;border-radius:999px;text-transform:lowercase;white-space:nowrap}` + `.badge--vert{background:var(--vert)}`.
  7. Pastilles : `.pastille{width:32px;height:32px;border-radius:50%;border:2px solid transparent;outline:1px solid var(--gris-ligne);outline-offset:2px;transition:outline-color var(--transition)}` ; `.pastille.est-active{outline:2px solid var(--vert)}` ; modificateurs `.pastille--black{background:#1A1A1A}` `--brown:#5C4332` `--blonde:#C9A66B` `--copper:#A65A33`.
  8. Accessibilité : `:focus-visible{outline:2px solid var(--vert);outline-offset:3px}` + bloc `@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}` (placé EN FIN de fichier à la tâche 10).

- [ ] **Step 3: Créer `js/main.js`** avec l'en-tête de données + bootstrap :

```js
// REVELASHION™ — interactions prototype
// Données catalogue (remplacer les prix ici)
const PRODUITS = {
  aftersun:    { nom: "Aftersun™",    sousTitre: "Regard naturel retour de plage",   prix: "26€", badge: "accès anticipé" },
  wetlift:     { nom: "Wetlift™",     sousTitre: "Wet look, sortie de baignade",     prix: "26€", badge: "accès anticipé" },
  primer:      { nom: "Le Primer™",   sousTitre: "Prolonge la tenue jusqu'à 5 jours", prix: "14€", badge: null },
  applicateur: { nom: "Applicateur™", sousTitre: "Pince de pose précision",          prix: "12€", badge: "exclu revelashion" },
  saltkit:     { nom: "Salt Kit™",    sousTitre: "Aftersun™ + Wetlift™ + Primer™",   prix: "58€", badge: "exclu revelashion" },
};
const HAIR_MATCH = [
  { num: "01", nom: "Black™" }, { num: "02", nom: "Brown™" },
  { num: "03", nom: "Blonde™" }, { num: "04", nom: "Copper™" },
];
document.addEventListener("DOMContentLoaded", () => {
  // chaque init vérifie la présence de son élément : OK sur les 3 pages
  initHeader(); initMarquee(); initMegaMenu(); initCarrousels();
  initReveals(); initAccordeons(); initFicheProduit();
});
```

(Déclarer chaque `initX` comme fonction vide pour l'instant : `function initHeader(){}` etc. — elles sont remplies aux tâches suivantes.)

- [ ] **Step 4: Vérifier** — `open index.html` : page blanche sans erreur console (vérifier avec l'inspecteur si disponible, sinon contrôle visuel).

- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: scaffold + design tokens + composants de base"`

---

### Task 2: Barre d'annonce marquee + header sticky

**Files:**
- Modify: `index.html` (début du body)
- Modify: `css/styles.css` (section HEADER)
- Modify: `js/main.js` (initMarquee, initHeader)

- [ ] **Step 1: Markup** en haut du body :

```html
<div class="annonce" data-marquee>
  <div class="annonce__piste">
    <span class="annonce__contenu">LANCEMENT OFFICIEL — 05.07.2026 • REJOINS LE REVEAL CLUB™ • LIVRAISON OFFERTE DÈS 45€ •&nbsp;</span>
    <span class="annonce__contenu" aria-hidden="true">LANCEMENT OFFICIEL — 05.07.2026 • REJOINS LE REVEAL CLUB™ • LIVRAISON OFFERTE DÈS 45€ •&nbsp;</span>
  </div>
  <button class="annonce__pause" data-marquee-toggle aria-label="Mettre en pause le bandeau">⏸</button>
</div>

<header class="header" data-header>
  <button class="header__burger" data-burger aria-label="Ouvrir le menu" aria-expanded="false">
    <span></span><span></span>
  </button>
  <nav class="header__nav header__nav--gauche" aria-label="Navigation principale">
    <button class="label header__lien" data-menu-declencheur aria-expanded="false">Shop</button>
    <a class="label header__lien" href="#vision">À propos</a>
    <a class="label header__lien" href="#club">Reveal Club™</a>
  </nav>
  <a class="header__logo" href="index.html">revelashion</a>
  <nav class="header__nav header__nav--droite" aria-label="Compte et panier">
    <button class="label header__lien">Recherche</button>
    <button class="label header__lien header__lien--compte">Compte</button>
    <button class="label header__lien">Panier (0)</button>
  </nav>
</header>
```

- [ ] **Step 2: CSS** — `.annonce` (fond `--gris-carte`, hauteur 36px, overflow hidden, flex, font 11px uppercase letter-spacing) ; `.annonce__piste{display:flex;white-space:nowrap;animation:defile 22s linear infinite}` ; `@keyframes defile{to{transform:translateX(-50%)}}` ; `.annonce.est-pause .annonce__piste{animation-play-state:paused}`. `.header{position:sticky;top:0;z-index:50;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:18px clamp(16px,3vw,40px);background:var(--blanc);transition:box-shadow var(--transition)}` ; `.header.est-scrolle{box-shadow:0 1px 0 var(--gris-ligne)}` ; logo : `font-weight:700;font-size:28px;letter-spacing:-.03em` ; nav droite `justify-content:flex-end;gap:24px` ; burger caché desktop (`display:none`), 2 spans de 18px empilés ; mobile (`max-width:1079px`) : nav gauche cachée, burger visible, lien Compte caché.

- [ ] **Step 3: JS** :

```js
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
function initHeader() {
  const header = document.querySelector("[data-header]");
  if (!header) return;
  addEventListener("scroll", () => header.classList.toggle("est-scrolle", scrollY > 24), { passive: true });
}
```

- [ ] **Step 4: Vérifier** — marquee défile en boucle sans rupture, pause/lecture fonctionne, header sticky avec hairline au scroll (ajouter temporairement `<div style="height:200vh">` pour tester, puis le retirer).

- [ ] **Step 5: Commit** — `git commit -am "feat: marquee annonce + header sticky"`

---

### Task 3: Méga-menu (desktop dropdown + overlay mobile, onglets produits)

**Files:**
- Modify: `index.html` (après `</header>`)
- Modify: `css/styles.css` (section MENU)
- Modify: `js/main.js` (initMegaMenu)

- [ ] **Step 1: Markup** — panneau unique servant le desktop (dropdown sous header) et le mobile (overlay) :

```html
<div class="menu" data-menu hidden>
  <div class="menu__onglets" role="tablist">
    <button class="menu__onglet label est-actif" data-onglet="salt" role="tab" aria-selected="true">Salt '26</button>
    <button class="menu__onglet label" data-onglet="ready" role="tab" aria-selected="false">Reveal Ready™</button>
    <button class="menu__onglet label" data-onglet="avenir" role="tab" aria-selected="false">À venir</button>
    <button class="menu__onglet label" data-onglet="sets" role="tab" aria-selected="false">Sets</button>
    <span class="menu__souligne" data-souligne></span>
  </div>

  <div class="menu__panneau est-actif" data-panneau="salt">
    <a class="menu__produit" href="produit.html">
      <span class="menu__vignette menu__vignette--aftersun" aria-hidden="true"></span>
      <span class="menu__infos"><strong>AFTERSUN™</strong><small>Regard naturel retour de plage</small></span>
      <span class="badge">accès anticipé</span>
    </a>
    <a class="menu__produit" href="produit.html">
      <span class="menu__vignette menu__vignette--wetlift" aria-hidden="true"></span>
      <span class="menu__infos"><strong>WETLIFT™</strong><small>Wet look, sortie de baignade</small></span>
      <span class="badge">accès anticipé</span>
    </a>
    <a class="menu__produit" href="produit.html">
      <span class="menu__vignette menu__vignette--primer" aria-hidden="true"></span>
      <span class="menu__infos"><strong>LE PRIMER™</strong><small>Prolonge la tenue jusqu'à 5 jours</small></span>
    </a>
    <a class="menu__produit" href="produit.html">
      <span class="menu__vignette menu__vignette--saltkit" aria-hidden="true"></span>
      <span class="menu__infos"><strong>SALT KIT™</strong><small>Aftersun™ + Wetlift™ + Primer™</small></span>
      <span class="badge badge--vert">exclu revelashion</span>
    </a>
  </div>

  <div class="menu__panneau" data-panneau="ready" hidden>
    <p class="menu__concept">Comme des faux cils en bande. <em>Sans la bande visible.</em></p>
    <!-- lignes produits Aftersun™ + Wetlift™ : reprendre EXACTEMENT les deux <a class="menu__produit"> ci-dessus -->
  </div>

  <div class="menu__panneau" data-panneau="avenir" hidden>
    <!-- 5 lignes non cliquables : même structure que .menu__produit mais en <div class="menu__produit menu__produit--teaser"> -->
    <!-- Pilates™ / Première collection sport — badge "bientôt" -->
    <!-- Tennis™ / Regard match point — badge "bientôt" -->
    <!-- Entrepreneur™ / Cat eye signature — badge "rentrée" -->
    <!-- Student™ / Volume assumé — badge "rentrée" -->
    <!-- Modulash™ / Build Your Own Look™ — badge "septembre" -->
  </div>

  <div class="menu__panneau" data-panneau="sets" hidden>
    <!-- ligne Salt Kit™ : reprendre EXACTEMENT le <a> Salt Kit™ ci-dessus -->
  </div>

  <a class="btn menu__cta" href="collection.html">Voir la collection</a>
</div>
<div class="menu-voile" data-menu-voile hidden></div>
```

- [ ] **Step 2: CSS desktop (≥1080px)** — `.menu{position:absolute;top:100%;left:0;right:0;z-index:49;background:var(--blanc);border-top:1px solid var(--gris-ligne);padding:32px clamp(16px,3vw,40px) 40px;transform:translateY(-12px);opacity:0;pointer-events:none;transition:transform .25s ease-out,opacity .25s ease-out}` ; `.menu.est-ouvert{transform:none;opacity:1;pointer-events:auto}` (le header parent passe en `position:sticky` + `.menu` ancré via un wrapper `position:relative` — envelopper header+menu dans `<div class="entete" style="position:sticky;top:0;z-index:50">`, le header perd alors son sticky propre). Panneaux : grid 4 colonnes de cartes. `.menu__produit{display:flex;align-items:center;gap:14px;background:var(--gris-carte);border-radius:12px;padding:14px;transform:translateY(8px);opacity:0;transition:transform .3s,opacity .3s}` ; `.menu.est-ouvert .menu__produit{transform:none;opacity:1}` ; stagger : `.menu__produit:nth-child(2){transition-delay:60ms}` (3)→120ms (4)→180ms (5)→240ms. Vignettes : 56px, radius 8px, dégradés par produit (`--aftersun`: linear-gradient sable→pêche ; `--wetlift`: bleu-gris ; `--primer`: blanc cassé ; `--saltkit`: vert voile→sable). `.menu__souligne{position:absolute;bottom:-1px;height:2px;background:var(--vert);transition:left .25s,width .25s}` (le conteneur d'onglets est `position:relative`, gap 28px, border-bottom hairline). `.menu__produit--teaser{opacity:.55;pointer-events:none}` — attention au conflit avec le stagger : utiliser `.menu.est-ouvert .menu__produit--teaser{opacity:.55}`. `.menu__concept{grid-column:1/-1;font-size:18px}`. `.menu-voile{position:fixed;inset:0;background:rgb(0 0 0/.18);z-index:40;opacity:0;transition:opacity .25s}`.

- [ ] **Step 3: CSS mobile (<1080px)** — `.menu` devient overlay plein écran : `position:fixed;inset:0;top:calc(36px + 64px);overflow:auto;padding:24px 16px` ; panneaux en 1 colonne ; onglets scrollables horizontalement ; `.menu__cta` pleine largeur centré. Burger morph : `.header__burger.est-ouvert span:first-child{transform:translateY(4px) rotate(0);opacity:1}` + `span:last-child{opacity:0}` → résultat : un seul trait `—`.

- [ ] **Step 4: JS** :

```js
function initMegaMenu() {
  const menu = document.querySelector("[data-menu]");
  if (!menu) return;
  const declencheur = document.querySelector("[data-menu-declencheur]");
  const burger = document.querySelector("[data-burger]");
  const voile = document.querySelector("[data-menu-voile]");
  const onglets = [...menu.querySelectorAll("[data-onglet]")];
  const panneaux = [...menu.querySelectorAll("[data-panneau]")];
  const souligne = menu.querySelector("[data-souligne]");
  let timerFermeture = null;

  const positionneSouligne = (btn) => {
    souligne.style.left = btn.offsetLeft + "px";
    souligne.style.width = btn.offsetWidth + "px";
  };
  const ouvre = () => {
    clearTimeout(timerFermeture);
    menu.hidden = false; voile.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      menu.classList.add("est-ouvert"); voile.style.opacity = "1";
      positionneSouligne(menu.querySelector(".menu__onglet.est-actif"));
    }));
    declencheur?.setAttribute("aria-expanded", "true");
    burger?.setAttribute("aria-expanded", "true");
    burger?.classList.add("est-ouvert");
  };
  const ferme = () => {
    menu.classList.remove("est-ouvert"); voile.style.opacity = "0";
    declencheur?.setAttribute("aria-expanded", "false");
    burger?.setAttribute("aria-expanded", "false");
    burger?.classList.remove("est-ouvert");
    setTimeout(() => { menu.hidden = true; voile.hidden = true; }, 250);
  };
  const bascule = () => (menu.classList.contains("est-ouvert") ? ferme() : ouvre());

  declencheur?.addEventListener("click", bascule);
  burger?.addEventListener("click", bascule);
  voile.addEventListener("click", ferme);
  addEventListener("keydown", (e) => e.key === "Escape" && ferme());
  // desktop : ouverture au survol avec délai de fermeture
  if (matchMedia("(min-width:1080px)").matches) {
    declencheur?.addEventListener("mouseenter", ouvre);
    [menu, declencheur].forEach((el) => {
      el?.addEventListener("mouseleave", () => (timerFermeture = setTimeout(ferme, 150)));
      el?.addEventListener("mouseenter", () => clearTimeout(timerFermeture));
    });
  }
  // onglets : crossfade + soulignement glissant
  onglets.forEach((btn) => btn.addEventListener("click", () => {
    onglets.forEach((o) => { o.classList.toggle("est-actif", o === btn); o.setAttribute("aria-selected", o === btn); });
    positionneSouligne(btn);
    panneaux.forEach((p) => {
      const actif = p.dataset.panneau === btn.dataset.onglet;
      if (actif) { p.hidden = false; p.classList.add("est-actif"); }
      else { p.classList.remove("est-actif"); p.hidden = true; }
    });
  }));
}
```

CSS du crossfade : `.menu__panneau{animation:apparait .2s ease-out}` + `@keyframes apparait{from{opacity:0;transform:translateY(6px)}}`.

- [ ] **Step 5: Vérifier** — desktop : survol de SHOP → slide-down + stagger des cartes ; les 4 onglets basculent avec soulignement glissant ; Échap/mouseleave ferment. Réduire la fenêtre <1080px : burger → overlay plein écran, burger devient trait. Les lignes produits affichent vignette + nom + sous-titre + badge.

- [ ] **Step 6: Commit** — `git commit -am "feat: méga-menu produits avec onglets animés (desktop + mobile)"`

---

### Task 4: Héro homepage

**Files:**
- Modify: `index.html`, `css/styles.css`

- [ ] **Step 1: Markup** :

```html
<section class="hero">
  <div class="hero__visuel" role="img" aria-label="Visuel campagne Salt Series™ — shooting à intégrer"></div>
  <div class="hero__texte">
    <h1>La collection Salt&nbsp;Series™ arrive.</h1>
    <a class="btn btn--blanc" href="collection.html">05 juillet à 9h</a>
  </div>
</section>
```

- [ ] **Step 2: CSS** — `.hero{position:relative;height:92vh;min-height:560px;border-radius:var(--radius-carte);overflow:hidden;margin:8px clamp(8px,1vw,16px)}` ; `.hero__visuel` : dégradé multi-stops chair/sable (`linear-gradient(160deg,#D8B9A3,#C49A82 45%,#8A6A57 80%,#3E2F28)`) + pseudo-élément grain : `.hero__visuel::after{content:"";position:absolute;inset:0;background-image:url("data:image/svg+xml,…feTurbulence…");opacity:.18;mix-blend-mode:overlay}` (SVG noise inline : `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.8' numOctaves='2'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='0.6'/></svg>` encodé URL) + vignettage radial sombre en bas. `.hero__texte{position:absolute;left:clamp(20px,4vw,56px);bottom:clamp(28px,5vh,64px);color:#fff;max-width:680px}` ; `h1{font-size:clamp(36px,5.5vw,72px);font-weight:500;line-height:1.05;letter-spacing:-.02em;margin-bottom:24px}`.

- [ ] **Step 3: Vérifier** — héro plein écran avec grain visible, texte bas-gauche lisible, bouton blanc hover → fond noir + surpiqûre.

- [ ] **Step 4: Commit** — `git commit -am "feat: héro homepage Salt Series"`

---

### Task 5: Carrousel grandes cartes produits (swipe + surpiqûre)

**Files:**
- Modify: `index.html`, `css/styles.css`
- Modify: `js/main.js` (initCarrousels — partie cartes)

- [ ] **Step 1: Markup** :

```html
<section class="cartes" aria-label="Nouveautés Salt Series™">
  <div class="cartes__piste" data-carrousel-cartes>
    <article class="carte">
      <header class="carte__haut">
        <h2 class="mot-display carte__mot">aftersun</h2>
        <span class="badge">accès anticipé</span>
      </header>
      <div class="carte__mockup carte__mockup--boite" aria-label="Packshot Aftersun™ à intégrer">
        <span class="carte__mockup-logo">revelashion</span>
      </div>
      <footer class="carte__bas">
        <div class="carte__ligne"><strong class="label">Aftersun™</strong><strong>26€</strong></div>
        <p class="carte__sous">Regard naturel retour de plage</p>
        <a class="btn carte__cta" href="produit.html">Rejoindre la waitlist — 26€</a>
      </footer>
    </article>
    <!-- carte 2 : mot "wetlift", badge "accès anticipé", Wetlift™ 26€, "Wet look, sortie de baignade", lien produit.html -->
    <!-- carte 3 : mot "le kit", badge--vert "exclu revelashion", Salt Kit™ 58€, "Aftersun™ + Wetlift™ + Primer™", lien produit.html -->
    <!-- (structure STRICTEMENT identique à la carte 1, seuls textes/classe mockup changent : --tube pour wetlift, --kit pour le kit) -->
  </div>
  <div class="cartes__progression" aria-hidden="true"><span data-progression></span></div>
  <div class="curseur-swipe" data-curseur-swipe aria-hidden="true">swipe</div>
</section>
```

- [ ] **Step 2: CSS** — `.cartes__piste{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding:8px clamp(8px,1vw,16px);scrollbar-width:none;cursor:grab}` ; `.carte{flex:0 0 min(86vw,640px);scroll-snap-align:start;background:var(--gris-carte);border-radius:var(--radius-carte);padding:28px;display:flex;flex-direction:column;min-height:640px}` ; `.carte__mot{font-size:clamp(44px,7vw,84px);color:#4a4a45}` ; mockups CSS : `--boite` = rectangle 180×120 radius 14 dégradé sable + ombre `box-shadow:0 24px 32px -20px rgb(0 0 0/.35)`, logo vertical (`writing-mode:vertical-rl`, Michroma 11px) ; `--tube` = 64×190 radius 32 dégradé gris-bleu ; `--kit` = pochette 200×140 radius `18px 18px 24px 24px` dégradé vert-voile→sable, ombre identique. `.carte__cta{width:100%;text-align:center;margin-top:16px}`. **Progression surpiqûre** : `.cartes__progression{height:2px;margin:20px clamp(16px,3vw,40px);background-image:repeating-linear-gradient(90deg,var(--gris-ligne) 0 8px,transparent 8px 16px)}` ; `span{display:block;height:100%;width:0;background-image:repeating-linear-gradient(90deg,var(--vert) 0 8px,transparent 8px 16px)}`. **Curseur swipe** : `.curseur-swipe{position:fixed;z-index:30;width:84px;height:84px;border-radius:50%;background:rgb(255 255 255/.92);display:grid;place-items:center;font-family:var(--font-display);font-size:13px;pointer-events:none;opacity:0;transform:translate(-50%,-50%) scale(.6);transition:opacity .2s,transform .2s}` ; `.curseur-swipe.est-visible{opacity:1;transform:translate(-50%,-50%) scale(1)}`.

- [ ] **Step 3: JS** (dans `initCarrousels`) :

```js
function initCarrousels() {
  // — Carrousel cartes : drag-to-scroll + progression + curseur swipe
  const piste = document.querySelector("[data-carrousel-cartes]");
  if (piste) {
    const progression = document.querySelector("[data-progression]");
    const curseur = document.querySelector("[data-curseur-swipe]");
    piste.addEventListener("scroll", () => {
      const max = piste.scrollWidth - piste.clientWidth;
      if (progression && max > 0) progression.style.width = (piste.scrollLeft / max) * 100 + "%";
    }, { passive: true });
    piste.dispatchEvent(new Event("scroll"));
    // drag souris
    let enDrag = false, departX = 0, departScroll = 0;
    piste.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse") return;
      enDrag = true; departX = e.clientX; departScroll = piste.scrollLeft;
      piste.style.cursor = "grabbing"; piste.style.scrollSnapType = "none";
    });
    addEventListener("pointermove", (e) => {
      if (!enDrag) return;
      piste.scrollLeft = departScroll - (e.clientX - departX);
      e.preventDefault();
    });
    addEventListener("pointerup", () => {
      if (!enDrag) return;
      enDrag = false; piste.style.cursor = "grab"; piste.style.scrollSnapType = "";
    });
    // un drag > 8px neutralise le clic sur les liens
    piste.addEventListener("click", (e) => {
      if (Math.abs(piste.scrollLeft - departScroll) > 8) e.preventDefault();
    }, true);
    // curseur swipe (desktop)
    if (curseur && matchMedia("(min-width:1080px)").matches) {
      piste.addEventListener("mousemove", (e) => {
        curseur.style.left = e.clientX + "px"; curseur.style.top = e.clientY + "px";
        curseur.classList.add("est-visible");
      });
      piste.addEventListener("mouseleave", () => curseur.classList.remove("est-visible"));
      piste.addEventListener("pointerdown", () => curseur.classList.remove("est-visible"));
    }
  }
  initShowcase(); // rempli à la tâche 6
}
```

- [ ] **Step 4: Vérifier** — desktop : drag à la souris fluide, badge rond "swipe" suit le curseur, la ligne pointillée se remplit en vert au scroll ; le drag n'ouvre pas le lien, le clic simple oui. Mobile (responsive mode) : swipe natif + snap.

- [ ] **Step 5: Commit** — `git commit -am "feat: carrousel cartes produits avec curseur swipe et progression surpiqûre"`

---

### Task 6: Éditorial « reveal. ready. glow. » + showcase « SALT + GLOW »

**Files:**
- Modify: `index.html`, `css/styles.css`
- Modify: `js/main.js` (initShowcase)

- [ ] **Step 1: Markup éditorial** :

```html
<section class="editorial">
  <div class="editorial__visuel" role="img" aria-label="Visuel lifestyle nuit d'été — shooting à intégrer"></div>
  <div class="editorial__contenu">
    <h2>reveal. ready. glow.</h2>
    <p>La première collection REVELASHION™ : Salt&nbsp;Series™. Aftersun™ et Wetlift™ pour un regard
    naturel du sable à la ville, plus les exclusivités du lancement comme le Salt&nbsp;Kit™,
    Le&nbsp;Primer™ et l'Applicateur™.</p>
    <a class="btn btn--blanc" href="collection.html">Exclu revelashion</a>
  </div>
</section>
```

CSS : section `min-height:120vh` (desktop) / `90vh` mobile, radius carte, margin latérale 16px, visuel = dégradé sombre (`linear-gradient(200deg,#2A2230,#0E0C10 70%)`) + grain (réutiliser la classe utilitaire `.grain` — extraire le pseudo-élément du héro en classe partagée) ; contenu centré (`display:grid;place-items:center;text-align:center;color:#fff`), `h2{font-size:clamp(32px,4.5vw,56px);font-weight:600}`, `p{max-width:560px;margin:20px auto 28px;color:rgb(255 255 255/.85)}`.

- [ ] **Step 2: Markup showcase** :

```html
<section class="showcase">
  <h2 class="label showcase__titre">Salt + Glow</h2>
  <div class="showcase__piste" data-showcase>
    <article class="showcase__slide" data-slide>
      <div class="showcase__visuel showcase__visuel--aftersun" role="img" aria-label="Application Aftersun™ — shooting à intégrer"></div>
      <div class="showcase__infos">
        <div><strong class="label">Aftersun™</strong><p class="showcase__sous">Regard naturel retour de plage</p></div>
        <div class="showcase__pastilles" aria-label="Hair Match disponibles">
          <span class="pastille pastille--black"></span><span class="pastille pastille--brown"></span>
          <span class="pastille pastille--blonde"></span><span class="pastille pastille--copper"></span>
        </div>
        <a class="btn" href="produit.html">Ajouter au panier</a>
        <span class="mot-display showcase__compteur" data-compteur>1/4</span>
      </div>
    </article>
    <!-- slide 2 : Wetlift™ / "Wet look, sortie de baignade" / 4 pastilles / visuel --wetlift -->
    <!-- slide 3 : Le Primer™ / "Prolonge la tenue jusqu'à 5 jours" / SANS pastilles / visuel --primer -->
    <!-- slide 4 : Salt Kit™ / "Aftersun™ + Wetlift™ + Primer™" / 4 pastilles / visuel --saltkit -->
    <!-- (structure identique au slide 1 ; chaque slide affiche son propre compteur : 2/4, 3/4, 4/4) -->
  </div>
  <div class="showcase__dots" data-dots>
    <button class="est-actif" aria-label="Aller au produit 1"></button>
    <button aria-label="Aller au produit 2"></button>
    <button aria-label="Aller au produit 3"></button>
    <button aria-label="Aller au produit 4"></button>
  </div>
</section>
```

CSS : piste scroll-snap horizontale, slide `flex:0 0 min(92vw,720px)` centré (`margin-inline:auto` via padding piste `calc(50vw - 360px)` desktop) ; visuel ratio 4/5 dégradés par produit (mêmes teintes que vignettes menu, en plus grand + grain) ; `.showcase__infos{background:var(--gris-carte);border-radius:0 0 var(--radius-carte) var(--radius-carte);padding:24px;display:grid;gap:14px;position:relative}` ; compteur Michroma 44px en bas-droite (`position:absolute;right:24px;bottom:18px;color:#3F3F3B`) ; dots : ronds 8px gris, actif noir.

- [ ] **Step 3: JS** :

```js
function initShowcase() {
  const piste = document.querySelector("[data-showcase]");
  if (!piste) return;
  const slides = [...piste.querySelectorAll("[data-slide]")];
  const dots = [...document.querySelectorAll("[data-dots] button")];
  const majDots = (i) => dots.forEach((d, j) => d.classList.toggle("est-actif", j === i));
  const obs = new IntersectionObserver((entrees) => {
    entrees.forEach((en) => en.isIntersecting && majDots(slides.indexOf(en.target)));
  }, { root: piste, threshold: 0.6 });
  slides.forEach((s) => obs.observe(s));
  dots.forEach((d, i) => d.addEventListener("click", () =>
    slides[i].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })));
}
```

- [ ] **Step 4: Vérifier** — éditorial sombre plein écran avec CTA blanc ; showcase : swipe entre 4 slides, dots se mettent à jour, clic sur dot navigue, compteur affiché par slide, pastilles visibles sauf sur Le Primer™.

- [ ] **Step 5: Commit** — `git commit -am "feat: section éditoriale + showcase Salt + Glow"`

---

### Task 7: Vision/3 piliers (accordéons) + Build or Reveal™

**Files:**
- Modify: `index.html`, `css/styles.css`
- Modify: `js/main.js` (initAccordeons)

- [ ] **Step 1: Markup vision** :

```html
<section class="vision" id="vision">
  <div class="vision__texte">
    <h2>RÉVÉLER le regard. RESPECTER les cils naturels. Pour un résultat qui se voit, sans compromis.</h2>
    <a class="btn" href="#vision">Notre vision</a>
    <div class="vision__accordeons">
      <details class="accordeon">
        <summary class="accordeon__titre">lashcare™</summary>
        <div class="accordeon__corps"><p>La première marque LashCare™. Sublimer le regard sans compromettre
        les cils naturels : retrait facile à tout moment, liberté totale, moins agressif que les extensions classiques.</p></div>
      </details>
      <details class="accordeon">
        <summary class="accordeon__titre">hair match™</summary>
        <div class="accordeon__corps"><p>Notre innovation signature. Chaque modèle existe en quatre teintes —
        Black™, Brown™, Blonde™, Copper™ — pour un regard qui s'harmonise naturellement avec ta couleur de cheveux.</p></div>
      </details>
      <details class="accordeon">
        <summary class="accordeon__titre">reveal ready™</summary>
        <div class="accordeon__corps"><p>Ready To Reveal™ : mapping déjà créé, bande pré-collée, application
        ultra rapide. Tenue 2-3 jours, jusqu'à 5 jours avec Le Primer™.</p></div>
      </details>
    </div>
  </div>
  <div class="vision__visuel" role="img" aria-label="Portrait regard — shooting à intégrer"></div>
</section>
```

CSS : grid 2 colonnes desktop (stack mobile), colonne texte sur fond `--gris-carte` radius carte padding `clamp(28px,4vw,64px)`, `h2{font-size:clamp(24px,2.6vw,40px);font-weight:500;line-height:1.25}`, bouton margin-top 28px, accordéons en bas (`margin-top:auto` via flex column + min-height 80vh) ; visuel = dégradé océan/peau (`linear-gradient(180deg,#7FA3B5,#27404E 60%,#0F1B22)`) + grain. Accordéon : `details{border-top:1px solid var(--gris-ligne)}` ; `summary{list-style:none;cursor:pointer;padding:20px 0;font-weight:700;font-size:22px}` ; `summary::-webkit-details-marker{display:none}` ; `summary::after{content:"+";float:right;transition:transform var(--transition)}` ; `details[open] summary::after{transform:rotate(45deg)}` ; corps animé : wrapper `.accordeon__corps{overflow:hidden}` — animation gérée en JS (height) car `details` ne s'anime pas nativement.

- [ ] **Step 2: JS accordéons** :

```js
function initAccordeons() {
  document.querySelectorAll(".accordeon").forEach((det) => {
    const corps = det.querySelector(".accordeon__corps");
    if (!corps) return;
    det.querySelector("summary").addEventListener("click", (e) => {
      e.preventDefault();
      if (det.open) {
        corps.style.height = corps.scrollHeight + "px";
        requestAnimationFrame(() => (corps.style.height = "0px"));
        corps.addEventListener("transitionend", () => { det.open = false; corps.style.height = ""; }, { once: true });
      } else {
        det.open = true;
        const h = corps.scrollHeight;
        corps.style.height = "0px";
        requestAnimationFrame(() => (corps.style.height = h + "px"));
        corps.addEventListener("transitionend", () => (corps.style.height = ""), { once: true });
      }
    });
  });
}
```

CSS associé : `.accordeon__corps{transition:height .3s ease;padding-bottom:0}` ; `.accordeon__corps p{padding-bottom:20px;color:var(--gris-texte)}`.

- [ ] **Step 3: Markup Build or Reveal™** :

```html
<section class="duo" aria-label="Build or Reveal™">
  <a class="duo__moitie duo__moitie--reveal" href="collection.html">
    <h3 class="mot-display">reveal™</h3>
    <p>Prêt à poser. Mapping créé, bande pré-collée, pose en quelques minutes. Tenue 2 à 5 jours.</p>
    <span class="label duo__note">Disponible le 05.07</span>
  </a>
  <a class="duo__moitie duo__moitie--build" href="#" aria-disabled="true">
    <h3 class="mot-display">build™</h3>
    <p>Ton regard sur mesure. Crée ton mapping, construis ton look. Tenue 7 à 10 jours.</p>
    <span class="label duo__note">Modulash™ — septembre</span>
  </a>
</section>
```

CSS : `display:flex;gap:12px;margin:12px 16px` (stack mobile) ; chaque moitié `flex:1;min-height:480px;border-radius:var(--radius-carte);padding:40px;display:flex;flex-direction:column;justify-content:flex-end;color:#fff;transition:flex .45s cubic-bezier(.4,0,.2,1)` ; `--reveal` : dégradé sable chaud + grain ; `--build` : dégradé vert profond (`linear-gradient(170deg,#2E5A48,#12251D)`) + grain ; desktop hover : `.duo:hover .duo__moitie{flex:.8}` puis `.duo .duo__moitie:hover{flex:1.4}` ; `h3{font-size:clamp(36px,4.5vw,64px)}` ; `p{max-width:380px;margin:12px 0;color:rgb(255 255 255/.85)}` ; `.duo__note{opacity:.7}`.

- [ ] **Step 4: Vérifier** — accordéons s'ouvrent/ferment avec animation fluide, `+` pivote en `×` ; duo : la moitié survolée s'élargit doucement ; textes conformes D.A. (tenues 2-5 jours / 7-10 jours).

- [ ] **Step 5: Commit** — `git commit -am "feat: vision 3 piliers + section Build or Reveal"`

---

### Task 8: Hair Match™ strip + « revelashion + vous » + bannière Reveal Club™

**Files:**
- Modify: `index.html`, `css/styles.css`
- Modify: `js/main.js` (initHairMatchStrip + flèches UGC, à ajouter dans initCarrousels)

- [ ] **Step 1: Markup Hair Match strip** :

```html
<section class="match" data-match>
  <h2 class="label">Trouve ton match</h2>
  <p class="match__libelle mot-display" data-match-libelle>01 — Black™</p>
  <div class="match__pastilles">
    <button class="pastille pastille--black est-active" data-match-choix="0" aria-label="Black™"></button>
    <button class="pastille pastille--brown" data-match-choix="1" aria-label="Brown™"></button>
    <button class="pastille pastille--blonde" data-match-choix="2" aria-label="Blonde™"></button>
    <button class="pastille pastille--copper" data-match-choix="3" aria-label="Copper™"></button>
  </div>
  <p class="match__texte">Hair Match™ — un regard qui s'harmonise naturellement avec ta couleur de cheveux.</p>
</section>
```

JS (nouvelle fonction `initHairMatchStrip` appelée depuis `DOMContentLoaded`) : clic pastille → retire `est-active` partout, l'ajoute au bouton cliqué, met à jour le libellé avec `HAIR_MATCH[i].num + " — " + HAIR_MATCH[i].nom` avec micro-crossfade (classe `.est-fondu` 150ms : `opacity:0;transform:translateY(4px)` puis retour).
CSS : section centrée padding `96px 16px`, libellé `font-size:clamp(28px,4vw,52px);transition:opacity .15s,transform .15s`, pastilles 44px gap 16px centrées, `.match__texte{color:var(--gris-texte);max-width:420px;margin:20px auto 0}`.

- [ ] **Step 2: Markup « revelashion + vous »** :

```html
<section class="ugc">
  <header class="ugc__entete">
    <h2>revelashion + vous</h2>
    <a class="btn" href="#">Retrouve-nous sur les réseaux</a>
  </header>
  <div class="ugc__piste" data-ugc>
    <div class="ugc__tuile ugc__tuile--1" role="img" aria-label="UGC communauté 1 — à intégrer"></div>
    <div class="ugc__tuile ugc__tuile--2" role="img" aria-label="UGC communauté 2 — à intégrer"></div>
    <div class="ugc__tuile ugc__tuile--3" role="img" aria-label="UGC communauté 3 — à intégrer"></div>
    <div class="ugc__tuile ugc__tuile--4" role="img" aria-label="UGC communauté 4 — à intégrer"></div>
    <div class="ugc__tuile ugc__tuile--5" role="img" aria-label="UGC communauté 5 — à intégrer"></div>
  </div>
  <div class="ugc__fleches">
    <button class="ugc__fleche" data-ugc-prec aria-label="Précédent">‹</button>
    <button class="ugc__fleche" data-ugc-suiv aria-label="Suivant">›</button>
  </div>
</section>
```

CSS : section fond `--gris-carte` radius carte margin 16px padding `48px clamp(16px,3vw,40px)` ; entête flex space-between ; `h2{font-size:clamp(26px,3vw,40px);font-weight:600}` ; piste scroll-snap, tuiles `flex:0 0 min(70vw,420px);aspect-ratio:4/5;border-radius:12px` avec 5 dégradés différents (sable, océan, chair, vert-voile, brun) + grain ; flèches : ronds 44px border 1px noir, alignées à droite. JS (dans `initCarrousels`) : `prec/suiv` font `piste.scrollBy({left:±440, behavior:"smooth"})`.

- [ ] **Step 3: Markup bannière Reveal Club™** :

```html
<section class="club" id="club">
  <p class="label club__sur">Reveal Club™</p>
  <h2>Points, accès anticipés, drops exclusifs, lancements privés & événements.</h2>
  <a class="btn btn--blanc" href="#">Rejoindre le club</a>
</section>
```

CSS : fond `--noir`, texte blanc, centré, padding `96px 24px`, radius carte margin 16px ; `h2{font-size:clamp(24px,3vw,44px);max-width:760px;margin:16px auto 32px;font-weight:500}` ; `.club__sur{color:var(--vert);filter:brightness(1.8)}` ; bouton hover : fond `--vert` border `--vert`.

- [ ] **Step 4: Vérifier** — pastilles Hair Match changent le libellé avec fondu ; carrousel UGC défile avec les flèches ; bannière club noire avec accent vert.

- [ ] **Step 5: Commit** — `git commit -am "feat: Hair Match strip + UGC + bannière Reveal Club"`

---

### Task 9: Footer (newsletter + colonnes + logo géant)

**Files:**
- Modify: `index.html`, `css/styles.css`

- [ ] **Step 1: Markup** :

```html
<footer class="footer">
  <div class="footer__haut">
    <div class="footer__news">
      <p>Rejoins le Reveal Club™.</p>
      <p class="footer__sous">Conseils, accès anticipés &amp; contenus exclusifs.</p>
      <form class="footer__form" onsubmit="return false">
        <input type="email" placeholder="Adresse email" aria-label="Adresse email" required>
        <button class="label" type="submit">S'inscrire</button>
      </form>
      <p class="footer__mention">En t'inscrivant, tu acceptes notre Politique de confidentialité*.</p>
    </div>
    <nav class="footer__colonnes" aria-label="Pied de page">
      <div><h3 class="label">Naviguer</h3><a href="collection.html">Shop</a><a href="#vision">Notre histoire</a><a href="#">Build or Reveal™</a><a href="#club">Reveal Club™</a><a href="#">Où nous trouver</a></div>
      <div><h3 class="label">Social</h3><a href="#">Instagram</a><a href="#">TikTok</a><a href="#">Youtube</a><a href="#">Pinterest</a></div>
      <div><h3 class="label">Officiel</h3><a href="#">Confidentialité</a><a href="#">CGV</a><a href="#">Accessibilité</a><a href="#">FAQ</a><a href="#">Contact</a></div>
      <div><h3 class="label">Support</h3><p>Du lundi au vendredi, 9h-17h.</p><a href="#">Écris-nous</a><a href="#">Préférences cookies</a><p>© revelashion 2026</p></div>
    </nav>
  </div>
  <div class="footer__logo mot-display" aria-hidden="true">revelashion</div>
  <div class="footer__bas"><span class="label">Pays/région : France (EUR €)</span></div>
</footer>
```

- [ ] **Step 2: CSS** — `.footer{border-top:1px solid var(--gris-ligne);margin-top:64px}` ; haut : grid `1fr 1.4fr` desktop (stack mobile), padding `56px clamp(16px,3vw,40px)`, séparation verticale hairline ; news : `p:first-child{font-size:20px;font-weight:600}`, form flex avec input `border:1px solid var(--noir);padding:14px 18px;flex:1` + bouton noir, mention 12px gris ; colonnes : grid 4 (2 sur mobile), liens `display:block;padding:6px 0;color:var(--gris-texte)` hover noir + soulignement surpiqûre (`text-decoration:underline dashed var(--vert)`) ; **logo géant** : `.footer__logo{font-size:clamp(80px,17vw,300px);line-height:.72;overflow:hidden;text-align:center;color:var(--noir);letter-spacing:-.02em;padding-top:24px;margin-bottom:-0.06em}` (effet coupé comme la référence : le conteneur footer a `overflow:hidden`) ; bas : barre centrée padding 20px hairline top.

- [ ] **Step 3: Vérifier** — footer complet, logo géant coupé en bas de page, liens hover avec soulignement pointillé vert. La homepage est complète de haut en bas.

- [ ] **Step 4: Commit** — `git commit -am "feat: footer avec logo géant et newsletter Reveal Club"`

---

### Task 10: Reveals au scroll + reduced-motion + polish homepage

**Files:**
- Modify: `index.html`, `css/styles.css`
- Modify: `js/main.js` (initReveals)

- [ ] **Step 1: JS** :

```js
function initReveals() {
  const cibles = document.querySelectorAll("[data-reveal]");
  if (!cibles.length) return;
  const obs = new IntersectionObserver((entrees) => {
    entrees.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("est-revele"); obs.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  cibles.forEach((c) => obs.observe(c));
}
```

CSS : `[data-reveal]{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease}` ; `[data-reveal].est-revele{opacity:1;transform:none}` ; dans le bloc reduced-motion, forcer `[data-reveal]{opacity:1;transform:none}`.

- [ ] **Step 2: Poser `data-reveal`** sur : chaque `.carte`, `.editorial__contenu`, `.showcase`, `.vision__texte`, `.vision__visuel`, chaque `.duo__moitie`, `.match`, `.ugc`, `.club`, `.footer__news`.

- [ ] **Step 3: Ajouter le bloc `prefers-reduced-motion`** en fin de `styles.css` (cf. Task 1 Step 2.8) + vérifier que marquee/stagger/reveals se figent.

- [ ] **Step 4: Passe responsive homepage** — vérifier 375px, 768px, 1280px : pas de débordement horizontal (`body{overflow-x:hidden}` en filet), tailles typo lisibles, carrousels swipables au doigt.

- [ ] **Step 5: Commit** — `git commit -am "feat: reveals au scroll + reduced-motion + responsive homepage"`

---

### Task 11: Page collection — `collection.html`

**Files:**
- Create: `collection.html`
- Modify: `css/styles.css` (section COLLECTION)
- Modify: `js/main.js` (initFiltres)

- [ ] **Step 1: Créer `collection.html`** — même `<head>` que `index.html` (titre : `salt series™ — revelashion`) ; copier-coller À L'IDENTIQUE depuis `index.html` : barre d'annonce, `<div class="entete">` (header + méga-menu + voile), footer. Les liens internes du header (`#vision`, `#club`) deviennent `index.html#vision`, `index.html#club`.

- [ ] **Step 2: Markup contenu** :

```html
<section class="coll-hero">
  <div class="coll-hero__visuel" role="img" aria-label="Bannière Salt Series™ — shooting à intégrer"></div>
  <div class="coll-hero__texte">
    <h1 class="mot-display">salt series™</h1>
    <p>Plage, soleil, peau dorée. Le regard de l'été — du sable à la ville.</p>
  </div>
</section>

<div class="coll-filtres" role="group" aria-label="Filtrer la collection">
  <button class="btn coll-filtre est-actif" data-filtre="tous">Tous</button>
  <button class="btn coll-filtre" data-filtre="ready">Reveal Ready™</button>
  <button class="btn coll-filtre" data-filtre="sets">Sets</button>
  <button class="btn coll-filtre" data-filtre="accessoires">Accessoires</button>
</div>

<section class="coll-grille" data-grille>
  <a class="produit-carte" href="produit.html" data-cat="ready">
    <span class="badge produit-carte__badge">accès anticipé</span>
    <span class="produit-carte__mockup carte__mockup--boite"><span class="carte__mockup-logo">revelashion</span></span>
    <span class="produit-carte__infos">
      <strong class="label">Aftersun™</strong>
      <small>Regard naturel retour de plage</small>
      <span class="produit-carte__pastilles"><span class="pastille pastille--black"></span><span class="pastille pastille--brown"></span><span class="pastille pastille--blonde"></span><span class="pastille pastille--copper"></span></span>
      <strong>26€</strong>
    </span>
    <span class="btn produit-carte__acheter">Acheter</span>
  </a>
  <!-- Wetlift™ data-cat="ready" badge "accès anticipé" mockup --tube 26€ + 4 pastilles -->
  <!-- Le Primer™ data-cat="accessoires" SANS badge mockup --tube 14€ sans pastilles -->
  <!-- Applicateur™ data-cat="accessoires" badge--vert "exclu revelashion" mockup --tube 12€ sans pastilles -->
  <!-- Salt Kit™ data-cat="sets" badge--vert "exclu revelashion" mockup --kit 58€ + 4 pastilles -->
  <!-- (structure STRICTEMENT identique à la carte Aftersun™ ; ces 4 cartes pointent aussi vers produit.html pour la démo) -->
  <div class="produit-carte produit-carte--teaser" data-cat="tous">
    <span class="badge">bientôt</span>
    <span class="produit-carte__mockup carte__mockup--boite"><span class="carte__mockup-logo">revelashion</span></span>
    <span class="produit-carte__infos"><strong class="label">Pilates™</strong><small>Sport Series™ — première collection sport</small></span>
  </div>
  <div class="produit-carte produit-carte--teaser" data-cat="tous">
    <span class="badge">bientôt</span>
    <span class="produit-carte__mockup carte__mockup--boite"><span class="carte__mockup-logo">revelashion</span></span>
    <span class="produit-carte__infos"><strong class="label">Tennis™</strong><small>Sport Series™ — regard match point</small></span>
  </div>
</section>
```

- [ ] **Step 3: CSS** — coll-hero : hauteur 56vh radius carte margin 16px, dégradé sable/océan + grain, texte bas-gauche blanc (`h1` clamp 40→96px) ; filtres : flex wrap gap 8px padding 24px, `.coll-filtre{padding:10px 20px;font-size:12px}` actif : fond noir texte blanc + surpiqûre visible ; grille : `display:grid;grid-template-columns:repeat(2,1fr);gap:12px;padding:0 16px` → 4 colonnes ≥1080px ; `.produit-carte{position:relative;background:var(--gris-carte);border-radius:var(--radius-carte);padding:20px;display:flex;flex-direction:column;gap:16px;min-height:380px}` ; badge en absolu haut-droite ; mockup centré flex-grow ; `.produit-carte__acheter{position:absolute;inset-inline:20px;bottom:20px;opacity:0;transform:translateY(8px);transition:all var(--transition);text-align:center;background:var(--blanc)}` ; `.produit-carte:hover .produit-carte__acheter{opacity:1;transform:none}` (sur mobile, masqué — accès par tap sur la carte) ; teaser : opacité .55, pas de hover. Carte masquée par filtre : `display:none` via classe `.est-cache`.

- [ ] **Step 4: JS** (nouvelle fonction appelée au DOMContentLoaded) :

```js
function initFiltres() {
  const grille = document.querySelector("[data-grille]");
  if (!grille) return;
  const boutons = [...document.querySelectorAll("[data-filtre]")];
  const cartes = [...grille.children];
  boutons.forEach((b) => b.addEventListener("click", () => {
    boutons.forEach((x) => x.classList.toggle("est-actif", x === b));
    cartes.forEach((c) => {
      const visible = b.dataset.filtre === "tous" || c.dataset.cat === b.dataset.filtre;
      c.classList.toggle("est-cache", !visible);
    });
  }));
}
```

- [ ] **Step 5: Vérifier** — `open collection.html` : héro, filtres fonctionnels (READY → 2 cartes ; SETS → 1 ; ACCESSOIRES → 2 ; TOUS → 7), hover carte → bouton ACHETER apparaît, méga-menu et footer opérationnels sur cette page aussi.

- [ ] **Step 6: Commit** — `git commit -am "feat: page collection Salt Series avec filtres"`

---

### Task 12: Fiche produit — `produit.html`

**Files:**
- Create: `produit.html`
- Modify: `css/styles.css` (section PRODUIT)
- Modify: `js/main.js` (initFicheProduit)

- [ ] **Step 1: Créer `produit.html`** — même `<head>` (titre : `aftersun™ — revelashion`) ; copier barre d'annonce + entete + footer comme en Task 11. Marquee spécifique : remplacer le contenu des deux `.annonce__contenu` par `TON CHOIX DE STICKERS OFFERT PENDANT LE LANCEMENT <3 •&nbsp;` (clin d'œil lancement, même structure).

- [ ] **Step 2: Markup principal** :

```html
<nav class="fil" aria-label="Fil d'ariane">
  <a class="label" href="index.html">Shop</a><span>/</span>
  <a class="label" href="collection.html">Salt Series™</a><span>/</span>
  <span class="label">Aftersun™</span>
</nav>

<section class="produit">
  <div class="produit__galerie">
    <div class="produit__vignettes" role="tablist" aria-label="Vues du produit">
      <button class="produit__vignette est-active" data-vue="0" aria-label="Vue 1"></button>
      <button class="produit__vignette" data-vue="1" aria-label="Vue 2"></button>
      <button class="produit__vignette" data-vue="2" aria-label="Vue 3"></button>
      <button class="produit__vignette" data-vue="3" aria-label="Vue 4"></button>
    </div>
    <div class="produit__image" data-image data-hairmatch-image role="img" aria-label="Packshot Aftersun™ — shooting à intégrer"></div>
  </div>

  <div class="produit__infos">
    <h1 class="mot-display">aftersun™</h1>
    <p class="label produit__sur">Reveal Ready™ — regard retour de plage</p>
    <p class="produit__avis" aria-label="4,5 sur 5">★★★★☆ <span>(1 248 avis)</span></p>
    <p class="produit__desc">Le regard retour de plage, prêt en quelques minutes. Aftersun™ est un modèle
    Reveal Ready™ : mapping déjà créé, bande pré-collée, application ultra rapide — l'effet faux cils
    en bande, sans la bande visible. Pensé LashCare™ : retrait libre à tout moment, respect des cils naturels.</p>

    <div class="produit__match" data-fiche-match>
      <p class="label">Hair Match : <span data-match-fiche-libelle>01 — Black™</span></p>
      <div class="produit__pastilles">
        <button class="pastille pastille--black est-active" data-fiche-choix="0" aria-label="Black™"></button>
        <button class="pastille pastille--brown" data-fiche-choix="1" aria-label="Brown™"></button>
        <button class="pastille pastille--blonde" data-fiche-choix="2" aria-label="Blonde™"></button>
        <button class="pastille pastille--copper" data-fiche-choix="3" aria-label="Copper™"></button>
      </div>
    </div>

    <div class="produit__chips">
      <span class="produit__chip label">2-3 jours</span>
      <span class="produit__chip label">~5 jours avec primer</span>
    </div>

    <button class="btn btn--achat produit__cta" data-cta-principal>Acheter Aftersun™ — 26€</button>
    <p class="produit__paiement">ou 3× sans frais</p>

    <div class="produit__routine">
      <h2 class="label">Complète ta routine</h2>
      <a class="produit__upsell" href="produit.html">
        <span class="menu__vignette menu__vignette--primer" aria-hidden="true"></span>
        <span class="menu__infos"><strong>LE PRIMER™</strong><small>Tenue jusqu'à 5 jours — 14€</small></span>
        <span class="produit__plus" aria-hidden="true">+</span>
      </a>
      <a class="produit__upsell" href="produit.html">
        <span class="menu__vignette menu__vignette--wetlift" aria-hidden="true"></span>
        <span class="menu__infos"><strong>WETLIFT™</strong><small>Wet look, sortie de baignade — 26€</small></span>
        <span class="produit__plus" aria-hidden="true">+</span>
      </a>
    </div>

    <div class="produit__accordeons">
      <details class="accordeon"><summary class="accordeon__titre">pose en 3 gestes</summary>
        <div class="accordeon__corps"><p>1. Positionne la bande pré-collée au ras des cils. 2. Presse quelques
        secondes. 3. Révèle ton regard. Avec Le Primer™ en amont, la tenue passe d'environ 2-3 jours à 5 jours.</p></div></details>
      <details class="accordeon"><summary class="accordeon__titre">tenue &amp; retrait</summary>
        <div class="accordeon__corps"><p>Tenue 2-3 jours sans primer, ~5 jours avec. Retrait facile à tout
        moment, sans tirer sur les cils naturels — la liberté LashCare™.</p></div></details>
      <details class="accordeon"><summary class="accordeon__titre">lashcare™</summary>
        <div class="accordeon__corps"><p>Moins agressif que les extensions classiques : pas de colle permanente,
        pas de dépose en institut. Tes cils naturels restent intacts.</p></div></details>
    </div>
  </div>
</section>

<section class="match-galerie">
  <header class="match-galerie__entete">
    <h2>trouve ton match</h2>
    <div class="produit__pastilles" data-galerie-pastilles>
      <button class="pastille pastille--black est-active" data-galerie-choix="0" aria-label="Black™"></button>
      <button class="pastille pastille--brown" data-galerie-choix="1" aria-label="Brown™"></button>
      <button class="pastille pastille--blonde" data-galerie-choix="2" aria-label="Blonde™"></button>
      <button class="pastille pastille--copper" data-galerie-choix="3" aria-label="Copper™"></button>
    </div>
  </header>
  <div class="match-galerie__tuiles">
    <div class="match-galerie__tuile est-active" data-galerie-tuile="0" role="img" aria-label="Aftersun™ porté — Black™ (shooting à intégrer)"><span class="label">01 Black™</span></div>
    <div class="match-galerie__tuile" data-galerie-tuile="1" role="img" aria-label="Aftersun™ porté — Brown™ (shooting à intégrer)"><span class="label">02 Brown™</span></div>
    <div class="match-galerie__tuile" data-galerie-tuile="2" role="img" aria-label="Aftersun™ porté — Blonde™ (shooting à intégrer)"><span class="label">03 Blonde™</span></div>
    <div class="match-galerie__tuile" data-galerie-tuile="3" role="img" aria-label="Aftersun™ porté — Copper™ (shooting à intégrer)"><span class="label">04 Copper™</span></div>
  </div>
</section>

<div class="barre-achat" data-barre-achat aria-hidden="true">
  <strong class="label">Aftersun™ <span data-barre-num>01</span></strong>
  <div class="produit__pastilles produit__pastilles--mini">
    <button class="pastille pastille--black est-active" data-barre-choix="0" aria-label="Black™"></button>
    <button class="pastille pastille--brown" data-barre-choix="1" aria-label="Brown™"></button>
    <button class="pastille pastille--blonde" data-barre-choix="2" aria-label="Blonde™"></button>
    <button class="pastille pastille--copper" data-barre-choix="3" aria-label="Copper™"></button>
  </div>
  <button class="btn btn--achat barre-achat__cta">Acheter — 26€</button>
</div>
```

- [ ] **Step 3: CSS** — fil d'ariane : padding `16px clamp(16px,3vw,40px)`, gris. `.produit{display:grid;grid-template-columns:1.1fr 1fr;gap:clamp(24px,4vw,64px);padding:0 clamp(16px,3vw,40px) 64px}` (stack <1080px, galerie d'abord) ; galerie : grid `72px 1fr`, vignettes empilées (72px carrées radius 8, 4 dégradés différenciés, active = outline vert), image principale ratio 4/5 radius carte — **4 fonds de vue** via classes `.vue-0…3` (dégradés différents) **modulés par Hair Match** : attribut `data-teinte="0…3"` qui applique un filtre teinte (`filter:hue-rotate/sepia` par variante — définir 4 combinaisons explicites : teinte-0 aucune, teinte-1 `sepia(.25)`, teinte-2 `sepia(.45) saturate(1.2)`, teinte-3 `sepia(.5) hue-rotate(-15deg) saturate(1.6)`) avec `transition:filter .3s, opacity .2s`. Infos : `h1` clamp 44→80px ; chips : pilules outline gris ; `.produit__cta{font-size:14px;padding:18px}` ; upsell : reprend `.menu__produit` (fond gris, vignette, +) ; `.produit__plus{margin-left:auto;font-size:22px}`. Match-galerie : entête flex space-between padding 48px 16px, tuiles grid 2→4 colonnes, ratio 3/4, dégradés chair (un par teinte : sable clair / brun moyen / doré / cuivré) + libellé bas-gauche, `.est-active{outline:2px solid var(--vert);outline-offset:4px}`. Barre achat : `position:fixed;inset-inline:0;bottom:0;z-index:45;display:flex;align-items:center;gap:20px;background:var(--blanc);border-top:1px solid var(--gris-ligne);padding:12px clamp(16px,3vw,40px);transform:translateY(100%);transition:transform .3s ease` ; `.est-visible{transform:none}` ; CTA `margin-left:auto;width:auto;padding:14px 32px`.

- [ ] **Step 4: JS** :

```js
function initFicheProduit() {
  const fiche = document.querySelector(".produit");
  if (!fiche) return;
  const image = document.querySelector("[data-image]");
  // — galerie : vignettes → vue
  document.querySelectorAll("[data-vue]").forEach((v) => v.addEventListener("click", () => {
    document.querySelectorAll("[data-vue]").forEach((x) => x.classList.toggle("est-active", x === v));
    image.className = "produit__image vue-" + v.dataset.vue;
    image.style.opacity = "0";
    requestAnimationFrame(() => requestAnimationFrame(() => (image.style.opacity = "1")));
  }));
  // — sélection Hair Match synchronisée (fiche + barre sticky + galerie match)
  const groupes = [
    ["[data-fiche-choix]", null],
    ["[data-barre-choix]", null],
    ["[data-galerie-choix]", "[data-galerie-tuile]"],
  ];
  const libelleFiche = document.querySelector("[data-match-fiche-libelle]");
  const numBarre = document.querySelector("[data-barre-num]");
  const selectionne = (i) => {
    groupes.forEach(([selBtn]) =>
      document.querySelectorAll(selBtn).forEach((b, j) => b.classList.toggle("est-active", j === i)));
    document.querySelectorAll("[data-galerie-tuile]").forEach((t, j) => t.classList.toggle("est-active", j === i));
    libelleFiche.textContent = HAIR_MATCH[i].num + " — " + HAIR_MATCH[i].nom;
    numBarre.textContent = HAIR_MATCH[i].num;
    image.dataset.teinte = i;
  };
  groupes.forEach(([selBtn]) =>
    document.querySelectorAll(selBtn).forEach((b, i) => b.addEventListener("click", () => selectionne(i))));
  // — barre sticky : visible quand le CTA principal sort du viewport
  const cta = document.querySelector("[data-cta-principal]");
  const barre = document.querySelector("[data-barre-achat]");
  new IntersectionObserver(([en]) => {
    const visible = !en.isIntersecting && en.boundingClientRect.top < 0;
    barre.classList.toggle("est-visible", visible);
    barre.setAttribute("aria-hidden", String(!visible));
  }).observe(cta);
}
```

- [ ] **Step 5: Vérifier** — `open produit.html` : galerie change de vue au clic (fade) ; clic sur une pastille (fiche OU barre OU galerie match) synchronise les trois groupes + libellé `01 — Black™` → `03 — Blonde™` + filtre teinte de l'image ; scroller sous le CTA → barre sticky glisse depuis le bas ; accordéons animés ; upsells cliquables ; responsive mobile propre.

- [ ] **Step 6: Commit** — `git commit -am "feat: fiche produit Aftersun avec Hair Match, galerie et barre d'achat sticky"`

---

### Task 13: QA finale & cohérence inter-pages

**Files:**
- Modify (si besoin): les 5 fichiers

- [ ] **Step 1: Câblage des liens** — vérifier sur les 3 pages : logo → `index.html` ; menu `VOIR LA COLLECTION` → `collection.html` ; toutes les lignes produits du menu → `produit.html` ; CTAs homepage → pages correctes ; fil d'ariane OK.

- [ ] **Step 2: Parité du shell** — diff visuel des blocs annonce/entete/footer entre les 3 fichiers (`grep -c "menu__produit" *.html` pour s'assurer que le menu est complet partout). Corriger tout écart.

- [ ] **Step 3: Passe responsive 3 pages** — 375px / 768px / 1280px : aucun scroll horizontal, menu mobile OK partout, barre achat ne masque pas le footer (padding-bottom sur `produit.html`).

- [ ] **Step 4: Passe accessibilité** — tab au clavier : focus visibles verts, Échap ferme le menu, `aria-expanded`/`aria-selected` à jour, contrastes (texte gris ≥ 4.5:1 sur blanc : `#6B6B66` passe).

- [ ] **Step 5: Console propre** — recharger les 3 pages, zéro erreur JS.

- [ ] **Step 6: Commit final** — `git add -A && git commit -m "chore: QA finale prototype v1 (liens, responsive, a11y)"`

---

## Self-review (fait à l'écriture du plan)

- **Couverture spec** : §2 tokens/composants → T1 ; §4 marquee/header → T2 ; §5 méga-menu → T3 ; §6 sections home 1-10 → T4-T9 ; §7.1 collection → T11 ; §7.2 produit → T12 ; §8 animations 1-15 → T2(1,10), T3(2,3,4), T5(5,6,7,8), T10(9), T12(11,12), T7(13,14), T6(15) ; §9 responsive/a11y → T10/T13. Aucun gap.
- **Cohérence des noms** : `est-actif/est-active` (masculin pour onglets/boutons-filtres, féminin pour pastilles/vignettes/tuiles — choix assumé, vérifier à l'exécution la correspondance CSS/JS exacte dans chaque composant), tokens `--vert/--gris-carte` constants, `HAIR_MATCH` partagé entre strip home et fiche.
- **Anti-placeholder** : les commentaires `<!-- carte 2 … -->` spécifient données exactes + « structure STRICTEMENT identique » à un exemple complet fourni dans le même bloc — reproductible sans ambiguïté.
