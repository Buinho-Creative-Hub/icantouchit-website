# Fingers Read Space

Project website for the Erasmus+ KA220-SCH partnership *Fingers Read Space · I Can Touch It* (2025–2027). A consortium of four schools specialised in education for blind and visually impaired students (in Slovenia, Serbia, North Macedonia) plus a digital fabrication lab in Portugal, building an open library of 3D-printed tactile teaching aids.

Live: <https://touchit.buinho.eu>

## Português

Site institucional do projeto Erasmus+ KA220-SCH **Fingers Read Space · I Can Touch It** (2025–2027). Um consórcio de quatro escolas especializadas em educação de alunos cegos e com baixa visão (Eslovénia, Sérvia, Macedónia do Norte) e um laboratório de fabricação digital em Portugal, a construir uma biblioteca aberta de materiais didáticos táteis impressos em 3D.

Site público: <https://touchit.buinho.eu> (raiz EN, versão PT em `/pt/`).

Coordenação: Center IRIS (Liubliana, Eslovénia).
Parceiros: Veljko Ramadanović, Dragan Kovačević, Dimitar Vlahov, Buinho.
Duração: 01/12/2025 – 31/12/2027.

## English

This is the canonical website for the project. The English version lives at the site root; a parallel Portuguese version lives under `/pt/`. The same identity, navigation and structure apply to both languages.

Coordinator: Center IRIS (Ljubljana, Slovenia).
Partners: Veljko Ramadanović, Dragan Kovačević, Dimitar Vlahov, Buinho.
Duration: 01/12/2025 – 31/12/2027.

## Site structure

```
/                root, English version
  index.html
  about.html
  partners.html
  workpackages.html
  activities.html
  resources.html
  contact.html
  style.css       shared design system (D1.5 — Nov 2025 identity manual)
  tactile.js      hero headline behaviour for the home page
  eu-flag.svg     Co-funded by the European Union emblem

/pt/             Portuguese version, mirrors the same set of pages
```

## Visual identity

The website applies the Fingers Read Space identity manual delivered in November 2025 (token set "D1.5"): ASAP typeface, ink/bone/paper neutral palette, deep ink-blue accent, four-colour project mark (red / orange / green / purple semi-arcs around a black square), and a "tactile" hero behaviour where the headline lines respond to hover and focus with a subtle per-letter displacement.

Future visual evolution is owned by the Gris team — Albano implements changes only after Gris ships an updated identity package.

## Deploy

Static site hosted on Render (Frankfurt region), deployed automatically from `main`.
See `DEPLOY.md` for full deployment notes and troubleshooting.

## License

Content (text, images): **CC BY-SA 4.0**, unless individual partners' material indicates otherwise.
Code (HTML, CSS, JS): **CC BY-SA 4.0**.

EU funding disclaimer is shown in the page footer.

## Maintainers

- **Buinho FabLab** — site build, deployment, technical maintenance.
  Carlos Alcobia · <info@buinho.pt> · <https://www.buinho.pt>
- **Dimitar Vlahov** — dissemination lead (WP5), partnership with Buinho on social media + content.
- **Center IRIS** — project coordinator, content review.

---

Co-funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the National Agency. Neither the European Union nor the granting authority can be held responsible for them.
