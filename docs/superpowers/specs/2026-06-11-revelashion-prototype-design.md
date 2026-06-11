# REVELASHION™ — Spec design du prototype site (v1)

> Spec validée le 11/06/2026. Source de vérité produit/marque : `revelashion.md` (D.A. master).
> Livrable : prototype statique HTML/CSS/JS haute-fidélité, design language type rhodeskin.com adapté à l'identité REVELASHION™. Contenu 100% original (aucun texte/visuel copié de rhode).

---

## 1. Objectif & périmètre

**Objectif** : un prototype navigable qui ressemble à *« une marque lifestyle premium spécialisée dans le regard »* (D.A. §12), servant ensuite de référence exacte pour l'intégration Shopify.

**Périmètre v1** :
- `index.html` — Homepage complète
- `collection.html` — Page collection Salt Series™
- `produit.html` — Fiche produit Aftersun™
- Méga-menu dropdown avec produits affichés directement (desktop + mobile)
- Toutes les animations/interactions listées en §8

**Hors périmètre v1** (extensions futures) : pages LashCare™, Hair Match™, Reveal Ready™, Build or Reveal™, Reveal Club™ dédiées ; panier fonctionnel ; checkout ; intégration Shopify.

**Langue** : français, noms de gammes en anglais (LashCare™, Reveal Ready™, Salt Series™…). Prix en €.

---

## 2. Design system

### 2.1 Palette (directive : blanc / noir / surpiqûre verte)

| Token CSS | Valeur | Usage |
|---|---|---|
| `--blanc` | `#FFFFFF` | Fond principal |
| `--noir` | `#0C0C0C` | Texte, boutons pleins, footer logo |
| `--gris-carte` | `#F5F5F3` | Fond des cartes produits, sections alternées |
| `--gris-ligne` | `#E5E5E1` | Hairlines, séparateurs |
| `--gris-texte` | `#6B6B66` | Texte secondaire |
| `--vert` | `#1B4D3E` | Accent signature : hover, badges actifs, surpiqûres, liens actifs |
| `--vert-voile` | `#EAF2ED` | Fond du CTA d'achat principal (équivalent du bouton teinté de rhode) |

### 2.2 Signature « surpiqûre »

Détail récurrent de marque : **pointillés verts façon couture** (`border: 1.5px dashed var(--vert)` / `background: repeating-linear-gradient(...)`).
Appliqué sur :
- Progression du carrousel homepage (ligne pointillée qui se « coud » en vert au fil du scroll)
- Outline des boutons pilule au hover (la surpiqûre apparaît autour du bouton)
- Soulignement de l'onglet actif du méga-menu
- Bordure des badges au survol

### 2.3 Typographie

| Rôle | Fonte | Usage |
|---|---|---|
| Courant | **Inter** (Google Fonts, fallback Helvetica/Arial) | Corps, navigation, descriptions |
| Display/techno | **Michroma** (Google Fonts) | Mots géants minuscules (`aftersun`, `wetlift`, `le kit`), badges (`accès anticipé`), compteurs (`1/4`) |

Échelle : mots géants `clamp(56px, 9vw, 150px)` ; titres section `clamp(28px, 4vw, 56px)` ; corps `15-16px` ; nav/labels `12-13px uppercase letter-spacing 0.08em`.

### 2.4 Composants

- **Bouton pilule outline** : border 1px noir, uppercase, padding généreux, radius 999px. Hover : fond noir/texte blanc + surpiqûre verte externe.
- **Bouton pilule plein** : fond noir, texte blanc. Variante achat : fond `--vert-voile`, texte noir (`ACHETER AFTERSUN™ — 26€`).
- **Badge** : pilule fond noir, texte blanc, fonte Michroma 10-11px. Libellés : `accès anticipé`, `exclu revelashion`, `bientôt`, `rentrée`, `septembre`.
- **Carte produit (grande, carrousel home)** : fond `--gris-carte`, radius 16px, mot géant en haut-gauche, badge haut-droite, mockup produit centré, bas : NOM + prix, sous-titre, CTA pleine largeur.
- **Carte produit (grille collection)** : badge, mockup, nom, sous-titre, prix, mini-pastilles Hair Match™, bouton `ACHETER` apparaissant au hover.
- **Ligne produit (méga-menu)** : carte blanche radius 12px, vignette 56px, NOM gras + sous-titre, badge à droite.
- **Pastille Hair Match™** : rond 28-36px, anneaux : `01 Black™ #1A1A1A`, `02 Brown™ #5C4332`, `03 Blonde™ #C9A66B`, `04 Copper™ #A65A33`. État actif : anneau vert.
- **Accordéon** : ligne hairline top, titre bold minuscule, ouverture height animée.

