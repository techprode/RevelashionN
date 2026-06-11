# RevelashionN

Préparation pour le déploiement sur Vercel.

Déployer via l'intégration GitHub (recommandé) :

1. Aller sur https://vercel.com et importer le repo `techprode/RevelashionN`.
2. Définir l'option pour que le projet soit servi en mode static (aucun build requis).

Déployer via la CLI (optionnel) :

```bash
# installer la CLI si nécessaire
npm i -g vercel

# déployer en preview
vercel

# déployer en production
vercel --prod
```

Le dépôt contient `vercel.json` pour indiquer à Vercel d'utiliser `index.html` et le dossier `public/`.
