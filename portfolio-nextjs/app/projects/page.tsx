import ProjectGallery from '@/components/ProjectGallery';
import projects from '@/public/assets/projects/projects.json';

export const metadata = {
  title: 'Projects - Sammish',
  description: 'Software projects and technical work by Smaran (Sammish)',
};

export default function Projects() {
  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Projects
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Software projects, web applications, and technical experiments. Each project showcases development process and final results.
          </p>

          {/* ASCII decoration */}
          <div className="mt-6 text-gray-300 font-mono text-xs">
            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
          </div>
        </div>

        <ProjectGallery projects={projects} />
      </div>
    </div>
  );
}
