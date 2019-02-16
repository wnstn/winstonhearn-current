---
  title:  "Surprise, You're being Manipulated!"
  permalink: /surprise-youre-being-manipulated/
  date:   2014-07-01 12:30:00
  category: writing
  description: This past week Facebook released (proudly!) a peer-reviewed paper about a study they conducted in 2012. This study has been covered a great deal because it's kind of creepy. What did they study? Whether or not they can manipulate the emotional state of their users!
---

![emotions.gif](https://bukk.it/emotions.gif)

This past week Facebook released (proudly!) a peer-reviewed paper about a study they conducted in 2012. This study [has been covered a great deal](http://www.theatlantic.com/technology/archive/2014/06/everything-we-know-about-facebooks-secret-mood-manipulation-experiment/373648/) because it's kind of creepy. What did they study? Whether or not they can manipulate the emotional state of their users!

Basically, they enrolled almost 700,000 users into a study (without telling them) in which they controlled the updates shown to them based on the emotional content of the updates - showing some users mostly happier updates while showing others mostly sadder updates and then tracking each user's updates for the next week to see whether the emotional content of their own updates correlated to the emotional state of the updates they had been shown.

Guess what? It did! Facebook successfully proved that empathy is a thing and we respond to the emotions of those around us. Or maybe they just proved that they could manipulate their users en masse, without consequence and without the users consenting to such manipulation.

There is a great deal of anger directed at the company right now because this study is blatantly creepy, and I guess we don't like it when Facebook is blatantly creepy, we'd prefer them to keep their creepiness on the down low, thank you very much.

So yes, you can look pretty much anywhere else for analysis and explanation of the face value creepiness of this study - the questions about consent and ethics and such. I won't retread those points.

What appalls me about this story is much more fundamental and seems to be prevalent throughout software development, beyond just Facebook.

A few weeks ago, one of the founders of a company I work for part time brought up that our team might not be as efficient as it could be. He raised his question while offering a potential solution: maybe we could start tracking some daily metrics that everyone could see, which  could then help motivate us. The idea was simple and data-driven: choose some numbers that reflect our ongoing productivity, and then make sure everyone looks at them each day for motivation.

Facebook has a similar data-driven focus: they want people to use their site as often as possible. In web speak, this is called “user engagement,” and Facebook wants as much of it as they can get because more user engagement means higher-priced ads. (That's why they buy things like Instagram and WhatsApp and Oculus Rift—all things must pass through Facebook.)

So back to the team-efficiency story: what could you measure to gauge efficiency? On a web-development team, managers often look to the number of bugs fixed or features added, or the ratio of commits pushed per hours worked. And maybe they’ll toss in a helpful comparison of the data as it looks now vs. some historical date to show whether things are better or worse. In theory, it’s simple: the data doesn't lie, so if you find some simple but clear data points and track them, you’ll know exactly how things are going.

But the problem with this approach is that data is simple but humans are complex. When it comes to team efficiency, who’s to say that if you were to make two more commits this week than last week, you’d be more productive? Perhaps the commits were just refactoring because you did it really poorly the first time. Perhaps the commits were rolling back to an older version because you had introduced more bugs than features. Perhaps the commits were ridiculously tiny compared to last week’s relatively large ones? Who knows?! Not the commits-per-week metric, that's for sure. All it knows is that more is better and this week was better.

Facebook has been manipulating users timelines for years. Seriously! That's why they were even approved to do this study. [Susan Fiske, the Princeton University psychology professor who edited the study for publication, said that](http://www.theatlantic.com/technology/archive/2014/06/everything-we-know-about-facebooks-secret-mood-manipulation-experiment/373648/):

> [The authors] local institutional review board had approved it—and apparently on the grounds that Facebook apparently manipulates people's News Feeds all the time.”

Was 2012 the first time they had thought about the emotional consequences of this manipulation? And what the hell were they trying to accomplish with their earlier manipulation?

More user engagement! All social companies want this. They want user engagement and they want it now and they tinker with things all the time to get as much as possible. Does this button get more people to click it, or does this one? Does this copy get more people to act, or does this?

In 2012, Facebook engineers wondered whether they could manipulate their users’ emotional states and found—through a study of 689,000-ish users—that they could! But shouldn't they have asked this question, I don't know, the very first time they deviated from a user’s expectation of linear content in the timeline? But surely they weren't trying to affect the emotional state of their users—they were just trying to increase user engagement!

Data can seem cut and dried: you look at the numbers and then act on them. The danger is that it's very hard to choose the right numbers to focus on, and it's incredibly difficult to make far-reaching decisions when trying to improve those numbers.

Choosing the right set of numbers is difficult because the numbers are proxies for whatever we want to learn. If I were to be a part of a team that was trying to launch a product, then one way to think of efficiency would be to try to find the straightest line from idea to launch. It'd be oh so wonderful to be able to ensure that we were being efficient, and we wouldn’t want to be subjective about that, so we’d choose a couple of high-level data points, measure those, and then we could be confident that we understood our efficiency.

But okay, we've chosen some numbers—so how would we act on them? That can be incredibly difficult because numbers always have built-in assumptions. Like, perhaps, how would we know what represents a good or bad data point within our metric? Or more foundationally, how would we even know whether we're measuring the right thing? So we could act, but that's often in the name of short-term gains without an understanding of the full context of our goals.

Going back to the team-efficiency story, if commits per week were our metric of choice, it'd be pretty easy to make that look good! I’d just have to make smaller commits, and more often! Boom—I’ve increased the number. Does that mean I’m more efficient? Who knows! The data says I am, so we’ve made progress, right? My behavior changed (moar commits!), but in reality, someone looking at my data wouldn’t have any confidence that my efficiency had improved.

This can be frustrating in the context of a small team trying to ship a product, but it can be downright dangerous in the context of a company with over a billion active users.

We’re all angry that Facebook intentionally manipulated our emotions for a week in 2012, but the question I have about this fucking creepy behavior is whether it ever occurred to them that their constant attempts to drive up user engagement had real-life consequences?

And because I've seen how much people swear by data as an objective and neutral force for good, it does not seem farfetched to think that this was _the first time anyone at Facebook had thought about doing this_. Engineers like objectivity, and dealing with the human consequences of design choices is subjective and messy and doesn't actually help profits because profits are so often based only on the data. The human context behind the data is seen as meaningless noise.

Data derived by humans is neither neutral nor guaranteed to be objective. Whenever we measure human behavior with quantifiable metrics, we take something subjective and contextual and turn it into math. This is an incredibly messy undertaking, and we’re better off if we can focus on probabilities and correlations instead of narratives that so often make the results sound concrete and predictable.

Is it inherently evil to try to manipulate someone’s emotions without their knowledge? Probably! So we’ll all get outraged and Facebook will do some PR and time will progress and things will go back to the way they were. Yet to me, the real danger remains entrenched because we still don’t know which design decisions are made just to improve someone’s arbitrary metrics, never aware of how we're being manipulated and unable to trust that the people watching the metrics care about the individual humans represented by each point in their massive dataset.
<br/>
<br/>
_Incredible thanks to [Ashley](https://twitter.com/snugglepolish) for copyediting, and [Susan](https://twitter.com/susanjrobertson) and [John](https://twitter.com/northrup) for reading over this in advance._
