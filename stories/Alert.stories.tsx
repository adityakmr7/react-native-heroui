import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Alert } from '../src/components/Alert/Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'bordered', 'flat'],
      description: 'Alert variant style',
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color scheme from theme',
    },
    title: {
      control: 'text',
      description: 'Alert title',
    },
    description: {
      control: 'text',
      description: 'Alert description',
    },
    closable: {
      control: 'boolean',
      description: 'Whether alert can be closed',
    },
  },
  args: {
    title: 'Alert Title',
    description: 'This is an alert message.',
    variant: 'solid',
    colorScheme: 'primary',
    closable: false,
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Playground: Story = {
  render: (args) => <Alert {...args} />,
};

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Alert
        variant="solid"
        colorScheme="primary"
        title="Solid Alert"
        description="This is a solid variant alert."
      />
      <Alert
        variant="bordered"
        colorScheme="primary"
        title="Bordered Alert"
        description="This is a bordered variant alert."
      />
      <Alert
        variant="flat"
        colorScheme="primary"
        title="Flat Alert"
        description="This is a flat variant alert."
      />
    </View>
  ),
};

export const Colors: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Alert
        colorScheme="primary"
        title="Primary"
        description="Primary alert"
      />
      <Alert
        colorScheme="secondary"
        title="Secondary"
        description="Secondary alert"
      />
      <Alert
        colorScheme="success"
        title="Success"
        description="Operation completed successfully"
      />
      <Alert
        colorScheme="warning"
        title="Warning"
        description="Please review this information"
      />
      <Alert
        colorScheme="danger"
        title="Error"
        description="An error occurred"
      />
    </View>
  ),
};

export const Closable: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Alert
        colorScheme="info"
        title="Dismissible Alert"
        description="Click the X to close this alert."
        closable
      />
    </View>
  ),
};
