import ProjectGallery from '@/components/ProjectGallery';
import projects from '@/public/assets/projects/projects.json';
import ThemedPage, { ThemedText } from '@/components/ThemedPage';

export const metadata = {
  title: 'Projects - sammish',
  description: 'Software projects and technical work by Smaran (sammish)',
};

export default function Projects() {
  return (
    <ThemedPage className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Projects
          </h1>
          <ThemedText variant="secondary">
            <p className="text-lg max-w-2xl">
              Software projects, web applications, and technical experiments.
            </p>
          </ThemedText>

          {/* ASCII decoration */}
          <ThemedText variant="tertiary">
            <div className="mt-6 font-mono text-xs">
              ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
            </div>
          </ThemedText>
        </div>

        <ProjectGallery projects={projects} />
      </div>
    </ThemedPage>
  );
}
