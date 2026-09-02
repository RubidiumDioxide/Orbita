import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ThemeName, PALETTES } from './planet.themes';


@Component({
  selector: 'app-planet',
  standalone: true,
  imports: [ 
    CommonModule, 
    MatIconModule 
  ],
  templateUrl: './planet.html',
  styleUrls: ['./planet.scss'], 
  host: {
    '[style.--theme-primary]': 'palette().primary',
    '[style.--theme-dark]': 'palette().dark',
    '[style.--theme-glow]': 'palette().glow',
    '[style.--planet-size]': 'planetSize()',
    '[style.--satellite-size]': 'satelliteSize()',
    '[style.--orbit-radius]': 'orbitRadius()',
    '[style.--tilt-angle]': 'tiltAngle()',
    '[style.--roll-angle]': 'rollAngle()',
  }
})
export class PlanetComponent {
  icons = input<string[]>(['check_mark', 'public', 'flight_takeoff', 'satellite', 'explore', 'stars', 'science']); 
  animationDuration = input('20s');
  theme = input<ThemeName>('red');
  planetSize = input('200px');
  satelliteSize = input('50px');
  orbitRadius = input('220px');
  tiltAngle = input('-10deg');
  rollAngle = input('-10deg');
  palette = computed(() => PALETTES[this.theme()] ?? PALETTES.red); 

  // prepare icon list /w animation properties 
  satellites = computed(() => {
    const iconsTotal = this.icons().length;
    const duration = this.parseDurationToMs(this.animationDuration()); 
    const animationStep = duration / iconsTotal; 

    return this.icons().map((icon, index) => ({
      icon,
      style: {
        'animation-delay': `${-index * animationStep}ms`,
        'animation-duration': `${duration}ms`
      }
    })); 
  }); 

  parseDurationToMs(value: string): number {
    const trimmed = value.trim().toLowerCase();
    
    if (trimmed.endsWith('ms')) {
      return parseFloat(trimmed) || 0;
    }
    
    if (trimmed.endsWith('s')) {
      return (parseFloat(trimmed) || 0) * 1000;
    }

    // treat plain string number without units specified as seconds
    return (parseFloat(trimmed) || 0) * 1000;
  }
}