---
  title:  "What's best for users"
  permalink: /the-incentives-shaping-the-web-amp-google/
  date: 2018-09-10 9:35:19
  category: writing
  description: "It’s important to critically examine what incentives have been in place in the past few decades that may have led to a web like we have."
  references:
    - title: Google AMP Go To Hell
      url: https://www.polemicdigital.com/google-amp-go-to-hell/
    - title: I, for one
      url: https://ethanmarcotte.com/wrote/i-for-one/
    - title: Inside Google's plan to make the whole web as fast as AMP
      url: https://www.theverge.com/2018/3/8/17095078/google-amp-accelerated-mobile-page-announcement-standard-web-packaging-urls
    - title: AMPstinction
      url: https://adactio.com/journal/13964
---

_Ethan Marcotte and many others have written extensively about AMP, their ongoing discussions inform this post. The notes section at the end has links to some worthwhile posts._

Recently I shared an article in Slack with coworkers that was titled [Google AMP Go To Hell](https://www.polemicdigital.com/google-amp-go-to-hell/), written on a site with the url Polemic Digital dot com. It was, as you can imagine, a plainly-spoken and measured take on some of the complexities of Google’s AMP project. Nonetheless, I shared because it contains a good perspective, specifically this part:

> The underlying message is clear: Google wants full equivalency between AMP and canonical URL. Every element that is present on a website’s regular version should also be present on its AMP version: every navigation item, every social media sharing button, every comment box, every image gallery.
>
> Google wants publishers’ AMP version to look, feel, and behave exactly like the regular version of the website.
>
> What is the easiest, most cost-efficient, least problematic method of doing this? Yes, you guessed it – just build your entire site in AMP. Rather than create two separate versions of your site, why not just build the whole site in AMP and so drastically reduce the cost of keeping your site up and running?

Google is signaling to website owners that if they are going to use AMP, the AMP version of their site needs to have the same functionality as their non-AMP (aka traditional HTML) site has. A coworker pointed out that the Polemic Digital piece, in complaining about Google’s actions, also sells why AMP is theoretically a great idea:

> AMP pages are fast to load (so fast to crawl), easy to understand (thanks to mandatory structured data), and devoid of any unwanted clutter or mess (as that breaks the standard).

It’s hard to argue as a user against having a web where sites are fast loading, easy to understand, and missing unwanted clutter. As a web developer, I work hard to build sites and fight for product decisions that lead to these ends!

I work for a media company on revenue; specifically I work in the world of internet ads. I am well aware of the lay of the land for user experience across the broader web. Popups, overlays, animated distractions, designs that started out clean but due to business concerns increasingly became cluttered, slow servers and overloading a page with scripts that prevent the actual content from loading are common ways that websites quickly become unusable.

I think it’s worthwhile to avoid thinking that this state of the web happened _just because_. Rather, it’s important to critically examine what incentives have been in place in the past few decades that may have led to a web like we have. The web has only become a popular communication medium in my lifetime (I’m 33! I think!) and so all of this history we can look at is relatively recent. I believe there are two large incentives that have helped create the web that we have now: traffic and dollars.

When the web started becoming a popular medium an immediate thing that people who made websites started asking is “how will people find our website?” I have this great content at cool-url dot com but what use is it if no one ever sees it? And thus beget many evolutions of solutions; AOL keywords, high-value single word domains, link-blogging, RSS feeds, and eventually, most importantly: SEO. With search engines users could find you rather than going to them, and SEO was the way to get their attention as they searched for relevant info.

SEO – Search Engine Optimization – is the ongoing game of building your websites and writing your content in such a way that search engines (which are computers) notice it and highlight it. SEO best practices have informed a lot of content design, site structure, and the general shape of the web in the past few decades. The web industry has whole sub-industries dedicated to reverse-engineering search engine algorithms and making sure that sites look good to the computers that crawl the web trying to determine the proper results to show for a given query. And this is a high-stakes game, because search engines are one of the primary ways that users get to websites outside of social media.

Getting your site in front of people (more traffic on the page) is important because of the second incentive at work: dollars. Ads are one of the most popular ways of making money on the internet. The internet ad world is commonly referred to as a Duopoly; the majority of all ad spending on the web goes to Google and Facebook. Facebook primarily traffics in ads on its own platform, but Google both displays ads on its own pages and across the web on sites hosted by other people. This last part - the fact that website owners can display ads on their site served by Google and monetize their site has strongly shaped the design of the web today.

Ad-driven companies (I work for one) are working with wild incentives: to make revenue they have to put ads on their page, and each ad on the page means slightly more money. The sites are also playing the SEO-traffic game because volume helps maximize revenue in another dimension. Google is the company that changed internet monetization by introducing all of their advertising tools (there are so many), and one of the things that Google did is build infrastructure that allows a lot of other companies to enter the ad world (selling different types of ads and different features) and use Google tools to deliver those ads to websites. [I wrote a bit about this on the Vox Product blog](https://product.voxmedia.com/2018/1/22/16902862/why-ads-redirect-to-giftcards-and-what-were-doing-to-secure-them). This access, combined with the incredible amount of tracking that is possible on the web, means that marketers constantly pushed to get more value for their dollars.

Tracking – gathering metrics on visibility and metrics and users – is a critical part of the web advertising world. Advertisers are paying for their ads to be seen and (sometimes) to be interacted with, and they are willing to pay more to ensure that users see their ads. To some degree, user interactions play into this tracking such as when an ad campaign is launched to sell a specific product. Then advertisers pay attention to what ads successfully cause users to click and buy. But for many of the massive corporations that represent the bulk of advertising money online, the goal is to sell a brand. A campaign succeeds when it is consumed, not when it is acted on.

This distinction was confusing to me for a long time until I started working more around the ad world. Now that I understand it, this world makes a lot more sense and helps me understand why websites can be such a pain in the ass today.

If an advertiser’s primary goal is to get their ad in front of people and the cost of the ad rises the more that it can be proved someone saw the ad, website makers have a strong incentive to serve ads that cover content, block content, prevent access to content temporarily, etc. Many ad-funded websites feel like they have to make a some pretty hard calculations: how much can they piss users off in order to make enough money to survive, without scaring users off completely.

I, as a web user, do not at all think many websites have calculated well. But a weird thing about the web is that because a lot of information is discovered via search engines, as long as websites can play the SEO game they will continue getting a large volume of users, and as long as those users stay on the site long enough to get some ad impressions, the site stays afloat. That is to say, even though users are pissed off at the design of the sites, the site still generates traffic because search engines are looking at the content, not the experience. Or, that’s how it’s been until the past couple years.


----------

With a system in place that has such perverse incentives, how can anyone fight for what’s good for users? Can we possibly imagine a web where sites respect users by loading quickly with easy to understand information?

I’m sure these were the questions that motivated someone to create the AMP project: a standard for building websites that were better adapted for the mobile world we have now. The spec could limit websites’ ability to create experiences that were “bad” and prioritize putting the page content in front of the user without interruption. Google had been tracking the way users interact with pages for years (clicking on a search result and then coming back) and began inferring what users wanted (fast loading, easy to understand content). First they began prioritizing sites that emphasized this, but then they launched AMP as a way to define their version of a good website.

Google also realized that they could strongly incentivize websites to adopt AMP by giving it high placement on the search results page: the quest for eyeballs is dominated by Google and if they offer a fancy new way to get promoted, what website-maker would turn that down? So Google began wielding their power: highlighting AMP sites and helping website makers adopt the standard. That’s where we started - with the post about Google’s warnings to website owners that if their AMP version does not match functionality of their non-AMP version, there might be penalties in SEO rankings.

The hard part about a post like this is it seeming like I’m arguing against the results of AMP. I am not. I care deeply about the web being better. I work on revenue at a media company. We do not allow ads that cover content or disable the user interface. We do not allow autoplaying audio ads (we do have autoplaying, muted video, see the above incentives). The team I work on focuses very hard on making sure that ads do not diminish the excellent user experience the broader product team is working to create on the sites we publish. I am on board with the goal.

And truthfully, someone who wanted to “fix” the web such that it is “broken” would definitely come up with solutions like AMP. In many ways, the ideas are simple, even if the implementation can be technically complicated.

What I am worried about is the thread that ties this entire post together: Google. Google dominates the search game - for many websites it’s the largest source of traffic and has been for years. “Best Practices” in web design and content structure have long been strongly influenced by the Google Search Algorithm.

And once you land on a given website, the money that site makes from you is also most likely dependent on Google. Google is probably involved in finding the ads to serve, ensuring they are served, and counting the impressions to make sure the money is charged and paid correctly.

The incentives that Google technology created were very important in the evolution of this current stage of the web. I think we should be skeptical of AMP because once again a single company’s technology – the same single company – is creating the incentives for where we go next.

If a single website maker makes the calculation that they can only afford to build one version of their site, and – because search relevance is critical to getting the audience necessary to reach revenue goals – they choose AMP, perhaps that’s not such a big deal. But if we start doing that en masse, a thing that seems likely is users start thinking of a website as an AMP page. And thinking of the web as AMP pages. AMP will still be controlled by Google, and the company that controls both how we find information on the web and a large portion of the infrastructure for how money is made on the web will then control what the web can or cannot look like, what it can or cannot become. I’m not sure I am yet willing to cede the web to a single monopolized company.

And, I’ll be honest, if letting a single corporation define the shape and parameters of a technology seems harmless, perhaps it would behoove you to Google it?
