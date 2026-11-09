# Portfolio — Hicham HADDI · BTS SIO SISR

Portfolio en ligne de Hicham HADDI, étudiant en deuxième année de BTS SIO,
option SISR (Solutions d'Infrastructure, Systèmes et Réseaux).

## Contenu

- Présentation et parcours (BTS SIO, option SISR)
- Travaux pratiques : Active Directory, DHCP, DNS, adressage IPv4/IPv6, Wireshark
- Compétences systèmes et réseaux
- Contact

## Technique

Site statique, sans dépendance ni build :

- `index.html` — structure de la page unique
- `base.css` / `style.css` — styles (thème sombre « terminal », accent vert)
- `app.js` — terminal animé, apparitions au défilement, navigation active

Polices chargées via CDN (Satoshi via Fontshare, JetBrains Mono via Google Fonts).

## Déploiement sur GitHub Pages

1. Créer un dépôt sur GitHub (par exemple `portfolio`) et y pousser ces fichiers.
2. Dans le dépôt : **Settings** → **Pages** → Source : **Deploy from a branch** → branche `main`, dossier `/ (root)`.
3. Le site est disponible sur `https://<pseudo>.github.io/portfolio/` après quelques minutes.

Aucune étape de compilation n'est nécessaire.
