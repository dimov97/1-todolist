import React, { useReducer, useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemooveTodolistAC, todolistsReducer } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './state/store';

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

function AppWithRedux() { 

    const dispatch = useDispatch()
    const todolists =  useSelector<AppRootState,todolistsType[]>(state=>state.todolists)
    const tasks =  useSelector<AppRootState,tasksStateType>(state=>state.tasks)


    function filterTasks(value: filterType, id: string) {
        const action = ChangeTodolistFilterAC(id,value)
        dispatch(action)

    }

    function remooveTask(id: string, todolistId: string) {
        const action = removeTaskAC(todolistId,id)
        dispatch(action)
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title,todolistId)
        dispatch(action)
    }
    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(isDone,todolistId,id)
        dispatch(action)
    }
    function changeTaskTitle(id: string, title: string, todolistId: string) {
        const action = changeTaskTitleAC(title,todolistId,id)
        dispatch(action)
    }

    function remooveTodolist(todolistId: string) {
        const action = RemooveTodolistAC(todolistId)
        dispatch(action)
       
    }
    function addTodolist(title: string) {
        const action = AddTodolistAC(title)
        dispatch(action)
    }
    function changeTodolistTitle(id: string, title: string) {
        const action = ChangeTodolistTitleAC(id,title)
        dispatch(action)
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

export default AppWithRedux;
