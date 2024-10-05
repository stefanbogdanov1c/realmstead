import { Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { createNewKingdom, fetchAllCities, fetchAllFamilies, fetchAllKingdoms, fetchAllNobles, selectAllCities, selectAllFamilies, selectAllKingdoms, selectAllNobles, updateKingdom } from '../../app.store';
import { HttpService } from '../../http.service';
import { Kingdom, Noble, Family, City } from '../../types';
import { Observable } from 'rxjs';
import { GoBackFormButtonComponent } from '../../shared/go-back-form-button/go-back-form-button.component';

@Component({
  selector: 'app-kingdom-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, GoBackFormButtonComponent],
  templateUrl: './kingdom-form.component.html',
  styles: [],
})
export class KingdomFormComponent implements OnInit, OnChanges {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);
  router = inject(Router);

  @Input() kingdom: Kingdom | null = null;

  kingdomForm = this.fb.group({
    name: ['', Validators.required],
    rulerId: [''],
    rulerFamilyId: [''],
    vassalFamiliesIds: this.fb.array([] as string[]), // Explicitly typed as string[]
    capitalId: [''],
    description: [''],
  });

  get vassalFamiliesArray(): FormArray {
    return this.kingdomForm.get('vassalFamiliesIds') as FormArray;
  }

  ngOnInit(): void {
    this.store.dispatch(fetchAllKingdoms());
    this.store.dispatch(fetchAllNobles());
    this.store.dispatch(fetchAllFamilies());
    this.store.dispatch(fetchAllCities());
  }

  kingdoms$: Observable<Kingdom[]> = this.store.pipe(select(selectAllKingdoms));
  nobles$: Observable<Noble[]> = this.store.pipe(select(selectAllNobles));
  families$: Observable<Family[]> = this.store.pipe(select(selectAllFamilies));
  cities$: Observable<City[]> = this.store.pipe(select(selectAllCities));

  ngOnChanges(): void {
    if (this.kingdom) {
      this.populateForm(this.kingdom);
    } else {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.kingdomForm.reset({
      name: '',
      rulerId: '',
      rulerFamilyId: '',
      vassalFamiliesIds: [],
      capitalId: '',
      description: '',
    });
  }

  populateForm(kingdom: Kingdom): void {
    this.kingdomForm.patchValue({
      name: kingdom.name,
      rulerId: kingdom.rulerId || '',
      rulerFamilyId: kingdom.rulerFamilyId || '',
      capitalId: kingdom.capitalId || '',
      description: kingdom.description || '',
    });

    const vassalFamiliesArray = this.kingdomForm.get('vassalFamiliesIds') as FormArray;
    vassalFamiliesArray.clear();
    (kingdom.vassalFamiliesIds || []).forEach(familyId => {
      vassalFamiliesArray.push(new FormControl(familyId));
    });
  }

  filterValidRulers(nobles: Noble[]) {
    return nobles.filter(noble => noble.alive);
  }

  addVassalFamily(event: any, removeInput: boolean = false): void {
    const familyId = event.target.value;

    if (removeInput) {
      event.target.value = '';  // Reset the dropdown
    }

    if (familyId && !this.vassalFamiliesArray.value.includes(familyId)) {
      this.vassalFamiliesArray.push(new FormControl(familyId));
    }
  }

  removeVassalFamily(index: number): void {
    this.vassalFamiliesArray.removeAt(index);
  }

  onSubmit() {
    const kingdomFromForm = this.kingdomForm.value;

    if (!this.kingdom) {
      this.store.dispatch(createNewKingdom(kingdomFromForm as Kingdom));
    } else {
      const kingdom = {
        _id: this.kingdom!._id,
        ...kingdomFromForm,
      };
      this.store.dispatch(updateKingdom(kingdom as Kingdom));
    }
    this.router.navigate(['kingdoms']);
  }
}
