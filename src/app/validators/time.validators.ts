import { AbstractControl, ValidatorFn } from '@angular/forms';

export function timeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const startTime = control.get('startTime')?.value;
    const endTime = control.get('endTime')?.value;
    return startTime && endTime && startTime >= endTime ? { 'timeError': true } : null;
  };
}