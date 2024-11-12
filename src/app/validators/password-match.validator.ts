import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const password: string = formGroup.get('password')?.value;
        const confirmPassword: string = formGroup.get('passwordconf')?.value;
        return password === confirmPassword ? null : { passwordsMismatch: true };
    };
}