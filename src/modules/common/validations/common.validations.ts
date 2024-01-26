export const requiredField = (val: string) => !!val || 'Campo requerido';

export const emailValidation = (val: string) => {
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  return regex.test(val) || 'Correo electrónico inválido';
};

export const requiredOption = (val: string[]) => !!val.length || 'Al menos una opción es requerida';

export const passwordValidation = (val: string) => {
  if (!/[a-z]/.test(val)) return 'La contraseña debe contener al menos una letra minúscula.';

  if (!/[A-Z]/.test(val)) return 'La contraseña debe contener al menos una letra mayúscula.';

  if (!/\d/.test(val)) return 'La contraseña debe contener al menos un dígito.';

  if (!/[#$^+=!*()@%&]/.test(val)) return 'La contraseña debe contener al menos un carácter especial.';

  if (val.length < 6) return 'La contraseña debe contener al menos 6 caracteres.';

  return true;
};