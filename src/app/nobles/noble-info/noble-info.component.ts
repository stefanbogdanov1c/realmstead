import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpService } from '../../http.service';
import { Noble } from '../../types';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  deleteNoble,
  selectAllNobles,
  selectNobleById,
} from '../../app.store';

@Component({
  selector: 'app-noble-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: 'noble-info.component.html',
  styles: ``,
})
export class NobleInfoComponent implements OnInit {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);
  route = inject(ActivatedRoute);
  router = inject(Router);

  nobles$: Observable<Noble[]> = this.store.pipe(select(selectAllNobles));
  noble: Noble | null = null;

  fatherNoble$?: Observable<Noble | undefined>;
  motherNoble$?: Observable<Noble | undefined>;
  spouseNoble$?: Observable<Noble | undefined>;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('nobleId');
      if (id) {
        this.store.select(selectNobleById(id)).subscribe(noble => {
          if (noble !== undefined) {
            this.noble = null;
            this.fatherNoble$ = undefined;
            this.motherNoble$ = undefined;
            this.spouseNoble$ = undefined;
            this.noble = noble;
            if(noble.fatherId) {
              this.fatherNoble$ = this.store.select(selectNobleById(noble.fatherId))
            }
            if(noble.motherId) {
              this.motherNoble$ = this.store.select(selectNobleById(noble.motherId))
            }
            if(noble.spouseId) {
              this.spouseNoble$ = this.store.select(selectNobleById(noble.spouseId))
            }
          } else {
            this.router.navigate(['/nobles']);
          }
        });
      } else {
        this.router.navigate(['/nobles']);
      }
    });
  }

  onGoToFather(noble: Noble) {
    this.router.navigate(['/nobles', noble.fatherId]);
  }

  onGoToMother(noble: Noble) {
    this.router.navigate(['/nobles', noble.motherId]);
  }

  onGoToSpouse(noble: Noble) {
    this.router.navigate(['/nobles', noble.spouseId]);
  }

  onDeleteNoble(id: string) {
    this.store.dispatch(deleteNoble({ id }));
  }

  onEditNoble(noble: Noble) {
    this.router.navigate(['/nobles', noble._id, 'edit']);
  }

  onGoBack() {
    this.router.navigate(['/nobles']);
  }
}
