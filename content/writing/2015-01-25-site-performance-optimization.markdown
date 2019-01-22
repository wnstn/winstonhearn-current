---
  title:  "Weekend Performance Optimization Notes"
  permalink: /january-perfomance-optimization/
  date:   2015-01-25 12:30:00
  category: writing
  description: I've been fighting a head cold or something this weekend and because of that I've been extremely bored. So I decided to see how much I could improve this website's loading performance. In a few hours of hacking I got it from a Speed Index of 2000+ to consistently between 600 and 800. Pretty good! Here's notes on everything I did.
---

I've been fighting a head cold or something this weekend and because of that I've been extremely bored. There are only so many trivial things I can do (play Kingdom Rush, check social media, watch stupid tv shows) before I'm itching to just do anything that feels productive. So I decided to see how fast I could make this website load. This post is not at all comprehensive, but it's a log of things I've done that made an improvement. The end results were pretty good, average Speed Index on [webpagetest](http://www.webpagetest.org) was 2000+ before these optimizations, now it's hovering between 600 and 800 on average. The [repo for this site](https://github.com/wnstn/winstonhearn.com) is public, so feel free to check out more of the code there!

### Compressing my footer image

What? I know right. Why is this on the list, Winston? Well, because. I hacked out the Footer a few weeks ago and I guess I just didn't take the 3 minutes necessary to make sure the image was optimized. It was a 600x600px jpg that wasn't compressed as much as it could be. Also, it didn't ever really scale beyond about 225px. I was definitely doing the lazy retina fix and doubling the jpg size, but 225*2 is a lot less than 600, so there was room to downscale! So Now the image is 450x450px, compressed, and output as progressive. Google Pagespeed tells me I could still shave 671b off of it (a 2% savings!) so I guess I should do that.

### Improving my Webfont Loading

I use Typekit for serving Webfonts, and I quite like that they default to focusing on performance, but I thought I'd see what I was able to do on my own. I switched the [embed code](http://help.typekit.com/customer/portal/articles/649336) I was using from the Default code to the Advanced, and then hacked around with the [Javascript events](http://help.typekit.com/customer/portal/articles/6787-Font-events) that the library provides. The advanced loader vastly improves loading time because it does not attempt to solve the Flash of Unstyled Type (FOUT) problem, instead it just loads up your type and inserts them when they are loaded. You handle the FOUT on your own.

The FOUT is an interesting problem and I've read a bit about it in the years past. Thankfully, the webfonts I'm using don't size much differently than their fallbacks, so the site doesn't look terrible without webfonts. That said, it's distracting if the page just jumps when fonts are loaded - and it'd be especially noticable on a slow connection. I actually did two things to help improve this.

First, I reduced the character sets I was loading. I'm still not sure what the harm in this is, so I'll definitely be undoing it if further research reveals there's a problem. By default Typekit includes character sets for ~8 languages when you select a font. I have 4 fonts in my default kit (two sans-serif, one serif, one monospace) and of those, I only load in the specific weights I intend to use. But 4 fonts is a lot, so my kit weight was around ~350kb. _Yikes!_ So I limited the character sets for each font to just the English language set - and it knocked just over 100kb off the total size. I'll call that an improvement. Like, I said, this is subject to reversal if I find there is good reason to include other language sets.

I'm also thinking through whether I need all 4 fonts - I load one, [Expressway](https://typekit.com/fonts/expressway) because it's a ripoff of [Interstate](http://www.fontbureau.com/fonts/Interstate/) which I love, but I use it very sparingly throughout the site. The other sans-serif font I load, [Brandon Grotesque](https://typekit.com/fonts/brandon-grotesque), feels nice at heavier weights and I may just try to vary how I use it in lieu of loading Expressway. An experiment for another weekend!

The second optimization with Typekit had to do with the FOUT, and maybe doesn't directly related to data performance, but does relate to perceived performance. Like I said above, the FOUT and then rerendering when the fonts are loaded is not exactly conducive to a lovely reading experience, which is all that I'm trying to foster on this little domain. So I ended up deciding to make the body of my site slightly hidden while fonts loaded. Here's the code, and then I'll talk through it.

{{< highlight css >}}

.fonts-loading {
    position: relative;
}

.fonts-loading:before {
    background-color: $white;
    bottom: 0;
    content: "";
    left: 0;
    opacity: .6;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1000;
}

.text-ready:before {
    opacity: 0;
    @include transition(opacity .15s linear);
}

{{< / highlight >}}

And the associated javascript:

{{< highlight javascript >}}

var config = {
  kitId: 'typekitID',
  scriptTimeout: 3000,
  visorShowing: true,
  backup: function(){
    var t = this;
    return t.timer = setTimeout(function(){
      t.transitionVisor();
    }, 750);
  },
  loading: function() {
    this.backup();
  },
  active: function() {
    this.transitionVisor();
  },
  inactive: function() {
    this.transitionVisor();
  },
  transitionVisor: function() {
    var visor, test, t=this;
    clearTimeout(t.timer);
    if ( !t.visorShowing )
      return false;

    t.visorShowing = false;
    test = document.createElement('div');
    visor = document.querySelector('.fonts-loading');

    if ( test.style['transition'] !== undefined ) {
      visor.addEventListener('transitionend', function(){
        t.showText(visor);
      });
      visor.classList.add('text-ready');
    } else {
      t.showText(visor);
    }

  },
  showText: function(el) {
    el.classList.add('fonts-loaded');
    el.classList.remove('fonts-loading', 'text-ready');
  }
}

{{< / highlight >}}

The CSS creates a pseudo-element to cover the full area of the element with the `.fonts-loading` class. It has an opacity of `.6`, which means the text behind it is still visible but dimmed out. This is where I'm attempting to make the perceived performance a little better: as soon as the browser renders any text it's visible so there's no unecessary delay on visible loading. I tried hiding the text completely until it was loading, but slow connections just make this result in frustrated users. The `.text-ready` class transitions the blocking psuedo-element to 0% opacity in 150ms. I might make that faster still.

The javascript controls all the actual class logic. As I just thought through this paragraph I realized a major flaw in all of this code is that I don't quite plan for progressive enhancement - I've added the `.fonts-loading` class in the template and rely on Javascript to remove it. For anyone who has an issue with the JS, that white blocking element may not be removed. I'll push a fix after I post this to change it so the classes is added and removed via JS, thus making a better assumption with regard to  javascript, I hope.

OK, anyways, the Javascript. The `config` object is actually defined in the Advanced embed code from Typekit, and the [Typekit Docs](http://help.typekit.com/customer/portal/articles/6787-Font-events) revealed that the `Typekit.load` function has support for `loading`, `active`, and `inactive` event handlers that you can override for your own purposes. So I did!

First, there's the `backup` function. It sets a timeout of 750ms to call `transitionVisor` which removes the white blocking element (in the code, I'm referring to this as the _visor_). That function is called inside the `loading` event handler. Once the fonts are loaded, the `active` event is fired, which also calls `transitionVisor`. The `inactive` event is fired if something goes wrong, and what do you know, once again it calls `transitionVisor`.

Ok, so `transitionVisor()`. First, the function bails if the property `visorShowing` is false, because we only need to do this once. If `visorShowing` is true, it gets set to false and then we go about removing it. Yes, I'm assuming nothing will go wrong.

The next lines set two variables: `test` is a virtually created div, and `visor` is the element with the class `fonts-loading`. I use `test` to check if the browser supports transitions. If I were being extremely thorough, I'd check for prefixed versions too, but they are unprefixed in [most current browsers](http://caniuse.com/#feat=css-transitions) and the transition is a very minor UI polish, so I made peace with the consequences of my decision. If the browser supports css transitions, then `test.style['transition']` is defined, and I initiate the transition. If it's not defined, I just immediately remove the visor by calling `showText()`. The transition listening is fairly simple; when a css transition ends the browser fires a `transitionend` event, so I add an event listener to the `visor` element, then add the `.text-ready` class, which, as seen in the sass, triggers a 150ms opacity transition, and then when it ends `showText()` is called.

To save from having to find the element again inside `showText()`, I decided to pass the element as an argument, and inside it we just remove the classes that we don't need (`text-ready` and `fonts-loading`) and add the `fonts-loaded` class. I don't actually have any styling on `fonts-loaded` right now, but it seemed like it could be helpful in the future.

### Enabling client-side caching via my server

I'm a front-end dev pretty much exclusively so I know as much about running servers as I know what it's like to live at the bottom of the ocean. Building this site from scratch has been an exercise in reducing my ignorance (of the server stuff, still no idea about the bottom of the ocean). The process has been slow. And painful.

So [webpagetest.org](http://webpagetest.org) and [Pagespeed](https://developers.google.com/speed/pagespeed/insights/) have both been complaining that my site does not send headers with the assets telling browsers how to cache them. This is definitely a problem - it means that every time my site loads the browser rerequests everything, even static assets that may not change very often at all. Not good!

So I started trying to figure out how to get nginx to send the right headers. And the thing is, no one else has any trouble with this? Just based on the complete lack of results when I was googling around.

<div>
    <blockquote class="twitter-tweet" lang="en"><p>how does nginx work&#10;&#10;like, do i need to bribe it with food&#10;&#10;what kind is its favorite?&#10;&#10;should i start with sushi or like, just an apple</p>&mdash; Winston ¯\_|°—°|_/¯ (@suchwinston) <a href="https://twitter.com/suchwinston/status/559410296423723008">January 25, 2015</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

Anyways, eventually I was able to get it to work. First, I found this handy set of [nginx default configs](https://github.com/h5bp/server-configs-nginx) that includes an expires.conf with reasonable settings. But no matter what I did with nginx, I couldn't get the settings to apply! I kept reloading nginx and crossing my fingers and after awhile my fingers were a veritable Jacob's Ladder and the browser still saw no caching headers.

Finally, in an almost unrelated thread, someone suggested running `nginx -t `. Lo, reloading nginx caused no errors, but `nginx -t` reported that the expires.conf set an access log in a directory that didn't exist on my server and whoa, not good. Once I changed the location of that access log, everything reloaded! I have caching!

I will blame my head cold for how many _hours_ it took me to arrive at this solution.

### Added a favicon

I have a default favicon that I use on my personal sites, but I never added it to the winstonhearn.com repo! And browsers kinda assume you have one, so they just request it. It doesn't seem to be a blocking request, but it happens, and a missing favicon will result in one request stalling until it times out and 404's. I'm not sure this is a big deal for my site as I make very few HTTP requests, but for larger sites, any stalled HTTP request can be a bummer as a browser can only have 5 parallel HTTP requests at one time (per domain).

### DNS Prefetching for Typekit

This was such a minor change that it's almost negligible, but the fun of performance optimization is trying to pay attention to every single detail. I'm not using a CDN (yet) for my content so all assets on my site load off of winstonhearn.com, except for Typekit assets. The path for loading external assets in a browser is Lookup DNS > Request Asset > Wait for Server > Download. If the DNS has been resolved for a domain, that step is removed. What I noticed in examining the load timings for all the assets on this site was that the last request made was Typekit, and it had to go through the full process on every page load. So to help speed this up, I added dns prefetching:

{{< highlight html >}}
<link rel="dns-prefetch" href="http://use.typekit.net">
{{< / highlight >}}

This is just hinting for the browser to say "I plan on using this domain" so the browser can prefetch the DNS. It shaves a few ms at best off the process, but I'll take it.

### Next steps

That's all I've done as of now. I thought I'd stop and record everything while it was fresh.

My next two optimizations for the site are to abstract all typography styles to be Sass mixins and to hack around on deploy scripts. For typography, my friend [Susan](https://www.susanjeanrobertson.com/portfolio/) did this for [FiftyThree](http://www.fiftythree.com/styleguide/typography) and it's just brilliant. I want to copy it.

Regarding deployment, there are a few things I'm trying to figure out how to do on my site directly related to performance. First, I want to reorganize the CSS so all media queries are together. Second, I want to minify the CSS. Third, I'd love to see if I could inline critical CSS. Last, I want to add cache-busting strings to the end of my CSS (and eventually JS, although right now it's all inline). These are all the types of things that should be done when the site is deployed or when Jekyll builds. I'm sure there are solutions out there but I'd like to look around and figure out which one works best for me.
