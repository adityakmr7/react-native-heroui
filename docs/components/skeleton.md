# Skeleton

Skeleton is a placeholder to show a loading state and the expected shape of a component.

## Installation

```bash
npm install react-native-heroui
```

## Import

```tsx
import { Skeleton } from 'react-native-heroui';
```

## Usage

### Basic (Shape of Children)

Skeleton automatically takes the shape of its children component.

```tsx
import { Skeleton, Card, CardBody, Avatar } from 'react-native-heroui';

function App() {
  return (
    <Card>
      <CardBody>
        <Skeleton>
          <Avatar size="lg" />
        </Skeleton>
      </CardBody>
    </Card>
  );
}
```

### Standalone

Use Skeleton as a standalone component without children for simple loading bars.

```tsx
<Skeleton style={{ width: 200, height: 20, borderRadius: 8 }} />
<Skeleton style={{ width: 150, height: 20, borderRadius: 8, marginTop: 8 }} />
<Skeleton style={{ width: 180, height: 20, borderRadius: 8, marginTop: 8 }} />
```

### Loaded State

Use the `isLoaded` prop to stop the skeleton animation and show the actual content.

```tsx
import { useState, useEffect } from 'react';
import { Skeleton, Card, CardBody, Text } from 'react-native-heroui';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 2000);
  }, []);

  return (
    <Card>
      <CardBody>
        <Skeleton isLoaded={isLoaded}>
          <Text>This content appears after loading!</Text>
        </Skeleton>
      </CardBody>
    </Card>
  );
}
```

### Loading Cards

Create beautiful loading card skeletons.

```tsx
<Card style={{ width: 300 }}>
  <CardBody>
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <Skeleton style={{ width: 60, height: 60, borderRadius: 30 }} />
      <View style={{ flex: 1, gap: 8 }}>
        <Skeleton style={{ width: '80%', height: 16, borderRadius: 4 }} />
        <Skeleton style={{ width: '60%', height: 16, borderRadius: 4 }} />
      </View>
    </View>
    <Skeleton
      style={{ width: '100%', height: 80, marginTop: 16, borderRadius: 8 }}
    />
  </CardBody>
</Card>
```

### Loading Profile

```tsx
<View style={{ padding: 16 }}>
  {/* Avatar */}
  <Skeleton
    style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 16 }}
  />

  {/* Name */}
  <Skeleton
    style={{ width: 200, height: 24, borderRadius: 4, marginBottom: 8 }}
  />

  {/* Bio */}
  <Skeleton
    style={{ width: '100%', height: 16, borderRadius: 4, marginBottom: 4 }}
  />
  <Skeleton
    style={{ width: '90%', height: 16, borderRadius: 4, marginBottom: 4 }}
  />
  <Skeleton style={{ width: '80%', height: 16, borderRadius: 4 }} />
</View>
```

### Disable Animation

Disable the shimmer animation if needed.

```tsx
<Skeleton disableAnimation style={{ width: 200, height: 20 }} />
```

### With Controlled Loading

```tsx
import React, { useState } from 'react';
import {
  View,
  Button,
  Skeleton,
  Card,
  CardBody,
  Avatar,
  Text,
} from 'react-native-heroui';

function ProfileCard() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(false);
    setTimeout(() => setIsLoaded(true), 2000);
  };

  return (
    <View>
      <Card style={{ marginBottom: 16 }}>
        <CardBody>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Skeleton isLoaded={isLoaded}>
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                size="lg"
              />
            </Skeleton>
            <View style={{ flex: 1, gap: 4 }}>
              <Skeleton isLoaded={isLoaded}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  John Doe
                </Text>
              </Skeleton>
              <Skeleton isLoaded={isLoaded}>
                <Text style={{ color: '#666' }}>Senior Developer</Text>
              </Skeleton>
            </View>
          </View>
          <Skeleton isLoaded={isLoaded} style={{ marginTop: 12 }}>
            <Text>
              Passionate about creating beautiful and functional user
              interfaces.
            </Text>
          </Skeleton>
        </CardBody>
      </Card>

      <Button onPress={handleLoad} colorScheme="primary">
        {isLoaded ? 'Reload' : 'Loading...'}
      </Button>
    </View>
  );
}
```

## API

### Skeleton Props

| Prop               | Type                   | Default | Description               |
| ------------------ | ---------------------- | ------- | ------------------------- |
| `children`         | `ReactNode`            | -       | Content to wrap           |
| `isLoaded`         | `boolean`              | `false` | Whether content is loaded |
| `disableAnimation` | `boolean`              | `false` | Disable shimmer animation |
| `style`            | `StyleProp<ViewStyle>` | -       | Custom container style    |
| `classNames`       | `SkeletonClassNames`   | -       | Custom slot styles        |

### SkeletonClassNames

```tsx
interface SkeletonClassNames {
  base?: StyleProp<ViewStyle>;
  content?: StyleProp<ViewStyle>;
}
```

