'use client';

import { useState } from 'react';
import styles from './page.module.scss';
import ExampleModal from '@/components/Modals/ExampleModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <div className={styles.container}>
        <section className={styles.inner}>
          <h1 className={styles.title}>React Modal Demo</h1>
          <button
            className={styles.button}
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            Open Modal
          </button>

          <ExampleModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </section>
      </div>
    </main>
  );
}
