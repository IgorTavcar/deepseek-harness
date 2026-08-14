# Agent Note: Editorial static wiki under wiki/

Status: implemented

English | [中文](2026-08-14-editorial-static-wiki.zh.md)

## Problem

The official documentation tree is a gated, bilingual, budgeted corpus whose jobs are contracts, cookbooks, and generated catalogs. A reader who wants a single sitting through the loop, the plugin ontology, the model targets, and the bets that set this harness apart has to assemble that narrative from `docs/architecture.md`, package READMEs, and Agent Notes. That assembly is useful once and is not a standing official document.

## Decision

`wiki/` is an editorial static HTML atlas of the repository: `index.html` plus aspect pages, shared `assets/style.css`, and a small `assets/wiki.js` for navigation, theme, and the loop stepper. It is not part of the documentation website, not a `docs/` page, not bilingual, and not covered by `verify-doc-budgets`, `verify-md-links`, translation pairing, or VitePress projection.

When a wiki page and an official source disagree, the official source wins: package READMEs, generated catalogs, `docs/architecture.md`, subsystem pages, and implemented Agent Notes. The wiki may quote those homes; it must not become a second contract.

Serve it as static files (`python3 -m http.server --directory wiki`) or open `wiki/index.html` from disk.

## Alternatives considered

**Put the atlas on the VitePress documentation website.** That would give the narrative a published URL and the site's link checker, but it would also pull a long editorial essay into the bilingual, budgeted, user-guide tree and force every refresh through pairing and doc-sync. The website's job is product and contributor documentation, not a juice press.

**Write the atlas as Markdown under `docs/`.** Official docs already own architecture, subsystems, and cookbooks. A new Markdown home would either duplicate those contracts or fight the one-home-per-fact rule. Static HTML keeps the editorial voice out of the gated corpus.

**Skip a written home and leave the narrative in chat.** A conversation evaporates. The request was a durable, locally openable site.

## Consequences

`wiki/` can drift from the code without a gate turning red. Authors who change a loop, seam, or model default must update official docs first; refreshing the wiki is optional editorial work, not a merge requirement. Reviewers should not treat wiki prose as a substitute for README or Agent Note contracts.
