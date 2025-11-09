import { generateRSSFeed } from '@/lib/rss';

export const dynamic = 'force-static';

export async function GET() {
  const { rss } = await generateRSSFeed();

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
