---
title: "Standing on the shoulders of tokens: research in the AI era"
date: 2026-11-10
summary: "AI conferences receive three, seven, even twenty-five times more papers than a few years ago, every paper looks perfect, and there are not enough experts to review them. Some numbers, a small model that says acceptance is today quite a lottery, and where I think this is going."
tags: [academia, research]
ai:
  model: Claude Opus 5.5
  used_for: [references, rephrasing, statistics script]
---

<div class="post-tldr" markdown="1">

**TL;DR**

- AI conferences: up to 27× more papers than in 2019, same ~25 % accepted, not enough experts to review.
- Acceptance is largely a lottery: a top-10 % paper is rejected 1 of 3 times, a mediocre (median) one is accepted 1 of 6.
- The way we measure research today (mostly counting papers) pushes labs to submit many mediocre papers rather than a few really good ones that clearly advance the state of the art. The new *publish or perish* is *churn out with AI or perish*.
- Soon machines will write, review and maybe do the research, and we humans will be the bottleneck.

</div>

Newton wrote that if he saw further, it was by standing on the shoulders of giants. I have the feeling that today we stand more and more on the shoulders of tokens. Papers drafted with an LLM, code written by an agent, related work summarized by a chatbot... and at the end of the chain, reviews written by the same chatbots. Writing a paper was never so cheap. Reading one with care costs the same as always, a few hours of somebody who knows the topic. And reviewing one takes more and more, because now everything looks shiny, at least on the surface: well written, nice figures, not a single typo.

There is a feeling, very common these days, that getting a paper into a big conference is just a lottery. I wanted to check if there is something behind it, so I went to look at the numbers. The short answer is yes, for a big part of the papers it is quite a lottery.

## The numbers

I take the four big AI conferences as an example, because their growth in the last years is almost exponential. A disclaimer before going on, and I want to make it clear: I have nothing against these conferences. The people organizing them are doing a huge job to keep all this working, and in fact this post is possible only thanks to them. They publish their numbers, the chairs write retrospectives explaining what went well and what not, NeurIPS even ran experiments on its own review process, and the reviews are public on OpenReview, so anybody can analyze them. Most fields don't publish anything like this, and it is for the good of everybody. I talk about them only because they are at the head of the trend. They are the AI community, so they are the ones with the skills today to use AI at full speed, for writing papers and for reviewing them. But soon it will be like this in any conference, of any field.

<div class="post-side" markdown="1">

![Paper submissions per year to NeurIPS, CVPR, ICLR and ICML, 2018 to 2027](/assets/img/posts/2026-11-01-standing-on-the-shoulders-of-tokens/submissions.svg)

| Venue | 2019 | Latest | Growth | Accept. rate |
|---|--:|--:|--:|--:|
| CVPR | 5,165 | 16,092 (2026) | ×3.1 | 25.4 % |
| NeurIPS | 6,743 | 30,709 (2026) | ×4.6 | 25.7 %[^neurips-2026] |
| ICML | 3,424 | 23,918 (2026) | ×7.0 | 26.6 % |
| ICLR | 1,591 | 42,790 (2027) | ×26.9 | ~27 %[^iclr-rate] |

</div>

