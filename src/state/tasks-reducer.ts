import { v1 } from "uuid"
import { tasksStateType } from "../App"
import { AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2 } from "./todolists-reducer"

type ActionType = remooveTaskActionType | addTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType
type remooveTaskActionType = {
    type: 'REMOOVE-TASK'
    todolistId: string
    id: string
}
type addTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}
type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    isDone: boolean
    id: string
}
type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    title: string
    id: string
}

const initialState:tasksStateType = {
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
}

export const tasksReducer = (state: tasksStateType = initialState, action: ActionType): tasksStateType => {
    switch (action.type) {
        case 'REMOOVE-TASK': {
            const stateCopy = { ...state }
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.id)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = { ...state }
            const tasks = stateCopy[action.todolistId]
            const newTask = { id: v1(), title: action.title, isDone: false }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = { ...state }
            let tasks = state[action.todolistId]
            let task = tasks.find(t => t.id === action.id)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = { ...state }
            let tasks = state[action.todolistId]
            let task = tasks.find(t => t.id === action.id)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }

        case 'ADD-TODOLIST': {
            const stateCopy = { ...state }

            stateCopy[action.todolistId] = []

            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = { ...state }

            delete stateCopy[action.id]

            return stateCopy
        }

        default:
            return state
    }

}

export const removeTaskAC = (todolistId: string, id: string): remooveTaskActionType => {
    return { type: 'REMOOVE-TASK', todolistId, id }
}
export const addTaskAC = (title: string, todolistId: string): addTaskActionType => {
    return { type: 'ADD-TASK', todolistId, title }
}
export const changeTaskStatusAC = (isDone: boolean, todolistId: string, id: string): changeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', todolistId, isDone, id }
}
export const changeTaskTitleAC = (title: string, todolistId: string, id: string): changeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', todolistId, title, id }
}
