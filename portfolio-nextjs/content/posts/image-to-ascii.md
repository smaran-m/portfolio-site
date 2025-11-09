---
title: "Image-to-ASCII"
date: "2023-01-04"
description: "A Python script to automatically convert images to ASCII art with color support using PIL."
tags: ["project", "image-to-ascii"]
---
[![banner](/assets/images/roses1.jpg)](https://github.com/smaran-m/image-to-ascii)

## Usage
- install PIL: `pip install pillow`
- run the script
- images will be output to `./out`

## Examples
supports different quality outputs:
![low quality R34](https://pbs.twimg.com/media/Fi1pqewUoAAKzW-?format=jpg&name=medium)
![higher quality R34](https://pbs.twimg.com/media/Fi1p3QfUAAAcSL9?format=jpg&name=large)

## Motivations
A few years ago, I found out about [donut.c](https://www.a1k0n.net/2011/07/20/donut-math.html) which was equal parts artistry and wizardry to me. I really liked the look of it, growing up surrounded by ASCII art on obscure forums.

Recently, reminded of this, I wrote a script to automatically convert images to similar kinds of art.

## Notes
I do not output the values as .txt files or output text to the terminal, since that doesn't support colors (which I, personally, wanted). One potential option is outputting it as HTML which can then be embedded, but that's a bit tedious. Maybe some day.

I used pillow to output to an image instead. In a sense this is pseudo-ascii, you have no access to the actual text that's generated.

How it works: chunks of differing n*n pixels (depending on size choice) get their average brightness mapped to a certain ASCII character.

I use this character set, but it's easy enough to change: ```$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,\"^`'.```<br>donut.c only uses `.,-~:;=!*#$@`!

This can potentially generate massive images (when you approach n=1) so default parameters sacrifice details on larger scales to control output size.

## Acknowledgements
Thank you to Andy Sloane and Pushkara Sharma.
