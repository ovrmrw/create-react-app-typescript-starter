import { Container, injectable, unmanaged } from 'inversify'
import getDecorators from 'inversify-inject-decorators'

import { ReactiveStore, storeInstance } from './state'
import { Actions } from './actions'
import { IncrementActions } from './actions/increment.actions'
import { AjaxActions } from './actions/ajax.actions'
import { Testing } from './symbols'


const rootContainer = new Container({ defaultScope: 'Singleton' })
rootContainer.bind(ReactiveStore).toConstantValue(storeInstance)
rootContainer.bind(Actions).toSelf()
rootContainer.bind(IncrementActions).toSelf()
rootContainer.bind(AjaxActions).toSelf()
// rootContainer.bind(Testing).toConstantValue(new Testing())


export const container = rootContainer.createChild()

export const { lazyInject, lazyMultiInject } = getDecorators(container)
