import Image from 'next/image';
import Link from 'next/link';
import ThemedPage, { ThemedText, ThemedBorder } from '@/components/ThemedPage';

export const metadata = {
  title: 'About - sammish',
  description: 'About Smaran (sammish) - Artist, musician, and software engineer',
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
    <ThemedPage className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-gray max-w-none">
          <h1 className="text-4xl font-bold tracking-tight mb-2">About Me</h1>
          <ThemedText variant="tertiary">
            <p className="text-sm mb-8 font-mono">Updated 11-8-2025, originally 26-05-2022</p>
          </ThemedText>

          <ThemedText variant="secondary">
            <div className="space-y-4">
            <p>
              hello, i am smaran aka sammish (online alias since 2013). this is my personal website, feel free to look around.
            </p>

            <p>
              i used to make levels for the game{' '}
              <Link href="https://osu.ppy.sh/u/sammish" className="text-accent hover:underline">
                osu!
              </Link>{' '}
              as a teen. in college, i founded{' '}
              <Link href="https://wreckcon.org/" className="text-accent hover:underline">
                WreckCon
              </Link>
              .
            </p>

            <p className="font-mono text-sm">
              browse my code! <Link href="https://github.com/smaran-m" className="text-accent hover:underline">my github</Link><br />
              hire me! <Link href="/docs/SmaranMishraResume.pdf" className="text-accent hover:underline">my resume</Link>
            </p>
            </div>
          </ThemedText>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">currently</h2>
            <ThemedText variant="secondary">
              <ul className="list-disc list-inside space-y-2">
                <li>looking for a job</li>
                <li>getting my masters in CS</li>
                <li>trying to lose weight</li>
                <li>making video games for fun</li>
                <li>writing blog posts and stories</li>
                <li>experiencing becoming</li>
              </ul>
            </ThemedText>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">likes</h2>
            <ThemedText variant="tertiary">
              <p className="text-xs mb-4">(exhaustive)</p>
            </ThemedText>
            <ThemedText variant="secondary">
              <ul className="space-y-2 text-sm">
              <li>
                <strong className="font-mono text-accent">music:</strong> black sabbath, against all logic, sweet trip, stereolab, chief keef
              </li>
              <li>
                <strong className="font-mono text-accent">movies:</strong> summer wars, chungking express, blade runner 2049, shaolin soccer, oldboy, whiplash
              </li>
              <li>
                <strong className="font-mono text-accent">tv:</strong> community, gaki no tsukai, whose line is it anyways?, impractical jokers
              </li>
              <li>
                <strong className="font-mono text-accent">books:</strong> notes from underground, after dark
              </li>
              <li>
                <strong className="font-mono text-accent">games:</strong> team fortress 2, rain world, kirby super star ultra, ridge racer type 4, burnout revenge, tribes: ascend
              </li>
              <li>
                <strong className="font-mono text-accent">art:</strong> edward hopper, ashley wood, john william godward, dean cornwell, ilya repin, textmode, brutalism, strong shapes with shaky lines
              </li>
              <li>
                <strong className="font-mono text-accent">principles:</strong> commit to the bit, be kind
              </li>
              <li>
                <strong className="font-mono text-accent">life:</strong> lowercase text, almond croissants, rotary engines, crunchy leaves, 2 for 1 deals, poor liars, procedural generation, green apple shampoo, qoo, cats
              </li>
              </ul>
            </ThemedText>
          </div>

          <ThemedBorder className="mt-12 pt-8 border-t">
            <h2 className="text-xl font-bold mb-4 font-mono">Buttons</h2>
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
          </ThemedBorder>
        </div>
      </div>
    </ThemedPage>
  );
}
