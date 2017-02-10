import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { AjaxResponse, AjaxRequest } from 'rxjs/observable/dom/AjaxObservable'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/timeoutWith'

export { AjaxResponse, AjaxRequest }



export class AjaxCancelable {
  private subject$ = new Subject<AjaxObject>()
  private canceller$ = new Subject<void>()


  constructor(
    private request?: AjaxRequest,
  ) {
    this.subject$
      .switchMap(ajaxObj => {
        return Observable.ajax(ajaxObj.request)
          .timeout(ajaxObj.timeout)
          .retry(3)
          .catch(err => {
            console.error(err)
            return Observable.of(null)
          })
          .take(1)
          .takeUntil(this.canceller$)
          .map(data => {
            if (data) { // "data" is nullable.
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
            console.error('ERROR: AjaxResponse is null.')
            ajaxObj.responseSubject$.complete()
          }
        },
        error: err => { throw err },
      })
  }


  requestAjax(request?: AjaxRequest): Observable<AjaxResponse> {
    if (!this.request && !request) {
      throw new Error('ERROR: AjaxRequest is undefined.')
    }

    const _request: AjaxRequest = Object.assign({}, this.request, request) // merge request objects.
    const timeout = _request.timeout || 1000 * 10
    const responseSubject$ = new Subject<AjaxResponse | null>()
    const ajaxObj: AjaxObject = {
      request: _request,
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


  requestAjaxAsPromise(request?: AjaxRequest): Promise<AjaxResponse> {
    return this.requestAjax(request).toPromise()
  }


  cancelAjax(): void {
    this.canceller$.next()
  }


  disposeSubjects(): void {
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
