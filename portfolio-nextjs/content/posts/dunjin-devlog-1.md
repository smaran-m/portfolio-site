---
title: "Dunjin Devlog #1"
date: "2025-04-08"
description: "The Making of a Smash Clone"
tags: ["devlog", "dungeoncrawler", "games", "godot"]
---
![banner](/assets/images/dunjin1/dunjin.png)

# I have a lot of nostalgia
for games that I have never played. You know those fake games that they would put on in an episode of a 90s sitcom or something which had generic fantasy tropes, but nothing identifiable enough to get them sued? Or that episode where characters dress up to play D&D (which I found out way too late that no one does irl)? I miss those games. Or, maybe, the idea of those games.

There's this idea of "fantasy" which only exists in the collective consciousness - not particularly western, not particularly medieval, a distillation of tropes and aesthetics that eventually came to characterize JRPGs. There's traces of the lineage of Ultima, AD&D, Rogue, LotR, and hell, even Final Fantasy, but not committing to the specifics of any singular one of them. The floppy cone hat wizard, the fair skinned blonde elves, level 1 slimes. You can see this flavor of fantasy in the isekai genre, or modern MMOs, or in your average D&D5e game.

Unfortunately, for my twisted mind, these formats are much too slow. I dislike turn based games, and these games all feel way to restricted compared to what an ideal fight should look like - wizards bombarding fireballs from high above, knights parrying holy blades that make the ground reverberate with their force, that cool scene where you see someone power up for like a whole episode before blasting a hole in the moon. I want to do that. I want impact frames.

So what game would let me do something like that? Really, the only thing with that sort of real-time decision making and emphasis on movement is a fighting game, more particularly, Smash Bros. That's how we got here, to my medieval fighting game project.

![fighting art](/assets/images/dunjin1/momentum.png)

# Dunjin
is a fighting game that plays into fantasy tropes, with a focus on gameplay. Honestly, all the stuff above was an overexaggeration. I just played D&D for the first time in a while and was like "wow, combat suuuuucks". Then I watched a Smash Ultimate match and was like "dang there are so many swordies this suuuuucks. What if it was all swordies. Wait."

You get the rest. I was also unemployed after graduating so that might have played a part in it. Probably a big part, actually, but I digress. I've put in anout 3 months of work into this thing since, in between school and other work, but what have I been working on?

## Story
You have been thrown into an ancient megastructure, 'Dunjin', for crimes committed against the general public. It towers into the heavens, and digs deep into hell. The history of this structure has been lost to time, it is older than you, older than your people, older than recorded history. Some claim it once served as a stairway to the heavens; some claim it was the magnum opus of an architect who was then left inside to rot; some claim it was a gift from the gods for the suppression of evil. The words to describe its truth have not been spoken in millennia.

One thing is for sure: no one, and no thing, has ever left the Dunjin.

## Characters
Currently, the only character is the Knight, with a couple others in the works. They each represent a generic fantasy trope, and are modelled vaguely after the D&D class system. I actually feel like there's a benefit to genericism, as each character has an implied backstory afforded by the genericism, and the tropes can fill in the gaps. You imprint your own ideas on to the character, and it affords you opportunities to subvert or reinforce a given trope - the only truth of the character is in the story you tell, but you have some leeway regarding the blurry edges of that truth. That said, I think trope subversion is a little too heavily relied upon these days, and I prefer interrogations of the tropes themselves and their implications in real scenarios. Dungeon Meshi does this well.

I'm aiming for somewhere around 6 characters on release, since animating each character is quite a bit of work, but haven't decided on all 6. I might throw in some clones too, since those are easier to pump out with some of the tools I've made.

![knight concept](/assets/images/dunjin1/knight-croquis.jpg)

