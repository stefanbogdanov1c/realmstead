import { Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpService } from '../../http.service';
import { Family, Noble } from '../../types';
import { FormBuilder, FormControl, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createNewFamily, fetchAllNobles, selectAllNobles, updateFamily } from '../../app.store';

@Component({
  selector: 'app-family-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: 'family-form.component.html',
  styles: ``,
})
export class FamilyFormComponent implements OnInit, OnChanges {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);
  router = inject(Router);

  @Input() family: Family | null = null;

  nobles: Noble[] = [];

  familyForm = this.fb.group({
    name: ['', Validators.required],
    rulerId: [''],
    founderId: [''],
    members: this.fb.array([] as string[]),  // Explicitly typed as string[]
    description: [''],
  });

  get membersArray(): FormArray {
    return this.familyForm.get('members') as FormArray;
  }

  ngOnInit(): void {
    this.store.dispatch(fetchAllNobles());
    this.loadNobles();
  }

  ngOnChanges(): void {
    if (this.family) {
      this.populateForm(this.family);
      this.updateMembersFromRulerAndFounder();
    } else {
      this.resetForm();
    }
  }

  loadNobles(): void {
    this.store.select(selectAllNobles).subscribe((nobles: Noble[]) => {
      this.nobles = nobles;
    });
  }

  resetForm(): void {
    this.familyForm.reset({
      name: '',
      rulerId: '',
      founderId: '',
      members: [],
      description: '',
    });
  }

  populateForm(family: Family): void {
    this.familyForm.patchValue({
      name: family.name,
      rulerId: family.rulerId,
      founderId: family.founderId,
      description: family.description,
    });

    const membersArray = this.familyForm.get('members') as FormArray;
    membersArray.clear();
    (family.members || []).forEach(member => {
      membersArray.push(new FormControl(member));
    });
  }

  updateMembersFromRulerAndFounder(): void {
    const rulerId = this.familyForm.get('rulerId')?.value;
    const founderId = this.familyForm.get('founderId')?.value;

    if (rulerId && !this.membersArray.value.includes(rulerId)) {
      this.membersArray.push(new FormControl(rulerId));
    }

    if (founderId && !this.membersArray.value.includes(founderId)) {
      this.membersArray.push(new FormControl(founderId));
    }
  }

  addMember(event: any, removeInput: boolean = false): void {
    const memberId = event.target.value;

    if (removeInput) {
      event.target.value = '';  // Reset the dropdown
    }

    if (memberId && !this.membersArray.value.includes(memberId)) {
      this.membersArray.push(new FormControl(memberId));
    }
  }

  removeMember(index: number): void {
    const removedMemberId = this.membersArray.at(index).value;
    this.membersArray.removeAt(index);

    // Update rulerId and founderId if they match the removed member
    if (this.familyForm.get('rulerId')?.value === removedMemberId) {
      this.familyForm.get('rulerId')?.setValue('');
    }

    if (this.familyForm.get('founderId')?.value === removedMemberId) {
      this.familyForm.get('founderId')?.setValue('');
    }
  }

  onSubmit() {
    const familyFromForm = this.familyForm.value;

    if (!this.family) {
      this.store.dispatch(createNewFamily(familyFromForm as Family));
    } else {
      const family = {
        _id: this.family!._id,
        ...familyFromForm,
      };
      this.store.dispatch(updateFamily(family as Family));
    }

    this.router.navigate(['families']);
  }
}
