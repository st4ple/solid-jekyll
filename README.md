###Boise Hack-A-Thon 
####Building an (even) better Boise.

It do happen only four times a year - developers & designers - both learning anew and the tried and true - will gather upon the trailhead, to do good for this land they call home.

To win prizes, like t-shirts and beer - they compete! Compete to build the best tech for to help a worthy non-profit; an organization that will then use its shiny new website, tool, or application - to better serve its mission.

Bringing together the smart and the worthy - no money is needed, just lots of pizza. Are you a sponsor who will buy these prizes and cheese pies? Or are you a non-profit, that needs a web-site?

It's all in the name of building community - a call to the town wizards; the hackers, code-cowboys, and artists.

Come win yourself a prize, maybe learn a new trick. 48 hours, the clock it do tick.


#####Blog post
Create a Blog post by creating a file called `yyyy-mm-dd-name-of-post-like-this.markdown` in the `/_posts/blog/` directory with the following template:
```markdown
---
layout: post          #important: don't change this
title: "Name of post like this"
date: yyyy-mm-dd hh:mm:ss
author: Name
categories:
- blog                #important: leave this here
- category1
- category2
- ...
img: post01.jpg       #place image (850x450) with this name in /assets/img/blog/
thumb: thumb01.jpg    #place thumbnail (70x70) with this name in /assets/img/blog/thumbs/
---
This text will appear in the excerpt "post preview" on the Blog page that lists all the posts.
<!--more-->
This text will not be shown in the excerpt because it is after the excerpt separator.
```
<!-- #####Project post
Create a Project post to go in your Portfolio by creating a file called `yyyy-mm-dd-name-of-the-project.markdown` in the `/_posts/project/` directory with the following template:
```markdown
---
layout: project       #important: don't change this
title:  "Name of the project"
date: yyyy-mm-dd hh:mm:ss
author: Name
categories:
- project             #important: leave this here
- event               #important: leave this here
img: portfolio_10.jpg #place image (600x450) with this name in /assets/img/project/
thumb: thumb02.jpg
carousel:
- single01.jpg        #place image (1280x600) with this name in /assets/img/project/carousel/
- single02.jpg  
- ...
team:
organization:
website: http://www.internet.com
---
#####Team post
Create a Team post to go in a Portfolio by creating a file called `yyyy-mm-dd-name-of-the-team.markdown` in the `/_posts/team/` directory with the following template:
```markdown
---
layout: team       #important: don't change this
title:  "Name of the team"
date: yyyy-mm-dd hh:mm:ss
author: Name
categories:
img: team_10.jpg #place image (600x450) with this name in /assets/img/team/
thumb: thumb02.jpg
website: http://www.internet.com
---


#####Event post
Create an Event post to go in the Events Portfolio by creating a file called `yyyy-mm-dd-name-of-the-event.markdown` in the `/_posts/event/` directory with the following template:
```markdown
---
layout: event       #important: don't change this
title:  "Name of the project"
date: yyyy-mm-dd hh:mm:ss
author: Name
categories:
- project             #important: leave this here
img: portfolio_10.jpg #place image (600x450) with this name in /assets/img/project/
thumb: thumb02.jpg
carousel:
- single01.jpg        #place image (1280x600) with this name in /assets/img/project/carousel/
- single02.jpg  
- ...
sponsors: Company XY
--- -->

#####Question entry
Create a Question entry (that is listed in the Frequently Asked section on the Home page) in this directory by creating a file called `yyyy-mm-dd-do-i-have-a-question.markdown` in the `/_posts/project/` directory with the following template:
```markdown
---
layout: question
title:  "Do I have a question?"
date: yyyy-mm-dd hh:mm:ss
author: First Last
categories:
- question            #important: leave this here
---
####Can I use this theme for my website?
Sure! This is a [Jekyll](http://jekyllrb.com/) port of the [Solid theme](http://www.blacktie.co/2014/05/solid-multipurpose-theme/) by [blacktie.co](http://www.blacktie.co/).

Solid. A Bootstrap theme for Jekyll.
============
![Screenshot](https://st4ple.github.io/solid-jekyll/assets/img/browser.png)


```
