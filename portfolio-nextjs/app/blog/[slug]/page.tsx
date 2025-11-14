import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, markdownToHtml, calculateReadTime } from '@/lib/blog';
import Tag from '@/components/Tag';
import ThemedPage, { ThemedText, ThemedBorder } from '@/components/ThemedPage';
import ThemedProse from '@/components/ThemedProse';
import Comments from '@/components/Comments';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.metadata.title} - sammish`,
    description: post.metadata.description || post.metadata.title,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content);

  return (
    <ThemedPage className="py-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ThemedBorder className="mb-8 pb-8 border-b">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {post.metadata.title}
          </h1>

          <ThemedText variant="tertiary">
            <div className="flex items-center gap-4 text-sm font-mono">
            <time>
              {new Date(post.metadata.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>|</span>
            <span>{calculateReadTime(post.content)} min read</span>
            {post.metadata.author && (
              <>
                <span>·</span>
                <span>{post.metadata.author}</span>
              </>
            )}
            </div>
          </ThemedText>

          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.metadata.tags.map((tag) => (
                <Tag key={tag} name={tag} href={`/blog/tags/${tag.toLowerCase()}`} />
              ))}
            </div>
          )}
        </ThemedBorder>

        <ThemedProse
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <ThemedBorder className="mt-16 pt-8 border-t">
          <ThemedText variant="tertiary">
            <div className="text-sm font-mono mb-4">
              <p>Comments powered by GitHub Issues</p>
            </div>
          </ThemedText>
          <div id="comments-container">
            <Comments repo="smaran-m/portfolio-site" />
          </div>
        </ThemedBorder>
      </article>
    </ThemedPage>
  );
}
