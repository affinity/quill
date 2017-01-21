---
layout: standalone
title: List Example
permalink: /standalone/list/
---
<!-- head -->
<link rel="stylesheet" href="{{site.katex}}/katex.min.css">
<link rel="stylesheet" href="{{site.highlightjs}}/styles/monokai-sublime.min.css">
<link rel="stylesheet" href="{{site.cdn}}{{site.version}}/quill.snow.css">
<style>
  .standalone-container {
    margin: 50px auto;
    width: 720px;
  }
  #snow-container {
    height: 350px;
  }
</style>
<!-- head -->
<div class="standalone-container">
  <div id="snow-container"><ul data-checked="false"><li>One</li><li>Two</li><li>Three</li></ul></div>
</div>
<!-- script -->
<script type="text/javascript" src="{{site.katex}}/katex.min.js"></script>
<script type="text/javascript" src="{{site.highlightjs}}/highlight.min.js"></script>
<script type="text/javascript" src="{{site.cdn}}{{site.version}}/{{site.quill}}"></script>
<script type="text/javascript">
  var quill = new Quill('#snow-container', {
    placeholder: 'Compose an epic...',
    modules: {
      toolbar: [
        [{ "list": "check" }, { "list": "bullet" }, { "list": "ordered" }]
      ]
    },
    theme: 'snow'
  });
</script>
<!-- script -->