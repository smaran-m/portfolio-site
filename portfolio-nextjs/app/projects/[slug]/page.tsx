import { notFound } from 'next/navigation';
import projects from '@/public/assets/projects/projects.json';
import Image from 'next/image';
import ThemedPage, { ThemedText } from '@/components/ThemedPage';

export async function generateStaticParams() {
  return projects.map((project, idx) => ({ slug: idx.toString() }));
}

interface ProjectPageProps {
  params: { slug: string };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params;
  const project = projects[parseInt(slug, 10)];

  if (!project) return notFound();

  return (
    <ThemedPage className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {project.title}
        </h1>
        <ThemedText variant="secondary">
          <p className="text-lg mb-8">{project.description}</p>
        </ThemedText>
        <div className="mb-8 flex justify-center">
          <div className="relative aspect-square w-64 bg-gray-100 dark:bg-gray-800">
            <Image
              src={`/assets/projects/${project.thumbnail}`}
              alt={project.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
        <ThemedText variant="tertiary">
          <div className="text-sm font-mono">Tag: {project.tag}</div>
        </ThemedText>
      </div>
    </ThemedPage>
  );
}
