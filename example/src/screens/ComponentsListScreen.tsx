import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, CardBody, useTheme } from 'react-native-heroui';
import type { RootStackParamList } from '../navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const COMPONENTS = [
  'Accordion',
  'Alert',
  'Avatar',
  'Badge',
  'BottomSheet',
  'Button',
  'Card',
  'Checkbox',
  'Chip',
  'Divider',
  'Drawer',
  'Image',
  'Input',
  'InputOtp',
  'Modal',
  'Progress',
  'Radio',
  'Select',
  'Skeleton',
  'Slider',
  'Spacer',
  'Spinner',
  'Switch',
  'Tabs',
  'Textarea',
  'Toast',
  'Tooltip',
];

export default function ComponentsListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <Text
          style={[
            styles.header,
            { color: theme.colors['default-500'], marginBottom: 16 },
          ]}
        >
          Select a component to view its showcase
        </Text>
        {COMPONENTS.map((componentName) => (
          <Pressable
            key={componentName}
            onPress={() =>
              navigation.navigate('ComponentDetail', { componentName })
            }
          >
            <Card
              variant="bordered"
              style={[
                styles.componentCard,
                { borderColor: theme.colors.border },
              ]}
            >
              <CardBody style={styles.cardBody}>
                <Text
                  style={[
                    styles.componentName,
                    { color: theme.colors.foreground },
                  ]}
                >
                  {componentName}
                </Text>
              </CardBody>
            </Card>
          </Pressable>
        ))}
        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 14,
    marginTop: 8,
  },
  componentCard: {
    marginBottom: 12,
  },
  cardBody: {
    padding: 16,
  },
  componentName: {
    fontSize: 16,
    fontWeight: '500',
  },
});
