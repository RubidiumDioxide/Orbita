import { Component, signal } from '@angular/core';
import { PlanetComponent } from '../planet/planet';


@Component({
  selector: 'app-root',
  imports: [ 
    PlanetComponent 
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Orbita');
}
