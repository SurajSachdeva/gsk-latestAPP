import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  menuSubject$ : Subject<boolean> =new Subject<boolean>();
  loaderSubject$ : Subject<boolean> =new Subject<boolean>();
  constructor() {

   }
}
