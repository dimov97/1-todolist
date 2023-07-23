import { action } from '@storybook/addon-actions'
import { Task } from './Task'


export default {
    title: 'Task',
    component: Task
}

const changeTaskStatusCallback = action('task status was changed')
const changeTaskTitleCallback = action('task title was changed')
const remooveTaskCallback = action('tast was removed')


export const TaskBaseExample = () => {
    return <>
    <Task
        changeTaskStatus={changeTaskStatusCallback}
        changeTaskTitle={changeTaskTitleCallback}
        remooveTask={remooveTaskCallback}
        t={{id:'1',isDone:true,title:'css'}}
        id={'todolistId1'}
    />
    <Task
        changeTaskStatus={changeTaskStatusCallback}
        changeTaskTitle={changeTaskTitleCallback}
        remooveTask={remooveTaskCallback}
        t={{id:'2',isDone:false,title:'html'}}
        id={'todolistId2'}
    />
    </>
}