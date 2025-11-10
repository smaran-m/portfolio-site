interface ProjectBadgeProps {
  type: 'progress' | 'artifact';
  value: string;
}

export default function ProjectBadge({ type, value }: ProjectBadgeProps) {
  // Progress badges have colored backgrounds
  const progressColors: Record<string, string> = {
    'wip': 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300',
    'completed': 'bg-green-500/20 text-green-700 dark:text-green-300',
    'maintained': 'bg-blue-500/20 text-blue-700 dark:text-blue-300',
    'paused': 'bg-gray-500/20 text-gray-700 dark:text-gray-300',
    'hiatus': 'bg-orange-500/20 text-orange-700 dark:text-orange-300',
    'archived': 'bg-red-500/20 text-red-700 dark:text-red-300',
  };

  // Artifact badges are more subtle
  const artifactColors: Record<string, string> = {
    'concept': 'border border-purple-500/30 text-purple-700 dark:text-purple-300',
    'poc': 'border border-indigo-500/30 text-indigo-700 dark:text-indigo-300',
    'demo': 'border border-cyan-500/30 text-cyan-700 dark:text-cyan-300',
    'experiment': 'border border-pink-500/30 text-pink-700 dark:text-pink-300',
    'alpha': 'border border-orange-500/30 text-orange-700 dark:text-orange-300',
    'beta': 'border border-amber-500/30 text-amber-700 dark:text-amber-300',
    'production': 'border border-emerald-500/30 text-emerald-700 dark:text-emerald-300',
  };

  const colorClass = type === 'progress'
    ? progressColors[value] || 'bg-gray-500/20 text-gray-700'
    : artifactColors[value] || 'border border-gray-500/30 text-gray-700';

  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-mono uppercase ${colorClass}`}>
      {value}
    </span>
  );
}
