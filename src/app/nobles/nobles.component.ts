import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpService } from '../http.service';
import { Noble } from '../types';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  deleteNoble,
  fetchAllNobles,
  selectAllNobles,
} from '../app.store';
import { CreateNobleFormComponent } from './noble-form//create-noble-form/create-noble-form.component';

@Component({
  selector: 'app-nobles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CreateNobleFormComponent],
  templateUrl: 'nobles.component.html',
  styles: ``,
})
export class NoblesComponent implements OnInit {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);
  router = inject(Router);

  ngOnInit() {
    this.store.dispatch(fetchAllNobles());
  }

  nobles$: Observable<Noble[]> = this.store.pipe(select(selectAllNobles));

  onDeleteNoble(id: string) {
    this.store.dispatch(deleteNoble({ id }));
  }

  onEditNoble(noble: Noble) {
    this.router.navigate(['/nobles', noble._id, 'edit']);
  }

  onOpenNobleInfo(noble: Noble) {
    this.router.navigate(['/nobles', noble._id]);
  }

  onCreateNoble() {
    this.router.navigate(['/nobles', 'create']);
  }
}
