import { FormGroup, AbstractControl } from '@angular/forms';
    
export function CompareTPasswords(tpassword: string, tconfirmPassword: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[tpassword];
    const matchingControl = formGroup.controls[tconfirmPassword];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}