import {ToastOptions, ToastQueue, useToastQueue} from "@react-stately/toast";
import {useProviderContext} from "@heroui/system";

import {ToastRegion} from "./toast-region";
import {ToastProps} from "./use-toast";

let globalToastQueue: ToastQueue<ToastProps> | null = null;

interface ToastProviderProps {
  maxVisibleToasts?: number;
  placement?:
    | "right-bottom"
    | "left-bottom"
    | "center-bottom"
    | "right-top"
    | "left-top"
    | "center-top";
  disableAnimation?: boolean;
  toastOffset?: number;
}

export const getToastQueue = () => {
  if (!globalToastQueue) {
    globalToastQueue = new ToastQueue({
      maxVisibleToasts: Infinity,
      hasExitAnimation: true,
    });
  }

  return globalToastQueue;
};

export const ToastProvider = ({
  placement = "right-bottom",
  disableAnimation: disableAnimationProp = false,
  maxVisibleToasts = 3,
  toastOffset = 0,
}: ToastProviderProps) => {
  const toastQueue = useToastQueue(getToastQueue());
  const globalContext = useProviderContext();
  const disableAnimation = disableAnimationProp ?? globalContext?.disableAnimation ?? false;

  if (toastQueue.visibleToasts.length == 0) {
    return null;
  }

  return (
    <ToastRegion
      disableAnimation={disableAnimation}
      maxVisibleToasts={maxVisibleToasts}
      placement={placement}
      toastOffset={toastOffset}
      toastQueue={toastQueue}
    />
  );
};

export const addToast = ({...props}: ToastProps & ToastOptions) => {
  if (!globalToastQueue) {
    return;
  }

  const options: Partial<ToastOptions> = {
    priority: props?.priority,
  };

  globalToastQueue.add(props, options);
};

export const closeAll = () => {
  if (!globalToastQueue) {
    return;
  }

  const keys = globalToastQueue.visibleToasts.map((toast) => toast.key);

  keys.map((key) => {
    globalToastQueue?.close(key);
  });
};
