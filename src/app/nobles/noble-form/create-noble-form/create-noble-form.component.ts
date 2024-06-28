import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpService } from '../../../http.service';
import { Noble } from '../../../types';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createNewNoble, selectAllNobles } from '../../../app.store';
import { NobleFormComponent } from '../noble-form.component';

@Component({
  selector: 'app-create-noble-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NobleFormComponent],
  templateUrl: 'create-noble-form.component.html',
  styles: ``,
})
export class CreateNobleFormComponent {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);

  nobles$ = this.store.select(selectAllNobles);

  nobleForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    age: [1, Validators.required],
    alive: [true, Validators.required],
    motherId: [''],
    fatherId: [''],
    gender: ['male', Validators.required],
    title: ['Ser'],
    description: ['A Noble'],
    nickname: [''],
  });

  hasValidParents(nobles: Noble[], parentGender:'male'|'female') {
    const nobleAge = this.nobleForm.get('age')?.value ?? 0;
    return nobles.some(noble => noble.gender === parentGender && noble.age > nobleAge);
  }

  filterValidParents(nobles: Noble[], parentGender:'male'|'female') {
    const nobleAge = this.nobleForm.get('age')?.value ?? 0;
    return nobles.filter(noble => noble.gender === parentGender && noble.age > nobleAge);
  }

  onSubmit() {
    const nobleFromForm = this.nobleForm.value as Noble;
    if (nobleFromForm.motherId === '') {
      delete nobleFromForm.motherId;
    }
    if (nobleFromForm.fatherId === '') {
      delete nobleFromForm.fatherId;
    }
    this.store.dispatch(createNewNoble(nobleFromForm));
  }
}
