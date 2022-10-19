import { useState } from "react";
import "./ToDo.css"

import { RiCheckboxFill } from "react-icons/ri";
import { AiFillCloseSquare } from "react-icons/ai";
import { FaCheckDouble } from "react-icons/fa";

import videoBg from '../Assets/bg-planet.mp4'

function ToDoList(){

  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

//Adicionar tarefas
  const handleSubmit = (e) => {
    e.preventDefault()
    const addTask = {
      id: Math.floor(Math.random() * 1000),
      todo: input,
      completed: false
    }
    setTasks([...tasks, addTask])
    setInput('')
  }

//Deletar tarefas
  const cleanTask = (id) => {
    const filterTasks = [...tasks].filter((tasks) => tasks.id !== id)
    setTasks(filterTasks)
  }

//Tarefas completas
  const completedTask = (id) => {
    setTasks(
      tasks.map(task => (
        task.id === id ? { ...task, completed: !task.completed } : task
      ))
    )
  }

  return(
    <div className="main">
      <video src={videoBg} autoPlay loop muted />
      <div className='todo'>
        <h1 className='title'>TODO LIST <FaCheckDouble className="check"/></h1>
        <form onSubmit={ handleSubmit }>
          <div className='form'>
            <input
              value={ input }
              onChange={e => setInput(e.target.value)}
              placeholder='Adicione uma tarefa'
              type='text'
              className='input-text'
            />
          </div>
            {/* <AiOutlinePlus className="icon plus" /> */}
        </form>
        <div className="tasks-down">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`line-text ${task.completed ? 'completed' : ''}`}
              >
              <p> {task.todo} </p>
              <div className="icons-task">
                <RiCheckboxFill onClick={() => completedTask(task.id)} className="icon ok"/>
                <AiFillCloseSquare onClick={() => cleanTask(task.id)} className="icon exclude"/>
              </div>
            </div>
          ))}
        </div>
        <p className='task-length'>{(tasks < 1) ? 'Você não tem atividades' : `Atividades: ${tasks.length}`}</p>
      </div>
    </div>
  )
}

export default ToDoList;