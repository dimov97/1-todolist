import React, { ChangeEvent, useCallback } from 'react'
import { filterType, tasksType } from './App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { Button, Checkbox } from '@mui/material'
import { Delete, RemoveCircle } from '@mui/icons-material'
import { Task } from './Task'

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

export const Todolist: React.FC<todolistType> = React.memo( ({ title, tasks, remooveTask, filterTasks, addTask, changeTaskStatus, filter, id, remooveTodolist, changeTaskTitle,changeTodolistTitle }) => {

    let onClickAllHandler = useCallback( () => { filterTasks('all', id) },[filterTasks,id])
    let onClickActiveHandler = useCallback( () => { filterTasks('active', id) },[filterTasks,id])
    let onClickCompletedHandler = useCallback( () => { filterTasks('completed', id) },[filterTasks,id])

    const addNewTask = useCallback(  (title: string) => {
        addTask(title, id)
    },[addTask,id])
    const remooveTodolistHandler =() => { remooveTodolist(id) }
    const changeTodolistTitleHandler = useCallback( (title:string) => {
        changeTodolistTitle(id, title)
    },[changeTaskTitle,id])

    let filteredTask = tasks

    if (filter === 'completed') {
        filteredTask = filteredTask.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        filteredTask = filteredTask.filter(t => t.isDone === false)
    }

    return (
        <div>
            <h3><Button onClick={remooveTodolistHandler}><Delete/></Button> <EditableSpan title={title} onChange={changeTodolistTitleHandler}/></h3>
            <AddItemForm addItem={addNewTask} />
            <div>
                {filteredTask.map(t=><Task 
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                remooveTask={remooveTask}
                t = {t}
                id={id}
                key={t.id}

                />)}
            </div>
            <div>
                <Button color='primary' variant={filter === 'all' ? 'contained' : 'outlined'} onClick={onClickAllHandler}>All</Button>
                <Button color="secondary" variant={filter === 'active' ? 'contained' : 'outlined'} onClick={onClickActiveHandler}>Active</Button>
                <Button color="success" variant={filter === 'completed' ? 'contained' : 'outlined'} onClick={onClickCompletedHandler}>Completed</Button>
            </div>
        </div>
    )
})