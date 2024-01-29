import { Dialog } from 'quasar';

interface Props {
  message: string;
  title: string;
  isDelete?: boolean;
  position?: 'top' | 'right' | 'bottom' | 'left' | 'standard' | undefined;
}

export const useDialog = () => {
  return {
    alertDialog: ({ title, message }: Props) => {
      Dialog.create({ title, message });
    },
    confirmDialog: ({ title, message, isDelete = false, position = 'standard' }: Props) => {
      return Dialog.create({
        title,
        message,
        cancel: true,
        persistent: true,
        position,
        ok: {
          label: isDelete ? 'Eliminar' : 'Aceptar',
          color: isDelete ? 'negative' : 'primary',
          noCaps: true,
        },
        cancel: {
          label: 'Cancelar',
          color: isDelete ? 'primary' : 'negative',
          flat: true,
          noCaps: true,
        },
      });
    },
  };
};

export default useDialog;
