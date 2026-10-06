
// import { Component } from '@angular/core';
// import { Router, RouterOutlet } from '@angular/router';
// import { Home } from './layout/home/home';
// import { About } from './layout/about/about';
// import { Skills } from './layout/skills/skills';
// import { Services } from './layout/services/services';
// import { Portfolio } from './layout/portfolio/portfolio';
// import { Contact } from './layout/contact/contact';
// import { Footer } from './layout/footer/footer';
// @Component({
//   selector: 'app-root',
//   imports: [
//     Home,
//     About,
//     Skills,
//     Services,
//     Portfolio,
//     Contact,
//     Footer,
//     RouterOutlet
//   ],

//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class App {

//   constructor(public router: Router) {}

// }



  
  import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { Navbar } from './layout/navbar/navbar';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Navbar,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(public router: Router) {}

}