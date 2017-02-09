import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { AjaxResponse, AjaxRequest } from 'rxjs/observable/dom/AjaxObservable'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/takeUntil'

export { AjaxResponse, AjaxRequest }



export abstract class AjaxCancelableBase {
  private subject$ = new Subject<AjaxObject>()
  private canceller$ = new Subject<void>()


  constructor() {
    this.subject$
      .switchMap(ajaxObj => {
        return Observable.ajax(ajaxObj.request)
          .timeoutWith(ajaxObj.timeout, Observable.of(null))
          .take(1)
          .takeUntil(this.canceller$)
          .map(data => {
            if (data) {
              ajaxObj.response = data
            }
            return ajaxObj
          })

      })
      .subscribe({
        next: ajaxObj => {
          if (ajaxObj.response) {
            ajaxObj.responseSubject$.next(ajaxObj.response)
          } else {
            // ajaxObj.responseSubject$.error('ERROR: ajaxObj.response must be truthy.')
            console.error('ERROR: AjaxResponse is null.')
            ajaxObj.responseSubject$.complete()
          }
        },
        error: err => { throw err },
      })
  }


  requestAjax$(request: AjaxRequest, timeout: number = 5000): Observable<AjaxResponse> {
    const responseSubject$ = new Subject<AjaxResponse | null>()
    const ajaxObj: AjaxObject = {
      request,
      response: null,
      responseSubject$,
      timeout,
    }

    this.subject$.next(ajaxObj)

    return responseSubject$
      .timeoutWith(timeout, Observable.of(null))
      .take(1)
      .filter(data => {
        if (data) {
          return true
        } else {
          console.error('ERROR: AjaxResponse is null.')
          return false
        }
      })
  }


  requestAjaxAsPromise(request: AjaxRequest): Promise<AjaxResponse> {
    return this.requestAjax$(request).toPromise()
  }


  cancelAjax(): void {
    this.canceller$.next()
  }


  dispose(): void {
    this.subject$.complete()
    this.canceller$.complete()
  }

}



interface AjaxObject {
  request: AjaxRequest,
  response: AjaxResponse | null,
  responseSubject$: Subject<AjaxResponse>,
  timeout: number,
}
