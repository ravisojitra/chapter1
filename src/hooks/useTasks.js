import React from "react";
import { v4 } from "uuid";

function getTasksData() {
  const tasksAsString = localStorage.getItem("tasks");
  return JSON.parse(tasksAsString) || [];
}

export default function useTasks() {
  // list tasks
  const [tasks, setTasks] = React.useState(getTasksData());

  React.useEffect(() => {
    setTasks(getTasksData());
  }, []);

  // add new task
  function addTask(taskName, taskStatus) {
    const localTasks = getTasksData();
    const taskData = {
      taskName,
      taskStatus,
      id: v4(),
    };
    localTasks.push(taskData);
    localStorage.setItem("tasks", JSON.stringify(localTasks));
  }

  // edit task status
  function changeTaskStatus(taskId) {
    const allTasks = getTasksData();
    const currentTask = tasks.find((t) => t.id === taskId);

    const updatedTasks = allTasks.map((t) => {
      if (t.id === taskId) {
        return { ...currentTask, taskStatus: !t.taskStatus };
      }
      return t;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  }

  // remove task
  function removeTask(taskId) {
    const localTasks = getTasksData();

    const filteredTasks = localTasks.filter((t) => t.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    setTasks(filteredTasks);
  }

  return {
    tasks,
    addTask,
    changeTaskStatus,
    removeTask,
  };
}
