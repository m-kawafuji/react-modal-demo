import { useId } from 'react';
import Modal from '@/components/Modal';
import styles from './index.module.scss';

export default function ExampleModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const id = useId();

  return (
    <Modal
      open={open}
      onClose={onClose}
      initialFocus={id + 'input1'}
      aria-labelledby={id + 'label'}
    >
      <section className={styles.container}>
        <h2 className={styles.title} id={id + 'label'}>
          Modal
        </h2>
        <p className={styles.description}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio,
          recusandae odit magnam ut laudantium cumque explicabo officiis, ea vel
          ratione illo dicta perspiciatis aut cupiditate labore repellat non
          eaque accusamus.
        </p>
        <form
          className={styles.formContainer}
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel} htmlFor={id + 'input1'}>
              input1
            </label>
            <input
              className={styles.fieldInput}
              id={id + 'input1'}
              type="text"
            />
          </div>
          <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel} htmlFor={id + 'input2'}>
              input2
            </label>
            <input
              className={styles.fieldInput}
              id={id + 'input2'}
              type="text"
            />
          </div>
          <div className={styles.buttons}>
            <button className={styles.cancel} type="button" onClick={onClose}>
              Cancel
            </button>
            <button className={styles.submit} type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
}
