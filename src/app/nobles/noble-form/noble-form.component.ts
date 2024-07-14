import { Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpService } from '../../http.service';
import { Noble } from '../../types';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createNewNoble, updateNoble } from '../../app.store';

@Component({
  selector: 'app-noble-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: 'noble-form.component.html',
  styles: ``,
})
export class NobleFormComponent implements OnChanges {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);
  router = inject(Router);

  @Input() nobles: Noble[] = [];
  @Input() noble: Noble | null = null;

  nobleForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    age: [1, Validators.required],
    alive: [true, Validators.required],
    motherId: [''],
    fatherId: [''],
    spouseId: [''],
    gender: ['male', Validators.required],
    title: ['Ser'],
    description: ['A Noble'],
    nickname: [''],
  });

  ngOnChanges(): void {
    if (this.noble) {
      this.populateForm(this.noble);
    } else {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.nobleForm.reset({
      name: '',
      lastName: '',
      age: 1,
      alive: true,
      motherId: '',
      fatherId: '',
      spouseId: '',
      gender: 'male',
      title: 'Ser',
      description: 'A Noble',
      nickname: '',
    });
  }

  populateForm(noble: Noble): void {
    this.nobleForm.patchValue({
      name: noble.name,
      lastName: noble.lastName,
      age: noble.age,
      alive: noble.alive,
      motherId: noble.motherId || '',
      fatherId: noble.fatherId || '',
      spouseId: noble.spouseId || '',
      gender: noble.gender,
      title: noble.title,
      description: noble.description,
      nickname: noble.nickname,
    });
  }

  hasValidParents(nobles: Noble[], parentGender: 'male' | 'female') {
    const nobleAge = this.nobleForm.get('age')?.value ?? 0;
    return nobles.some(noble => noble.gender === parentGender && noble.age > nobleAge);
  }

  filterValidParents(nobles: Noble[], parentGender: 'male' | 'female') {
    const nobleAge = this.nobleForm.get('age')?.value ?? 0;
    return nobles.filter(noble => noble.gender === parentGender && noble.age > nobleAge);
  }

  hasValidSpouses(nobles: Noble[]) {
    const nobleGender = this.nobleForm.get('gender')?.value ?? 'male';
    const currentNobleId = this.noble?._id;
    return nobles.some(noble => noble.gender !== nobleGender && (!noble.spouseId || noble.spouseId === currentNobleId));
  }

  filterValidSpouses(nobles: Noble[]) {
    const nobleGender = this.nobleForm.get('gender')?.value ?? 'male';
    const currentNobleId = this.noble?._id;
    return nobles.filter(noble => noble.gender !== nobleGender && (!noble.spouseId || noble.spouseId === currentNobleId));
  }

  onSubmit() {
    const nobleFromForm = this.nobleForm.value;
    if (nobleFromForm.motherId === '') {
      delete nobleFromForm.motherId;
    }
    if (nobleFromForm.fatherId === '') {
      delete nobleFromForm.fatherId;
    }
    if (nobleFromForm.spouseId === '') {
      delete nobleFromForm.spouseId;
    }

    if (!this.noble) {
      this.store.dispatch(createNewNoble(nobleFromForm as Noble));
    } else {
      const noble = {
        _id: this.noble!._id,
        ...nobleFromForm,
      };

      this.store.dispatch(updateNoble(noble as Noble));

      // Find all nobles whose spouseId is the ID of the current noble
      const noblesToUpdate = this.nobles.filter(spouseNoble => spouseNoble.spouseId === this.noble?._id);

      // Update all these nobles to unset their spouseId
      noblesToUpdate.forEach(nobleToUpdate => {
        const updatedNoble = {
          ...nobleToUpdate,
          spouseId: undefined
        };
        this.store.dispatch(updateNoble(updatedNoble as Noble));
      });

      // Update the new spouse if there is one
      if (noble.spouseId) {
        const newSpouse = this.nobles.find(spouseNoble => spouseNoble._id === noble.spouseId);
        if (newSpouse) {
          const updatedNewSpouse = {
            ...newSpouse,
            spouseId: noble._id,
          };
          this.store.dispatch(updateNoble(updatedNewSpouse as Noble));
        }
      }
    }
    this.router.navigate(['nobles']);
  }
}
