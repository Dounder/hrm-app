export const requiredFieldValidation = (val: string) => !!val || 'Required field';

export const emailValidation = (val: string) => {
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  return regex.test(val) || 'Invalid Email';
};
