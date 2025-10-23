import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';
import { ThemeProvider } from '../../../providers/ThemeProvider';
import { Text } from 'react-native';
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Button', () => {
  it('renders correctly with default props', () => {
    const { getByText } = renderWithTheme(<Button>Test Button</Button>);

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('handles press events', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <Button onPress={onPress}>Test Button</Button>
    );

    fireEvent.press(getByText('Test Button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('applies variant styles correctly', () => {
    const { getByText } = renderWithTheme(
      <Button variant="solid" colorScheme="primary">
        Test Button
      </Button>
    );

    const button = getByText('Test Button');
    expect(button).toBeTruthy();
  });

  it('applies size styles correctly', () => {
    const { getByText } = renderWithTheme(
      <Button size="lg">Large Button</Button>
    );

    const button = getByText('Large Button');
    expect(button).toBeTruthy();
  });

  it('shows loading state correctly', () => {
    const { getByText } = renderWithTheme(
      <Button isLoading>Loading Button</Button>
    );

    // Button text should still be visible
    expect(getByText('Loading Button')).toBeTruthy();

    // Button should be disabled when loading
    const button = getByText('Loading Button').parent;
    expect(button?.props.accessibilityState?.busy).toBe(true);
  });

  it('shows disabled state correctly', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <Button isDisabled onPress={onPress}>
        Disabled Button
      </Button>
    );

    const button = getByText('Disabled Button');
    fireEvent.press(button);

    // onPress should not be called when disabled
    expect(onPress).not.toHaveBeenCalled();

    // Button should have disabled accessibility state
    expect(button.parent?.props.accessibilityState?.disabled).toBe(true);
  });

  it('renders with start content', () => {
    const { getByText } = renderWithTheme(
      <Button startContent={<Text>Icon</Text>}>Button with Icon</Button>
    );

    expect(getByText('Icon')).toBeTruthy();
    expect(getByText('Button with Icon')).toBeTruthy();
  });

  it('renders with end content', () => {
    const { getByText } = renderWithTheme(
      <Button endContent={<Text>Icon</Text>}>Button with Icon</Button>
    );

    expect(getByText('Icon')).toBeTruthy();
    expect(getByText('Button with Icon')).toBeTruthy();
  });

  it('applies full width when specified', () => {
    const { getByText } = renderWithTheme(
      <Button fullWidth>Full Width Button</Button>
    );

    const button = getByText('Full Width Button').parent;
    expect(button?.props.style).toMatchObject({ width: '100%' });
  });

  it('applies custom accessibility label', () => {
    const { getByLabelText } = renderWithTheme(
      <Button accessibilityLabel="Custom Label">Button</Button>
    );

    expect(getByLabelText('Custom Label')).toBeTruthy();
  });

  it('uses children as accessibility label when no custom label provided', () => {
    const { getByLabelText } = renderWithTheme(
      <Button>Accessible Button</Button>
    );

    expect(getByLabelText('Accessible Button')).toBeTruthy();
  });

  it('handles different color schemes', () => {
    const { getByText: getByTextPrimary } = renderWithTheme(
      <Button colorScheme="primary">Primary Button</Button>
    );

    const { getByText: getByTextSecondary } = renderWithTheme(
      <Button colorScheme="secondary">Secondary Button</Button>
    );

    expect(getByTextPrimary('Primary Button')).toBeTruthy();
    expect(getByTextSecondary('Secondary Button')).toBeTruthy();
  });

  it('handles different variants', () => {
    const { getByText: getByTextSolid } = renderWithTheme(
      <Button variant="solid">Solid Button</Button>
    );

    const { getByText: getByTextOutline } = renderWithTheme(
      <Button variant="outline">Outline Button</Button>
    );

    const { getByText: getByTextGhost } = renderWithTheme(
      <Button variant="ghost">Ghost Button</Button>
    );

    expect(getByTextSolid('Solid Button')).toBeTruthy();
    expect(getByTextOutline('Outline Button')).toBeTruthy();
    expect(getByTextGhost('Ghost Button')).toBeTruthy();
  });

  it('handles different sizes', () => {
    const { getByText: getByTextSm } = renderWithTheme(
      <Button size="sm">Small Button</Button>
    );

    const { getByText: getByTextMd } = renderWithTheme(
      <Button size="md">Medium Button</Button>
    );

    const { getByText: getByTextLg } = renderWithTheme(
      <Button size="lg">Large Button</Button>
    );

    expect(getByTextSm('Small Button')).toBeTruthy();
    expect(getByTextMd('Medium Button')).toBeTruthy();
    expect(getByTextLg('Large Button')).toBeTruthy();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<any>();

    renderWithTheme(<Button ref={ref}>Ref Button</Button>);

    expect(ref.current).toBeTruthy();
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByText } = renderWithTheme(
      <Button style={customStyle}>Styled Button</Button>
    );

    const button = getByText('Styled Button').parent;
    expect(button?.props.style).toContainEqual(customStyle);
  });

  it('does not call onPress when loading', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <Button isLoading onPress={onPress}>
        Loading Button
      </Button>
    );

    fireEvent.press(getByText('Loading Button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <Button isDisabled onPress={onPress}>
        Disabled Button
      </Button>
    );

    fireEvent.press(getByText('Disabled Button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
