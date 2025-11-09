---
title: "Maptisse: A Tilemap Generator"
date: "2023-09-13"
description: "A desktop app for doodling and generating tilemaps for games and TTRPGs using Avalonia and .NET."
tags: ["project", "maptisse", "tools"]
---
[![banner](/assets/images/maptisse-banner.png)](https://github.com/smaran-m/GridShadingApp/)

## Usage
- build with `dotnet build`
- run with `dotnet run`
- click and drag to fill in squares
- select tileset with dropdown menu
- generate!

## Features
- doodle around and generate tilemaps that work great for games and TTRPGs
- generates almost instantaneously, make quick changes on the fly
- save and load grid states as JSON files
- edit tileset at will in any image editor of your choice (resources/tilesets/)

## Motivations
So I played around with an evolution sim in python back in high-school, but never got past the stage of procedurally generated levels. This is before I ever knew about Conway's game of life, I had just seen a couple simulations that were built upon the principles of having food spawn and some kind of population that would eat it.
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">old procgen terrain I made in high school <a href="https://t.co/1tlvdBRXKJ">pic.twitter.com/1tlvdBRXKJ</a></p>&mdash; simple man (@smaran_) <a href="https://twitter.com/smaran_/status/1702054523316191714?ref_src=twsrc%5Etfw">September 13, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Anyways, the maps looked really pretty. I got them to change color based on temp, change shrubbery, water bodies. Didn't use any noise generation methods or anything (again, I was in high school).

I wanted to recreate that, but more as a standalone experience, especially for D&D. I wanted a desktop app that would let me doodle around and generate maps that I could use for my games quickly. Here's the (nowhere near finished) culmination of that.

## Notes
The application uses Avalonia, a modern .NET framework for cross-platform user interfaces. I was planning on putting out releases for Windows, Linux, and macOS, but I wasn't a fan of the binary size (around 40mb standalone, 9mb without dotnet). Until I figure out a way around that, you'll have to build it yourself.

## Future
- export tilemap to image
- define specific spots for random elements
- more complex generation logic (inside squares are filled in, etc.)
- use for ttrpg combat tracking
- in-built tileset editor
