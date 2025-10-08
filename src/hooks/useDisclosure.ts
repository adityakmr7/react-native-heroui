import { useState, useCallback } from 'react';

export interface UseDisclosureProps {
  /** Initial open state */
  defaultIsOpen?: boolean;
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback when state changes */
  onOpen?: () => void;
  /** Callback when closing */
  onClose?: () => void;
}

export interface UseDisclosureReturn {
  /** Whether the component is open */
  isOpen: boolean;
  /** Open the component */
  onOpen: () => void;
  /** Close the component */
  onClose: () => void;
  /** Toggle the component */
  onToggle: () => void;
  /** Get props for trigger element */
  getDisclosureProps: () => {
    onPress: () => void;
  };
}

/**
 * Hook to manage disclosure state (open/close)
 * Useful for modals, drawers, dropdowns, etc.
 *
 * Inspired by Chakra UI's useDisclosure
 *
 * @example
 * const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
 *
 * return (
 *   <>
 *     <Button onPress={onOpen}>Open Modal</Button>
 *     <Modal isOpen={isOpen} onClose={onClose}>
 *       ...
 *     </Modal>
 *   </>
 * );
 *
 * @example
 * // With trigger props
 * const { isOpen, onClose, getDisclosureProps } = useDisclosure();
 *
 * return (
 *   <>
 *     <Button {...getDisclosureProps()}>Toggle</Button>
 *     <Modal isOpen={isOpen} onClose={onClose}>
 *       ...
 *     </Modal>
 *   </>
 * );
 */
export const useDisclosure = (
  props: UseDisclosureProps = {}
): UseDisclosureReturn => {
  const {
    defaultIsOpen = false,
    isOpen: isOpenProp,
    onOpen: onOpenProp,
    onClose: onCloseProp,
  } = props;

  const [isOpenState, setIsOpenState] = useState(defaultIsOpen);

  const isControlled = isOpenProp !== undefined;
  const isOpen = isControlled ? isOpenProp : isOpenState;

  const onOpen = useCallback(() => {
    if (!isControlled) {
      setIsOpenState(true);
    }
    onOpenProp?.();
  }, [isControlled, onOpenProp]);

  const onClose = useCallback(() => {
    if (!isControlled) {
      setIsOpenState(false);
    }
    onCloseProp?.();
  }, [isControlled, onCloseProp]);

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen, onClose, onOpen]);

  const getDisclosureProps = useCallback(
    () => ({
      onPress: onToggle,
    }),
    [onToggle]
  );

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    getDisclosureProps,
  };
};
