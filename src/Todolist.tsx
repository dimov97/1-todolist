import React, { ChangeEvent } from 'react'
import { filterType, tasksType } from './App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { Button, Checkbox } from '@mui/material'
import { CheckBox, Delete, RemoveCircle } from '@mui/icons-material'

type todolistType = {
    id: string
    title: string
    tasks: tasksType[]
    remooveTask: (id: string, todolistId: string) => void
    filterTasks: (value: filterType, id: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void

    filter: filterType
    remooveTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title:string) => void
}

export const Todolist: React.FC<todolistType> = ({ title, tasks, remooveTask, filterTasks, addTask, changeTaskStatus, filter, id, remooveTodolist, changeTaskTitle,changeTodolistTitle }) => {

    let onClickAllHandler = () => { filterTasks('all', id) }
    let onClickActiveHandler = () => { filterTasks('active', id) }
    let onClickCompletedHandler = () => { filterTasks('completed', id) }

    const addNewTask = (title: string) => {
        addTask(title, id)
    }
    const remooveTodolistHandler =() => { remooveTodolist(id) }
    const changeTodolistTitleHandler = (title:string) => {
        changeTodolistTitle(id, title)
    }

    return (
        <div>
            <h3><Button onClick={remooveTodolistHandler}><Delete/></Button> <EditableSpan title={title} onChange={changeTodolistTitleHandler}/></h3>
            <AddItemForm addItem={addNewTask} />
            <div>
                {tasks.map((t: tasksType) => {
                    const onClickHandler = () => { remooveTask(t.id, id) }
                    let onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newTaskSatus = e.currentTarget.checked
                        changeTaskStatus(t.id, newTaskSatus, id)
                    }
                    let onChangeTaskTitleHandler = (title: string) => {
                        changeTaskTitle(t.id, title, id)
                    }
                    return (
                        <div key={t.id} className={t.isDone === true ? 'done' : ''}>
                            <Button variant="outlined" onClick={onClickHandler}><RemoveCircle/></Button>
                            <Checkbox checked={t.isDone} onChange={onChangeTaskStatusHandler} />
                            <EditableSpan title={t.title} onChange={onChangeTaskTitleHandler} />
                        </div>)
                })}
            </div>
            <div>
                <Button color='primary' variant={filter === 'all' ? 'contained' : 'outlined'} onClick={onClickAllHandler}>All</Button>
                <Button color="secondary" variant={filter === 'active' ? 'contained' : 'outlined'} onClick={onClickActiveHandler}>Active</Button>
                <Button color="success" variant={filter === 'completed' ? 'contained' : 'outlined'} onClick={onClickCompletedHandler}>Completed</Button>
            </div>
        </div>
    )
}