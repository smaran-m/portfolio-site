import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import Tag from '@/components/Tag';
import Card from '@/components/Card';
import ThemedPage, { ThemedText } from '@/components/ThemedPage';

export async function generateStaticParams() {
  const tagsFromPosts = getAllTags();
  // Load project tags from JSON
  let tagsFromProjects: string[] = [];
  try {
    const projects = require('@/public/assets/projects/projects.json');
    tagsFromProjects = projects.map((p: any) => p.tag).filter(Boolean);
  } catch {}
  const allTags = Array.from(new Set([...tagsFromPosts.map(t => t.toLowerCase()), ...tagsFromProjects.map(t => t.toLowerCase())]));
  return allTags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  return {
    title: `Posts tagged "${tag}" - sammish`,
    description: `All blog posts tagged with ${tag}`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    redirect('/blog');
  }

  return (
    <ThemedPage className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <ThemedText variant="tertiary">
            <Link href="/blog" className="text-sm hover:text-accent font-mono mb-4 inline-block">
              ← Back to all posts
            </Link>
          </ThemedText>

          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Posts tagged <span className="text-accent">{tag}</span>
          </h1>
          <ThemedText variant="secondary">
            <p className="text-lg">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
            </p>
          </ThemedText>

          {/* ASCII decoration */}
          <ThemedText variant="tertiary">
            <div className="mt-6 font-mono text-xs">
              ░░░░░░░░░░░░░░░░░░░░
            </div>
          </ThemedText>
        </div>

        <div className="space-y-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
              <Card hover>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-3">
                  <ThemedText variant="primary">
                    <h2 className="text-xl sm:text-2xl font-bold hover:text-accent transition-colors break-words">
                      {post.metadata.title}
                    </h2>
                  </ThemedText>
                  <ThemedText variant="tertiary">
                    <time className="text-sm font-mono sm:whitespace-nowrap sm:ml-4">
                      {new Date(post.metadata.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </ThemedText>
                </div>

                {post.metadata.description && (
                  <ThemedText variant="secondary">
                    <p className="mb-4">{post.metadata.description}</p>
                  </ThemedText>
                )}

                {post.metadata.tags && post.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.metadata.tags.map((t) => (
                      <Tag key={t} name={t} />
                    ))}
                  </div>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </ThemedPage>
  );
}
