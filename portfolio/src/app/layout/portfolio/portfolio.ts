// import { Component } from '@angular/core';

// @Component({
//   imports: [],
//   selector: 'app-portfolio',
//   styleUrl: './portfolio.css',
//   templateUrl: './portfolio.html',
// })
// export class Portfolio {}
   

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css'
})
export class Portfolio implements OnInit {

  projects: Project[] = [];


  ngOnInit() {

    this.loadProjects();

  }


  loadProjects() {

    const saved =
      localStorage.getItem('portfolioProjects');

    if (saved) {

      this.projects =
        JSON.parse(saved);

    }

  }

}