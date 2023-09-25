import React, { useState } from "react";
import useTasks from "../hooks/useTasks";
function TasksList() {

  const { tasks, changeTaskStatus, removeTask } = useTasks();

  if (tasks.length <= 0) {
    return <p>No tasks are added</p>
  }
  return (
    <>
      {
        tasks.map(task => {
          return (
            <>
              <span className="cursor-pointer" onClick={() => changeTaskStatus(task.id)}>{task.taskName}</span> - <span>{task.taskStatus ? "completed" : "Not Completed"}</span> <span onClick={() => removeTask(task.id)}>X</span>
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

  const { addTask } = useTasks()

  function addTaskEvent(event) {
    event.preventDefault();
    addTask(taskName, taskStatus)
  }

  return (
    <form onSubmit={event => addTaskEvent(event)}>
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
