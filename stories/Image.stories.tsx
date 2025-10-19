import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Image } from '../src/components/Image/Image';

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    width: {
      control: 'number',
      description: 'Image width',
    },
    height: {
      control: 'number',
      description: 'Image height',
    },
    borderRadius: {
      control: 'number',
      description: 'Border radius',
    },
  },
  args: {
    src: 'https://picsum.photos/300/200',
    width: 300,
    height: 200,
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Playground: Story = {
  render: (args) => <Image {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 16, alignItems: 'flex-start' }}>
      <Image src="https://picsum.photos/100/100" width={100} height={100} />
      <Image src="https://picsum.photos/200/150" width={200} height={150} />
      <Image src="https://picsum.photos/300/200" width={300} height={200} />
    </View>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <View style={{ gap: 16, alignItems: 'flex-start' }}>
      <Image
        src="https://picsum.photos/150/150"
        width={150}
        height={150}
        borderRadius={0}
      />
      <Image
        src="https://picsum.photos/150/150"
        width={150}
        height={150}
        borderRadius={8}
      />
      <Image
        src="https://picsum.photos/150/150"
        width={150}
        height={150}
        borderRadius={75}
      />
    </View>
  ),
};

export const WithFallback: Story = {
  render: () => (
    <View style={{ gap: 16, alignItems: 'flex-start' }}>
      <Image
        src="https://invalid-url.com/image.jpg"
        width={200}
        height={200}
        fallbackSrc="https://picsum.photos/200/200"
      />
    </View>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <View style={{ gap: 16, alignItems: 'flex-start' }}>
      <Image
        src="https://picsum.photos/id/237/300/200"
        width={300}
        height={200}
        showLoading
      />
    </View>
  ),
};
