'use client';

import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import ProjectBadge from './ProjectBadge';

interface Project {
  thumbnail: string;
  title: string;
  description: string;
  tag: string;
  status?: {
    progress: string;
    artifact: string;
  };
}

interface ProjectGalleryProps {
  projects: Project[];
}

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
  const { theme } = useTheme();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.tag ? `/blog/tags/${project.tag}` : '#'}
            className="group relative border hover:border-accent transition-all overflow-hidden block"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.card,
            }}
          >
            <div className="aspect-square relative" style={{ backgroundColor: theme.border }}>
              <Image
                src={`/assets/projects/${project.thumbnail}`}
                alt={project.title}
                fill
                className="object-cover group-hover:brightness-110 transition-all"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-mono text-sm flex-1 min-w-0 truncate" style={{ color: theme.text.primary }}>
                  {project.title}
                </h3>
                {project.status && (
                  <div className="flex gap-1 flex-shrink-0">
                    <ProjectBadge type="progress" value={project.status.progress} />
                    <ProjectBadge type="artifact" value={project.status.artifact} />
                  </div>
                )}
              </div>
              <p className="text-xs" style={{ color: theme.text.tertiary }}>
                {project.description}
              </p>
            </div>

            {/* Subtle ASCII decoration */}
            <div
              className="absolute top-2 left-2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: theme.text.tertiary }}
            >
              ⌜
            </div>
            <div
              className="absolute top-2 right-2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: theme.text.tertiary }}
            >
              ⌝
            </div>
            <div
              className="absolute bottom-2 left-2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: theme.text.tertiary }}
            >
              ⌞
            </div>
            <div
              className="absolute bottom-2 right-2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: theme.text.tertiary }}
            >
              ⌟
            </div>
          </a>
        ))}
      </div>

      {/* Modal removed. */}
    </>
  );
}
