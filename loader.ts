import { Observable } from "rxjs/Observable";

import { Movie } from "./movie";

export function load (url: string) {
    return Observable.defer(() => Observable.fromPromise(fetch(url).then(r => {
        if (r.status === 200) {
            return r.json<Array<Movie>>();
        }
        else {
            return Promise.reject(r);
        }
    }))).retryWhen(retryStrategy());
}

function retryStrategy({ attempts = 4, delay = 1000 } = {}) {
    return errors => errors.scan((acc, e) => {
        acc++;
        if (acc < attempts) {
            return acc;
        }
        else {
            throw new Error(e);
        }
    }, 0).delay(1000);
}
