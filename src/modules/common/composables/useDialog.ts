import { Dialog } from 'quasar';

interface Props {
  message: string;
  title: string;
  html?: boolean;
  isDelete?: boolean;
  position?: 'top' | 'right' | 'bottom' | 'left' | 'standard' | undefined;
}

export const useDialog = () => {
  return {
    alertDialog: ({ title, message, html = false }: Props) => {
      Dialog.create({ title, message, html });
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
