import styles from './group-style.module.css';
import Task from './task';
import { useState } from 'react';
export default function GroupList({
  id,
  name,
  count = 0,
  tasks,
  onClick,
  addTask,
  doneTask,
}) {
  const [newTaskValue, setNewTaskValue] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [subtaskVisible, setSubtaskVisible] = useState(false);

  return (
    <div
      className={styles.group}
      onClick={() => {
        setSubtaskVisible(!subtaskVisible);
        console.log('again');
      }}
    >
      <div
        className={subtaskVisible ? styles.groupList_active : styles.groupList}
      >
        <span>{name}</span> <span>{count}</span>
        <input
          className={
            subtaskVisible
              ? styles.groupList__clean_active
              : styles.groupList__clean
          }
          type="button"
          value="Clean"
          onClick={() => onClick(id)}
        />
      </div>
      <div>
        <input
          className={styles.groupList__plusitem}
          type="button"
          value="+ List item"
          onClick={() => setFormVisible(true)}
        />
      </div>
      <form
        className={
          formVisible
            ? styles.groupList__form_visible
            : styles.groupList__form_unvisible
        }
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          addTask(id, newTaskValue);
          setFormVisible(false);
        }}
      >
        <input
          className={styles.form__inp}
          type="text"
          name=""
          id=""
          onChange={(e) => {
            setNewTaskValue(e.target.value);
          }}
        />
        <input
          className={styles.form__add}
          type="submit"
          value="Add"
          disabled={Boolean(!newTaskValue)}
        />
      </form>
      {subtaskVisible ? (
        tasks.map(({ id: idTask, isDone, task }) => {
          return (
            <Task
              key={idTask}
              id={idTask}
              isDone={isDone}
              taskName={task}
              onChange={doneTask}
              listId={id}
            />
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}
