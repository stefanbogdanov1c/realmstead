import { Component, Input } from '@angular/core';
import { Continent } from '../types';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-continent-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <p>continent-detail works!</p>
    @if(continent) {
    <div class="m-5 p-2 bg-red-200">
      <span>
        {{ continent | json }}
      </span>
      <h1>{{ continent.name }}</h1>
      <div>
        <strong>Kingdom:</strong>
        <div class="flex gap-2">
          @for (kingdom of continent.kingdoms; track kingdom.name) {
          <a [routerLink]="'../kingdoms/' + [kingdom.name]" class="p-2 bg-blue-500">
            <span>{{ kingdom.name }}</span>
          </a>
          }
        </div>
      </div>
    </div>
    }
  `,
  styles: ``,
})
export class ContinentDetailComponent {
  @Input() continent?: Continent;
}
