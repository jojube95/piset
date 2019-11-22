import {Component, OnInit} from '@angular/core';


const config = {
  apiKey: ' AIzaSyCZq6n9XqQE6_rW-T-fXX8aEUTQTnu8qsk',
  authDomain: 'piset-9bf03.firebaseapp.com',
  databaseURL: 'https://piset-9bf03.firebaseio.com',
  projectId: 'piset-9bf03',
  storageBucket: 'piset-9bf03.appspot.com',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
  }
}

