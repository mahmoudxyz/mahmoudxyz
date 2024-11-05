import React, { useEffect, useState } from 'react';

const TableOfContents = ({ headings }) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <div className="sticky top-4 p-4 border rounded-lg max-h-[calc(100vh-2rem)] overflow-y-auto">
      <h3 className="font-semibold mb-2">Table of Contents</h3>
      <ul className="space-y-2">
        {headings.map(({ id, text, level }) => (
          <li
            key={id}
            style={{ paddingLeft: `${(level - 1) * 1}rem` }}
          >
            <a
              href={`#${id}`}
              className={`block py-1 text-sm transition-colors ${
                activeId === id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
