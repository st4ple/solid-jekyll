---
layout: post
title: "Accurate time spent: A killer feature of Snowplow Analytics"
description: Snowplow Analytics JavaScript tracker contains an option called Activity Tracking which enables a Page Ping that will be sent every n seconds. In this article diagram I've used 5 seconds as the ping interval starting 5 seconds after the page loads.
date: 2017-03-06 16:54:46
author: Simon Rumble
categories:
- blog
- data modeling
img: time-spent-banner.png
tags: Snowplow Analytics, time spent, page pings
---

Web analytics tools commonly have a Time Spent metric. Understanding how long people have spent reading a page is a really valuable thing for some businesses. For publishers, the quality of engagement with content is vital, given they're effectively selling the attention of their readers.

What many people don't realise is that the way this metric is calculated is critically flawed on the most popular web analytics tools, Adobe Analytics and Google Analytics. These tools calculate Time Spent by counting the time between pageview events.

## How is Time Spent calculated?

![Snowplow Analytics time spent metric](/assets/img/blog/time-spent-banner.png)

In this example we see a user who:

* Lands on a page and reads it for 30 seconds
* Moves to another page and reads it for 45 seconds
* Moves to another page and reads it for 90 seconds
* Leaves the site

So the actual Time Spent is 2 minutes 45 seconds. However, Google Analytics and Adobe Analytics will allocate zero seconds to the final pageview, because these tools only work from the difference in timestamps between pageview events and there is no pageview event following the final page. So Google Analytics and Adobe Analytics will record 1 minute 15 seconds for this session.

**The pathological example of this problem is for a single page session:**

![General Analytics time spent metric done poorly](/assets/img/blog/timespent2.png)

In this example, the user enters the site, views the content for 30 seconds and then leaves. Traditional web analytics tools will record zero seconds against this session as there is only the single pageview event.

Many publishers now receive a huge amount of traffic in the form of single-page visits, primarily coming from aggregators and social networks. This means despite the fact your content may be receiving significant attention, your analytics will be showing very low Time Spent and a high bounce rate.

## How Snowplow does this

![How Snowplow Analytics tracks this](/assets/img/blog/timespent3.png)

Snowplow's JavaScript tracker contains an option called [Activity Tracking](https://github.com/snowplow/snowplow/wiki/2-Specific-event-tracking-with-the-Javascript-tracker#pagepings) which enables a Page Ping that will be sent every n seconds. In this diagram I've used 5 seconds as the ping interval starting 5 seconds after the page loads:

{% highlight ruby linenos %}
snowplow('enableActivityTracking',5,5);
snowplow('trackPageView');
{% endhighlight %}

So once the page loads, a ping is sent every five seconds recording that the page is still open. That gives an accuracy of at least five seconds to calculating the actual time a user spent.

Other tools

For tools that use the traditional mechanism of measuring Time Spent, there are some workarounds to get better numbers. Though none are ideal. The biggest problem is that there is no reliable mechanism to ensure a pixel is sent out when a user leaves your site.

So once the page loads, a ping is sent every five seconds recording that the page is still open. That gives an accuracy of at least five seconds to calculating the actual time a user spent.

## Other tools

For tools that use the traditional mechanism of measuring Time Spent, there are some workarounds to get better numbers. Though none are ideal. The biggest problem is that there is no reliable mechanism to ensure a pixel is sent out when a user leaves your site.

<br>

#### CHARTBEAT

Chartbeat uses a [similar approach](https://chartbeat.com/infographics/measure-differently) for data collection, although they [attempt to measure actual engagement](http://support.chartbeat.com/docs/methodology.html) by monitoring user activity in the window as well. It would be interesting to apply this approach to the Snowplow page ping. Shouldn't be too hard to update the tracker to support this.   

<br>

#### GOOGLE ANALYTICS

[Riveted](http://riveted.parsnip.io/) plugin, as described [here](https://medium.com/google-analytics/how-to-track-engaged-time-in-google-analytics-84d9981920da), tracks actual user engagements
Simo Ahava, always worth following, has a [few different approaches](https://www.simoahava.com/analytics/track-content-engagement-via-gtm/) to the problem

<br>

#### ADOBE ANALYTICS

* Adobe's calculation method has [changed a couple of times](https://marketing.adobe.com/resources/help/en_US/sc/user/r_upgr_time_spent_calc.html), so be sure you understand that.
* Some have attempted to trap clicks on exit links and the [unload event](https://developer.mozilla.org/en-US/docs/Web/Events/unload) in the browser and then send a custom link to give the tool another event to extend the session for the last pageview, but these methods aren't reliable across browsers and platforms.
* I have a conceptual approach of how to do this very accurately in Adobe Analytics without costing enormous amounts. [Drop me a note](https://www.snowflake-analytics.com/contact-us) if you'd like to know more.

<br>

## How to analyse?

Page pings create a large number of event rows inside your Snowplow database, consistent with the way Snowplow does things. That opens up a bunch of different ways for you to calculate the Time Spent metric. In the next blog, Mike will go through different approaches for modelling the page ping data to analyse Time Spent.

Until then you can check out [Snowplow's Measuring content page performance](http://snowplowanalytics.com/guides/recipes/catalog-analytics/measuring-and-comparing-content-page-performance.html) article.
