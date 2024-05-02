import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Continent } from '../types';
import { RouterModule } from '@angular/router';
import { ContinentDetailComponent } from '../continent-detail/continent-detail.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectContinents } from '../app.store';
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-continents',
  standalone: true,
  imports: [CommonModule, RouterModule, ContinentDetailComponent],
  template: `
    <div class="flex gap-2 m-5">
      @for (continent of (continents$ | async); track continent.name) {
      <div class="bg-red-200 w-full p-2 flex flex-col">
        <button class="btn" (click)="selectContinent(continent)">
          <strong>
            {{ continent.name }}
          </strong>
        </button>
      </div>
      }
    </div>
    <app-continent-detail
      [continent]="selectedContinent"
    ></app-continent-detail>
  `,
  styles: ``,
})
export class ContinentsComponent {
  store = inject(Store);
  httpService = inject(HttpService);

  continents$: Observable<Continent[]> = this.store.select(selectContinents);

  selectedContinent?: Continent;

  selectContinent(continent: Continent) {
    this.selectedContinent = continent;
  }
}
