---
layout: default
title: Blog
permalink: /blog/
---

# Blog
This is (intended to be) a place to talk about projects. Posts are ordered by date.

<!-- no clue how this will show up lololol -->
{% for blogpost in site.posts %}
- [{{ blogpost.title }}]({{ blogpost.url }})  
  <small>{{ blogpost.date | date: "%B %d, %Y" }}</small>
{% endfor %}