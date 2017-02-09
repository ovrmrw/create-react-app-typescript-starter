import { Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'

import { ReactiveStore, storeInstance, ReactiveStoreForAppState } from './state'
import { Actions, IncrementActions, AjaxJpTimestampAction, actionsContainerModule } from './actions'


export const rootContainer = new Container(/*{ defaultScope: 'Singleton' }*/)
rootContainer.bind(ReactiveStoreForAppState).toConstantValue(storeInstance)
rootContainer.load(actionsContainerModule)



export const testContainer = rootContainer.createChild()

const finalContainer = testContainer.createChild()
export const { lazyInject, lazyMultiInject } = getDecorators(finalContainer)
