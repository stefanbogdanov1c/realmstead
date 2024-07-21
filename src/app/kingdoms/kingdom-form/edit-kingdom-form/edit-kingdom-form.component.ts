import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpService } from '../../../http.service';
import { Kingdom } from '../../../types';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { fetchAllFamilies, selectAllKingdoms, selectKingdomById } from '../../../app.store';
import { Observable } from 'rxjs';
import { KingdomFormComponent } from '../kingdom-form.component';


@Component({
  selector: 'app-edit-kingdom-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, KingdomFormComponent],
  templateUrl: 'edit-kingdom-form.component.html',
  styles: ``,
})
export class EditKingdomFormComponent implements OnInit {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);
  route = inject(ActivatedRoute);
  router = inject(Router);

  kingdoms$: Observable<Kingdom[]> = this.store.pipe(select(selectAllKingdoms));
  kingdom: Kingdom | null = null;

  ngOnInit(): void {
    this.store.dispatch(fetchAllFamilies());
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
}
