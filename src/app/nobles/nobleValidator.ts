import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Noble } from '../types';

// Validator to ensure noble has 2 parents of different genders
export function validateParents(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const parents = control.value;
    if (!parents || parents.length !== 2) {
      return { invalidParents: 'Noble must have exactly 2 parents' };
    }
    const parent1 = parents[0];
    const parent2 = parents[1];
    if (parent1.gender === parent2.gender) {
      return { invalidParents: 'Parents must be of different genders' };
    }
    return null;
  };
}

// Validator to ensure spouse is of different gender
export function validateSpouse(genderControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const spouseId = control.value;
    const gender = genderControl.value;
    if (!spouseId) {
      return null; // No spouse selected
    }
    const spouse = control.root.get('nobles')?.value?.find((noble: Noble) => noble._id === spouseId);
    if (spouse && spouse.gender === gender) {
      return { invalidSpouse: 'Spouse must be of different gender' };
    }
    return null;
  };
}

// Validator to ensure parents are not in children list
export function validateChildren(parentsControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const children = control.value;
    const parents = parentsControl.value;
    if (!children || !parents) {
      return null;
    }
    const parentIds = parents.map((parent: Noble) => parent._id);
    const invalidChildren = children.filter((childId: string) => parentIds.includes(childId));
    if (invalidChildren.length > 0) {
      return { invalidChildren: 'Parents cannot appear in children list' };
    }
    return null;
  };
}
