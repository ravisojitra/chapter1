import React, { useState } from "react";
function TasksList() {
  const [tasks, setTasks] = useState([]);

  React.useEffect(() => {
    const tasksAsString = localStorage.getItem("tasks");
    const tasks = JSON.parse(tasksAsString) || [];
    setTasks(tasks)
  }, [])

  function handleTaskStatus(task) {
    console.log(task);
    const newTaskData = {
      ...task,
      taskStatus: !task.taskStatus
    }
    const tasksAsString = localStorage.getItem("tasks");
    const tasks = JSON.parse(tasksAsString) || [];
    const updatedTasks = tasks.map(t => {
      if (t.id === task.id) {
        return newTaskData
      }
      return t;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    setTasks(updatedTasks)
  }

  function handleTaskRemove(task) {
    const taskId = task.id;
    const tasksAsString = localStorage.getItem("tasks");
    const tasks = JSON.parse(tasksAsString) || [];

    const filteredTasks = tasks.filter(t => t.id !== task.id);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    setTasks(filteredTasks)

  }

  if (tasks.length <= 0) {
    return <p>No tasks are added</p>
  }
  return (
    <>
      {
        tasks.map(task => {
          return (
            <>
              <span onClick={() => handleTaskStatus(task)}>{task.taskName}</span> - <span>{task.taskStatus ? "completed" : "Not Completed"}</span> <span onClick={() => handleTaskRemove(task)}>X</span>
              <br />
            </>
          )
        })
      }
    </>
  )
}

function AddTaskForm() {
  const [taskName, setTaskName] = React.useState("")
  const [taskStatus, setTaskStatus] = React.useState(false);

  function addTask(event) {
    event.preventDefault();
    const tasksAsString = localStorage.getItem("tasks");
    const tasks = JSON.parse(tasksAsString) || [];
    const taskData = {
      taskName,
      taskStatus,
      id: tasks.length + 1
    }
    tasks.push(taskData)
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }
  return (
    <form onSubmit={event => addTask(event)}>
      <input value={taskName} onChange={event => setTaskName(event.target.value)} type="text" name="taskName" id="taskName" placeholder="task name" />
      <br />
      <>
        <span>Is Completed</span>
        <input type="checkbox" value={taskStatus} onChange={event => setTaskStatus(event.target.checked)} name="isCompleted" id="isCompleted" />
      </>
      <button type="submit">submit</button>
    </form>
  )
}
export default function Tasks() {

  const [showTaskAddForm, setShowTaskAddForm] = React.useState(false)

  const handleAddTask = () => {
    setShowTaskAddForm(true)
  }

  return (
    <>
      <button className="bg-green-500" onClick={handleAddTask}>Add Task</button>
      <br />
      {showTaskAddForm ? <AddTaskForm /> : <TasksList />}
    </>
  );
}
