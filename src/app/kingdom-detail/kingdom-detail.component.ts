import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectKingdomByName } from '../app.store';
import { Observable } from 'rxjs';
import { Kingdom } from '../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kingdom-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      kingdom-detail works!
    </p>
    @if(selectedKingdom$ | async; as kingdom) {
      {{kingdom.name}}
    }
  `,
  styles: ``
})
export class KingdomDetailComponent implements OnInit{
  store = inject(Store);
  route = inject(ActivatedRoute);

  selectedKingdom$?: Observable<Kingdom | undefined>;

  ngOnInit(): void {
    this.selectedKingdom$ = this.store.select(selectKingdomByName(this.route.snapshot.paramMap.get('kingdom')));
  }

}
