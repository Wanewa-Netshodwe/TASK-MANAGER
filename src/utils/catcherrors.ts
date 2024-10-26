import { error } from "./toast.ts";
export const catchError =(code?:string)=>{
    if(code === 'auth/email-already-in-use'){
        error('Account Already Exists')
    }
    else if(code ==='auth/invalid-email'){
        error('Invalid Email')
    }
    else if (code === 'auth/invalid-password'){
        error('invalid Password ')
        error('Password must be at least 6 Characters')
    }
    else if (code === 'auth/weak-password'){
        error('Password must Have 1 Special character and 1 Lowecase and UpperCase Character')
    }
    else if (code === 'auth/invalid-credential'){
        error('Wrong Password')
    }
    else if (code === 'auth/user-not-found'){
        error('Account does not Exist')
    }
    else if (code === 'auth/too-many-requests'){
        error('Account Blocked Try Again Later')
    }
}