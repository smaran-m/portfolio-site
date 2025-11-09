'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Project {
  thumbnail: string;
  title: string;
  description: string;
  tag: string;
}

interface ProjectGalleryProps {
  projects: Project[];
}

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
  // Modal logic removed. Projects now link to their own pages.

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.tag ? `/blog/tags/${project.tag}` : '#'}
            className="group relative border border-gray-200 bg-white hover:border-accent transition-all overflow-hidden block"
          >
            <div className="aspect-square relative bg-gray-100">
              <Image
                src={`/assets/projects/${project.thumbnail}`}
                alt={project.title}
                fill
                className="object-cover group-hover:brightness-110 transition-all"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-mono text-sm text-gray-900">{project.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{project.description}</p>
            </div>

            {/* Subtle ASCII decoration */}
            <div className="absolute top-2 left-2 text-gray-300 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              ⌜
            </div>
            <div className="absolute top-2 right-2 text-gray-300 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              ⌝
            </div>
            <div className="absolute bottom-2 left-2 text-gray-300 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              ⌞
            </div>
            <div className="absolute bottom-2 right-2 text-gray-300 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              ⌟
            </div>
          </a>
        ))}
      </div>

      {/* Modal removed. */}
    </>
  );
}
