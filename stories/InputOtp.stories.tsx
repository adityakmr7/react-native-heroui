import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { InputOtp } from '../src/components/InputOtp/InputOtp';

const meta: Meta<typeof InputOtp> = {
  title: 'Components/InputOtp',
  component: InputOtp,
  argTypes: {
    length: {
      control: { type: 'number', min: 4, max: 8 },
      description: 'Number of OTP digits',
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color scheme',
    },
  },
  args: {
    length: 6,
    colorScheme: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof InputOtp>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <View style={{ padding: 20 }}>
        <InputOtp {...args} value={value} onChangeText={setValue} />
        <Text style={{ textAlign: 'center', marginTop: 12 }}>
          Value: {value}
        </Text>
      </View>
    );
  },
};

export const Lengths: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <View style={{ gap: 24, padding: 20 }}>
        <View>
          <Text style={{ marginBottom: 8 }}>4 Digits</Text>
          <InputOtp length={4} value={value} onChangeText={setValue} />
        </View>
        <View>
          <Text style={{ marginBottom: 8 }}>6 Digits</Text>
          <InputOtp length={6} value={value} onChangeText={setValue} />
        </View>
        <View>
          <Text style={{ marginBottom: 8 }}>8 Digits</Text>
          <InputOtp length={8} value={value} onChangeText={setValue} />
        </View>
      </View>
    );
  },
};

export const VerificationForm: Story = {
  render: () => {
    const [otp, setOtp] = useState('');
    return (
      <View style={{ padding: 24, alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
          Verify Your Email
        </Text>
        <Text style={{ opacity: 0.7, marginBottom: 24, textAlign: 'center' }}>
          We sent a 6-digit code to your email
        </Text>
        <InputOtp
          length={6}
          value={otp}
          onChangeText={setOtp}
          colorScheme="primary"
        />
        <Text style={{ marginTop: 16, opacity: 0.6, fontSize: 12 }}>
          Didn't receive the code?{' '}
          <Text style={{ color: '#0066FF' }}>Resend</Text>
        </Text>
      </View>
    );
  },
};
