---
layout: default
title: Blog
permalink: /blog/
---

# Blog
<!-- no clue how this will show up lololol -->
{% for blogpost in site.posts %}
- [{{ blogpost.title }}]({{ blogpost.url }})  
  <small>{{ blogpost.date | date: "%B %d, %Y" }}</small>
{% endfor %}