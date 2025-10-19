import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Accordion } from '../src/components/Accordion/Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'splitted', 'shadow'],
      description: 'Accordion variant',
    },
  },
  args: {
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Playground: Story = {
  render: (args) => (
    <Accordion {...args} title="Accordion Title">
      <Text>
        Accordion content goes here. This can be any React Native component.
      </Text>
    </Accordion>
  ),
};

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Accordion variant="default" title="Default Variant">
        <Text>This is the default variant.</Text>
      </Accordion>
      <Accordion variant="bordered" title="Bordered Variant">
        <Text>This is the bordered variant.</Text>
      </Accordion>
      <Accordion variant="splitted" title="Splitted Variant">
        <Text>This is the splitted variant.</Text>
      </Accordion>
      <Accordion variant="shadow" title="Shadow Variant">
        <Text>This is the shadow variant.</Text>
      </Accordion>
    </View>
  ),
};

export const MultipleAccordions: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Accordion title="What is React Native HeroUI?">
        <Text>
          React Native HeroUI is a beautiful, fast and modern UI library for
          building accessible and customizable mobile applications.
        </Text>
      </Accordion>
      <Accordion title="How do I install it?">
        <Text>Run: npm install react-native-heroui</Text>
      </Accordion>
      <Accordion title="Does it support TypeScript?">
        <Text>Yes! React Native HeroUI is fully typed with TypeScript.</Text>
      </Accordion>
      <Accordion title="Is it free?">
        <Text>
          Yes, it's completely free and open source under the MIT license.
        </Text>
      </Accordion>
    </View>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <Accordion variant="bordered" title="📦 Package Details">
      <View style={{ gap: 8 }}>
        <Text style={{ fontWeight: 'bold' }}>Features:</Text>
        <Text>✓ 27+ production-ready components</Text>
        <Text>✓ Full TypeScript support</Text>
        <Text>✓ Dark mode included</Text>
        <Text>✓ 60fps animations</Text>
        <Text>✓ Fully accessible</Text>
      </View>
    </Accordion>
  ),
};
