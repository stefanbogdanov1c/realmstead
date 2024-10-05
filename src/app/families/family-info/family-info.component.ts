import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpService } from '../../http.service';
import { Family, Noble } from '../../types';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  deleteFamily,
  fetchAllFamilies,
  fetchAllNobles,
  selectAllFamilies,
  selectAllNobles,
  selectFamilyById,
} from '../../app.store';
import { GoBackButtonComponent } from '../../shared/go-back-button/go-back-button.component';

@Component({
  selector: 'app-family-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, GoBackButtonComponent],
  templateUrl: 'family-info.component.html',
  styles: ``,
})
export class FamilyInfoComponent implements OnInit {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);
  route = inject(ActivatedRoute);
  router = inject(Router);

  families$: Observable<Family[]> = this.store.pipe(select(selectAllFamilies));
  nobles$: Observable<Noble[]> = this.store.pipe(select(selectAllNobles));
  family: Family | null = null;

  ngOnInit(): void {
    this.store.dispatch(fetchAllFamilies());
    this.store.dispatch(fetchAllNobles());
    this.route.paramMap.subscribe(params => {
      const id = params.get('familyId');
      if (id) {
        this.store.select(selectFamilyById(id)).subscribe(family => {
          if (family !== undefined) {
            this.family = family;
          }
        });
      } else {
        this.router.navigate(['/families']);
      }
    });
  }

  onGoToNoble(nobleId: string) {
    this.router.navigate(['/nobles', nobleId]);
  }

  onDeleteFamily(id: string) {
    this.store.dispatch(deleteFamily({ id }));
    this.router.navigate(['/families']);
  }

  onEditFamily(id: string) {
    this.router.navigate(['/families', id, 'edit']);
  }
}
