import React, { useState, useEffect, useContext } from "react";
import MyTasksCard from "../components/MyTasksCard";
import LoginContext from "../context/login-context";
import { v4 as uuidv4 } from "uuid";
import styles from "./MyTasks.module.css";

const Tasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const loginContext = useContext(LoginContext);

  const fetchAllTasks = async () => {
    try {
      const baseURL = process.env.REACT_APP_BASE_URL
      const res = await fetch(
        `${baseURL}/search/all`
      );
      const data = await res.json();
      setAllTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const completeTask = async (identifier, index) => {
    try {
      const baseURL = process.env.REACT_APP_BASE_URL
      await fetch(`${baseURL}/tasks/complete`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: identifier,
          completed: true,
        }),
      });

      allTasks[index].completed = true;
      setAllTasks([...allTasks]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitReview = async (identifier, input, acceptedBy, index) => {
    try {
      const baseURL = process.env.REACT_APP_BASE_URL
      await fetch(`${baseURL}/addreview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: identifier,
          review: input,
          reviewer: loginContext.profileName,
          acceptedBy: acceptedBy,
        }),
      });

      allTasks[index].review = input;
      setAllTasks([...allTasks]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllTasks();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.myTasks}>
        <h1>My Tasks</h1>

        <h4>In Progress</h4>

        <div className={styles.container}>
          {allTasks.map((task, index) => {
            return !task.completed &&
              task.acceptedBy === loginContext.profileName ? (
              <div key={uuidv4()}>
                <MyTasksCard
                  task={task}
                  completeTask={() => {
                    completeTask(task._id, index);
                  }}
                />
              </div>
            ) : (
              ""
            );
          })}
        </div>

        <h4>Completed</h4>

        <div className={styles.container}>
          {allTasks.map((task) => {
            return task.completed &&
              task.acceptedBy === loginContext.profileName ? (
              <div key={uuidv4()}>
                <MyTasksCard task={task} />
              </div>
            ) : (
              ""
            );
          })}
        </div>
      </div>

      <div className={styles.myRequests}>
        <h1>My Requests</h1>
        <h4>Pending Acceptance</h4>
        <div className={styles.container}>
          {allTasks.map((task) => {
            return task.username === loginContext.profileName &&
              !task.accepted ? (
              <div key={uuidv4()}>
                <MyTasksCard task={task} />
              </div>
            ) : (
              ""
            );
          })}
        </div>

        <h4>In Progress</h4>

        <div className={styles.container}>
          {allTasks.map((task, index) => {
            return task.username === loginContext.profileName &&
              task.accepted &&
              !task.completed ? (
              <div key={uuidv4()} className={styles.container}>
                <MyTasksCard
                  task={task}
                  completeTask={() => {
                    completeTask(task._id, index);
                  }}
                />
              </div>
            ) : (
              ""
            );
          })}
        </div>

        <h4>Completed</h4>
        <div className={styles.container}>
          {allTasks.map((task, index) => {
            return task.username === loginContext.profileName &&
              task.accepted &&
              task.completed ? (
              <div key={uuidv4()}>
                <MyTasksCard
                  task={task}
                  handleSubmitReview={(identifier, input, acceptedBy) => {
                    handleSubmitReview(identifier, input, acceptedBy, index);
                  }}
                />
              </div>
            ) : (
              ""
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
