import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpService } from '../../../http.service';
import { Noble } from '../../../types';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { fetchAllNobles, selectAllNobles, selectNobleById } from '../../../app.store';
import { Observable } from 'rxjs';
import { NobleFormComponent } from '../noble-form.component';

@Component({
  selector: 'app-edit-noble-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NobleFormComponent],
  templateUrl: 'edit-noble-form.component.html',
  styles: ``,
})
export class EditNobleFormComponent implements OnInit {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);
  route = inject(ActivatedRoute);
  router = inject(Router);

  nobles$: Observable<Noble[]> = this.store.pipe(select(selectAllNobles));
  noble: Noble | null = null;

  ngOnInit(): void {
    this.store.dispatch(fetchAllNobles());
    this.route.paramMap.subscribe(params => {
      const id = params.get('nobleId');
      if (id) {
        this.store.select(selectNobleById(id)).subscribe(noble => {
          if (noble !== undefined) {
            this.noble = noble;
          }
        });
      } else {
        this.router.navigate(['/nobles']);
      }
    });
  }
}
