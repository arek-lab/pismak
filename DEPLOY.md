# Deployment — Pismak na Vercel

## Wymagania wstępne

- Konto na [vercel.com](https://vercel.com)
- Vercel CLI: `npm install -g vercel`
- Własna domena (np. `pismak.pl`)
- Container ID Google Tag Manager (format: `GTM-XXXXXXX`)

---

## Krok 1 — Podmień GTM Container ID

W pliku `app/layout.tsx` zmień:

```ts
const GTM_ID = 'GTM-XXXXXXX'
```

na swój rzeczywisty Container ID z panelu GTM.

---

## Krok 2 — Pierwszy deploy

```bash
# Zaloguj się do Vercel
vercel login

# Deploy z katalogu projektu
vercel

# Przy pierwszym uruchomieniu Vercel zapyta o:
# - Scope (wybierz swoje konto)
# - Link to existing project? → N
# - Project name → pismak
# - Directory → ./
# - Override settings? → N
```

Vercel automatycznie wykryje Next.js i użyje `output: 'export'`.

---

## Krok 3 — Deploy produkcyjny

```bash
vercel --prod
```

---

## Krok 4 — Podpięcie domeny

1. Wejdź w panel Vercel → projekt `pismak` → **Settings → Domains**
2. Dodaj domenę: `pismak.pl` i `www.pismak.pl`
3. Vercel wyświetli rekordy DNS do ustawienia u rejestratora domeny:
   - `A` record dla `pismak.pl` → podany IP
   - `CNAME` record dla `www` → `cname.vercel-dns.com`
4. Po propagacji DNS (do 48h) certyfikat SSL zostanie wystawiony automatycznie

---

## Krok 5 — Weryfikacja po deployu

```bash
# Sprawdź czy sitemap jest dostępny
curl https://pismak.pl/sitemap.xml

# Sprawdź czy robots.txt jest dostępny
curl https://pismak.pl/robots.txt

# Sprawdź strukturę HTML (H1, JSON-LD)
curl https://pismak.pl/wezwanie-do-zaplaty | grep -o '<h1[^>]*>[^<]*</h1>'
```

---

## Konfiguracja Vercel (automatyczna)

Projekt nie wymaga zmiennych środowiskowych — całość działa client-side.

`next.config.mjs` już zawiera wymaganą konfigurację:
```js
output: 'export'      // pełny SSG — zero serwera
trailingSlash: true   // kompatybilność z Vercel static hosting
```

---

## Kolejne deploye

Każdy push do `main` można podpiąć pod auto-deploy:
- Vercel → projekt → **Settings → Git** → podłącz repozytorium GitHub/GitLab
- Od tego momentu `git push` = automatyczny deploy na produkcję
