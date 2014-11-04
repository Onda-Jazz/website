<script type="text/javascript">
  var shows = {% include shows.json %} || [];
</script>
<ul class="post-list shows" id='shows'>
{% for post in site.shows %}
  <li><article><a href="{{ site.url }}{{ post.url }}">{% if post.title %}{{ post.title }}{% else %}{{ post.venue }}{% endif %} <span class='show-date'>{{ post.when }}{% if post.time %} | {{ post.time}}{% endif %}</span></a></article></li>
{% endfor %}
</ul>
