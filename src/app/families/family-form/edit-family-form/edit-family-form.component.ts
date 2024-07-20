import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpService } from '../../../http.service';
import { Family } from '../../../types';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { fetchAllFamilies, selectAllFamilies, selectFamilyById } from '../../../app.store';
import { Observable } from 'rxjs';
import { FamilyFormComponent } from '../family-form.component';


@Component({
  selector: 'app-edit-family-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FamilyFormComponent],
  templateUrl: 'edit-family-form.component.html',
  styles: ``,
})
export class EditFamilyFormComponent implements OnInit {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);
  route = inject(ActivatedRoute);
  router = inject(Router);

  families$: Observable<Family[]> = this.store.pipe(select(selectAllFamilies));
  family: Family | null = null;

  ngOnInit(): void {
    this.store.dispatch(fetchAllFamilies());
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
}
