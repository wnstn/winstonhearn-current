---
title: "Reading Blog"
date: 2024-01-21T13:47:42-05:00
draft: true
category: writing
description: Some details on how this site works, as inspiration for anyone looking to make their own reading log.
---

Occasionally the topic comes up in friend groups around "how do you track your reading," usually in the context of GoodReads sucks, what else is there? Many people use and like [Storygraph](https://app.thestorygraph.com) but I'm usually the weirdo who suggests building your own bespoke website to track your reading, because it's fun and enjoyable. I never claim it's easy, obviously.

Anyways I realized maybe it'd be helpful to have a post I can point to that talks about how this site works, in case it's helpful for reference. Maybe it won't be! Maybe it will. Time will tell.

So here's an overview of how I keep track of my reading via a bespoke custom website that I made, in case it invites you to do the same, or helps warn you off the challenge. Whichever.

---

This site is built on [Hugo](https://gohugo.io), a static site generator. Oh gosh, already so much to unpack here. A static site generator (SSG) means that when I deploy the site, it does not require a traditional server to serve, instead Hugo (my chosen tool, there are others) stitches everything I've built together and generates a bunch of static html files (and related CSS/JS/Image assets) that can be easily deployed. Every single page on this site is a standalone HTML file that doesn't require a server to do anything to serve.

There are quite a few SSG's available, I'm honestly way behind on them. I apparently started building this site on my birthday in 2019 (according to the Git Repo's initial commits) and that was during my bourbon phase so memories are often hazy. What I do remember is that I hated React so none of the SSG's using it appealed to me, and I was over Jekyll, which had been around forever and was somewhat kludgy to use. So I chose Hugo!

Turns out, that was a great decision, because Hugo makes it pretty easy to build the site the way I had envisioned. 

Hugo has a very close mapping of content structure to site output, which has made it very easy for me to create the structure I desire: distinct sections for Reading log, article links, recommendations, and posts like this.
