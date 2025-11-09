import { notFound } from 'next/navigation';
import projects from '@/public/assets/projects/projects.json';
import Image from 'next/image';

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
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
          {project.title}
        </h1>
        <p className="text-lg text-gray-600 mb-8">{project.description}</p>
        <div className="mb-8 flex justify-center">
          <div className="relative aspect-square w-64 bg-gray-100">
            <Image
              src={`/assets/projects/${project.thumbnail}`}
              alt={project.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
        <div className="text-sm text-gray-500 font-mono">Tag: {project.tag}</div>
      </div>
    </div>
  );
}
