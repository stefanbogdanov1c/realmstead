import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpService } from '../http.service';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { deleteKingdom, fetchAllFamilies, fetchAllKingdoms, fetchAllNobles, selectAllCities, selectAllFamilies, selectAllKingdoms, selectAllNobles } from '../app.store';
import { Observable } from 'rxjs';
import { City, Family, Kingdom, Noble } from '../types';

@Component({
  selector: 'app-kingdoms',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: 'kingdoms.component.html',
})
export class KingdomsComponent implements OnInit {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);
  router = inject(Router);

  ngOnInit() {
    this.store.dispatch(fetchAllKingdoms());
    this.store.dispatch(fetchAllNobles());
    this.store.dispatch(fetchAllFamilies());
  }

  kingdoms$: Observable<Kingdom[]> = this.store.pipe(select(selectAllKingdoms));
  nobles$: Observable<Noble[]> = this.store.pipe(select(selectAllNobles));
  families$: Observable<Family[]> = this.store.pipe(select(selectAllFamilies));
  cities$: Observable<City[]> = this.store.pipe(select(selectAllCities));

  onDeleteKingdom(id: string) {
    this.store.dispatch(deleteKingdom({ id }));
  }

  onEditKingdom(kingdom: Kingdom) {
    this.router.navigate(['/kingdoms', kingdom._id, 'edit']);
  }

  onOpenKingdomInfo(kingdom: Kingdom) {
    this.router.navigate(['/kingdoms', kingdom._id]);
  }

  onCreateKingdom() {
    this.router.navigate(['/kingdoms', 'create']);
  }
}
