import { Feed } from 'feed';
import { getAllPosts } from './blog';
import { markdownToHtml } from './blog';

export async function generateRSSFeed() {
  const siteURL = 'https://sammi.sh'; // Update with your actual domain
  const date = new Date();

  const feed = new Feed({
    title: "sammish's Blog",
    description: 'Thoughts on code, art, music, and procedural generation',
    id: siteURL,
    link: siteURL,
    language: 'en',
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Smaran (sammish)`,
    updated: date,
    feedLinks: {
      rss2: `${siteURL}/rss.xml`,
      json: `${siteURL}/feed.json`,
      atom: `${siteURL}/atom.xml`,
    },
    author: {
      name: 'Smaran (sammish)',
      email: 'noreply@sammi.sh',
      link: siteURL,
    },
  });

  const posts = getAllPosts();

  for (const post of posts) {
    const url = `${siteURL}/blog/${post.slug}`;
    const contentHtml = await markdownToHtml(post.content);

    feed.addItem({
      title: post.metadata.title,
      id: url,
      link: url,
      description: post.metadata.description || post.metadata.title,
      content: contentHtml,
      author: [
        {
          name: post.metadata.author || 'sammish',
          link: siteURL,
        },
      ],
      date: new Date(post.metadata.date),
      category: post.metadata.tags?.map((tag) => ({ name: tag })) || [],
    });
  }

  return {
    rss: feed.rss2(),
    atom: feed.atom1(),
    json: feed.json1(),
  };
}
