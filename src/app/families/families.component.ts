import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpService } from '../http.service';
import { Family, Noble } from '../types';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  deleteFamily,
  fetchAllFamilies,
  fetchAllNobles,
  selectAllFamilies,
  selectAllNobles,
} from '../app.store';

@Component({
  selector: 'app-families',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: 'families.component.html',
  styles: ``,
})
export class FamiliesComponent implements OnInit {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);
  router = inject(Router);

  ngOnInit() {
    this.store.dispatch(fetchAllFamilies());
    this.store.dispatch(fetchAllNobles());
  }

  families$: Observable<Family[]> = this.store.pipe(select(selectAllFamilies));
  nobles$: Observable<Noble[]> = this.store.pipe(select(selectAllNobles));

  onDeleteFamily(id: string) {
    this.store.dispatch(deleteFamily({ id }));
  }

  onEditFamily(family: Family) {
    this.router.navigate(['/families', family._id, 'edit']);
  }

  onOpenFamilyInfo(family: Family) {
    this.router.navigate(['/families', family._id]);
  }

  onCreateFamily() {
    this.router.navigate(['/families', 'create']);
  }
}
