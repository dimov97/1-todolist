import React, { useReducer, useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemooveTodolistAC, todolistsReducer } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, tasksReducer } from './state/tasks-reducer';

export type tasksType = {
    id: string
    title: string
    isDone: boolean
}
export type filterType = 'all' | 'completed' | 'active'

export type todolistsType = {
    id: string,
    title: string,
    filter: filterType
}
export type tasksStateType = {
    [key: string]: tasksType[]
}

function AppWithReducers() {


    function filterTasks(value: filterType, id: string) {
        const action = ChangeTodolistFilterAC(id,value)
        dispatchToTodolistReducer(action)

    }

    function remooveTask(id: string, todolistId: string) {
        const action = RemooveTodolistAC(id)
        dispatchToTasksReducer(action)
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title,todolistId)
        dispatchToTasksReducer(action)
    }
    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(isDone,todolistId,id)
        dispatchToTasksReducer(action)
    }
    function changeTaskTitle(id: string, title: string, todolistId: string) {
        const action = changeTaskTitleAC(title,todolistId,id)
        dispatchToTasksReducer(action)
    }

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer,
        [
            { id: todolistId1, title: 'new tottolist', filter: 'all' },
            { id: todolistId2, title: 'old totdolist', filter: 'all' },
        ]
    )

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todolistId1]: [
            { id: v1(), title: 'html', isDone: true },
            { id: v1(), title: 'css', isDone: true },
            { id: v1(), title: 'js', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'lox', isDone: true },
            { id: v1(), title: 'pidr', isDone: false },
            { id: v1(), title: 'suka', isDone: true },
        ]
    })
    function remooveTodolist(todolistId: string) {
        const action = RemooveTodolistAC(todolistId)
        dispatchToTodolistReducer(action)
        dispatchToTasksReducer(action)
    }
    function addTodolist(title: string) {
        const action = AddTodolistAC(title)
        dispatchToTodolistReducer(action)
        dispatchToTasksReducer(action)
    }
    function changeTodolistTitle(id: string, title: string) {
        const action = ChangeTodolistTitleAC(id,title)
        dispatchToTodolistReducer(action)
    }

    return (
        <div className="App">
            <AppBar position="static" >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar> 
            <Container fixed>
                <Grid container style={{padding:'20px'}}>
            <AddItemForm addItem={addTodolist} />
            </Grid>
            <Grid container spacing={6}>
            
            {todolists.map(tl => {
                let filteredTask = tasks[tl.id]

                if (tl.filter === 'completed') {
                    filteredTask = filteredTask.filter(t => t.isDone === true)
                }
                if (tl.filter === 'active') {
                    filteredTask = filteredTask.filter(t => t.isDone === false)
                }
                return (
                    <Grid item style={{marginTop:'15px'}}>
                        <Paper style={{padding:'10px'}}>
                    <Todolist title={tl.title}
                        id={tl.id}
                        key={tl.id}
                        tasks={filteredTask}
                        remooveTask={remooveTask}
                        filterTasks={filterTasks}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        remooveTodolist={remooveTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                    </Paper>
                    </Grid>
                )
            })}
            </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
