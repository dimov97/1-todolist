import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

export type tasksType = {
    id: string
    title: string
    isDone: boolean
}
export type filterType = 'all' | 'completed' | 'active'

type todolistsType = {
    id: string,
    title: string,
    filter: filterType
}
type tasksStateType = {
    [key: string]: tasksType[]
}

function App() {


    function filterTasks(value: filterType, id: string) {
        let todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.filter = value
            setTodoslists([...todolists])
        }
    }

    function remooveTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({ ...tasks })
    }

    function addTask(title: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = { id: v1(), title: title, isDone: false }
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({ ...tasks })
    }
    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({ ...tasks })
        }

    }
    function changeTaskTitle(id: string, title: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.title = title
            setTasks({ ...tasks })
        }

    }

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, setTodoslists] = useState<todolistsType[]>(
        [
            { id: todolistId1, title: 'new tottolist', filter: 'all' },
            { id: todolistId2, title: 'old totdolist', filter: 'all' },
        ]
    )

    let [tasks, setTasks] = useState<tasksStateType>({
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
        setTodoslists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({ ...tasks })
    }
    function addTodolist(title: string) {
        const newTodolistId = v1()
        let newTodo: todolistsType = { id: newTodolistId, title: title, filter: 'all' }
        setTodoslists([newTodo, ...todolists])
        setTasks({ ...tasks, [newTodolistId]: [] })
    }
    function changeTodolistTitle(id: string, title: string) {
        let newTodolistTitle = todolists.find(tl => tl.id === id)
        if (newTodolistTitle) {
            newTodolistTitle.title = title
            setTodoslists([...todolists])
        }
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

export default App;
