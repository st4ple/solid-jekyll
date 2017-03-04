Snowflake Analytics Corporate website and blog
============
This site is built on Solid. A Bootstrap theme for Jekyll.
![Screenshot](https://github.com/snowflake-analytics/solid-jekyll/blob/master/assets/img/githubhero.png)

This is a [Jekyll](http://jekyllrb.com/) port of the [Solid theme](http://www.blacktie.co/2014/05/solid-multipurpose-theme/) by [blacktie.co](http://www.blacktie.co/). Visit the [live demo](https://st4ple.github.io/solid-jekyll/) for a preview.

##Usage
This theme can be customized, built and published straight from GitHub, thanks to [GitHub Pages](https://pages.github.com/). A local installation of Jekyll isn't even necessary!

## Prerequisites
To run Jekyll, you will need to install the following.

### MAC OSX
Assumes you have already installed `Xcode` and `Homebrew`

OS X already has `Ruby` already installed but it has some quirks that makes installing Jekyll tricky. Instead of using this version, we’ll install our own version of Ruby.

First we’ll install `Homebrew`. `Homebrew` helps you install packages and is a must-have for anyone programming on `OS X`.

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
Now we can install `Ruby`.
```
brew install ruby
```
And now we can install Jekyll.
```
sudo gem install jekyll
```
We can test Jekyll is working by checking the version installed.
```
jekyll -v
```

### LINUX
tba ...

#### Run locally
[Fork this repository](https://github.com/snowflake-analytics/solid-jekyll) to get started.
```
cd Github/solid-jekyll
jekyll serve
```

A basic Jekyll site usually looks something like this:
```
.
├── _config.yml
├── _data
|   └── members.yml
├── _drafts
|   ├── begin-with-the-crazy-ideas.md
|   └── on-simplicity-in-technology.md
├── _includes
|   ├── footer.html
|   └── header.html
├── _layouts
|   ├── default.html
|   └── post.html
├── _posts
|   ├── 2007-10-29-why-every-programmer-should-play-nethack.md
|   └── 2009-04-26-barcamp-boston-4-roundup.md
├── _sass
|   ├── _base.scss
|   └── _layout.scss
├── _site
├── .jekyll-metadata
└── index.html # can also be an 'index.md' with valid YAML Frontmat
```

[See Jekyll docs for more info](https://jekyllrb.com/docs/structure/)

#### Customize  
Most general settings and data like site name, colors, address, etc. can be configured and changed right in the main config file: `/_config.yml`
The content of the Home page can be changed here: `/home.html`
The content of the Technology page can be changed here:`/technology.html`
The content of the ecommerce solutions page can be changed here:`/eccomerce-solutions.html`
The content of the media solutions page can be changed here:`/media-solutions.html`
The content of the About page can be changed here: `/about.html`
The content of the Contact page can be changed here:`/contact.html`

#### Add content  
Delete the demo content and publish your own content.

##### Blog post
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
---
This text will appear in the excerpt "post preview" on the Blog page that lists all the posts.
<!--more-->
This text will not be shown in the excerpt because it is after the excerpt separator.
```
#####Project post
Create a Project post to go in your Portfolio by creating a file called `yyyy-mm-dd-name-of-the-project.markdown` in the `/_posts/project/` directory with the following template:

```markdown
---
layout: project       #important: don't change this
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
client: Company XY
website: http://www.internet.com
---
####Publish
To publish with [GitHub Pages](https://pages.github.com/), simply create a branch called `gh-pages`in your repository. GitHub will build your site automatically and publish it at `http://yourusername.github.io/repositoryname/`.  
If there are problems with loading assets like CSS files and images, make sure that the `baseurl` in the `_config.yml`is set correctly (it should say `/repositoryname`).

If you want to host your website somewhere else than GitHub (or just would like to customize and build your site locally), please check out the [Jekyll documentation](http://jekyllrb.com/).
