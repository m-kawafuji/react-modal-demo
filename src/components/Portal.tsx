import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let container = document.getElementById(id);

    if (!container) {
      container = document.createElement('div');
      container.id = id;
    }

    setContainer(container);
  }, [id]);

  return container && createPortal(children, container);
}
