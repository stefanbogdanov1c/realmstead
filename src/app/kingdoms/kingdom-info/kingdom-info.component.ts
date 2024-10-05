import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpService } from '../../http.service';
import { City, Family, Kingdom, Noble } from '../../types';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  deleteKingdom,
  fetchAllCities,
  fetchAllFamilies,
  fetchAllKingdoms,
  fetchAllNobles,
  selectAllCities,
  selectAllFamilies,
  selectAllKingdoms,
  selectAllNobles,
  selectKingdomById,
} from '../../app.store';
import { GoBackButtonComponent } from '../../shared/go-back-button/go-back-button.component';

@Component({
  selector: 'app-kingdom-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, GoBackButtonComponent],
  templateUrl: 'kingdom-info.component.html',
  styles: ``,
})
export class KingdomInfoComponent implements OnInit {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);
  route = inject(ActivatedRoute);
  router = inject(Router);

  kingdoms$: Observable<Kingdom[]> = this.store.pipe(select(selectAllKingdoms));
  cities$: Observable<City[]> = this.store.pipe(select(selectAllCities));
  families$: Observable<Family[]> = this.store.pipe(select(selectAllFamilies));
  nobles$: Observable<Noble[]> = this.store.pipe(select(selectAllNobles));
  kingdom: Kingdom | null = null;

  ngOnInit(): void {
    this.store.dispatch(fetchAllFamilies());
    this.store.dispatch(fetchAllNobles());
    this.store.dispatch(fetchAllCities());
    this.store.dispatch(fetchAllKingdoms());
    this.route.paramMap.subscribe(params => {
      const id = params.get('kingdomId');
      if (id) {
        this.store.select(selectKingdomById(id)).subscribe(kingdom => {
          if (kingdom !== undefined) {
            this.kingdom = kingdom;
          }
        });
      } else {
        this.router.navigate(['/kingdoms']);
      }
    });
  }

  onGoToNoble(nobleId: string) {
    this.router.navigate(['/nobles', nobleId]);
  }

  onGoToFamily(familyId: string) {
    this.router.navigate(['/families', familyId]);
  }

  onGoToCity(cityId: string) {
    this.router.navigate(['/cities', cityId]);
  }

  onDeleteKingdom(id: string) {
    this.store.dispatch(deleteKingdom({ id }));
    this.router.navigate(['/kingdoms']);
  }

  onEditKingdom(id: string) {
    this.router.navigate(['/kingdoms', id, 'edit']);
  }
}
