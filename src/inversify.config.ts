import { Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'

import { ReactiveStore, storeInstance } from './state'
import { Actions } from './lib/actions'


const rootContainer = new Container()
rootContainer.bind(ReactiveStore).toConstantValue(storeInstance)
rootContainer.bind(Actions).toSelf()


export const container = rootContainer.createChild()

export const { lazyInject, lazyMultiInject } = getDecorators(container)