## Themes
Medieval/JRPG fighting game has actually been done before, like in [Battle Fantasia](https://www.youtube.com/watch?v=hbXkcEZhflA). That's not the extent of my gimmick. My gimmick has far wider implications and is embedded in the very mechanics of the game. My gimmick is a feature.

I'm trying very hard to tie everything into the mechanics, while staying in line with the relevant tropes. More info on this in a future blog post, when I'm done with single player.

# Gameplay
This is a bulk of where my work went. I was able to get a lot of the core smash mechanics in place, with help from the [Apano platform fighter tutorial series](https://www.youtube.com/watch?v=FKMBkZsPCCA&list=PLeJDGeZe3by2tQIJmCZfaSRl95cot070t), and made a lot of changes for my own purposes, like to movement and shields. At the moment, there's just 1 character (Knight), and I modelled him somewhat after Fox/Marth, but I have others in the works. I've actually already gotten a prototype playtested, and I think people had enough fun with it for me to feel comfortable posting this devlog and continuing with the project.

## Systems
### Offensive options
The Knight has a set of 3 types of attacks, normals, specials, aerials - which are all directional. Normals are just tilts and smashes, if you're familiar with the Smash Bros system. The main motivation behind not having separate smashes is that I didn't want to do more animations for unique smash attacks - instead just making them tilts with more damage, endlag, startup. This system isn't in the game yet since it depends on me reworking the input system, which I'll get into later.

Specials are a little more interesting, but still ultimately basic. They're similar ot normal attacks, but they either have more knockback, or add momentum to the player for traversal. I haven't done any more interesting specials yet, but they'll come with other characters. There's 1 projectile attack, the neutral special, which doesn't do any knockback, and acts more like a fox laser.

### Defensive options
The Knight has a shield, which is a little different from smash. It has a fixed size, does not drain on hit, and is not directional, but it does have a parry mechanic. There is a 4-frame window at the start of shield where you can parry an attack, putting the enemy in a 60 frame stun. Parrying also reflects projectiles, like powershielding. Which leads to fun games of dodgeball.

Shields automatically drop after 5 seconds, and you can roll out of shield, with a decent bit of endlag. The shield system as a whole is another major target for improvement, as I want to add shield health and shield breaks. I want there to be a risk/reward system for shielding, and maybe be able to balance it for individual characters - so less shield health for a weaker character or something similar. The details aren't ironed out yet, but I'm planning on taking more inspo from D&D, so something like Armor Classes, where you don't fully nullify attacks but just take a percentage of the original damage based on your AC.

Crouching is in, but it doesn't do anything yet. I want to add crouch cancelling, but I honestly don't know what it entails that well. I'm just going to mess with knockback values in the hitbox class and see what works.

### Grabs/Throws
Grabs and throws are in, but pummels are not. I just didn't animate it, and dont think it's super readable at the sprite scale we're working with. That said, throws just work by putting out a small hitbox that does the relevant knockback as if it was a normal attack, and it scales a lot less with damage. They're solid combo starters, and generally a decent option especially since shields don't drain right now.

### Hitboxes
Hitboxes are a massive area for improvement at the moment, as I currently only have 1 rectangular hurt and collision box for the character, and the hitboxes are all rectangles. Also, hitboxes do not currently take rotation as an argument, which means on any diagonal motion, you get a huge disjoint. While I can instantiate multiple square hitboxes to approximate a given attack, this really is not the ideal solution, and I'm going to try improving this to allow for different collision shapes.

That being said, currently there are Hitboxes, Hurtboxes and Grabboxes. Parries and shielding is assumed when the hurtbox is disabled, and based on character state, but I could afford to make them into their own classes too. Hitbox is a pretty beefy class, since all knockback calculation and hitstun and hitlag are handled in the hitbox class. The formula for this is available in great documentation on the [Smash Wiki](https://www.ssbwiki.com/Knockback), a majority of the setup is just in making sure you have access to the variables it asks for.

One note to add is that since I do not have a rigged model I can attach the hitboxes to, hitboxes are defined on a frame-by-frame basis, active for a given number of frames. This actually ends up being fine because of the animations staying on a given attack frame for a significant amount of time, but it does also mean that in-betweens that would hit in a 3d game do not over here.

That being said, I have a solution for future hit detection: runtime collision polygon bounding boxes. Godot has in-built support for generating collision polygons based on a given sprite2D node, but doing this for an animated sprite is a little frustrating. I also think that checking this every frame could be super resource intensive (especially if networked), so I'm only doing this when a given hitbox is entered, like when a successful attack is registered. Using the rectangular collision boxes as a bounding box, I can then convert the hurt object's sprite into a collision polygon, and check for collision with the relevant hitbox. This does not solve the in-between frame collision issue, and I have looked into frame interpolation as a potential solution, but that leaves a lot to be desired currently.

### Movement
One such example of changes I made compared to base smash is fixed 4-frame landing lag, as I don't really like L-cancelling as a mechanic, and feel like Rivals 2 made the right decision there. I also added the wavedash macro from rivals, but normal wavedashing should be in the game too. I haven't been particularly consistent in hitting them, so I think a bit more testing is in order, but wavelanding has felt pretty close to Melee. Other than that, you've got your:
- shorthop/fullhop/double jump
- dashdancing
- double jumps
- airdodges/rolls
- moonwalking

Most of the basics from Smash are in but some of the movement-related systems aren't in yet, like shield dropping, wall jumps, techs and ledgedashes (among others). In general, ledge states are kinda jank at the moment, and I'm trying to figure out a better system for it. Platforms are also not seamless, as you can't just pass through a platform if you're holding down, and you have to press down to drop through after landing. This is just how Godot's 1-way platforms work, so I think I'll just disable collision masks with platforms while down is pressed.

## Game Loop
You may notice that, so far, this is just local multiplayer. I intend to have single player segments, inspired somewhat by smash singleplayer, and online multiplayer. I really want it to stand on its own as a single player game, like with how people still enjoy surfing in CSGO, and that'll be by creating fundamental gameplay systems that work for people.

For the multiplayer, I don't plan to have it be the same as Smash. I was planning on having multiple win conditions, something which was tested in Rushdown Revolt a little bit with their last hit mechanic, but I'm looking for something different. I like the speed of Melee, but I am not trying to make a Melee clone in the long run, but that's kind of what it's like right now.

I personally think my plans for integrating the two are pretty cool, but I don't want to spoil it too much. Keep an eye out.

# Graphics
## Animation
I initially animated everything with a fixed 100ms frame duration in Aseprite, but this was way too slow for fighting game timings, since that means each frame is equal to roughly 6 frames in engine at 60fps. That said, animating at actual 60fps (17ms between frames) is way too much work and it also looks too fluid for pixel art, so I'm working with a variable fps, with anywhere from 33-100ms frame timings depending on the animation. A lot of animations have more frames on startup than during endlag, so they come out quick, and linger for a while. I've had to delete some frames in order to make attacks come out fast enough, etc. As you can imagine, this is hell to manage in-engine, but it's good, honest work. In total, the Knight character has 242 frames of animation, and I envision this rising to 300 with all the nice-to-haves (like distinct throws and dodges).

## Graphics Pipeline
This is one of the things I'm happiest for the current state of the game, and it's how I'm getting the blended 2d-3d look. A lot of the work has been done already, and I just had to put everything together to get the look I wanted. You could argue that graphics starts with the sprites, but all the sprites are flat colors, and unshaded. This is what the game looks like in its base state.

![base](/assets/images/dunjin1/platforms.png)

The pipeline is as follows:
### Automatic Normal map generation
![normals](/assets/images/dunjin1/normals.png)

Processed in Aseprite and Krita using [this post](https://www.reddit.com/r/godot/comments/1hha384/a_time_poor_mans_normal_map_generation_for_pixel/) as a guideline.

### Lighting In-Engine
![normals](/assets/images/dunjin1/normal-engine.png)
Using Godot's built-in lighting system, going for soft lighting mostly.

### Palette Remapping Shader
![normals](/assets/images/dunjin1/palettes.png)

The effect here's a little more visible with different colored lighting: there are fewer green shades in the palette so it appears a little flatter in green light. I can change the number of colors and palette texture in the shader, it uses a 1xN texture that Lospec exports natively. It's not performant at the moment, but neither is the CRT shader, and I'll figure both out later.

![palettes](/assets/images/dunjin1/palette-lighting.gif)

```
shader_type canvas_item;

uniform sampler2D screen_texture : hint_screen_texture;
uniform sampler2D palette_texture;
uniform int palette_width = 32;
uniform float brightness_influence : hint_range(0.0, 1.0) = 0.8;
uniform float effect_strength : hint_range(0.0, 1.0) = 1.0;

void fragment() {
    vec4 original = texture(screen_texture, SCREEN_UV);

    float brightness = dot(original.rgb, vec3(0.299, 0.587, 0.114));

    vec4 closest_color = vec4(0.0, 0.0, 0.0, original.a);
    float min_distance = 10000.0;


    // inefficient
    for (int i = 0; i < palette_width; i++) {
        vec2 palette_coord = vec2(float(i) / float(palette_width) + 0.5/float(palette_width), 0.5);
        vec4 palette_color = texture(palette_texture, palette_coord);

        float dist = length(original.rgb - palette_color.rgb);

        // inefficient
        if (dist < min_distance) {
            min_distance = dist;
            closest_color = palette_color;
            closest_color.a = original.a;
        }
    }

    closest_color.rgb = mix(closest_color.rgb, closest_color.rgb * brightness, brightness_influence);

    COLOR = mix(original, closest_color, effect_strength);
}
```

### CRT Shader
![normals](/assets/images/dunjin1/crts.png)

I should add that this looks a little different on my own monitor, a little closer to a sub-pixel dither effect. I'm not sure how this looks on other settings, but for my purposes, I quite like it. It'll be off by default.

![normals](/assets/images/dunjin1/crt-irl.jpg)

I got the shader [here](https://godotshaders.com/shader/crt-shader-with-realistic-blurring/).


# Audio
## SFX
The audio system and manager is there, but it's mostly using placeholders right now. I don't want to commit too hard to the bitcrushed audio sound, but I probably will have a slight effect on the bus. Currently, I think damage in particular is grating, but I'm in the process of finding better sounds. Admittedly, audio is one of my weaker points, and I haven't worked on audio systems enough to know about the magic that audio engineering entails.

Each character currently only has voice sfx on specials, grabs, and taunts. I'm undecided on voice acting, and frankly don't think I'll have full VA. I think there's a charm to basic grunts with each dialong bos to indicate tone, or a beep noise on every letter like in classic JRPGs. Animal-crossing style phonetic sounds are also in fashion right now, but they don't feel authentic to what I'm doing.

## Music
I've worked on some songs for the soundtrack, but haven't really been happy with any of them except the main menu theme. It interpolates a sweet trip song. Here's the inspo:
<br>

[![main theme](https://img.youtube.com/vi/FseYuqzoLSQ/0.jpg)](https://www.youtube.com/watch?v=FseYuqzoLSQ)

For battle music, I really wanted to stay away from the orchestral swells of something like Elden Ring, or like Witcher 3 combat themes which often served as background loops for D&D games. I feel like they fit the theme the most, but aren't that memorable? They also just don't fit the vibes of a fighting game, in my opinion, the tempo isn't there. So, inspiration had to come from elsewhere, and it took me a long time before I realized that the perfect fit: japanese flamenco.

You've probably heard these songs before: [Gerudo Valley](https://www.youtube.com/watch?v=0hEYvdMoF2g) and [Dragon Roost Island](https://www.youtube.com/watch?v=SXGGvsHq6iA) from the Legend of Zelda series, maybe [Vamo'alla Flamenco](https://www.youtube.com/watch?v=RAxmjZVb_HQ) from Final Fantasy 9? In fact, this is a very JRPG-specific trend - I think it's from Japan's fascination with the Spanish Guitar. If you dig a little deeper you find similar stuff in [Romancing SaGa (1994)](https://www.youtube.com/watch?v=sNvWC_lTP38) and more recently, [Tales of Zestiria (2015)](https://www.youtube.com/watch?v=_nsDUPGU5Nw). [My favorite JRPG song of all time](https://www.youtube.com/watch?v=1CyRX3x6aDY) also falls victim to the Spanish Guitar. I thought it would be super novel and interesting to use these as the basis for a fighting game, yet, it seems (as in many cases) that I was beaten to the punch by Touhou.

Touhou Hisouten is the 10.5th (?) installment in the Touhou Franchise, and the 2nd fighting game in the Touhou Franchise (??) after Touhou Suimusou. These games, however, were not developed by ZUN, but rather by Twilight Frontier. Similarly, the soundtracks only had 1 or 2 songs each by ZUN, with a majority done by NKZ and U2 Akiyama, the latter of whom doesn't know how to make anything other than bangers. No, seriously:
<br>

[![Azakeri no Yuugi](https://img.youtube.com/vi/5uW76nWl7uQ/0.jpg)](https://www.youtube.com/watch?v=5uW76nWl7uQ)

Anyways, I'm just gonna try copy him. The music I've made will be up when it's ready, but I'm open to letting others handle soundtrack since I am by no means good at it.

## Tools
A lot of the work I've been doing has been in making tools that allow for the creation of skins, characters, and swaps easier.

### Animation setup in Aseprite
So, having no previous experience, I wasn't sure how to set things up initally. This is what ended up working for me:
![aseprite structure](/assets/images/dunjin1/aseprite-org.png)

- Each relevant body part on its own layer, sometimes multiple layers when a body part moves above and below. This will make later additions a LOT easier.
- For a 64x64px character, a 128x128px canvas to allow for stretching and lunging etc. The biggest example is in a stomp animation, where the sword is pointing upwards, and the legs are fully extended.
- All animations tagged as part of the same file, with sub-sections tagged
- Optional: Lospec palette importer because I like playing with palettes in the editor first. I animated everything with the default DawnBringer 32 palette.
- AsepriteWizard to export directly from Aseprite to Godot. This ended up being unnecessary later on as I started using CanvasTextures, which aren't yet supported by the plugin, but that's supposedly a planned feature.

I did none of these things at first, and ended up spending a month or so just cleaning up animations.
### Batch Editing Script

![batch editing](/assets/images/dunjin1/batchedit.gif)

Since we have body parts on their own layer, this means we can search for similarities in a given body part on it's own layer. In this example I did in 5-10 minutes, for a 242 frame animation, only 33 frames were edited. I'm still working on it, but it'll be up when it's done.


# Clairvoyance
What does the future hold?
## WIP
### Inputs
The godot input system leaves a lot to be desired.
- Buffer
- Stick sensitivity (soft presses)
- Controller inconsistency
- Input remapping
- Macros

I'm going to manually rework it, which I was probably going to need to do anyways for online.

## Planned roadmap
- 1 more character
- Gameplay changes (make it not just Smash Bros)
- Rollback Networking using GodotSteam and Delta
- Singleplayer

![banner](/assets/images/dunjin1/wizard-downb-bg.gif)
