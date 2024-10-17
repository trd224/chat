import { AbstractControl } from "@angular/forms";

export function mobileNumberValidator(control: AbstractControl){
    if(control && (control.value !== null && control.value !== undefined)){
        const regex = new RegExp('^[6-9]{1}[0-9]{9}$');

        if(!regex.test(control.value)){
            return {
                isError: true
            }
        }
    }
    return null;
}

export function passwordValidator(control: AbstractControl){
    if(control && (control.value !== null || control.value !== undefined)){
        const cnfPassValue = control.value;
        const passControl = control.root.get("password");
        if(passControl){
            const passValue = passControl.value;
            if(passValue !== cnfPassValue){
                return {
                    passwordNotMatchError : true
                }
            }
        }
    }
    return null;
}