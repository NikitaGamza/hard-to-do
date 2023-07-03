import { useEffect, useState } from 'react';
import styles from './task-style.module.css';
export default function Task({ id, isDone, taskName, onChange, listId }) {
  return (
    <div className={styles.task} onClick={(e) => e.stopPropagation()}>
      <label
        className={isDone ? styles.fake__checker_done : styles.fake__checker}
        htmlFor={id}
        onClick={(e) => {
          // onChange(listId, id);
          e.stopPropagation();
        }}
      ></label>
      <input
        className={styles.task__radio}
        type="checkbox"
        name=""
        id={id}
        checked={isDone}
        onChange={(e) => {
          onChange(listId, id);
          e.stopPropagation();
          console.log('hi');
        }}
      />
      <label
        className={isDone ? styles.task__name_done : styles.task__name}
        htmlFor={id}
        onClick={(e) => {
          // onChange(listId, id);
          e.stopPropagation();
          console.log('label');
        }}
      >
        {taskName}
      </label>
    </div>
  );
}
