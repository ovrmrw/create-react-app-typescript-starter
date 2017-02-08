import { injectable } from 'inversify'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { AjaxResponse, AjaxRequest } from 'rxjs/observable/dom/ajaxObservable'

import { lazyInject } from '../inversify.config'



@injectable()
export class AjaxActions {
  private jpTimestampAjaxSubject$ = new Subject<AjaxObject>()


  constructor() {
    this.jpTimestampAjaxSubject$
      .switchMap(ajaxObj => {
        return Observable.ajax(ajaxObj.request)
          .take(1)
          .map(data => {
            ajaxObj.response = data
            return ajaxObj
          })
      })
      .subscribe(ajaxObj => {
        if (ajaxObj.response && ajaxObj.response.status === 200) {
          ajaxObj.responseSubject$.next(ajaxObj.response)
        } else {
          ajaxObj.responseSubject$.complete()
        }
      })
  }


  requestJpTimestamp$(): Observable<number> {
    const responseSubject$ = new Subject<AjaxResponse>()
    const ajaxObj: AjaxObject = {
      request: {
        url: 'https://ntp-a1.nict.go.jp/cgi-bin/json',
        crossDomain: true,
      },
      responseSubject$,
    }

    this.jpTimestampAjaxSubject$.next(ajaxObj)

    return responseSubject$
      .take(1)
      .map(data => data.response)
      .map(res => res.st as number)
      .map(value => value * 1000)
  }


  completeSubject(): void {
    this.jpTimestampAjaxSubject$.complete()
  }

}


interface AjaxObject {
  request: AjaxRequest,
  response?: AjaxResponse,
  responseSubject$: Subject<AjaxResponse>,
}




/////////////////////////////////////////////////// MOCK
@injectable()
export class MockAjaxActions extends AjaxActions {
  constructor() {
    super()
    this.completeSubject()
  }


  requestJpTimestamp$(): Observable<number> {
    return Observable.of(1).delay(200)
  }

}
