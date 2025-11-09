import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, markdownToHtml } from '@/lib/blog';
import Tag from '@/components/Tag';

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
    title: `${post.metadata.title} - Sammish`,
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
    <div className="min-h-screen py-16 bg-black text-white">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 pb-8 border-b border-gray-700">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {post.metadata.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-400 font-mono">
            <time>
              {new Date(post.metadata.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.metadata.author && (
              <>
                <span>·</span>
                <span>{post.metadata.author}</span>
              </>
            )}
          </div>

          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.metadata.tags.map((tag) => (
                <Tag key={tag} name={tag} href={`/blog/tags/${tag.toLowerCase()}`} />
              ))}
            </div>
          )}
        </header>

        <div
          className="prose prose-gray max-w-none prose-headings:font-bold prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:text-accent prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-sm text-gray-500 font-mono mb-4">
            <p>Comments powered by GitHub Issues</p>
          </div>
          <div id="comments-container">
            {/* Replace "username/repo" with your actual GitHub repository */}
            {/* Uncomment when you have a repository set up */}
            {/* <Comments repo="username/repo" /> */}
            <p className="text-sm text-gray-400 italic">
              To enable comments, edit app/blog/[slug]/page.tsx and add your GitHub repository in the Comments component.
            </p>
          </div>
        </footer>
      </article>
    </div>
  );
}
