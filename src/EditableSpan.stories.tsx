import { action } from '@storybook/addon-actions'
import { EditableSpan } from './EditableSpan'


export default {
    title: 'Editable span',
    component: EditableSpan
}

const changeTitleCallback = action('title was changed')


export const EditableSpanBaseExample = () => {
    return <EditableSpan title={'start title'} onChange={changeTitleCallback}/>
}