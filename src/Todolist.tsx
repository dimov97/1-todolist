import React from 'react'
import { tasksType } from './App'

type todolistType = {
    title: string
    tasks: tasksType[]
    remooveTask:(id:number)=>void
}

export const Todolist: React.FC<todolistType> = ({ title, tasks,remooveTask }) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {tasks.map((t: tasksType) => {
                    return (
                        <li key={t.id}>
                            <button onClick={()=>{remooveTask(t.id)}}>x</button>
                            <input type="checkbox" checked={t.isDone} />
                            <span>{t.title}</span>
                        </li>)
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}