# I can touch it — Project Website

Website for **I can touch it**, an Erasmus+ KA220-SCH Cooperation Partnership in School Education developing 3D tactile teaching aids for blind and visually impaired students.

🔗 Live site: _to be added after deploy_
🔗 Project ID: KA220-SCH-19631881
🔗 Duration: Dec 2025 – Dec 2027

## Português

Website do projecto **I can touch it**, uma Cooperação Erasmus+ KA220-SCH no ensino escolar que desenvolve ferramentas didácticas 3D tácteis para alunos cegos e com baixa visão.

O Buinho FabLab é responsável pelo Work Package 5 (Disseminação) — incluindo este website, o repositório aberto de modelos 3D e a coordenação das comunicações nas redes sociais.

**Stack:** HTML + CSS estáticos. Sem backend, sem frameworks JS. Tipografia ASAP via Google Fonts.

**Identidade visual:** v1 com identidade neutra de placeholder (preto + cinzas + acento azul). A v2 será desenvolvida pelo Gris (agente de comunicação do Buinho) com paleta e linguagem visual próprias do projecto, e aplicada via patch limpo sem reescrever o conteúdo.

## English

Website for **I can touch it**, an Erasmus+ KA220-SCH Cooperation Partnership in School Education developing 3D tactile teaching aids for blind and visually impaired students. Buinho FabLab is responsible for Work Package 5 (Dissemination), which includes this website, the open 3D model repository and the project's social media presence.

**Stack:** Static HTML + CSS. No backend, no JS frameworks. ASAP typography via Google Fonts.

**Visual identity:** v1 uses a neutral placeholder identity (monochrome with a single accent colour). v2 will introduce a project-specific identity designed by Gris (Buinho's communication agent), applied as a clean patch without rewriting content.

## Project structure

```
icantouchit/
├── index.html          Home
├── about.html          About the project
├── partners.html       The 5 consortium partners
├── workpackages.html   WP1 – WP5
├── activities.html     Project timeline
├── resources.html      Open library (placeholder until 2026)
├── contact.html        Partner contacts
├── style.css           All styles
└── README.md
```

## Local development

No build step needed. Open any `.html` file in a browser, or run a local server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

Hosted on Render as a static site. Custom domain: _to be configured_.

Push to `main` triggers automatic redeploy.

## Consortium

| Country | Organisation | Role |
|---|---|---|
| 🇸🇮 Slovenia | Center IRIS | Coordinator |
| 🇷🇸 Serbia | Veljko Ramadanović | Partner |
| 🇷🇸 Serbia | Dragan Kovačević | Partner |
| 🇲🇰 N. Macedonia | Dimitar Vlahov | Partner |
| 🇵🇹 Portugal | Buinho Associação | Partner · 3D Lab |

## License

Content: © 2026 the I can touch it consortium.
Code: CC-BY-SA 4.0 — [Buinho FabLab](https://buinho.pt), Messejana, Alentejo, Portugal.

---

Co-funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the National Agency. Neither the European Union nor the granting authority can be held responsible for them.
