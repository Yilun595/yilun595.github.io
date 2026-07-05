# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is Yilun Li's personal academic website, built with **Jekyll** and deployed via **GitHub Pages** at `yilun595.github.io`. It is based on the [academicpages](https://github.com/academicpages/academicpages.github.io) template, which is itself derived from the [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) theme.

## Build & Development

```bash
# Install Ruby dependencies (uses github-pages gem for GH Pages compatibility)
bundle install

# Local dev server (uses _config.dev.yml to override production settings)
bundle exec jekyll serve --config _config.yml,_config.dev.yml --incremental

# Local dev server with live reload
bundle exec jekyll serve --config _config.yml,_config.dev.yml --livereload
```

The site output goes to `_site/` (gitignored). GitHub Pages rebuilds automatically on push to `master`.

## Architecture

### Content Collections

The site has **four custom Jekyll collections** defined in `_config.yml`, each with `output: true` so pages are generated:

| Directory | Purpose | Permalink pattern |
|-----------|---------|-------------------|
| `_research/` | Research project pages | `/:collection/:path/` |
| `_publications/` | Publication detail pages | `/:collection/:path/` |
| `_portfolio/` | Portfolio/project pages | `/:collection/:path/` |
| `_life/` | "Beyond research" posts | `/:collection/:path/` |

Each collection item is a Markdown file with YAML frontmatter. The `_pages/` directory contains top-level pages (About, Research listing, etc.) which use `permalink:` in their frontmatter to define URLs.

### Key Customizations

- **Comments**: Uses **giscus** (GitHub Discussions-based) configured in `_includes/comments-providers/custom.html`. The `_config.yml` sets `comments.provider: "custom"` to route through `_includes/comments.html` → the custom provider.
- **Math rendering**: MathJax 2.7 loaded via CDN in `_includes/head/custom.html`, configured for `$...$` inline delimiters and auto-numbered equations.
- **Panorama images**: Pannellum 2.5.6 loaded via CDN for 360° equirectangular panoramas (used on research pages). Source images live in `PANOmap/PanoLib/`.
- **Citation counts**: Tracked in both `citations.json` (root-level, keyed by publication slug) and `_data/citations.json`. The recent commit history shows these are regularly updated via a script.
- **Talk map**: The `talkmap/` directory has a Leaflet-based interactive map (`map.html`, `org-locations.js`).

### Data Files

- `_data/navigation.yml` — Top-level site navigation (Research, Portfolio, Publications, Packages, Beyond research)
- `_data/authors.yml` — Author profile used by `_includes/author-profile.html`
- `_data/ui-text.yml` — UI string overrides (theme default plus custom)

### Layout Chain

`_layouts/default.html` is the base layout. It includes:
1. `_includes/head/custom.html` — favicons, MathJax, academicons CSS
2. `_includes/masthead.html` — site header/nav
3. Page content
4. `_includes/footer/custom.html` — sitemap link
5. `_includes/footer.html` — standard theme footer

Other layouts (`archive`, `single`, `splash`, `talk`) inherit from `default.html`.

### Custom CSS/JS

- `assets/css/main.scss` — imports `_sass/` partials, compiled to `main.css`
- `assets/css/academicons.css` — Academic icon font (ORCID, Google Scholar, etc.)
- `assets/css/collapse.css` — Collapsible container widget (used on some pages)
- `assets/js/collapse.js` — Companion JS for the collapsible widget
- `assets/js/_main.js` — Source JS; minified into `assets/js/main.min.js` via `npm run build:js`

### SCSS (`_sass/`)

The theme SCSS partials are prefixed with `_` (e.g., `_sass/_variables.scss`, `_sass/_base.scss`). Third-party vendor SCSS is under `_sass/vendor/` (breakpoint, magnific-popup, susy). Custom style overrides go in the `_sass/_*.scss` partials.

### Config Files

- `_config.yml` — Production config (deployed site)
- `_config.dev.yml` — Development overrides: sets URL to `localhost:4000`, disables analytics, expands SCSS output style

## Adding Content

### New publication
Create `_publications/SLUG.md` with frontmatter fields: `title`, `collection: publications`, `permalink`, `excerpt`, `date`, `venue`, `paperurl`, `citation`. Add a citation entry to both `citations.json` and `_data/citations.json`.

### New research project
Create `_research/SLUG.md` with `collection: research` and `permalink: /research/SLUG`. Link to it from `_pages/research.md`.

### New portfolio item
Create `_portfolio/SLUG.md` with `collection: portfolio` and `permalink: /portfolio/SLUG`.

### Site images
Static images go in `images/` and are referenced as `/images/filename.jpg` in markdown.

## Dependencies

- **Ruby**: Managed via Bundler (`Gemfile`). The `github-pages` gem pins all dependency versions to match GitHub Pages' production environment.
- **Node**: Only needed for JS minification (`package.json` — `npm run build:js` to minify `_main.js` into `main.min.js`). Not required for local development.
- **Python**: The `markdown_generator/` directory contains a script for generating talk/publication markdown files from CSV/TSV data (see `markdown_generator/readme.md`).
