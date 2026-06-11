# public/images/ — Placeholders REVELASHION™

Dépose tes vraies photos ici en respectant **exactement** ces noms de fichiers.
Tant qu'un fichier est absent, un placeholder élégant (dégradé + nom) s'affiche à sa place.

| Fichier | Usage | Ratio conseillé | Dimensions conseillées |
|---|---|---|---|
| `hero.png` | Visuel hero (portrait regard) | 4:5 portrait | 1600 × 2000 |
| `hairmatch-black.png` | Nuance BLACK™ | 3:4 portrait | 900 × 1200 |
| `hairmatch-brown.png` | Nuance BROWN™ | 3:4 portrait | 900 × 1200 |
| `hairmatch-blonde.png` | Nuance BLONDE™ | 3:4 portrait | 900 × 1200 |
| `hairmatch-copper.png` | Nuance COPPER™ | 3:4 portrait | 900 × 1200 |
| `lashcare-serum.png` | Sérum / pipette (soin booster) | 4:3 paysage | 1200 × 900 |
| `salt-aftersun.png` | AFTERSUN™ (macro regard) | 16:10 paysage | 1280 × 800 |
| `salt-wetlift.png` | WETLIFT™ (macro regard) | 16:10 paysage | 1280 × 800 |
| `build-serum.png` | Sérum central Build or Reveal™ | 1:2 vertical | 600 × 1200 |

## Conseils direction artistique (cf. master-plan)
- Lumière naturelle, peau réelle, pas de retouche excessive.
- Palette : crème / sable / noir profond, touche métallique discrète.
- Référence esthétique : Alo Yoga · Rhode · REFY · Aime.

## Intégration Shopify
Dans un thème Shopify, remplace `public/images/hero.png` par
`{{ 'hero.png' | asset_url }}` (ou un `image_picker` de section settings).
Chaque `<section>` de `index.html` correspond à une section Shopify autonome.
