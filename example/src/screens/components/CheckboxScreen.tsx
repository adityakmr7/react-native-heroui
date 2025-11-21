import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Checkbox,
  useTheme,
} from 'react-native-heroui';

export default function CheckboxScreen() {
  const { theme } = useTheme();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review documentation', done: false },
    { id: 2, text: 'Test components', done: true },
    { id: 3, text: 'Deploy to production', done: false },
  ]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Basic */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Basic Checkbox
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.checkboxContainer}>
              <Checkbox
                radius="sm"
                isSelected={agreedToTerms}
                onValueChange={setAgreedToTerms}
                color="primary"
              >
                I agree to the terms and conditions
              </Checkbox>
            </View>
          </CardBody>
        </Card>

        {/* Todo List with Line Through */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Todo List (Line Through)
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.checkboxContainer}>
              {tasks.map((task) => (
                <Checkbox
                  key={task.id}
                  isSelected={task.done}
                  onValueChange={() =>
                    setTasks(
                      tasks.map((t) =>
                        t.id === task.id ? { ...t, done: !t.done } : t
                      )
                    )
                  }
                  lineThrough
                  color="success"
                >
                  {task.text}
                </Checkbox>
              ))}
            </View>
          </CardBody>
        </Card>

        {/* Colors */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Color Schemes
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.checkboxContainer}>
              <Checkbox defaultSelected color="primary" size="sm">
                Primary
              </Checkbox>
              <Checkbox defaultSelected color="secondary" size="sm">
                Secondary
              </Checkbox>
              <Checkbox defaultSelected color="success" size="sm">
                Success
              </Checkbox>
              <Checkbox defaultSelected color="warning" size="sm">
                Warning
              </Checkbox>
              <Checkbox defaultSelected color="danger" size="sm">
                Danger
              </Checkbox>
            </View>
          </CardBody>
        </Card>

        {/* States */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              States
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.checkboxContainer}>
              <Checkbox defaultSelected color="primary">
                Selected
              </Checkbox>
              <Checkbox isIndeterminate color="warning">
                Partial/Indeterminate
              </Checkbox>
              <Checkbox isDisabled color="primary">
                Disabled
              </Checkbox>
            </View>
          </CardBody>
        </Card>

        {/* Sizes */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Sizes
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.checkboxContainer}>
              <Checkbox defaultSelected color="primary" size="sm">
                Small
              </Checkbox>
              <Checkbox defaultSelected color="primary" size="md">
                Medium
              </Checkbox>
              <Checkbox defaultSelected color="primary" size="lg">
                Large
              </Checkbox>
            </View>
          </CardBody>
        </Card>

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
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  checkboxContainer: {
    gap: 12,
  },
});
