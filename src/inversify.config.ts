import { Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'

import { ReactiveStore, storeInstance, ReactiveStoreForAppState } from './state'
import { Actions } from './actions'
import { IncrementActions } from './actions/increment.actions'
import { AjaxJpTimestampAction } from './actions/ajax.timestamp.action'


export const rootContainer = new Container(/*{ defaultScope: 'Singleton' }*/)
rootContainer.bind(ReactiveStoreForAppState).toConstantValue(storeInstance)
rootContainer.bind(Actions).toSelf()
rootContainer.bind(IncrementActions).toSelf()
rootContainer.bind(AjaxJpTimestampAction).toSelf()


export const testContainer = rootContainer.createChild()

const finalContainer = testContainer.createChild()
export const { lazyInject, lazyMultiInject } = getDecorators(finalContainer)
