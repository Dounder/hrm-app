import { NamedColor, useQuasar, Notify } from 'quasar';

interface PredefinedNotificationProps {
  message: string;
  type: NotifyType;
  position?: NotifyPosition;
}

interface CustomNotificationProps {
  message: string;
  color?: NamedColor;
  icon?: string | undefined;
  position?: NotifyPosition;
}

type NotifyPosition = 'top' | 'left' | 'right' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
type NotifyType = 'positive' | 'negative' | 'warning' | 'info' | 'ongoing';

export const useNotify = (composition = false) => {
  const $q = useQuasar();

  return {
    notify: ({ message, position = 'top', type }: PredefinedNotificationProps) => {
      if (composition) return $q.notify({ type, message, position });

      return Notify.create({ type, message, position });
    },

    notifyCustom: ({ message, position = 'bottom', color = 'primary', icon }: CustomNotificationProps) => {
      if (composition) return $q.notify({ message, position, color, icon });

      return Notify.create({ message, position, color, icon });
    },
  };
};

export default useNotify;
