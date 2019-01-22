---
title:  "Documenting Considerations and Constraints"
permalink: /documenting-considerations-and-complexities/
date:   2015-08-14 12:30:00
category: writing
description: An idea for sharing constraints and considerations that can inform module building on the web. Inspired, somewhat, by hospitals.
---

Recently I've spent a bit of time thinking about tooling and community and the way code works in the context of our sites, and I've come across a thought that, well, I wanted to document in the hopes that either it already exists or, if it doesn't and others find it intriguing, I could find the motivation to start realizing it.

When I started out as a developer, especially when working at an agency where the pace of site-building was much more time-constrained than in the Product world, I had an established pattern. A site would be designed and then shifted into the build-out phase, and I and other engineers would pick apart the design and find pre-existing tools, plugins or frameworks that could help us work faster by not writing custom code. We'd ask about expected behavior for a modal or a lightbox or a hover nav, then find a jQuery plugin that gave us all the the necessary tooling, then implement it into the site.

Over time this focus on open-source tools on the front-end led to a lot of bloat. The best tools were the ones that offered the most flexibility and browser-compatibility which meant a lot of extra code was in them that wasn't necessarily being used. So in the past couple years the web developer community has been trying to reexamine this whole process in order to avoid bloat while maintaining the convenience that open-source tools provide.

For me this has often led to eschewing default usage of a plugin or tool that someone else made, instead reading through the source of a few and trying to understand the logic, then considering whether or not I could build a custom tool that accomplishes what I need to do without adding unecessary bloat. Generally speaking, I can, and the bloat is avoided! Yet, despite the sometimes immense gains in performance and functionality and flexibility, there is a significant downside to this strategy.

I am capable of writing code that fulfills the feature requirements, but I may not be factoring in all considerations necessary to ensure that my code is robust enough to handle every use cases.

An example: in the past few weeks I built a JS tool to mimic a CSS feature on mobile devices that don't yet support it. I tested it on a few devices to ensure that it worked on the popular mobile browsers at varying screen widths. I made sure that it defaulted to the CSS feature if present, so that I wasn't trying to outsmart native feature sets. And then right as I passed it off to QA, I realized I'd not built in any functionality for handling device rotation. Dammit.

To be sure, this was a foolish mistake and I am working to fix it, but I should have thought of this constraint up front. I should have had a checklist to say "when building a feature for mobile phones, factor in these constraints." Next time I have a task like this, I'm probably going to write that out in advance, just to make sure I don't forget things over the course of the project.

This checklist concept is the idea that motivated me to write this post. I'd love to see an open-source, community supported Constraint Checklist Repo for common modules, such as image galleries, login forms, and on and on. Sometimes it truly is better to make a custom version of a component rather than relying on a preexisting tools that are generalized across numerous use cases, especially in the context of websites, where code is downloaded over varying speed internet connections across numerous types of devices. These checklists would help a engineer ensure she is considering everything when building out the module. They would include device constraints, browser constraints, accessibility constraints, and whatever else is found to be worth including.

To me, checklists like these have both a code quality aspect (hey, remember to think about X) and also an educational aspect (Oh I didn't even know that Y was something to worry about!). But I am not sure how to design them, how to start this, if anyone else would find it useful. So feedback would be much appreciated! You can [talk to me on twitter](http://twitter.com/suchwinston) (I'm @suchwinston) or [find my email on this page](http://winston.cc).

_P.S.: The idea of common checklists is far from original. I first became aware of the concept from reading Atul Gawande's [article in the New Yorker](http://www.newyorker.com/magazine/2007/12/10/the-checklist) about how using checklists in hospital environments was a life-saving revolution._
