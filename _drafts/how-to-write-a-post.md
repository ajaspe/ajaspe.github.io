---
title: "How to write a post (template)"
date: 2026-10-20
summary: "One-line summary shown in the post lists and used as the description for search engines and social previews."
tags: [site, writing]
# cover: /assets/img/posts/2026-10-20-example.jpg      # 1200 x 630 works best for social previews
# cover_alt: "What the cover image shows"
# linkedin: https://www.linkedin.com/posts/...           # adds a "Discuss on LinkedIn" button
---

This file lives in `_drafts/`, so it is not published. Preview drafts with `jekyll serve --drafts`.

To publish a post, copy this file to `_posts/YYYY-MM-DD-slug.md` and fill in the front matter above. The slug in the file name becomes the URL, `/blog/slug/`, so choose it with care: it is what people will share and what search engines index.

## Writing conventions that make cross-posting painless

* Plain Markdown, no Liquid tags, so the text pastes anywhere.
* Images with absolute paths under `/assets/img/posts/`, one cover image of 1200 x 630 pixels for the social preview.
* First sentence or two self-contained: the lists and the feed show the `summary` line, LinkedIn shows the first lines.

## Publishing on LinkedIn too

1. Publish here first and share the link; the page is the canonical version.
2. For the pieces you want as a LinkedIn Article, paste the text in the LinkedIn editor and end it with "Originally published at albertojaspe.net/blog/slug/".
3. Put the URL of the LinkedIn post in `linkedin:` above: the post then gets a "Discuss on LinkedIn" button, which gives you comments without a comment system on the site.

The Atom feed at `/feed.xml` carries the full text of every post, so tools such as Zapier or IFTTT can announce new posts automatically if you ever want that.
