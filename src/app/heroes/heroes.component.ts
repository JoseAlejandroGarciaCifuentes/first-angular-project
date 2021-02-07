import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  hero2: Hero = {
    id: 2,
    name: 'Hades'

  };
  constructor() { }

  //Similar to viewDidLoad or onCreate
  ngOnInit(): void {
    
  }

}