import { useCookies } from 'react-cookie';
import styles from './modal.module.css';

// export default function Modal({ visibleModal, onChange, onNo, onYes }) {
export default function Modal({ visibleModal, onNo, onYes }) {
  //   console.log(visibleModal);
  const [cookies, setCookieModal] = useCookies(['viewModal']);
  const setCookieTrue = () => {
    setCookieModal(
      'viewModal',
      cookies.viewModal === 'false' || cookies.viewModal === undefined,
      { path: '/' }
    );
    console.log('it works');
  };
  // console.log(cookieModal);
  return (
    <div className={visibleModal === true ? styles.modal : styles.unvisible}>
      <div className={styles.modal__content}>
        <p className={styles.modal__content__text}>
          Do you want to remove all completed items from To-Do?
        </p>
        <div className={styles.modal__content__flex__checker}>
          <input
            id="checker"
            className={styles.modal__content__check}
            type="checkbox"
            name=""
            onChange={setCookieTrue}
          />
          <label htmlFor="checker" className={styles.modal__content__label}>
            Don’t ask me again
          </label>
        </div>

        <div className={styles.modal__content__flex}>
          <input
            className={styles.no}
            type="button"
            onClick={onNo}
            value="No"
          />
          <input
            className={styles.yes}
            type="button"
            onClick={onYes}
            value="Yes"
          />
        </div>
      </div>
    </div>
  );
}
