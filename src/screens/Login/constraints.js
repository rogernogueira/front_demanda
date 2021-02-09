export const constraints = {
    emailAddress: {
      presence: {
        allowEmpty: false,
        message: "^Por favor entre com um endereço de email"
      },
      email: {
        message: "^Por favor entre com um endereço de email valido"
      }
    },
  };
  
  export default constraints;