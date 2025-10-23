import { renderHook, act } from '@testing-library/react-hooks';
import { useDisclosure } from '../useDisclosure';

describe('useDisclosure', () => {
  describe('uncontrolled mode', () => {
    it('should start closed by default', () => {
      const { result } = renderHook(() => useDisclosure());

      expect(result.current.isOpen).toBe(false);
    });

    it('should start open when defaultIsOpen is true', () => {
      const { result } = renderHook(() =>
        useDisclosure({ defaultIsOpen: true })
      );

      expect(result.current.isOpen).toBe(true);
    });

    it('should open when onOpen is called', () => {
      const { result } = renderHook(() => useDisclosure());

      act(() => {
        result.current.onOpen();
      });

      expect(result.current.isOpen).toBe(true);
    });

    it('should close when onClose is called', () => {
      const { result } = renderHook(() =>
        useDisclosure({ defaultIsOpen: true })
      );

      act(() => {
        result.current.onClose();
      });

      expect(result.current.isOpen).toBe(false);
    });

    it('should toggle state when onToggle is called', () => {
      const { result } = renderHook(() => useDisclosure());

      // Start closed
      expect(result.current.isOpen).toBe(false);

      // Toggle to open
      act(() => {
        result.current.onToggle();
      });
      expect(result.current.isOpen).toBe(true);

      // Toggle to closed
      act(() => {
        result.current.onToggle();
      });
      expect(result.current.isOpen).toBe(false);
    });

    it('should call onOpen callback when provided', () => {
      const onOpen = jest.fn();
      const { result } = renderHook(() => useDisclosure({ onOpen }));

      act(() => {
        result.current.onOpen();
      });

      expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it('should call onClose callback when provided', () => {
      const onClose = jest.fn();
      const { result } = renderHook(() => useDisclosure({ onClose }));

      act(() => {
        result.current.onClose();
      });

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should provide disclosure props for trigger element', () => {
      const { result } = renderHook(() => useDisclosure());

      const props = result.current.getDisclosureProps();

      expect(props).toHaveProperty('onPress');
      expect(typeof props.onPress).toBe('function');
    });

    it('should toggle when trigger props onPress is called', () => {
      const { result } = renderHook(() => useDisclosure());

      expect(result.current.isOpen).toBe(false);

      act(() => {
        result.current.getDisclosureProps().onPress();
      });

      expect(result.current.isOpen).toBe(true);
    });
  });

  describe('controlled mode', () => {
    it('should use controlled isOpen value', () => {
      const { result, rerender } = renderHook(
        ({ isOpen }) => useDisclosure({ isOpen }),
        { initialProps: { isOpen: false } }
      );

      expect(result.current.isOpen).toBe(false);

      rerender({ isOpen: true });
      expect(result.current.isOpen).toBe(true);
    });

    it('should not change internal state when controlled', () => {
      const { result } = renderHook(() => useDisclosure({ isOpen: true }));

      act(() => {
        result.current.onOpen();
      });

      // Should still be true (controlled by prop)
      expect(result.current.isOpen).toBe(true);
    });

    it('should call onOpen callback in controlled mode', () => {
      const onOpen = jest.fn();
      const { result } = renderHook(() =>
        useDisclosure({ isOpen: false, onOpen })
      );

      act(() => {
        result.current.onOpen();
      });

      expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it('should call onClose callback in controlled mode', () => {
      const onClose = jest.fn();
      const { result } = renderHook(() =>
        useDisclosure({ isOpen: true, onClose })
      );

      act(() => {
        result.current.onClose();
      });

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('should handle multiple rapid toggles', () => {
      const { result } = renderHook(() => useDisclosure());

      act(() => {
        result.current.onToggle();
        result.current.onToggle();
        result.current.onToggle();
      });

      expect(result.current.isOpen).toBe(true);
    });

    it('should maintain state across re-renders', () => {
      const { result, rerender } = renderHook(() => useDisclosure());

      act(() => {
        result.current.onOpen();
      });

      expect(result.current.isOpen).toBe(true);

      rerender();
      expect(result.current.isOpen).toBe(true);
    });
  });
});
