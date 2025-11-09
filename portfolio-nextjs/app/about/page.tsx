import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About - Sammish',
  description: 'About Smaran (Sammish) - Artist, musician, and software engineer',
};

const buttons = [
  'sammish-button.gif',
  'dog-swing-button.gif',
  'enhsAMG.png',
  'hasmile.gif',
  'besteyes.gif',
  'neocities7.gif',
  'join_logo.gif',
  'qooclub2.gif',
  'radium.gif',
  'shareware.gif',
  'team_fortress_get_it.gif',
  '8bit.gif',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-gray max-w-none">
          <h1 className="text-4xl font-bold tracking-tight mb-2">About Me</h1>
          <p className="text-sm text-gray-400 mb-8 font-mono">Updated 10-31-2024</p>

          <div className="text-gray-300 space-y-4">
            <p>
              Hello. I am Smaran aka Sammish (online since 2013). This is my portfolio website, feel free to look around.
            </p>

            <p>
              I used to make levels for the game{' '}
              <Link href="https://osu.ppy.sh/u/sammish" className="text-accent hover:underline">
                osu!
              </Link>{' '}
              as a teen. More recently, I founded{' '}
              <Link href="https://wreckcon.org/" className="text-accent hover:underline">
                WreckCon
              </Link>
              .
            </p>

            <p>
              I am reachable via Bluesky{' '}
              <Link href="https://bsky.app/profile/sammi.sh" className="text-accent hover:underline">
                @sammi.sh
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Currently</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Looking for a job</li>
              <li>Getting my masters in CS</li>
              <li>Trying to lose weight</li>
              <li>Making video games for fun</li>
              <li>Writing a blog post/essay on AI art</li>
              <li>Experiencing becoming</li>
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">Likes</h2>
            <p className="text-xs text-gray-400 mb-4">(exhaustive)</p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <strong className="font-mono text-accent">music:</strong> Black Sabbath, Against All Logic, Sweet Trip, Stereolab, Chief Keef
              </li>
              <li>
                <strong className="font-mono text-accent">movies:</strong> Summer Wars, Chungking Express, Blade Runner 2049, Shaolin Soccer, Oldboy, Whiplash
              </li>
              <li>
                <strong className="font-mono text-accent">tv:</strong> Community, Gaki no Tsukai, Whose Line Is It Anyways?, Impractical Jokers
              </li>
              <li>
                <strong className="font-mono text-accent">books:</strong> Notes from Underground, After Dark
              </li>
              <li>
                <strong className="font-mono text-accent">games:</strong> Team Fortress 2, Rain World, Kirby Super Star Ultra, Ridge Racer Type 4, Burnout Revenge, Tribes: Ascend
              </li>
              <li>
                <strong className="font-mono text-accent">art:</strong> Edward Hopper, Ashley Wood, John William Godward, Dean Cornwell, Ilya Repin, textmode, brutalism, strong shapes with shaky lines
              </li>
              <li>
                <strong className="font-mono text-accent">principles:</strong> Commit to the bit, be kind
              </li>
              <li>
                <strong className="font-mono text-accent">life:</strong> Lowercase text, almond croissants, rotary engines, crunchy leaves, 2 for 1 deals, poor liars, procedural generation, green apple shampoo, Qoo, cats
              </li>
            </ul>
          </div>

          <div className="mt-12 border-t border-gray-700 pt-8">
            <h2 className="text-xl font-bold mb-4 font-mono">Buttons</h2>
            <p className="text-xs text-gray-400 mb-4">Vintage web badges from across the internet</p>
            <div className="flex flex-wrap gap-2">
              {buttons.map((button, index) => (
                <div key={index} className="relative">
                  <Image
                    src={`/assets/buttons/${button}`}
                    alt={button}
                    width={88}
                    height={31}
                    className="pixelated"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
