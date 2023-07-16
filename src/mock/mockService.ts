import { Injectable } from '@angular/core';
import * as Mock from 'mockjs';
import './article.js';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }

  startMocking(): void {
    console.log('Mocking started.');
    alert(1);
  }

}