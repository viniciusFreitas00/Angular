import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app12';

  ngOnInit(): void {

    let firebaseConfig = {
      apiKey: "AIzaSyADQVsCZHOulfmQEmXuKarrHdK-n56UjSQ",
      authDomain: "angular-instagram-clone-2754c.firebaseapp.com",
      databaseURL: "https://angular-instagram-clone-2754c.firebaseio.com",
      projectId: "angular-instagram-clone-2754c",
      storageBucket: "angular-instagram-clone-2754c.appspot.com",
      messagingSenderId: "175269133167",
      appId: "1:175269133167:web:de4e1480e7c019c55e869a",
      measurementId: "G-309XMRW8QF"
    };
    
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
