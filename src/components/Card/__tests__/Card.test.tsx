import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Card, CardHeader, CardBody, CardFooter } from '../Card';
import { ThemeProvider } from '../../../providers/ThemeProvider';
import { Text } from 'react-native';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Card', () => {
  it('renders correctly with default props', () => {
    const { getByText } = renderWithTheme(
      <Card>
        <Text>Card content</Text>
      </Card>
    );

    expect(getByText('Card content')).toBeTruthy();
  });

  it('renders with different variants', () => {
    const { getByText: getByTextElevated } = renderWithTheme(
      <Card variant="elevated">
        <Text>Elevated card</Text>
      </Card>
    );

    const { getByText: getByTextFlat } = renderWithTheme(
      <Card variant="flat">
        <Text>Flat card</Text>
      </Card>
    );

    const { getByText: getByTextBordered } = renderWithTheme(
      <Card variant="bordered">
        <Text>Bordered card</Text>
      </Card>
    );

    expect(getByTextElevated('Elevated card')).toBeTruthy();
    expect(getByTextFlat('Flat card')).toBeTruthy();
    expect(getByTextBordered('Bordered card')).toBeTruthy();
  });

  it('handles press events when pressable', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <Card isPressable onPress={onPress}>
        <Text>Pressable card</Text>
      </Card>
    );

    fireEvent.press(getByText('Pressable card'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('handles press events when onPress is provided', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <Card onPress={onPress}>
        <Text>Pressable card</Text>
      </Card>
    );

    fireEvent.press(getByText('Pressable card'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('disables padding when disablePadding is true', () => {
    const { getByText } = renderWithTheme(
      <Card disablePadding>
        <Text>No padding card</Text>
      </Card>
    );

    expect(getByText('No padding card')).toBeTruthy();
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByText } = renderWithTheme(
      <Card style={customStyle}>
        <Text>Styled card</Text>
      </Card>
    );

    const card = getByText('Styled card').parent;
    expect(card?.props.style).toContainEqual(customStyle);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<any>();

    renderWithTheme(
      <Card ref={ref}>
        <Text>Ref card</Text>
      </Card>
    );

    expect(ref.current).toBeTruthy();
  });

  it('has correct accessibility role when pressable', () => {
    const { getByText } = renderWithTheme(
      <Card isPressable onPress={() => {}}>
        <Text>Accessible card</Text>
      </Card>
    );

    const card = getByText('Accessible card').parent;
    expect(card?.props.accessibilityRole).toBe('button');
  });
});

describe('CardHeader', () => {
  it('renders correctly', () => {
    const { getByText } = renderWithTheme(
      <Card>
        <CardHeader>
          <Text>Header content</Text>
        </CardHeader>
      </Card>
    );

    expect(getByText('Header content')).toBeTruthy();
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'blue' };
    const { getByText } = renderWithTheme(
      <Card>
        <CardHeader style={customStyle}>
          <Text>Styled header</Text>
        </CardHeader>
      </Card>
    );

    const header = getByText('Styled header').parent;
    expect(header?.props.style).toContainEqual(customStyle);
  });
});

describe('CardBody', () => {
  it('renders correctly', () => {
    const { getByText } = renderWithTheme(
      <Card>
        <CardBody>
          <Text>Body content</Text>
        </CardBody>
      </Card>
    );

    expect(getByText('Body content')).toBeTruthy();
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'green' };
    const { getByText } = renderWithTheme(
      <Card>
        <CardBody style={customStyle}>
          <Text>Styled body</Text>
        </CardBody>
      </Card>
    );

    const body = getByText('Styled body').parent;
    expect(body?.props.style).toContainEqual(customStyle);
  });
});

describe('CardFooter', () => {
  it('renders correctly', () => {
    const { getByText } = renderWithTheme(
      <Card>
        <CardFooter>
          <Text>Footer content</Text>
        </CardFooter>
      </Card>
    );

    expect(getByText('Footer content')).toBeTruthy();
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'yellow' };
    const { getByText } = renderWithTheme(
      <Card>
        <CardFooter style={customStyle}>
          <Text>Styled footer</Text>
        </CardFooter>
      </Card>
    );

    const footer = getByText('Styled footer').parent;
    expect(footer?.props.style).toContainEqual(customStyle);
  });
});

describe('Card composition', () => {
  it('renders complete card with all parts', () => {
    const { getByText } = renderWithTheme(
      <Card>
        <CardHeader>
          <Text>Header</Text>
        </CardHeader>
        <CardBody>
          <Text>Body</Text>
        </CardBody>
        <CardFooter>
          <Text>Footer</Text>
        </CardFooter>
      </Card>
    );

    expect(getByText('Header')).toBeTruthy();
    expect(getByText('Body')).toBeTruthy();
    expect(getByText('Footer')).toBeTruthy();
  });
});
