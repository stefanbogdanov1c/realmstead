import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpService } from '../http-service.service';
import { Noble } from '../types';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  createNewNoble,
  deleteNoble,
  fetchAllNobles,
  selectAllNobles,
} from '../app.store';
import { validateChildren, validateParents, validateSpouse } from './nobleValidator';

@Component({
  selector: 'app-nobles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: 'nobles.component.html',
  styles: ``,
})
export class NoblesComponent implements OnInit {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);

  nobleForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    age: [1, Validators.required],
    alive: [true, Validators.required],
    spouse: ['', validateSpouse(this.fb.control('gender'))],
    siblings: [[]],
    parents: [[], validateParents()],
    // children: [[], validateChildren(this.fb.control('parents'))],
    gender: ['male', Validators.required],
    title: ['Ser'],
    description: ['A Noble'],
    nickname: [''],
  });

  ngOnInit() {
    this.store.dispatch(fetchAllNobles());
  }

  nobles$: Observable<Noble[]> = this.store.pipe(select(selectAllNobles));

  onSubmit() {
    const value = this.nobleForm.value as Noble;
    console.log(value);
    this.store.dispatch(createNewNoble(value));
    this.nobleForm.reset();
  }

  onDeleteNoble(id: string) {
    console.log(id);
    this.store.dispatch(deleteNoble({ id }));
  }
}
