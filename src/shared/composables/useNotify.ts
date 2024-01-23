import { NamedColor, useQuasar } from 'quasar';

interface NotificationProps {
  message: string;
  position?: notifyPosition;
}

interface CustomNotificationProps extends NotificationProps {
  color?: NamedColor;
  icon?: string | undefined;
}
type notifyPosition = 'top' | 'left' | 'right' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

const useNotify = () => {
  const $q = useQuasar();

  return {
    success: ({ message, position = 'bottom' }: NotificationProps) => $q.notify({ type: 'positive', message, position }),
    error: ({ message, position = 'bottom' }: NotificationProps) => $q.notify({ type: 'negative', message, position }),
    warning: ({ message, position = 'bottom' }: NotificationProps) => $q.notify({ type: 'warning', message, position }),
    info: ({ message, position = 'bottom' }: NotificationProps) => $q.notify({ type: 'info', message, position }),
    basic: ({ message, position = 'bottom', color = 'primary', icon }: CustomNotificationProps) => $q.notify({ color, message, position, icon }),
  };
};

export default useNotify;
