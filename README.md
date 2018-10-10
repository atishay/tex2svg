tex2svg
---------


Latex to SVG converter using MathJax. Provides URL based SVG conversion so that it can be cached on the server. Used as a part for my [Hugo](gohugo.io/) based website using the following shortcode.

```Go
<!-- tex -->
{{ $inline := "" }}
{{- if eq (.Get 0) "inline" -}}
{{ $inline = "&inline=true" }}
{{- end -}}
{{- $json := getJSON $.Site.Params.Tex "?q" (querify "" .Inner) $inline -}}
{{- with $json.svg -}}
{{. | safeHTML}}
{{- end -}}
```
