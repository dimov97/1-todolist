import { action } from '@storybook/addon-actions'
import AppWithRedux from './AppWithRedux'
import { Provider } from 'react-redux'
import { store } from './state/store'
import { ReduxStoreProviderDecorator } from './stories/ReduxStoreProviderDecorator'


export default {
    title: 'App with redux',
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]
}

const changeTitleCallback = action('title was changed')


export const AppWithReduxBaseExample = () => {
    return <AppWithRedux/>
}