import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const confirmPasswordValidation : ValidatorFn = (control : AbstractControl) : ValidationErrors | null => {
    debugger;
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if(!password || !confirmPassword){
        return null;
    }
    return password.value === confirmPassword.value ? null : {passwordMismatch : true};
} 