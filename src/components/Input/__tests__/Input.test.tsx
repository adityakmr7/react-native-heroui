import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '../Input';
import { ThemeProvider } from '../../../providers/ThemeProvider';
import { Text } from 'react-native';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Input', () => {
  it('renders correctly with default props', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="Enter text" />
    );

    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('renders with label', () => {
    const { getByText } = renderWithTheme(
      <Input label="Username" placeholder="Enter username" />
    );

    expect(getByText('Username')).toBeTruthy();
  });

  it('renders with helper text', () => {
    const { getByText } = renderWithTheme(
      <Input helperText="This is helper text" />
    );

    expect(getByText('This is helper text')).toBeTruthy();
  });

  it('renders with error text', () => {
    const { getByText } = renderWithTheme(
      <Input errorText="This is an error" />
    );

    expect(getByText('This is an error')).toBeTruthy();
  });

  it('shows required indicator when isRequired is true', () => {
    const { getByText } = renderWithTheme(
      <Input label="Required Field" isRequired />
    );

    expect(getByText('Required Field *')).toBeTruthy();
  });

  it('renders with start content', () => {
    const { getByText } = renderWithTheme(
      <Input startContent={<Text>@</Text>} placeholder="Username" />
    );

    expect(getByText('@')).toBeTruthy();
  });

  it('renders with end content', () => {
    const { getByText } = renderWithTheme(
      <Input endContent={<Text>✓</Text>} placeholder="Email" />
    );

    expect(getByText('✓')).toBeTruthy();
  });

  it('shows clear button when onClear is provided and value exists', () => {
    const onClear = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <Input value="test value" onClear={onClear} />
    );

    const clearButton = getByLabelText('Clear input');
    expect(clearButton).toBeTruthy();

    fireEvent.press(clearButton);
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('does not show clear button when value is empty', () => {
    const onClear = jest.fn();
    const { queryByLabelText } = renderWithTheme(
      <Input value="" onClear={onClear} />
    );

    expect(queryByLabelText('Clear input')).toBeNull();
  });

  it('handles focus and blur events', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="Test input" onFocus={onFocus} onBlur={onBlur} />
    );

    const input = getByPlaceholderText('Test input');

    fireEvent(input, 'focus');
    expect(onFocus).toHaveBeenCalledTimes(1);

    fireEvent(input, 'blur');
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('handles text change events', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="Test input" onChangeText={onChangeText} />
    );

    const input = getByPlaceholderText('Test input');
    fireEvent.changeText(input, 'new text');

    expect(onChangeText).toHaveBeenCalledWith('new text');
  });

  it('applies disabled state correctly', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="Disabled input" isDisabled />
    );

    const input = getByPlaceholderText('Disabled input');
    expect(input.props.editable).toBe(false);
    expect(input.props.accessibilityState?.disabled).toBe(true);
  });

  it('applies read-only state correctly', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="Read-only input" isReadOnly />
    );

    const input = getByPlaceholderText('Read-only input');
    expect(input.props.editable).toBe(false);
  });

  it('applies invalid state correctly', () => {
    const { getByText } = renderWithTheme(
      <Input label="Invalid field" isInvalid />
    );

    const label = getByText('Invalid field');
    expect(label).toBeTruthy();
  });

  it('handles different variants', () => {
    const { getByPlaceholderText: getByPlaceholderOutline } = renderWithTheme(
      <Input variant="outline" placeholder="Outline input" />
    );

    const { getByPlaceholderText: getByPlaceholderFilled } = renderWithTheme(
      <Input variant="filled" placeholder="Filled input" />
    );

    const { getByPlaceholderText: getByPlaceholderUnderlined } =
      renderWithTheme(
        <Input variant="underlined" placeholder="Underlined input" />
      );

    expect(getByPlaceholderOutline('Outline input')).toBeTruthy();
    expect(getByPlaceholderFilled('Filled input')).toBeTruthy();
    expect(getByPlaceholderUnderlined('Underlined input')).toBeTruthy();
  });

  it('handles different sizes', () => {
    const { getByPlaceholderText: getByPlaceholderSm } = renderWithTheme(
      <Input size="sm" placeholder="Small input" />
    );

    const { getByPlaceholderText: getByPlaceholderMd } = renderWithTheme(
      <Input size="md" placeholder="Medium input" />
    );

    const { getByPlaceholderText: getByPlaceholderLg } = renderWithTheme(
      <Input size="lg" placeholder="Large input" />
    );

    expect(getByPlaceholderSm('Small input')).toBeTruthy();
    expect(getByPlaceholderMd('Medium input')).toBeTruthy();
    expect(getByPlaceholderLg('Large input')).toBeTruthy();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<any>();

    renderWithTheme(<Input ref={ref} placeholder="Ref input" />);

    expect(ref.current).toBeTruthy();
  });

  it('applies custom container style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByPlaceholderText } = renderWithTheme(
      <Input containerStyle={customStyle} placeholder="Styled input" />
    );

    const container = getByPlaceholderText('Styled input').parent?.parent;
    expect(container?.props.style).toContainEqual(customStyle);
  });

  it('applies custom wrapper style', () => {
    const customStyle = { borderWidth: 2 };
    const { getByPlaceholderText } = renderWithTheme(
      <Input wrapperStyle={customStyle} placeholder="Styled input" />
    );

    const wrapper = getByPlaceholderText('Styled input').parent;
    expect(wrapper?.props.style).toContainEqual(customStyle);
  });

  it('prioritizes error text over helper text', () => {
    const { getByText, queryByText } = renderWithTheme(
      <Input helperText="Helper text" errorText="Error text" />
    );

    expect(getByText('Error text')).toBeTruthy();
    expect(queryByText('Helper text')).toBeNull();
  });

  it('shows error state when isInvalid is true', () => {
    const { getByText } = renderWithTheme(<Input label="Field" isInvalid />);

    const label = getByText('Field');
    expect(label).toBeTruthy();
  });

  it('shows error state when errorText is provided', () => {
    const { getByText } = renderWithTheme(
      <Input label="Field" errorText="Error message" />
    );

    const label = getByText('Field');
    expect(label).toBeTruthy();
  });
});
