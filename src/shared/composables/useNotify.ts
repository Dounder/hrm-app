import { useQuasar } from 'quasar';

interface Props {
  type?: notifyType;
  message: string;
  position?: notifyPosition;
}
type notifyType = 'positive' | 'negative' | 'warning' | 'info' | 'primary' | 'secondary' | 'accent' | 'dark' | 'light';
type notifyPosition = 'top' | 'left' | 'right' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

const useNotify = () => {
  const $q = useQuasar();

  return {
    notify: ({ message, position = 'bottom', type = 'primary' }: Props) => $q.notify({ type, message, position }),
  };
};

export default useNotify;
