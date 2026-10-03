# CKNLGSCKNLGS

Blog personale pubblicato su [cknlgs.cc](https://cknlgs.cc), fatto con [Astro](https://astro.build) e ospitato su Cloudflare.

Ogni modifica che arriva sul branch `main` viene pubblicata automaticamente da Cloudflare in pochi minuti.

---

## Scrivere un nuovo articolo

Ogni articolo è una **cartella** dentro `src/content/blog/`, con il testo e le sue immagini:

```
src/content/blog/
└── viaggio-a-lisbona/        ← il nome diventa l'indirizzo: cknlgs.cc/blog/viaggio-a-lisbona/
    ├── index.md              ← il testo dell'articolo
    ├── copertina.jpg         ← immagine di copertina
    ├── tram.jpg
    └── tramonto.jpg
```

### 1. Crea la cartella

Usa un nome corto, in **minuscolo**, con i **trattini** al posto degli spazi e **senza accenti**: `viaggio-a-lisbona`, non `Viaggio a Lisbona`.

### 2. Crea `index.md` con l'intestazione

Il file inizia sempre con questo blocco tra `---`:

```md
---
title: "Viaggio a Lisbona"
description: "Tre giorni tra tram gialli e pastéis de nata."
pubDate: "2026-10-15"
author: "Mario Rossi"
heroImage: "./copertina.jpg"
tags: ["viaggi", "portogallo"]
---

Qui inizia il testo dell'articolo.
```

| Campo         | Obbligatorio | A cosa serve |
| ------------- | ------------ | ------------ |
| `title`       | sì           | Titolo dell'articolo |
| `description` | sì           | Breve riassunto: compare su Google e nelle anteprime quando condividi il link |
| `pubDate`     | sì           | Data di pubblicazione, nel formato `AAAA-MM-GG` |
| `updatedDate` | no           | Data dell'ultimo aggiornamento, se lo modifichi in seguito |
| `author`      | no           | Nome dell'autore: compare accanto alla data, nell'articolo e in home. Se manca non viene mostrato nessun nome |
| `lang`        | no           | Lingua dell'articolo, es. `"it"` per l'italiano (se manca: inglese). Serve ai lettori di schermo per pronunciarlo correttamente |
| `heroImage`   | no           | Immagine di copertina: compare in home, in cima all'articolo e nelle anteprime social |
| `tags`        | no           | Argomenti dell'articolo, tra parentesi quadre e separati da virgole (vedi [Tag](#tag)) |
| `draft`       | no           | `true` per tenerlo nascosto (bozza); se manca, l'articolo è pubblicato |

> I testi tra virgolette possono contenere qualsiasi carattere. Se un titolo contiene a sua volta delle virgolette, usa quelle singole fuori: `title: 'Il "grande" viaggio'`.

### 3. Aggiungi le immagini

Metti le immagini nella stessa cartella e richiamale con `./` davanti al nome:

```md
![Il tram 28 in salita](./tram.jpg)
```

- Il testo tra `[ ]` descrive l'immagine per chi non la vede (screen reader, connessione lenta): scrivilo sempre.
- Puoi caricare le foto così come escono dal telefono: durante la pubblicazione vengono ridimensionate e convertite in un formato leggero.
- Nel sito, cliccando un'immagine la si apre a schermo intero.
- Formati supportati: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.avif`, `.svg`.
- Se il nome di un'immagine è sbagliato la pubblicazione si ferma con un errore che indica il file mancante: niente immagini rotte online.

### 4. Pubblica

Fai arrivare le modifiche su `main` (dal [pannello di scrittura](#scrivere-dal-telefono-pannello-admin), con un commit da GitHub o dal tuo computer). Cloudflare ricostruisce e pubblica il sito da solo.

**Dal sito di GitHub, senza installare niente:**

1. Apri la cartella `src/content/blog/` nel repository.
2. *Add file → Create new file* e scrivi come nome `viaggio-a-lisbona/index.md`: la `/` crea la cartella.
3. Incolla il testo e fai *Commit changes*.
4. Entra nella nuova cartella e usa *Add file → Upload files* per caricare le immagini.

### Scrivere dal telefono: pannello `/admin`

Su [cknlgs.cc/admin/](https://cknlgs.cc/admin/) c'è un pannello di scrittura ([Sveltia CMS](https://github.com/sveltia/sveltia-cms)) che funziona bene anche da telefono: compili un modulo, scrivi il testo con i pulsanti per grassetto, titoli, liste e immagini, e premi **Salva**. Il pannello salva l'articolo nel repository (cartella, `index.md` e immagini, come descritto sopra) e Cloudflare lo pubblica in pochi minuti.

**Prima volta: accesso con un token GitHub** (da rifare solo quando il token scade o cambi dispositivo)

1. Apri `cknlgs.cc/admin/` e tocca **Accedi con Token di Accesso**.
2. Tocca il link alla *pagina delle impostazioni di GitHub*: si apre la creazione di un nuovo token.
3. In *Repository access* scegli **Only select repositories** → `cknlgs-blog` e imposta la scadenza (es. 1 anno).
4. In *Permissions* → **Add permissions** spunta **Contents** e impostalo su **Read and write** (GitHub aggiunge da solo *Metadata: Read-only*). Non serve nient'altro. Poi premi **Generate token**.
5. Copia il token (`github_pat_…`), torna al pannello, incollalo e premi **Accedi**.

Il token resta salvato solo in quel browser. Se perdi il telefono, revocalo da GitHub → *Settings → Developer settings → Personal access tokens*.

**Scrivere un articolo**

- **Articoli → Nuovo** (su telefono: tocca *Articoli*, poi il pulsante **+**). I campi sono gli stessi dell'intestazione: titolo, descrizione, data (oggi in automatico), autore, copertina, tag, lingua, bozza e testo.
- **Indirizzo dell'articolo**: viene creato dal titolo (`Viaggio a Lisbona` → `/blog/viaggio-a-lisbona/`). Per sceglierlo tu: menu **⋮** in alto → **Slug**, prima del primo salvataggio. Se esiste già un articolo con lo stesso indirizzo, al nuovo viene aggiunto `-1`.
- **Foto**: puoi scattarle o sceglierle dalla galleria, anche in formato HEIC dell'iPhone. Prima del caricamento il pannello le riduce (al massimo 2560 px), le converte in WebP e rinomina il file (`IMG 1234.HEIC` → `img-1234.webp`). I dati di posizione GPS della foto vengono eliminati. Nel testo usa il pulsante **Immagine** e compila sempre il *testo alternativo*.
- **Dove finiscono le immagini**: nella finestra di scelta, *Entry Assets* è la cartella dell'articolo (la scelta giusta quasi sempre); *Global Assets* è `src/assets/images/`, per immagini usate da più articoli; *Unsplash* e *Pexels* sono cataloghi di foto gratuite: la foto viene salvata come link e il sito la scarica e la ottimizza a ogni pubblicazione.
- **Bozza**: attiva l'interruttore per salvare senza pubblicare; disattivalo quando l'articolo è pronto. In elenco, *Filtra → Bozze* mostra solo le bozze.
- **Salva** pubblica subito: ogni salvataggio è un commit su `main`. Se dopo qualche minuto la modifica non compare sul sito, la pubblicazione su Cloudflare si è fermata per un errore e il sito è rimasto com'era: vedi [Errori comuni](#errori-comuni-durante-la-pubblicazione).
- Puoi modificare anche gli articoli esistenti; **Elimina** (menu ⋮) cancella l'articolo insieme alle sue immagini.

Da sapere:

- I titoli dentro il testo partono dal livello 2 (il titolo principale è già `title`), per questo il pulsante "Titolo 1" non c'è.
- Il pannello mostra solo gli articoli `.md`, non quelli `.mdx`. La pagina About si modifica dal codice.
- L'anteprima a fianco del modulo mostra i contenuti, non l'aspetto finale del sito.
- Un'immagine indicata con un link (`https://…`) da un sito diverso da Unsplash e Pexels viene mostrata così com'è, senza ottimizzazione. Gli indirizzi ammessi sono in `src/utils/remote-images.mjs`.
- I campi del pannello sono definiti in `public/admin/config.yml` e devono corrispondere allo schema in `src/content.config.ts`: se ne aggiungi uno, aggiornali entrambi.
- Sveltia CMS è installato con npm a una versione fissa (`@sveltia/cms` in `package.json`) e servito dal sito stesso: per aggiornarlo, `npm install -D -E @sveltia/cms@latest`, poi prova il pannello con `npm run preview`.

### Tag

```md
tags: ["viaggi", "cucina italiana", "portogallo"]
```

- Ogni tag ha la sua pagina con tutti gli articoli che lo usano, es. `cknlgs.cc/tags/viaggi/`. La pagina **Tags** nel menu li elenca tutti con il numero di articoli.
- Maiuscole e accenti non creano tag doppi: `Viaggi` e `viaggi` sono lo stesso tag, come `Città` e `citta`. Conviene comunque scriverli sempre allo stesso modo, perché il nome mostrato è quello usato nell'articolo.
- Gli spazi sono ammessi: nell'indirizzo diventano trattini (`cucina italiana` → `/tags/cucina-italiana/`).
- Un tag compare solo quando almeno un articolo pubblicato lo usa (le bozze non contano).

### Bozze

Aggiungi `draft: true` all'intestazione per lavorare a un articolo senza pubblicarlo: non compare in home, nel feed RSS e la sua pagina non viene creata. Quando è pronto togli la riga (o scrivi `draft: false`).

> Le immagini di una bozza vengono comunque caricate sul sito con un nome casuale, senza essere collegate da nessuna pagina: non mettere in bozza foto che non devono finire online.

C'è un articolo di esempio in bozza in `src/content/blog/esempio-post-con-immagini/` da usare come modello.

### Cosa fa il sito da solo

Non serve scrivere niente di speciale negli articoli per avere:

- **tempo di lettura** stimato, accanto alla data;
- **articolo precedente / successivo** in fondo a ogni articolo;
- **link alle sezioni**: passando sopra un sottotitolo compare `#`, l'indirizzo diretto di quella sezione;
- **foto ingrandibili** al clic e tasto **Copy** sui blocchi di codice;
- **anteprime social** e **dati strutturati** per Google (titolo, date, autore, copertina, tag);
- **versione stampabile** pulita (solo testo e immagini).

### Ricerca

La ricerca (icona 🔍 in alto, oppure `Ctrl+K` / `⌘K` o il tasto `/`) usa [Pagefind](https://pagefind.app): l'indice viene creato automaticamente a ogni pubblicazione e la ricerca avviene nel browser, senza servizi esterni. Vengono indicizzati solo gli articoli pubblicati (titolo, testo e tag); le bozze no. Non c'è niente da fare a mano.

In locale la ricerca funziona con `npm run preview`, non con `npm run dev` (l'indice esiste solo dopo la build).

---

## Promemoria Markdown

### Testo

```md
## Titolo di sezione
### Sottotitolo

Un paragrafo è testo normale. Lascia una riga vuota per iniziarne un altro.

**grassetto**, *corsivo*, ~~barrato~~, `codice in linea`

[testo del link](https://esempio.it)
```

Non usare `#` (un solo cancelletto): il titolo principale lo crea già il sito a partire da `title`.

### Liste

```md
- elemento
- altro elemento
  - sotto-elemento (due spazi davanti)

1. primo
2. secondo
3. terzo

- [x] cosa fatta
- [ ] cosa da fare
```

### Citazioni

```md
> Una citazione.
> Può andare su più righe.
```

### Blocchi di codice

Tre backtick (`` ` ``) prima e dopo. Dopo i primi puoi indicare il linguaggio per avere i colori; nel sito ogni blocco ha un tasto **Copy**.

````md
```js
console.log("ciao");
```
````

Linguaggi comuni: `js`, `ts`, `html`, `css`, `json`, `yaml`, `bash`, `python`, `md`. Senza linguaggio il codice è mostrato in un colore solo.

### Tabelle

```md
| Città    | Giorni |
| -------- | -----: |
| Lisbona  |      3 |
| Porto    |      2 |
```

I `:` nella seconda riga allineano la colonna (`:---` a sinistra, `---:` a destra, `:---:` al centro).

### Altro

```md
Una nota a piè di pagina.[^1]

[^1]: Il testo della nota, che compare in fondo all'articolo.

---  ← una linea orizzontale di separazione
```

### MDX

Se rinomini `index.md` in `index.mdx` puoi usare anche componenti Astro dentro il testo. Per articoli normali non serve: resta su `.md`.

---

## Lavorare dal computer (facoltativo)

Serve [Node.js](https://nodejs.org) 22.12 o più recente.

| Comando           | Cosa fa |
| ----------------- | ------- |
| `npm install`     | Installa le dipendenze (la prima volta) |
| `npm run dev`     | Avvia il sito in locale su `http://localhost:4321`, con aggiornamento automatico mentre scrivi |
| `npm run build`   | Genera il sito come verrà pubblicato (e l'indice di ricerca), utile per scoprire errori prima di pubblicare |
| `npm run preview` | Build e anteprima locale identica al sito pubblicato, ricerca compresa |
| `npm run check`   | Build più controlli completi, come fa Cloudflare |

In locale le bozze non si vedono: per un'anteprima togli temporaneamente `draft: true`.

---

## Errori comuni durante la pubblicazione

Se la pubblicazione fallisce, il sito online resta com'era. Nel log di Cloudflare cerca le righe con `Error`:

- **`data does not match collection schema`** seguito da **`title: Required`** (o `description`, `pubDate`): manca un campo obbligatorio nell'intestazione. Se risultano mancanti *tutti* i campi, di solito l'intestazione non è delimitata bene: deve iniziare e finire con `---` su una riga da sola.
- **`pubDate: Expected type "date"`**: la data non è nel formato `AAAA-MM-GG` (es. `2026-10-15`, non `15/10/2026`).
- **`ImageNotFound` … `Could not find requested image ./foto.jpg`**: il nome o il percorso di un'immagine è sbagliato. Attenzione a maiuscole ed estensione: `Foto.JPG` e `foto.jpg` sono file diversi.

Il messaggio indica sempre il nome della cartella dell'articolo con il problema (es. `blog → viaggio-a-lisbona`).

---

## Struttura del progetto

```
src/
├── content/blog/      ← gli articoli (una cartella ciascuno)
├── pages/             ← pagine: home (index.astro), about.astro, tags/, feed RSS, admin/ (pannello di scrittura)
├── utils/posts.ts     ← elenco articoli pubblicati e gestione dei tag
├── layouts/           ← impaginazione degli articoli
├── components/        ← intestazione, piè di pagina, elenco articoli, tag, tasto Copy e zoom immagini
├── styles/global.css  ← stile generale
└── consts.ts          ← nome e descrizione del sito
public/                ← file serviti così come sono (favicon, font, admin/config.yml con i campi del pannello)
```