### 2.5 Placeholders visuels

Aucune image externe. Placeholders élégants en CSS pur :
- **Héros/éditoriaux** : dégradés doux (tons chair/sable/vert très désaturé) + voile de grain (SVG noise inline) + vignettage.
- **Mockups produits** : boîtes de cils / tubes / pochette dessinés en CSS (div + radius + dégradés + ombre portée douce), logo `revelashion` vertical dessus.
- **UGC** : tuiles dégradé + ratio variés.
Chaque placeholder porte un `aria-label`/commentaire indiquant le shooting à intégrer plus tard.

---

## 3. Catalogue produits (données du prototype)

Stockées dans un objet JS `PRODUITS` (main.js) + dupliquées dans le HTML statique.

| Produit | Gamme | Sous-titre | Prix | Badge | Hair Match™ |
|---|---|---|---|---|---|
| Aftersun™ | Reveal Ready™ / Salt Series™ | Regard naturel retour de plage | 26€ | accès anticipé | 4 couleurs |
| Wetlift™ | Reveal Ready™ / Salt Series™ | Wet look, sortie de baignade | 26€ | accès anticipé | 4 couleurs |
| Le Primer™ | Accessoire | Prolonge la tenue jusqu'à 5 jours | 14€ | — | — |
| Applicateur™ | Accessoire | Pince de pose précision | 12€ | exclu revelashion | — |
| Salt Kit™ | Set | Aftersun™ + Wetlift™ + Primer™ | 58€ | exclu revelashion | 4 couleurs |

**Teasers (non achetables)** : Pilates™ `bientôt`, Tennis™ `bientôt` (Sport Series™) ; Entrepreneur™ `rentrée` (ex-Cannes, cat eye), Student™ `rentrée` (ex-Monaco, volume) (Focus Series™) ; Modulash™ `septembre` (Build Your Own Look™).

Prix = placeholders à remplacer (1 variable par produit).

---

## 4. Barre d'annonce + Header

### 4.1 Barre d'annonce (marquee)
- Bandeau `--gris-carte`, texte 12px uppercase défilant en boucle infinie (duplication du contenu, animation `translateX` linéaire).
- Messages : `LANCEMENT OFFICIEL — 05.07.2026` · `REJOINS LE REVEAL CLUB™` · `LIVRAISON OFFERTE DÈS 45€` (séparés par « • »).
- Bouton pause/lecture `⏸/▶` à droite (toggle `animation-play-state`).

### 4.2 Header sticky
- Desktop : gauche `SHOP · À PROPOS · REVEAL CLUB™` ; centre logo **revelashion** (wordmark texte, lowercase, graisse bold) ; droite `RECHERCHE · COMPTE · PANIER (0)`.
- Mobile : burger | logo centré | recherche + panier (badge compteur `0`).
- Sticky top. Au scroll > 24px : fond passe de transparent/blanc à blanc plein + hairline bottom (transition douce).
- Sur le héros (image), header en blanc superposé ; redevient noir sur fond blanc.

---

## 5. Méga-menu (pièce maîtresse)

