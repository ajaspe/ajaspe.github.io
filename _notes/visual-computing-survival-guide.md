---
title: A Survival Guide for Visual Computing PhD Students
description: "A quick-start guide for new PhD students in computer graphics and visualization: venues, literature, writing, reviewing, talks, impact metrics and well-being."
layout: note
kind: living
icon: fa-graduation-cap
summary: "A quick-start for new PhD students in graphics and visualization: venues, literature, writing, reviewing, talks, impact metrics and looking after yourself."
redirect_from:
  - /notes/visual-computing-research-survival-guide.html
thumb_img: "assets/img/thumb_guide.jpg"
updated: 2026-10-23
---

This small guide aims to be a quick-start introduction to common terms and procedures for a PhD student in computer science. Some aspects are generic, and others are more oriented to the field of Visual Computing, specifically Computer Graphics and Visualization.

## Finding a research topic
That is your advisor's responsibility :) Apart from that, there are some places to look for inspiration:
* [SIGGRAPH Course: Open problems in real-time rendering](https://openproblems.realtimerendering.com/): SIGGRAPH courses of 2015, 2016 and 2017 by different researchers.
* [T. Funkhouser: Five principles for choosing research problems in computer graphics](https://www.youtube.com/watch?v=v2Qaf8t8I6c): SIGGRAPH 2015 Computer Graphics Achievement Award talk.
* [R. Hamming: You and your research](https://www.cs.virginia.edu/~robins/YouAndYourResearch.html): the classic 1986 talk on how to work on problems that matter.
* **Visualization challenges**, which come with real data and real users:
	- [VAST Challenge](https://vast-challenge.github.io/2025/), the visual analytics challenge held with IEEE VIS
	- [Data Visualization Society challenges](https://www.datavisualizationsociety.org/challenges)
	- [NIH/NSF Visualization Research Challenges report](https://vcg.seas.harvard.edu/publications/20050101-nih-nsf-visualization-research-challenges-report)

## About venues
In computer graphics and visualization the top venues are **conferences**, and many of them publish their accepted papers in a **journal**: you present the paper at the conference, but it counts as a journal article. This matters for evaluation agencies that only look at journals (see [Measuring research impact](#measuring-research-impact)). The main families, with the venues I follow:

* **Flagship graphics conferences.** SIGGRAPH and SIGGRAPH Asia (Technical Papers appear in *ACM Transactions on Graphics*, TOG; since 2022 there is also a conference-paper track), Eurographics (full papers in *Computer Graphics Forum*, CGF) and Pacific Graphics (also CGF).
* **Specialized graphics symposia.** EGSR for rendering and SGP for geometry processing (both in CGF); HPG, i3D and SCA for high-performance graphics, interactive 3D and animation (in the *Proceedings of the ACM on Computer Graphics and Interactive Techniques*); EGPGV for parallel graphics and visualization; and the smaller, friendlier VMV, STAG, GRAPP, WSCG and CGI, good first venues for a PhD student.
* **Visualization.** IEEE VIS (papers in *IEEE Transactions on Visualization and Computer Graphics*, TVCG), EuroVis (CGF), PacificVis and LDAV for large data.
* **Virtual and augmented reality.** IEEE VR and ISMAR (journal track in TVCG, plus conference papers), VRST and ICAT-EGVE.
* **Computer vision.** CVPR every year, ICCV in odd years and ECCV in even years, plus 3DV: proceedings only, thousands of papers, rigid rebuttal cycles, and today the home of most neural rendering and 3D reconstruction work.
* **Web and cultural heritage.** Web3D (ACM proceedings, with extended papers in a *Computers & Graphics* special section), the Eurographics GCH workshop, the Digital Heritage congress, and the journals *JOCCH* and *Digital Applications in Archaeology and Cultural Heritage*.
* **Journals that take direct submissions.** TOG, TVCG, CGF, *Computers & Graphics*, *Computer-Aided Design*, *The Visual Computer*, *IEEE Computer Graphics and Applications*, *Graphical Models*, and the open-access *Journal of Computer Graphics Techniques* (JCGT) for practical techniques with code.
* **Preprints.** [arXiv cs.GR](https://arxiv.org/list/cs.GR/recent) and [cs.CV](https://arxiv.org/list/cs.CV/recent). Check the venue's double-blind policy before posting a preprint of a paper under review.

The [calendar of deadlines](/visual-computing-calendar/) has the typical submission dates of all these venues, the next confirmed deadlines and the links to each conference.

## Surfing the literature
 * [Ke-Sen Huang's paper lists](https://kesen.realtimerendering.com): the papers of every graphics conference, updated the day the program is out. The daily driver of the field.
 * [Google Scholar](https://scholar.google.com): search, plus alerts for keywords and for new citations of specific papers.
 * [Semantic Scholar](https://www.semanticscholar.org), [Connected Papers](https://www.connectedpapers.com) and [dblp](https://dblp.org): citation graphs, and the authoritative bibliography of computer science.
 * [Asta](https://asta.allen.ai/) and [Research Rabbit](https://www.researchrabbit.ai/): AI-assisted literature search. Asta, from the Allen Institute, answers questions with cited papers; Research Rabbit maps a collection of papers and watches for new related ones.
 * [arXiv cs.GR](https://arxiv.org/list/cs.GR/recent) and [cs.CV](https://arxiv.org/list/cs.CV/recent): most vision and neural rendering work appears here first.
 * The digital libraries: [Eurographics DL](https://diglib.eg.org), [ACM DL](https://dl.acm.org) and [IEEE Xplore](https://ieeexplore.ieee.org). Your university library gives you access to the paywalled ones.
 * [Two Minute Papers](https://www.youtube.com/channel/UCbfYPyITQ-7l4upoX8nvctg) and the [Graphics Programming Weekly](https://www.jendrikillner.com/) for keeping up without reading everything.
 * Use a reference manager from day one: [Zotero](https://www.zotero.org) is free and exports BibTeX.

## Writing papers
* [Writing your first ACM SIGGRAPH / TOG paper](https://research.siggraph.org/blog/guides/writing-your-first-acm-siggraph-tog-paper)
* [CG TuWien: How to write a scientific paper](https://www.cg.tuwien.ac.at/resources/HowToWriteAScientificPaper)
* [M. McGuire: How to create a graphics research paper](http://casual-effects.blogspot.com/2015/08/how-to-create-graphics-research-paper.html)
* [J. Kajiya: How to get your SIGGRAPH paper rejected](https://www.siggraph.org/sites/default/files/kajiya.pdf)
* [SIGG Asia 2011 Course: How to write a SIGGRAPH paper](https://www.slideshare.net/jdily/how-to-write-a-siggraph-paper)
* [E. Gröller: Practical tips and tricks for paper writing](https://www.cg.tuwien.ac.at/research/publications/2010/groeller-2010-PTT/groeller-2010-PTT-.pdf)
* [S. Nowozin: Ten Tips for Writing CS Papers](https://www.nowozin.net/sebastian/blog/ten-tips-for-writing-cs-papers-part-1.html)
* [F. Durand: Write good papers](http://people.csail.mit.edu/fredo/FredoGoodWriting.pdf)
* [A. Hertzmann: Writing research papers](http://www.dgp.toronto.edu/~hertzman/courses/gradSkills/2010/writing.pdf)
* [S. Peyton Jones: How to write a great research paper](https://www.microsoft.com/en-us/research/academic-program/write-great-research-paper/)
* [B. Freeman: How to write a good CVPR submission](https://www.cs.torontomu.ca/~wangcs/resources/How-to-write-a-good-CVPR-submission.pdf)

## Reviewing papers
* [IEEE VIS reviewer instructions](https://ieeevis.org/year/2022/info/call-participation/review-instructions)
* [ACM SIGGRAPH Asia reviewer instructions](https://sa2021.siggraph.org/en/submissions/technical-papers/reviewer-instructions.html)
* [J. Stasko: Tips for being a good Visualization reviewer](https://jts3blog.wordpress.com/2016/12/23/tips-for-being-a-good-visualization-paper-reviewer/)
* [M. Chen and D. Ebert: How to Reject a VIS Paper, or Not?](https://doi.org/10.1109/MCG.2025.3594817) (IEEE CG&A, 2025): why the review criteria should fit each subarea of visualization, and the wrong reasons for rejecting a paper. Useful on both sides of the review.

## Presenting a paper at a conference
* [M. McGuire: Presentation advice](http://dept.cs.williams.edu/~morgan/presentation-advice.pdf)
* [K. Fatahalian: Tips for giving clear talks](https://graphics.stanford.edu/~kayvonf/misc/cleartalktips.pdf)
* [D. Fleet and A. Hertzmann: How to give a good talk](http://www.dgp.toronto.edu/~hertzman/courses/gradSkills/2010/GivingGoodTalks.pdf)
* [J.-L. Doumont: Creating effective slides](https://www.youtube.com/watch?v=meBXuTIPJQk): a one-hour lecture at Stanford, the best thing I know on slide design. His book [Trees, maps, and theorems](https://www.principiae.be/book/) applies the same clarity to writing and talks.

## Taking care of yourself
A PhD is a marathon with a few sprints, and most of the problems people have with it are not technical. Some readings that help to put it in perspective:
* [Z. Ayres: Managing your Mental Health during your PhD](https://link.springer.com/book/10.1007/978-3-031-14194-2), an open-access book.
* [M. Might: The illustrated guide to a Ph.D.](https://matt.might.net/articles/phd-school-in-pictures/), ten pictures that explain what a thesis is.
* [M. Dredze and H. Wallach: How to be a successful PhD student](https://www.cs.jhu.edu/~mdredze/publications/HowtoBeaSuccessfulPhDStudent.pdf), practical advice on advisors, time and expectations.
* Talk to the other students of your lab, and to your advisor, before a problem becomes a crisis. Everyone has been through the second-year slump.

## Measuring research impact
We like to measure the impact of our research, not only because we humans are competitive, but also to better understand the value of our work and plan future efforts.

### Journal impact
The impact factor of a journal tries to measure its importance in its field by counting how often its recent articles are cited. There are three families of indicators, and your university library gives you access to the paid ones:
* __Journal Citation Reports (JCR)__, by Clarivate, built on the Web of Science. Its *Journal Impact Factor* for a given year is the number of citations received that year by the articles the journal published in the two previous years, divided by the number of those articles. Journals are ranked within each subject category and split into quartiles, from **Q1** (top 25%) to **Q4**. "JCR Q1" is the figure Spanish and Italian evaluation agencies ask for. Subscription only.
* __Scopus__, by Elsevier, with its own indicators: *CiteScore* (same idea, four-year window) and the free [SCImago Journal Rank (SJR)](https://www.scimagojr.com), which weights citations by the prestige of the citing journal and also publishes quartiles. SJR quartiles are close to the JCR ones but not identical, so say which one you quote.
* [__Eigenfactor__](https://en.wikipedia.org/wiki/Eigenfactor): listed in the JCR, five-year window, weights citations by the influence of the citing journal and ignores self-citations. Its *Article Influence Score* is a per-article version comparable across fields.

For orientation: TOG and TVCG are consistently Q1 in computer graphics, CGF is Q1 or Q2 depending on the year, and the rest of our journals usually sit in Q2 or Q3. Check the current year before writing a quartile on a CV.

### Conference impact
Conferences have no impact factor, so other proxies are used, and the one that counts depends on who is evaluating you:
* __Journal publication of the proceedings__: the simplest signal in our field. A SIGGRAPH, Eurographics, EuroVis or IEEE VIS paper is a TOG, CGF or TVCG article, so it is evaluated as a journal paper.
* [__CORE ranking__](https://portal.core.edu.au/conf-ranks/): A*, A, B and C grades for computer science conferences, maintained in Australia and used worldwide.
* [__Google Scholar Metrics__](https://scholar.google.com/citations?view_op=top_venues&hl=en&vq=eng_computergraphics): h5-index and h5-median per venue, free and updated every year. The *Computer Graphics* subcategory lists the twenty most cited venues of the field, journals and conferences together.
* __Acceptance rate__, usually printed in the front matter of the proceedings: roughly 20 to 30% at the top venues.
* [__GII-GRIN-SCIE (GGS) rating__](https://scie.lcc.uma.es/gii-grin-scie-rating/ratingSearch.jsf), the Italian-Spanish conference classification (A++, A+, A, A-, B...) used by their evaluation agencies; since December 2025 it is converging with CORE.

### Researcher impact
Measuring the impact of your research is not an easy task, and many factors should be taken into account, such as the research field, the current career stage, etc. But there are probably three main measures:
* __Number of citations__: Sum of the citations of all your publications
* __h-index__: the number h of publications with at least h citations each
* __i10-index__: number of publications with at least 10 citations

Two warnings. The numbers depend on the source: Google Scholar counts everything it crawls (theses, slides, preprints), while Scopus and the Web of Science only count curated publications, so the same researcher can have a third fewer citations there. And an h-index only means something next to people of the same field and career stage.

### Tips for tracking your impact
* [ORCID](https://orcid.org): a free, persistent researcher identifier that tells you apart from everyone with your name. Publishers and funders ask for it. Enable the automatic updates from Crossref so that every new DOI lands in your record, and put the ORCID on your CV and website.
* [Google Scholar](https://scholar.google.com/citations): create a public profile, let it add new papers automatically but review them, merge the duplicates (the preprint and the journal version of the same paper), and set alerts for new citations of your work.
* [dblp](https://dblp.org): the authoritative bibliography of computer science. Check that your papers sit under a single author entry and ask for a correction if they are split or merged with a namesake.
* [Semantic Scholar](https://www.semanticscholar.org): claim your author page. Its open API is a handy source of citation counts; it is what this website uses.
* [Scopus](https://www.scopus.com/freelookup/form/author.uri) and the [Web of Science](https://www.webofscience.com/wos/author/search): the curated databases the agencies use. Merge duplicate author profiles and link them to your ORCID.
* Keep your own BibTeX file of your publications, with DOIs. Every CV, website and grant application starts from it.

References:
* [Cornell Library: Measuring your research impact](https://guides.library.cornell.edu/c.php?g=32272&p=203394)

<p class="small text-white-50 mt-5">With thanks to <a href="https://www.cs.upc.edu/~ppau/" class="text-white-50">Pere-Pau Vázquez</a> for his suggestions to this guide.</p>
