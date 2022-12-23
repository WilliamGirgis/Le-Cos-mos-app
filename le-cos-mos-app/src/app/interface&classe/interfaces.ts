interface IObjectKeys {
  [key: string]: string | number;
}

interface IObjectKeys2 {
[key:string]: string | {}
}



interface formErrors extends IObjectKeys {
  email:string ,
  firstname:string,
  lastname:string,
  password:string,
  confirmPsw:string
}

interface errorMessages extends IObjectKeys2  {
  email: {
    required:string ,
    email:string
  },
  firstname: {
    required?:string,
  },
  lastname: {
    required?:string,
  },
  password: {
    required:string,
    minlength: string

  },
  confirmPsw : {
    isEqual?:string
    required?:string
  }
}

export {formErrors,errorMessages}


/*interface IObjectKeys2 {
[key:string]: {required:string,email:string} | {required:string} | {required:string,minlength:string}
}



interface formErrors extends IObjectKeys {
  email:string ,
  firstname:string,
  lastname:string,
  password:string
}

interface errorMessages extends IObjectKeys2  {
  email: {
    required:string ,
    email :string
  },
  firstname: {
    required:string,
  },
  lastname: {
    required:string,
  },
  password: {
    required:string,
    minlength: string

  },
}
*/
