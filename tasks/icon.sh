cd ./public
inkscape --export-width=512 --export-filename="icon-512.png" icon.svg
convert -thumbnail 192x192 icon-512.png icon-192.png
convert -thumbnail 140x140 -crop 180x180+0+0! -gravity center -flatten -background white icon-512.png apple-touch-icon.png
