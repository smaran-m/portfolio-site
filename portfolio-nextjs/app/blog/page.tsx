import Link from 'next/link';
import { getAllPosts, getAllTags } from '@/lib/blog';
import Tag from '@/components/Tag';
import Card from '@/components/Card';
import ThemedPage, { ThemedText } from '@/components/ThemedPage';

export const metadata = {
  title: 'Blog - sammish',
  description: 'Midwit notes on art, science, culture',
};

export default function BlogPage() {
  const allPosts = getAllPosts();
  const posts = allPosts.filter(post =>
    !post.metadata.tags?.some(tag => tag.toLowerCase() === 'draft')
  );
  const tags = getAllTags();

  return (
    <ThemedPage className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
          <ThemedText variant="secondary">
            <p className="text-lg">
              Midwit notes on art, science, culture.
            </p>
          </ThemedText>

          {/* ASCII decoration */}
          <ThemedText variant="tertiary">
            <div className="mt-6 font-mono text-xs">
              ░░░░░░░░░░░░░░░░░░░░
            </div>
          </ThemedText>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-8">
            <ThemedText variant="tertiary">
              <p className="text-sm mb-3 font-mono">Filter by tag:</p>
            </ThemedText>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag key={tag} name={tag} href={`/blog/tags/${tag.toLowerCase()}`} />
              ))}
            </div>
          </div>
        )}

        {/* Posts */}
        {posts.length === 0 ? (
          <Card>
            <ThemedText variant="secondary">
              <p className="text-center py-8">
                No posts yet. Check back soon!
              </p>
            </ThemedText>
          </Card>
        ) : (
          <div className="space-y-2">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                <Card hover>
                  <div className="flex justify-between items-start mb-3">
                    <ThemedText variant="primary">
                      <h2 className="text-2xl font-bold hover:text-accent transition-colors">
                        {post.metadata.title}
                      </h2>
                    </ThemedText>
                    <ThemedText variant="tertiary">
                      <time className="text-sm font-mono whitespace-nowrap ml-4">
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
                      {post.metadata.tags.map((tag) => (
                        <Tag key={tag} name={tag} />
                      ))}
                    </div>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </ThemedPage>
  );
}
