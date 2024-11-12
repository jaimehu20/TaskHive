import { AbstractControl, ValidatorFn } from '@angular/forms';

export function timeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const startTime: string = control.get('startTime')?.value;
    const endTime: string = control.get('endTime')?.value;
    return startTime && endTime && startTime >= endTime ? { 'timeError': true } : null;
  };
}