import Link from 'next/link';
import { getAllPosts, getAllTags } from '@/lib/blog';
import Tag from '@/components/Tag';
import Card from '@/components/Card';

export const metadata = {
  title: 'Blog - Sammish',
  description: 'Thoughts on code, art, music, and procedural generation',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="min-h-screen py-16 bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
          <p className="text-lg text-gray-400">
            Thoughts on code, art, music, and procedural generation.
          </p>

          {/* ASCII decoration */}
          <div className="mt-6 text-gray-600 font-mono text-xs">
            ░░░░░░░░░░░░░░░░░░░░
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-8">
            <p className="text-sm text-gray-600 mb-3 font-mono">Filter by tag:</p>
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
            <p className="text-gray-600 text-center py-8">
              No posts yet. Check back soon!
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card hover>
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-2xl font-bold text-gray-900 hover:text-accent transition-colors">
                      {post.metadata.title}
                    </h2>
                    <time className="text-sm text-gray-500 font-mono whitespace-nowrap ml-4">
                      {new Date(post.metadata.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </div>

                  {post.metadata.description && (
                    <p className="text-gray-600 mb-4">{post.metadata.description}</p>
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
    </div>
  );
}