## Slots

- **base**: The base skeleton wrapper with shimmer animation
- **content**: The wrapped content (visible only when `isLoaded` is `true`)

## Accessibility

- ✅ Uses `accessibilityRole="progressbar"` for screen readers
- ✅ Includes `accessibilityLabel="Loading"` for context
- ✅ Updates `accessibilityState` based on loading state
- ✅ Properly announces when content is loaded

## Complete Example

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Skeleton,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Button,
  Divider,
} from 'react-native-heroui';

export default function SkeletonExample() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const reloadProfile = () => {
    setProfileLoaded(false);
    setTimeout(() => setProfileLoaded(true), 2000);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Standalone Skeletons */}
      <Card style={styles.card}>
        <CardHeader>
          <Text style={styles.title}>Standalone Skeletons</Text>
        </CardHeader>
        <CardBody>
          <Skeleton style={{ width: '100%', height: 20, marginBottom: 8 }} />
          <Skeleton style={{ width: '80%', height: 20, marginBottom: 8 }} />
          <Skeleton style={{ width: '60%', height: 20 }} />
        </CardBody>
      </Card>

      {/* Loading Card */}
      <Card style={styles.card}>
        <CardHeader>
          <Text style={styles.title}>Loading Card</Text>
        </CardHeader>
        <CardBody>
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
            <Skeleton style={{ width: 60, height: 60, borderRadius: 30 }} />
            <View style={{ flex: 1, gap: 8 }}>
              <Skeleton style={{ width: '80%', height: 16 }} />
              <Skeleton style={{ width: '60%', height: 16 }} />
            </View>
          </View>
          <Skeleton style={{ width: '100%', height: 100, borderRadius: 8 }} />
        </CardBody>
      </Card>

      {/* With isLoaded Toggle */}
      <Card style={styles.card}>
        <CardHeader>
          <Text style={styles.title}>With isLoaded Prop</Text>
        </CardHeader>
        <CardBody>
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
            <Skeleton isLoaded={isLoaded}>
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                size="lg"
              />
            </Skeleton>
            <View style={{ flex: 1, gap: 4 }}>
              <Skeleton isLoaded={isLoaded}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Jane Smith
                </Text>
              </Skeleton>
              <Skeleton isLoaded={isLoaded}>
                <Text style={{ color: '#666' }}>Product Designer</Text>
              </Skeleton>
            </View>
          </View>
          <Skeleton isLoaded={isLoaded}>
            <Text>
              Creating delightful user experiences with attention to detail.
            </Text>
          </Skeleton>
        </CardBody>
      </Card>

      {/* Interactive Profile Loading */}
      <Card style={styles.card}>
        <CardHeader>
          <Text style={styles.title}>Interactive Loading</Text>
        </CardHeader>
        <CardBody>
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
            <Skeleton isLoaded={profileLoaded}>
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="lg"
              />
            </Skeleton>
            <View style={{ flex: 1, gap: 4 }}>
              <Skeleton isLoaded={profileLoaded}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Alex Johnson
                </Text>
              </Skeleton>
              <Skeleton isLoaded={profileLoaded}>
                <Text style={{ color: '#666' }}>Full Stack Developer</Text>
              </Skeleton>
            </View>
          </View>
          <Skeleton isLoaded={profileLoaded} style={{ marginBottom: 16 }}>
            <Text>
              Building scalable applications with modern technologies.
            </Text>
          </Skeleton>
          <Button onPress={reloadProfile} colorScheme="primary" size="sm">
            {profileLoaded ? 'Reload Profile' : 'Loading...'}
          </Button>
        </CardBody>
      </Card>

      {/* Without Animation */}
      <Card style={styles.card}>
        <CardHeader>
          <Text style={styles.title}>Without Animation</Text>
        </CardHeader>
        <CardBody>
          <Skeleton
            disableAnimation
            style={{ width: '100%', height: 20, marginBottom: 8 }}
          />
          <Skeleton
            disableAnimation
            style={{ width: '70%', height: 20, marginBottom: 8 }}
          />
          <Skeleton disableAnimation style={{ width: '50%', height: 20 }} />
        </CardBody>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

## Use Cases

- **Content Loading**: Show skeleton while fetching data from API
- **Image Loading**: Display skeleton before images load
- **List Items**: Show skeleton for list items during pagination
- **Profile Cards**: Create realistic loading states for user profiles
- **Forms**: Display skeleton while form validation is processing

## Notes

- Skeleton automatically takes the shape of its children
- Use standalone mode for simple rectangular skeletons
- The shimmer animation runs on the native thread for 60fps
- Combine multiple skeletons to create complex loading states
- Use `isLoaded` prop to smoothly transition from skeleton to content

## Related Components

- [Spinner](./spinner.md) - For centered loading indicators
- [Card](./card.md) - For container layouts
- [Avatar](./avatar.md) - For profile images
