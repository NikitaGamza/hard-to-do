'use client';
import Image from 'next/image';
import styles from './page.module.css';
import GroupList from './components/group-list';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Task from './components/task';
import Modal from './components/modal';
import { useBeforeunload } from 'react-beforeunload';
import { useCookies } from 'react-cookie';

export default function Home() {
  const [cookies] = useCookies(['viewModal']);
  const [active, setActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dontRemind, setDontRemind] = useState(false);
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem('memo')) || []
  );

  useEffect(
    () => localStorage.setItem('memo', JSON.stringify(taskList)),
    [taskList]
  );
  // useBeforeunload(localStorage.setItem('memo', JSON.stringify(taskList)));

  function addList(listName) {
    setTaskList([
      ...taskList,
      {
        id: uuidv4(),
        name: listName,
        tasks: [],
      },
    ]);
  }
  function addTask(listId, taskName) {
    const newTask = taskList.map((list) => {
      return list.id === listId
        ? {
            ...list,
            tasks: [
              ...list.tasks,
              { id: uuidv4(), isDone: false, task: taskName },
            ],
          }
        : list;
    });
    setTaskList(newTask);
  }
  function removeDone() {
    // !dontRemind ? setModalVisible(true) : removeOnYes();
    cookies.viewModal === 'false' || cookies.viewModal === undefined
      ? setModalVisible(true)
      : removeOnYes();
    console.log(cookies);
  }
  function removeOnYes() {
    const removedTask = taskList.map((list) => {
      return {
        ...list,
        tasks: list.tasks.filter((item) => !item.isDone),
      };
    });
    setTaskList(removedTask);
    setModalVisible(false);
  }

  //КАК ПЕРЕРИСОВАТЬ ТОЛЬКО ВНУТРЕННИЙ МАССИВ

  function doneTask(key) {
    const dataDone = taskList.map((list) => {
      return {
        ...list,
        tasks: list.tasks.map((item) => {
          // console.log(item.key, key);
          return item.key == key ? { ...item, isDone: !item.isDone } : item;
        }),
      };
    });
    setTaskList(dataDone);
  }
  function doneNew(keyList, keyTask) {
    console.log(taskList, keyList, keyTask);
    const dataDone = taskList.map((list) => {
      if (list.id === keyList) {
        return {
          ...list,
          tasks: list.tasks.map((item) => {
            return item.id === keyTask
              ? { ...item, isDone: !item.isDone }
              : item;
          }),
        };
      } else {
        return list;
      }
    });
    console.log(dataDone);
    setTaskList(dataDone);
  }
  console.log(taskList);
  return (
    <main className={styles.main}>
      <h2 className={styles.head}>My Lists</h2>
      <form
        action=""
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          addList(active);
          // setActive(true);
        }}
      >
        <input
          type="text"
          name=""
          id=""
          placeholder="New list"
          className={styles.form__inp}
          onChange={(e) => {
            setActive(e.target.value);
          }}
        />
        <input
          type="submit"
          value="+Add"
          className={active ? styles.form__add_active : styles.form__add}
          disabled={Boolean(!active)}
        />
      </form>
      <div>
        {/* {localStorage.getItem('memo')
          ? () => setTaskList(JSON.parse(localStorage.getItem('memo')))
          : () => setTaskList(taskList)} */}
        {taskList.map(({ id, name, tasks }) => {
          // console.log(item.id);
          return (
            <>
              <GroupList
                key={id}
                id={id}
                name={name}
                tasks={tasks}
                count={tasks.length}
                onClick={removeDone}
                addTask={addTask}
                doneTask={doneNew}
              />
            </>
          );
        })}
      </div>
      <Modal
        visibleModal={modalVisible}
        // onChange={() => setDontRemind(!dontRemind)}
        onNo={() => setModalVisible(false)}
        onYes={() => {
          removeOnYes();
        }}
      />
    </main>
  );
}
