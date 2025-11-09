import { generateRSSFeed } from '@/lib/rss';

export const dynamic = 'force-static';

export async function GET() {
  const { json } = await generateRSSFeed();

  return new Response(json, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
