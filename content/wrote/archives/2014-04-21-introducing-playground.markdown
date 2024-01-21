---
  title:  "Introducing Playground"
  permalink: /introducing-playground/
  date:   2014-04-21 12:30:00
  category: writing
  description: Playground is a little Sinatra app I use when I want to trying things out in code, or design in the browser, or just experiment more with development related things. I thought I'd open source it!
---

[![playground screenshot from github](/img/introducing-playground/playground_repo.jpg)](https://github.com/wnstn/playground)

### A safe place for Front End Devs to try new things

Yesterday I released a thing. It's not very revolutionary but it is helpful for me so in the spirit of open sorcery I'm [putting it up on Github.](https://github.com/wnstn/playground) Maybe you'll find it helpful?

Playground is not very complicated: it's a Sinatra app that's got a core set of tools already installed and working so that playing with new frameworks or languages or tools or just seeing if you can get a thing to work is not hindered by any environment obstacle. Just spin up your playground and start coding. Easy peasy!

![easy peasy](https://bukk.it/crosswalk.gif)

The Github hopefully has everything you need to get started, and I think it is simple enough to add or customize to your liking. Version 0.1 of Playground has my favorite tools installed to make playing with new things as fun as possible:

* Blank index view to start writing HTML immediately
* Sass preinstalled with Thoughtbot's Bourbon and Neat already in the manifest and auto-compilation on save
* Guard installed with Live-Reload already setup on the project, so that **when you save a file, all connected browsers auto-reload with the new changes**

Playground is built because I believe that I should have a place where I'm not worried about breaking things. Often times I unconsciously place limitations on myself when I'm not in a "safe" environment. Those limitations keep me from feeling free to try random things just to see what happens. But these detours and experiments are exactly what I need to learn and understand - without them I may never fully grasp the subject at hand.

So I built a Playground; a local environment that I can play with without endangering client work or messing up production work. Hopefully you can try it out, or be inspired to build your own playground, and then we can all  explore the myriad tools and frameworks and languages available to us without risk.

It occurs to me, just before I publish this, that there are places online that offer this: CodePen and jsFiddle and such. Those are great, but I travel a great deal and so two limitations keep me from ever really utilizing them: first, I'm always on a laptop and I have my text editor, terminal and browser arranged in a way I can't accomplish with those sites, second I don't have a permanent home and internet can be questionable to downright awful as I wander around, so a local environment works a lot better.

Thanks for checking this out, and pass it along it if interests you, or fork Playground and tell me what should change, or hopefully spin it up and play around and tell me what you learn! I'm [@suchwinston](http://twitter.com/suchwinston) and you probably shouldn't follow me because I'm annoying on there.
