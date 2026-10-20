# Desk section: notes for review

Built on the `desk` branch. This file is excluded from the site build (see `_config.yml`).

## The structure

One menu entry, **Desk** (`/desk/`), with four kinds of content:

| Kind | Where | URL | Layout |
|---|---|---|---|
| Living pages (calendar, survival guide, resources, press) | `_notes/<slug>.md` with `kind: living` | `/<slug>/` | `note` |
| Standalone pages (for example a page about a person) | `_notes/<slug>.md` with `kind: page` | `/<slug>/` | `note` |
| Blog posts (dated opinion pieces) | `_posts/YYYY-MM-DD-slug.md` | `/blog/slug/` | `post` |
| Experiments | `_demos/` (unchanged) | `/demos/<name>.html` | default |

The index at `/desk/` shows the three latest posts, the living pages as cards, the standalone pages
as cards (section hidden until one exists) and the experiments. `/blog/` lists all posts by year and
`/feed.xml` is the Atom feed (full text, 20 posts), produced by `jekyll-feed`.

## URLs and redirects

Living pages and standalone pages sit directly under the domain, as you asked:
`/visual-computing-calendar/`, `/visual-computing-survival-guide/`, `/visual-computing-resources/`.
The old addresses keep working through `jekyll-redirect-from` (on the GitHub Pages whitelist): each old
URL becomes a small page with a meta refresh and a canonical link to the new one, which is what search
engines expect, and they stay out of the sitemap. Mapping:

- `/notes.html` -> `/desk/`
- `/notes/deadlines-calendar.html` -> `/visual-computing-calendar/`
- `/notes/visual-computing-research-survival-guide.html` -> `/visual-computing-survival-guide/`
- `/notes/visual-computing-resources.html` -> `/visual-computing-resources/`

To add another old URL to a page, extend its `redirect_from:` list.

## Front matter cheat sheet

Living page or standalone page (`_notes/<slug>.md`):

```yaml
---
title: A page about ...
description: "One or two sentences for search engines."     # optional, falls back to the site description
summary: "One line shown on the card."
layout: note
kind: page            # living | page
icon: fa-user         # any Font Awesome 5 solid icon; default fa-file-alt (living) / fa-bookmark (page)
updated: 2026-10-20   # optional; shown under the title and on the card
---
Body in Markdown. Do not repeat the title: the layout renders it.
```

Blog post: copy `_drafts/how-to-write-a-post.md` to `_posts/YYYY-MM-DD-slug.md`. Preview drafts with
`jekyll serve --drafts`. The draft explains the LinkedIn workflow and the `linkedin:` field.

Press page: fill `_data/press.yml` and remove `published: false` from `_notes/press.md`.

## Things to decide

- The name. "Desk" is the name you chose: generic enough for guides, pages and posts, and it keeps the spirit of
  "Notes". Alternatives that fit the same slot: "Writing", "Desk", "Miscellany". Renaming is two lines in
  `desk.md` (`title`, `menu_title`); keep the URL or add the old one to `redirect_from`.
- Section order in the menu: Home, Research, Publications, Desk (and Projects, once that branch lands).
- The first post. The blog page says "No posts yet" until `_posts/` has a file.

## Not done

- No press entries: I found no press coverage online to seed the list, so the page stays hidden.
- The page about your father: the `kind: page` mechanism is ready; the content is yours to write.
- Comments on posts: by design none; the "Discuss on LinkedIn" button replaces them.