[^neurips-2026]: Not official yet. The chairs have not published their usual retrospective, so the numbers (30,709 valid submissions to the main track, 7,900 accepted) come from [RIKEN AIP](https://aip.riken.jp/news/neurips2026/) and the trackers ([openaccept.org](https://openaccept.org/c/ai/neurips/2026/)).

[^iclr-rate]: Estimated. The decisions of ICLR 2027 come on December 9, so for now I use the rate of 2026 (27.4 %). It has been around 30 % for years, so it should not move much.

ICLR more than doubled in one single year: 19,525 papers in 2026 and 42,790 for 2027 ([counted from OpenReview](https://shiqiangw.github.io/iclr-2027-scores/)), 27 times more than in 2019. And it had already grown around 70 % the year before, from close to 11,500 ([RIKEN AIP](https://aip.riken.jp/?p=19167)) to 19,525 ([their retrospective](https://blog.iclr.cc/2026/03/31/a-retrospective-on-the-iclr-2026-review-process/)). ICML also doubled, from 12,107 to 23,918 in 2026 ([WASP](https://wasp-sweden.org/strong-wasp-presence-at-icml-2026/)), CVPR grew 24 % ([CVPR](https://cvpr.thecvf.com/Conferences/2026/News/Technical_Program)) and NeurIPS 38 % in 2025 ([the chairs](https://blog.neurips.cc/2025/09/30/reflections-on-the-2025-review-process-from-the-program-committee-chairs/)) and another 42 % in 2026, up to 30,709. To be fair, not all this growth comes from AI. Submissions were already growing fast from 2018 to 2022, before the LLMs, simply because a lot more people entered the field. But the last jump, with ICML and ICLR doubling in one single year, comes just when writing a paper with AI became normal.

Meanwhile the acceptance rate did not move, it has been between 20 and 30 % for at least ten years (a bit more at ICLR). So the conferences did not raise the bar, they simply take more or less one quarter of whatever arrives. The question is how good the review is at choosing that quarter.

<!-- TODO: NeurIPS 2026 numbers come from RIKEN AIP and openaccept.org. Check them if the chairs publish an official post. -->

## Reviewing is now really hard

Somebody has to read 20,000 papers, or 40,000, three to five times each. The first round of ICLR 2027 alone has 125,048 reviews. At ICLR 2026, 18,054 reviewers wrote 76,139 reviews, and at NeurIPS 2025 there were 20,518 reviewers for 21,575 papers. Almost one reviewer per paper, and not by chance: there are not enough senior people, so now the authors must review. CVPR [made it mandatory in 2025](https://cvpr.thecvf.com/Conferences/2025/CVPRChanges), and even [desk-rejected 19 papers that would have been accepted otherwise](https://iplab.dmi.unict.it/news/cvpr-2025/) because their authors had been "highly irresponsible" reviewers. So the people reviewing are the same people submitting, and in a field growing like this most of them are young, PhD students reviewing papers on topics that did not exist when they started.

And here comes the part that worries me most. Today it is extremely difficult to review a paper, because all of them look incredibly good. The writing is polished, the figures are beautiful, the tables are full of bold numbers, the related work cites everything. Either you are a real expert on that exact topic, or it is very easy to trick you. A weak baseline, an ablation that does not really prove anything, a claim that does not follow from the experiments... everything looks fine when you have two hours and five papers to finish. So the number of reviews needed grows exponentially, and the number of reviewers with enough expertise to do them does not.

Then, of course, people also use AI to review. Pangram Labs estimated that [around 21 % of the ICLR 2026 reviews were completely generated by AI](https://www.plagiarismtoday.com/2025/12/04/ai-conference-overrun-with-ai-peer-review/), and more than half had some AI in them (detectors fail, but the order of magnitude is what it is). AAAI 2026 even made it official, and every paper got [one AI review](https://arxiv.org/abs/2604.13940) next to the human ones. And I have to say something a bit uncomfortable here. These AI reviews are still not that good at judging what really matters in a paper, but they catch a lot of factual mistakes that a human with limited time would miss: an equation that is wrong, a number in the text that does not match the table, a reference that does not exist. And they improve every few months. There is even [a page](https://hrrs.ai/iclr-2027/) that ranks all the ICLR 2027 submissions with a model that only reads the paper, and its ranking agrees with the reviewers almost as much as one reviewer agrees with the others (a correlation of 0.17 against 0.21, I computed it with their data). Nobody explains how that model was made, so take it with some salt. But I would not be surprised if very soon they review better than the experts.

Although this has another side. An AI review could even reduce the noise, because a model is more consistent than a tired human. But if a big part of the reviewers use the same few models, they also make the same mistakes, all at the same time, and a paper that knows how to please those models wins everywhere. Less noise, but more bias, and a bias that can be gamed.

## How much is luck

Funny enough, NeurIPS measured this, twice. In [2014](https://arxiv.org/abs/2109.09774) and again in [2021](https://arxiv.org/abs/2306.03262), around 10 % of the papers were reviewed by two independent committees. Of the papers accepted by one committee, around half were rejected by the other one: 49.5 % in 2014, 50.6 % in 2021 ([the chairs](https://blog.neurips.cc/2021/12/08/the-neurips-2021-consistency-experiment/)). Deciding with dice it would be around 75 %, and with a perfect committee 0 %. So the review is better than the dice, but closer to the dice than to perfect. And that was 2021, with 9,122 submissions, no LLM reviews, and reviewing by the authors was only a request. As far as I know, nobody repeated the experiment after that.

With a very simple model we can turn this into the question that matters when you submit: given how good my paper is, what are my chances? Every paper has a "merit", the score that an infinite committee of careful reviewers would give it. A real committee sees merit plus some noise (which reviewers you got, if they were tired, if they know the topic, if a model wrote the review) and accepts the top 25 % of what it sees. The amount of noise is the only thing to choose, and the 2021 experiment fixes it. The script is [at the end](#appendix-the-script), if you want to play with it.

This is what comes out:

| Where the paper really is (percentile of merit) | Chance of acceptance |
|---|--:|
| 30th, clearly weak | 7 % |
| 50th, the median | 17 % |
| 75th, just at the line | 40 % |
| 90th, clearly in the top quarter | 65 % |
| 99th | 93 % |

So a paper in the top 10 % is rejected one of every three times, and a median paper, which should be rejected, gets in one of every six. Almost 4 of every 10 accepted papers (38 %) are not in the real top 25 %. And 42 % of the submissions sit in a coin-flip zone, between 20 % and 80 % of chances, which at the size of NeurIPS 2026 means around 13,000 papers. All together, merit explains less than one third of the decision (28 %). The rest is the committee you got.

And this is the optimistic version, with the noise of 2021. If today the noise were double, which I don't find crazy at all, a top-10 % paper would be almost a coin flip (54 %), and merit would explain only one fifth of the decision.

And the first data of this year point in that direction. ICLR 2027 sent its first reviews a few days ago, and somebody [collected all the scores](https://shiqiangw.github.io/iclr-2027-scores/): 125,048 reviews for 40,458 papers, almost all of them with three reviewers. With several reviewers looking at the same paper you can measure the noise directly. Two reviewers of the same paper agree very little, their scores have a correlation of only 0.16. And in 15 % of the papers one reviewer gives the minimum score (1 of 4) while another one gives a 3 or a 4. Put into the same model, the mean of three reviewers gives almost exactly the double noise: a top-10 % paper gets in 54 % of the times, a top-1 % paper 81 %, and 59 % of the accepted papers would be rejected by another committee. To be fair, these are the scores before the rebuttal, the discussion and the area chair, which should clean a bit of the noise, and the scale is only 1 to 4, which makes the agreement look a bit worse than it is. So it is not the same measure as the NeurIPS experiment, and it does not prove that the noise doubled. But the order of magnitude is clearly not better.

## Two good papers or ten so-so ones?

If you lead a group and you know these numbers, what do you do? A rejection says very little about the paper, so you send it again to the next deadline. And now that AI helps you to write, you send more papers, even if the work is still in an early stage.

I made a small experiment with the same model. Two labs of the same size. Lab A works on one big idea per year, and produces one very good paper (top 5 % of the submissions) and one good paper (top 20 %). Lab B uses AI a lot and sends ten papers per year, all of them early-stage work, below the median (40th percentile). Both resubmit what gets rejected, up to three deadlines per year, more or less what CVPR, ICCV/ECCV and NeurIPS give you.

| | **Lab A**<br><small>1 very good + 1 good paper per year</small> | **Lab B**<br><small>10 below-median papers per year</small> |
|---|--:|--:|
| Accepted papers per year | 1.8 | 3.0 |
| Accepted papers after 5 years | 9 | 15 |
| Same, if the noise is double | 9 | 20 |
| Reviews it costs per year (~4 per submission) | ~12 | ~107 |

After five years, lab B has a longer list of top-venue papers than lab A in 94 % of the simulations (99.9 % if the noise is double). If its ten papers are just median instead of below it, it ends with 21 papers against 9. And it costs nine times more reviews, from the same few experts.

The model is simple, of course. It treats every resubmission as a new throw of the dice, and in reality a weak paper tends to get the same criticisms again, which would hurt lab B. On the other side, rejected papers get improved before sending them again, which helps both labs. So I would not trust the exact 94 %, but I think the direction of the result holds.

So the incentives are very clear, and the circle closes: more papers, more reviews, the same few experts, more noise, a rejection means less, more papers. Nobody needs to cheat for this, everybody is just doing what makes sense for them.

Conferences are starting to react. ICLR 2027 does not accept more than 20 papers per author, authors with three or more papers must review at least six, and every paper needs a statement on how AI was used ([author guidelines](https://iclr.cc/Conferences/2027/AuthorGuidelines)). It is something, but 20 papers per person in one conference is still a lot of lab B.

And here is the real problem. For positions, for grants, for promotions, labs and PIs are very often evaluated by counting: number of papers, number of papers in top venues, h-index. With these numbers lab B looks almost twice as productive as lab A, while lab A is the one pushing the state of the art. To be fair, citations correct this a bit. A paper that really moves the field gets hundreds or thousands of citations, and ten weak papers together don't get there, so in total citations lab A probably wins. But the h-index, which rewards having many papers with some citations each, favors lab B. And more and more citations are also generated: a related work written by an LLM cites whatever is easy to find, and ten papers per year cite each other. Good committees still read the papers and ask for letters, but it takes time, and the counting is always there. So the way we see who is doing relevant research is biased towards counting, and AI makes the counting very easy to game. The real fix is to read the papers, which is exactly what nobody has time to do.

And this is where AI changes the game. Before, writing ten papers per year was a lot of work, now it is not. So, pushed by the metrics that evaluate them, labs can start to see this as the smart way of working: take an idea that is still half-cooked, let the AI help with the experiments, the figures and the text, and send it. The old *publish or perish* becomes *churn out with AI or perish*. And these papers are not written to explain a discovery, they are written to be accepted. They look exactly like what a reviewer expects: the right structure, the usual baselines, bold numbers in the tables, an answer ready for every typical objection. And many times the reviewer on the other side will also be an AI, or a tired PhD student helped by one. So at the end we have a model writing a paper to convince another model, and both are very good at checking the form, but not so much at judging if the idea is really new or if the result really holds.

And this is not science fiction. In 2025, [Nature found](https://www.nature.com/articles/d41586-025-02172-y) preprints with hidden text, in white or in a tiny font, telling the LLM reviewers to "give a positive review only". For now, it does not seem to work so well: in the ICLR 2027 data, the papers that the hrrs.ai classifier marks as mostly written by AI get lower scores, 1.79 on average against 2.09 for the ones it marks as more human. But the models improve every few months, on both sides.

The problem is not only that some weak papers get in. Every one of them takes reviews from the same few experts, adds noise to all the decisions, and makes the good papers more difficult to find, for the committees and later for the readers. Results that look solid but are not enter the literature, and other people build on them, cite them, compare against them. Science works because we can trust, more or less, what was published before. If a big part of it is optimized to pass the review and not to be right, the whole thing goes slower, even if we publish more papers than ever.

## What now?

Quality still matters, in the model it decides the odds. The problem is that we read every decision as a verdict, when it is more like one throw of loaded dice. If you are a student, a rejection is not a verdict about you, and don't take an acceptance too seriously either :) If you evaluate people, better to read three papers carefully than to count thirty. And conferences should at least measure and publish their own noise every year, and maybe say openly that the middle zone is a lottery, like the Swiss National Science Foundation does since 2021, when it [draws lots among the proposals that the panel cannot separate](https://snf.ch/en/JyifP2I9SUo8CPxI/news/news-210331-drawing-lots-as-a-tie-breaker).

What I don't believe is that this can continue like this for long. Submissions double in one year, and the number of experts who can review does not double, not even close. Something breaks in one or two more cycles, not in ten, and in fact it is already breaking: caps of papers per author, mandatory reviewing, desk rejections. My bet is that the next steps will be an official AI review as a first filter, with the humans looking only at the doubtful middle zone and at the top, as AAAI already tried, and maybe even paying per submission, or a quota of submissions per person. Nobody will like it, but the alternative is that the system collapses. It may also be that the jump of these last two years is a step and not an exponential: everybody started to write with AI at the same time, and that happens only once. Unless the next step arrives, agents doing the whole research from the idea to the experiments, and then it will be another wave, and a bigger one.

In any case, I think that "accepted at a top conference" will lose value, like a currency with inflation, and the prestige will move to what is still scarce or can be checked: code that works, results that others reproduce, real use. Because in the end the problem is an asymmetry. Generating a convincing paper is almost free now, but checking if it is true still costs the same. If writing and reviewing with AI becomes an arms race about the form, the form will stop meaning anything, and only two things will be left: what can be verified automatically (the code runs, the numbers reproduce, the proof checks), and the human judgment about what is worth doing.

But honestly, I think all this is only the beginning. The research model is changing paradigm at a speed that we cannot even react to. Machines already write a good part of the papers (in computer science, [up to 17.5 % had text modified by an LLM already in early 2024](https://arxiv.org/abs/2404.01268)), soon they will review them better than us, and probably they will do a good part of the research too. And then we humans start to be just the bottleneck. Limited brains where the whole process has to stop by, so somebody can explain to us what was done, as if we were 7 years old. Or maybe, if we do it well, not only the bottleneck but also the ones who still decide which questions are worth asking.

Standing on the shoulders of tokens, then. I still don't know what to think about it, but it is coming, and fast.

<details class="post-appendix" id="appendix-the-script" markdown="1">
<summary>Appendix: the script</summary>

It only needs Python, no libraries. The other numbers in the post come from the same model.

```python
# Merit + noise model of peer review, calibrated on the NeurIPS 2021 consistency experiment.
# Merit Q ~ N(0,1). Committee score C = sqrt(r)*Q + sqrt(1-r)*noise. Accept the top `a`.
# Two independent committees then have corr(C1, C2) = r.
from statistics import NormalDist
from math import sqrt
N = NormalDist()

def both_accept(t, rho, n=4000):  # P(X > t and Y > t), standard bivariate normal
    h = (8 - t) / n
    return h * sum(N.pdf(x) * (1 - N.cdf((t - rho * x) / sqrt(1 - rho**2)))
                   for x in (t + (i + .5) * h for i in range(n)))

def flip(r, a):  # P(committee B rejects | committee A accepts)
    return 1 - both_accept(N.inv_cdf(1 - a), r) / a

def p_accept(pct, r, a):  # P(accept) for a paper at merit percentile pct
    return 1 - N.cdf((N.inv_cdf(1 - a) - sqrt(r) * N.inv_cdf(pct)) / sqrt(1 - r))

a = 0.257                       # NeurIPS 2021 acceptance rate
lo, hi = 0.0, 0.999             # find r such that 50.6% of accepted papers flip
for _ in range(50):
    r = (lo + hi) / 2
    lo, hi = (r, hi) if flip(r, a) > 0.506 else (lo, r)
print(f"r = {r:.3f}, corr(score, merit) = {sqrt(r):.3f}")
for pct in [0.30, 0.50, 0.70, 0.75, 0.90, 0.95, 0.99]:
    print(f"merit percentile {pct:.0%}: P(accept) = {p_accept(pct, r, a):.0%}")

# Two labs, rejected papers resubmitted up to 3 times per year, 25 % acceptance
def accepted_per_year(papers, tries=3):
    return sum(1 - (1 - p_accept(q, r, 0.25)) ** tries for q in papers)
print(f"lab A: {accepted_per_year([0.95, 0.80]):.1f}, lab B: {accepted_per_year([0.40] * 10):.1f}")
```

For ICLR 2027 the noise does not come from an experiment but from the scores themselves. With the [data of that page](https://shiqiangw.github.io/iclr-2027-scores/data/papers.json), the agreement between reviewers of the same paper (the intraclass correlation) gives the r of a committee of three, and the same functions do the rest:

```python
import json
from statistics import mean
R = [row[3] for row in json.load(open("papers.json", encoding="utf-8"))["rows"] if row[3]]   # ratings of each paper
allv = [x for r in R for x in r]; n, k = len(allv), len(R); g = mean(allv)
msb = sum(len(r) * (mean(r) - g) ** 2 for r in R) / (k - 1)               # between papers
msw = sum((x - mean(r)) ** 2 for r in R for x in r) / (n - k)              # between reviewers
n0 = (n - sum(len(r) ** 2 for r in R) / n) / (k - 1)
icc = (msb - msw) / (msb + (n0 - 1) * msw)                                  # one reviewer, ~0.16
r = 3 * icc / (1 + 2 * icc)                                                 # mean of three, ~0.36
print(f"icc = {icc:.3f}, r = {r:.3f}, top 10 %: {p_accept(0.90, r, 0.25):.0%}, flip: {flip(r, 0.25):.0%}")
```

</details>

<!-- TODO: ICLR 2027 acceptance rate after the decisions (December 9). Change the table and maybe the "a" of the second script. -->


