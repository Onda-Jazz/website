---
layout: page
title: Press Kit
headline: ""
description: "Onda Jazz Band plays Brazilian and latin jazz"
date: 2014-09-11T00:00
tags: [Onda, Jazz, Brazil]
sitemap: false
---
<script type="text/javascript">
  var shows = {% include shows.json %} || [];
  var songs = {% include songs.json %} || [];
</script>

<div class='band-photo'>
  <img src="{{ site.url }}/images/onda_ncma_sm.jpg">
</div>

Onda is a four-piece ensemble that creates a distinctive sound playing arrangements of songs which are rarely performed elsewhere.

Formed in April 2014, Onda brings together experienced musicians who share passions for Brazilian jazz and musical exploration.

Members include:

* [Stephen Coffman]({{site.url}}/about/stephen/) (The Beast, Peter Lamb and the Wolves, Shana Tucker, NC Jazz Repertory Orchestra) on vibraphone,
* Nelson Johns (NCCU jazz studies masters student) on guitar,
* Ana Mitchell (Corn and the Colonels) on percussion, and
* [Eric Meyer]({{site.url}}/about/eric/) on upright bass.

Onda has performed at the North Carolina Museum of Art in Raleigh, Milltown in Carrboro, and at the Carrboro Music Festival.

## Music

Here are samples from a few of our standards.

<div id="songPlayer"></div>

## Videos

### *O Astronauta* Composed by Baden Powell

<iframe width="560" height="315" src="http://www.youtube.com/embed/XIfQdJ_7Vn0" frameborder="0"> </iframe>

### *Cucumber* Composed by Nelson Johns

<iframe width="560" height="315" src="http://www.youtube.com/embed/o6ULvCVOx5Y" frameborder="0"> </iframe>

## Schedule

<ul class="post-list shows" id='shows'>
{% for post in site.shows %}
  <li><article><a href="{{ site.url }}{{ post.url }}">{% if post.title %}{{ post.title }}{% else %}{{ post.venue }}{% endif %} <span class='show-date'>{{ post.when }}{% if post.time %} | {{ post.time}}{% endif %}</span></a></article></li>
{% endfor %}
</ul>
