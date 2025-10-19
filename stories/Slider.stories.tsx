import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Slider } from '../src/components/Slider/Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  argTypes: {
    min: {
      control: 'number',
      description: 'Minimum value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    step: {
      control: 'number',
      description: 'Step increment',
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color scheme',
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    colorScheme: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState(50);
    return (
      <View style={{ padding: 20 }}>
        <Slider {...args} value={value} onValueChange={setValue} />
        <Text style={{ textAlign: 'center', marginTop: 12 }}>
          Value: {value}
        </Text>
      </View>
    );
  },
};

export const Colors: Story = {
  render: () => {
    const [value, setValue] = useState(60);
    return (
      <View style={{ gap: 24, padding: 20 }}>
        <View>
          <Text style={{ marginBottom: 8 }}>Primary</Text>
          <Slider
            value={value}
            onValueChange={setValue}
            colorScheme="primary"
          />
        </View>
        <View>
          <Text style={{ marginBottom: 8 }}>Secondary</Text>
          <Slider
            value={value}
            onValueChange={setValue}
            colorScheme="secondary"
          />
        </View>
        <View>
          <Text style={{ marginBottom: 8 }}>Success</Text>
          <Slider
            value={value}
            onValueChange={setValue}
            colorScheme="success"
          />
        </View>
        <View>
          <Text style={{ marginBottom: 8 }}>Warning</Text>
          <Slider
            value={value}
            onValueChange={setValue}
            colorScheme="warning"
          />
        </View>
        <View>
          <Text style={{ marginBottom: 8 }}>Danger</Text>
          <Slider value={value} onValueChange={setValue} colorScheme="danger" />
        </View>
      </View>
    );
  },
};

export const WithSteps: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <View style={{ padding: 20, gap: 24 }}>
        <View>
          <Text style={{ marginBottom: 8 }}>Step: 1</Text>
          <Slider value={value} onValueChange={setValue} step={1} />
          <Text style={{ textAlign: 'center', marginTop: 4 }}>{value}</Text>
        </View>
        <View>
          <Text style={{ marginBottom: 8 }}>Step: 10</Text>
          <Slider value={value} onValueChange={setValue} step={10} />
          <Text style={{ textAlign: 'center', marginTop: 4 }}>{value}</Text>
        </View>
        <View>
          <Text style={{ marginBottom: 8 }}>Step: 25</Text>
          <Slider value={value} onValueChange={setValue} step={25} />
          <Text style={{ textAlign: 'center', marginTop: 4 }}>{value}</Text>
        </View>
      </View>
    );
  },
};

export const VolumeControl: Story = {
  render: () => {
    const [volume, setVolume] = useState(50);
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
          🔊 Volume Control
        </Text>
        <Slider
          value={volume}
          onValueChange={setVolume}
          colorScheme="primary"
        />
        <Text
          style={{
            textAlign: 'center',
            marginTop: 12,
            fontSize: 24,
            fontWeight: 'bold',
          }}
        >
          {volume}%
        </Text>
      </View>
    );
  },
};

export const PriceRange: Story = {
  render: () => {
    const [price, setPrice] = useState(500);
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
          💰 Price Range
        </Text>
        <Slider
          min={0}
          max={1000}
          step={50}
          value={price}
          onValueChange={setPrice}
          colorScheme="success"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
          }}
        >
          <Text>$0</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>${price}</Text>
          <Text>$1000</Text>
        </View>
      </View>
    );
  },
};
