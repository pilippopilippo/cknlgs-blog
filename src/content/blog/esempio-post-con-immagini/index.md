---
title: "Esempio: post con immagini"
description: "Come organizzare un articolo con le sue immagini in una cartella dedicata."
pubDate: "Oct 02 2026"
heroImage: "./copertina.jpg"
author: "pilippopilippo"
lang: "it"
tags: ["test", "esempio", "immagini"]
draft: false
---

Questo è un articolo di esempio. Ogni post vive in una cartella tutta sua, insieme alle sue immagini:

```
src/content/blog/
└── esempio-post-con-immagini/
    ├── index.md        ← questo testo
    ├── copertina.jpg   ← copertina (heroImage)
    ├── foto-1.jpg
    └── foto-2.jpg
```

Il nome della cartella diventa l'indirizzo dell'articolo: `/blog/esempio-post-con-immagini/`.

## Immagine di copertina

Si indica nell'intestazione in cima al file, con un percorso relativo:

```yaml
heroImage: "./copertina.jpg"
```

## Immagini nel testo

Si inseriscono con la normale sintassi Markdown, sempre con `./` davanti al nome del file. Il testo tra parentesi quadre è la descrizione dell'immagine, utile per chi usa uno screen reader:

```md
![Descrizione della foto](./foto-1.jpg)
```

Ecco il risultato:

![Foto orizzontale di esempio](./foto-1.jpg)

Le foto verticali funzionano allo stesso modo:

![Foto verticale di esempio](./foto-2.jpg)

## Cose da sapere

- Puoi caricare le foto così come escono dal telefono: durante la build vengono ridimensionate e convertite in un formato leggero (WebP).
- Se sbagli il nome di un file la build si ferma e ti dice quale immagine manca, così non pubblichi mai un'immagine rotta.
- Usa nomi di file semplici: minuscole, niente spazi né accenti (es. `tramonto-sul-mare.jpg`).
- Per pubblicare l'articolo togli la riga `draft: true` dall'intestazione.
