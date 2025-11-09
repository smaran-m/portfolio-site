'use client';

import { useEffect, useRef } from 'react';

interface CommentsProps {
  repo: string; // Format: "username/repo"
  theme?: 'github-light' | 'github-dark';
}

export default function Comments({ repo, theme = 'github-light' }: CommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commentsRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', repo);
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', theme);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    commentsRef.current.appendChild(script);

    return () => {
      if (commentsRef.current) {
        commentsRef.current.innerHTML = '';
      }
    };
  }, [repo, theme]);

  return <div ref={commentsRef} className="utterances-container" />;
}