### 5.1 Desktop
- Déclencheur : hover/clic sur `SHOP`.
- Panneau pleine largeur sous le header, fond blanc, hairline top. Animation : slide-down + fade (250ms, ease-out), produits en stagger (60ms d'écart).
- Structure : rangée d'onglets en haut + zone contenu = lignes/cartes produits + bouton `VOIR LA COLLECTION` en bas.
- Fermeture : mouseleave (delay 150ms) ou `Échap`.

### 5.2 Mobile
- Burger ouvre un overlay plein écran blanc (slide depuis le haut). Le burger se transforme en trait `—` (morph CSS).
- Même structure onglets + lignes produits, scrollable. Liens secondaires en bas : `À PROPOS`, `REVEAL CLUB™`.

### 5.3 Onglets & contenu

Onglets (soulignement animé qui glisse, actif = surpiqûre verte) : `SALT '26` | `REVEAL READY™` | `À VENIR` | `SETS`

| Onglet | Lignes produits (vignette + nom + sous-titre + badge) |
|---|---|
| SALT '26 | Aftersun™, Wetlift™, Le Primer™, Salt Kit™ |
| REVEAL READY™ | Bandeau concept *« Comme des faux cils en bande. Sans la bande visible. »* + Aftersun™, Wetlift™ |
| À VENIR | Pilates™, Tennis™, Entrepreneur™, Student™, Modulash™ (lignes non cliquables, opacité réduite, badges temporels) |
| SETS | Salt Kit™ |

Changement d'onglet : crossfade du contenu (150ms out / 200ms in).

---

## 6. Homepage (`index.html`) — ordre des sections

1. **Hero plein écran** — placeholder close-up (dégradé chair/sable + grain), hauteur ~92vh. Texte bas-gauche blanc : *« La collection Salt Series™ arrive. »* + bouton pilule outline blanc `05 JUILLET À 9H`.
2. **Carrousel cartes produits** (scroll-snap horizontal + drag) — 3 grandes cartes : `aftersun` / `wetlift` / `le kit`. Curseur personnalisé : badge rond blanc « swipe » qui suit la souris sur la zone (desktop). Sous le carrousel : ligne de **progression en pointillés** qui se remplit en vert (surpiqûre). CTA des cartes : `REJOINDRE LA WAITLIST — 26€` (état pré-lancement).
3. **Éditorial plein écran** — placeholder lifestyle sombre, titre centré blanc **« reveal. ready. glow. »**, paragraphe : présentation Salt Series™ (Aftersun™ + Wetlift™, exclusivités, Salt Kit™), CTA outline blanc `EXCLU REVELASHION`.
4. **Showcase « SALT + GLOW »** — titre centré 13px uppercase. Carrousel : grande carte image (dots de pagination) + bandeau bas `--gris-carte` : NOM + sous-titre + pastilles Hair Match™ + `AJOUTER AU PANIER` + compteur Michroma `1/4`. Produits : Aftersun™, Wetlift™, Le Primer™, Salt Kit™.
5. **Vision + 3 piliers** — split 2 colonnes (texte sur `--gris-carte` / placeholder image). Déclaration : *« RÉVÉLER le regard. RESPECTER les cils naturels. Pour un résultat qui se voit, sans compromis. »* + bouton `NOTRE VISION` + 3 accordéons : **lashcare™** (la première marque LashCare™ : sublimer sans abîmer, retrait libre à tout moment), **hair match™** (un regard qui s'harmonise à ta couleur de cheveux — Black™ Brown™ Blonde™ Copper™), **reveal ready™** (mapping créé, bande pré-collée, pose ultra rapide — tenue 2-3 jours, ~5 avec primer).
6. **Build or Reveal™** — section duo : deux moitiés `reveal™` / `build™`. Reveal™ : prêt à poser, personnalisation simple, tenue 2-5 jours — `DISPONIBLE LE 05.07`. Build™ : ton regard sur mesure, mapping libre, tenue 7-10 jours — `MODULASH™ — SEPTEMBRE`. Hover desktop : la moitié survolée s'élargit (flex-grow animé).
7. **Hair Match™ strip** — *« trouve ton match »* : 4 grandes pastilles cliquables, le visuel/libellé central change au clic (crossfade) : `01 — Black™ / 02 — Brown™ / 03 — Blonde™ / 04 — Copper™`.
8. **« revelashion + vous »** — titre + bouton `RETROUVE-NOUS SUR LES RÉSEAUX`. Carrousel de tuiles UGC placeholders + flèches ‹ ›.
9. **Bannière Reveal Club™** — fond noir, texte blanc : points, accès anticipés, drops exclusifs, événements + CTA `REJOINDRE LE CLUB` (vert au hover).
10. **Footer** — bloc newsletter : *« Rejoins le Reveal Club™. Conseils, accès anticipés & contenus exclusifs. »* champ email + `S'INSCRIRE` + mention Politique de confidentialité. Colonnes : NAVIGUER (Shop, Notre histoire, Build or Reveal™, Reveal Club™, Où nous trouver) / SOCIAL (Instagram, TikTok, Youtube, Pinterest) / OFFICIEL (Confidentialité, CGV, Accessibilité, FAQ, Contact) / SUPPORT (horaires, contact, cookies). **Logo géant `revelashion`** coupé en bas (overflow hidden, couleur noir). Barre finale : `Pays/région : France (EUR €)` + `© revelashion 2026`.

---

## 7. Pages intérieures

### 7.1 `collection.html` — Salt Series™
- Mêmes barre d'annonce/header/footer.
- Héro bandeau : titre géant `salt series™` + manifeste (plage, soleil, glow, vacances) sur placeholder.
- Pilules filtres (filtrage JS simple par `data-cat`) : `TOUS / REVEAL READY™ / SETS / ACCESSOIRES`.
- Grille responsive (2 col mobile → 4 desktop) : Aftersun™, Wetlift™, Le Primer™, Applicateur™, Salt Kit™ + 2 cartes teaser (Pilates™, Tennis™ — `bientôt`, non cliquables).
- Carte → `produit.html` (seul Aftersun™ pointe vers la vraie fiche ; les autres aussi vers `produit.html` pour la démo).

### 7.2 `produit.html` — Aftersun™
- Fil d'ariane `SHOP / SALT SERIES™ / AFTERSUN™`.
- Layout 2 colonnes (stack mobile) :
  - Gauche : galerie — vignettes verticales (4 placeholders) + grande image, changement au clic (fade).
  - Droite : titre géant `aftersun™` (Michroma lowercase), surtitre `REVEAL READY™ — REGARD RETOUR DE PLAGE`, ★★★★☆ `(1 248 avis)` placeholder, description (D.A. §6 et §9 : retour de plage, regard naturel, mapping pré-créé, bande pré-collée, pose ultra rapide), **sélecteur Hair Match™** : label `Hair Match : 01 — Black™` + 4 pastilles (sélection → label + image crossfade), chips tenue `2-3 JOURS` / `~5 JOURS AVEC PRIMER`, CTA `--vert-voile` pleine largeur `ACHETER AFTERSUN™ — 26€`, mention `ou 3× sans frais`, bloc `COMPLÈTE TA ROUTINE` (mini-cartes Le Primer™ + Wetlift™ avec `+`), accordéons `POSE EN 3 GESTES / TENUE & RETRAIT / LASHCARE™`.
- Section **« trouve ton match »** : 4 tuiles placeholder (une par couleur) + rangée de pastilles en haut à droite ; clic pastille → met en avant la tuile correspondante.
- **Barre sticky bas** : apparaît quand le CTA principal sort du viewport (IntersectionObserver) — `AFTERSUN™ 01` + 4 pastilles + `ACHETER — 26€`.

---

## 8. Animations & interactions (récapitulatif technique)

| # | Interaction | Implémentation |
|---|---|---|
| 1 | Marquee infini + pause | CSS keyframes translateX, contenu dupliqué, toggle `animation-play-state` |
| 2 | Méga-menu slide-down + stagger | transition transform/opacity, `transition-delay` croissant par carte |
| 3 | Onglets soulignement glissant | barre absolue animée left/width + crossfade contenu |
| 4 | Burger → trait | morph des spans CSS |
| 5 | Carrousel drag + snap | `scroll-snap-x` + drag-to-scroll JS (pointer events) |
| 6 | Curseur « swipe » | div fixe suivant `mousemove` sur la zone carrousel (desktop seulement) |
| 7 | Progression surpiqûre | ligne pointillée, remplissage vert proportionnel au `scrollLeft` |
| 8 | Boutons hover | fill noir + outline dashed vert (offset 4px) |
| 9 | Reveals au scroll | IntersectionObserver → `opacity/translateY` (une fois) |
| 10 | Header au scroll | classe `.is-scrolled` (fond, hairline) |
| 11 | Sticky buy bar | IntersectionObserver sur le CTA principal |
| 12 | Hair Match™ switch | crossfade image + maj label/état actif |
| 13 | Accordéons | `grid-template-rows: 0fr→1fr` (height animée) |
| 14 | Build or Reveal™ hover | `flex-grow` animé des deux moitiés |
| 15 | Showcase dots/compteur | scroll-snap + maj dots et `n/4` |

Respect `prefers-reduced-motion` : animations décoratives désactivées.

---

## 9. Responsive & accessibilité

- **Mobile-first** (D.A. priorité 16). Breakpoints : base mobile, `768px` tablette, `1080px` desktop.
- Carrousels : scroll natif + snap sur mobile (swipe doigt), drag souris sur desktop.
- Focus visibles (outline vert), `aria-expanded` sur menu/accordéons, `aria-label` sur placeholders et boutons icônes, contraste AA (noir sur blanc, blanc sur noir/vert).

---

## 10. Structure des fichiers

```
RevelashionN/
├── revelashion.md                  ← D.A. master (existant)
├── docs/superpowers/specs/…        ← cette spec
├── index.html
├── collection.html
├── produit.html
├── css/styles.css                  ← tokens, base, composants, sections, responsive
└── js/main.js                      ← données PRODUITS, menu, carrousels, observers, interactions
```

Aucune dépendance hors Google Fonts (Inter + Michroma) avec fallbacks système — le site reste lisible hors-ligne.

---

## 11. Critères de réussite

1. Ouvrir `index.html` en double-clic → site complet, fluide, mobile et desktop.
2. Le méga-menu affiche les produits directement, avec onglets animés, sur desktop ET mobile.
3. Un visiteur comprend en une homepage : la marque, LashCare™, Hair Match™, Reveal Ready™, Salt Series™, Build or Reveal™, le Reveal Club™ (D.A. §12).
4. Aucune ressemblance littérale avec rhode (textes, images) — uniquement le même niveau d'exécution et les mêmes patterns e-commerce.
5. Tous les prix/textes remplaçables en quelques minutes (contenu centralisé et commenté).
