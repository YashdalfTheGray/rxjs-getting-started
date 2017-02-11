import { Observable } from "rxjs/Observable";

import "./load-operators";
import { load } from "./loader";

const output = <HTMLElement>document.querySelector('#output');
const button = <HTMLElement>document.querySelector('#button');

const source = Observable.fromEvent(button, 'click');

source.flatMap(e => load('movies.json'))
.map(movies => movies.map(m => `<div>${m.title}</div>`).join(''))
.subscribe(
    ms => output.innerHTML = ms,
    e => console.log(`Got error: ${e}`),
    () => console.log('No more stuff left')
);
