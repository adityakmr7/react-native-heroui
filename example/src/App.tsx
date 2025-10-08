import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  HeroUIProvider,
  ToastProvider,
  toast,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Badge,
  Checkbox,
  Chip,
  Divider,
  Radio,
  RadioGroup,
  Skeleton,
  Spinner,
  Switch,
  Image,
  Textarea,
  Slider,
  Select,
  Progress,
  Accordion,
  AccordionItem,
  Alert,
  useTheme,
} from 'react-native-heroui';

function ComponentShowcase() {
  const { theme, themeMode, toggleTheme } = useTheme();
  const [email, setEmail] = React.useState('');
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);
  const [tasks, setTasks] = React.useState([
    { id: 1, text: 'Review documentation', done: false },
    { id: 2, text: 'Test components', done: true },
    { id: 3, text: 'Deploy to production', done: false },
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedFramework, setSelectedFramework] = React.useState('react');
  const [selectedPlan, setSelectedPlan] = React.useState('free');
  const [profileLoaded, setProfileLoaded] = React.useState(false);
  const [contentLoaded, setContentLoaded] = React.useState(false);
  const [sliderValue, setSliderValue] = React.useState(50);
  const [selectedCountry, setSelectedCountry] = React.useState('');
  const [progressValue, setProgressValue] = React.useState(0);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => setContentLoaded(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    // Animate progress
    const interval = setInterval(() => {
      setProgressValue((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const reloadProfile = () => {
    setProfileLoaded(false);
    setTimeout(() => setProfileLoaded(true), 2000);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.foreground }]}>
            React Native HeroUI
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors['default-500'] }]}
          >
            Component Library Showcase
          </Text>
        </View>

        {/* Theme Toggle */}
        <Card variant="bordered" style={styles.section}>
          <CardBody>
            <View style={styles.row}>
              <View style={styles.flex}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: theme.colors.foreground },
                  ]}
                >
                  Theme: {themeMode}
                </Text>
                <Text
                  style={[
                    styles.helperText,
                    { color: theme.colors['default-500'] },
                  ]}
                >
                  Toggle between light and dark mode
                </Text>
              </View>
              <Switch
                value={themeMode === 'dark'}
                onChange={toggleTheme}
                color="primary"
              />
            </View>
          </CardBody>
        </Card>

        {/* Buttons */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Buttons
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.buttonGrid}>
              <Button variant="solid" colorScheme="primary" size="sm">
                Solid
              </Button>
              <Button variant="outline" colorScheme="secondary" size="sm">
                Outline
              </Button>
              <Button variant="ghost" colorScheme="success" size="sm">
                Ghost
              </Button>
              <Button variant="link" colorScheme="danger" size="sm">
                Link
              </Button>
            </View>
            <Button
              variant="solid"
              colorScheme="primary"
              fullWidth
              style={{ marginTop: 12 }}
            >
              Full Width Button
            </Button>
            <Button
              variant="solid"
              colorScheme="secondary"
              isLoading
              fullWidth
              style={{ marginTop: 12 }}
            >
              Loading Button
            </Button>
          </CardBody>
        </Card>

        {/* Input */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Input
            </Text>
          </CardHeader>
          <CardBody>
            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              helperText="We'll never share your email"
              onClear={() => setEmail('')}
            />
            <Input
              label="Password"
              placeholder="Enter password"
              secureTextEntry
              isRequired
              style={{ marginTop: 16 }}
            />
            <Input
              label="Disabled Input"
              placeholder="Disabled"
              isDisabled
              style={{ marginTop: 16 }}
            />
          </CardBody>
        </Card>

        {/* Avatars & Badges */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Avatars & Badges
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.avatarRow}>
              <Badge content="5" color="danger" placement="top-right">
                <Avatar name="John Doe" size="lg" color="primary" />
              </Badge>
              <Badge isDot color="success" placement="bottom-right">
                <Avatar name="Jane Smith" size="lg" color="secondary" />
              </Badge>
              <Badge content="99+" color="primary" variant="flat">
                <Avatar name="Bob Wilson" size="lg" color="warning" />
              </Badge>
              <Badge content="NEW" color="secondary" shape="rectangle">
                <Avatar name="Alice Brown" size="lg" color="danger" />
              </Badge>
            </View>
            <View style={[styles.avatarRow, { marginTop: 16 }]}>
              <Badge content="1" variant="solid" color="danger">
                <Avatar name="Solid" size="lg" />
              </Badge>
              <Badge content="2" variant="flat" color="primary">
                <Avatar name="Flat" size="lg" />
              </Badge>
              <Badge content="3" variant="faded" color="success">
                <Avatar name="Faded" size="lg" />
              </Badge>
              <Badge content="4" variant="shadow" color="warning">
                <Avatar name="Shadow" size="lg" />
              </Badge>
            </View>
          </CardBody>
        </Card>

        {/* Checkboxes */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Checkboxes
            </Text>
          </CardHeader>
          <CardBody>
            <View style={{ gap: 12 }}>
              <Checkbox
                radius="sm"
                isSelected={agreedToTerms}
                onValueChange={setAgreedToTerms}
                color="primary"
              >
                I agree to the terms and conditions
              </Checkbox>

              {/* Todo list with line-through */}
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

              {/* Different colors and states */}
              <View style={styles.chipContainer}>
                <Checkbox defaultSelected color="primary" size="sm">
                  Primary
                </Checkbox>
                <Checkbox defaultSelected color="secondary" size="sm">
                  Secondary
                </Checkbox>
                <Checkbox isIndeterminate color="warning" size="sm">
                  Partial
                </Checkbox>
                <Checkbox isDisabled size="sm">
                  Disabled
                </Checkbox>
              </View>
            </View>
          </CardBody>
        </Card>

        {/* Chips */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Chips
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.chipContainer}>
              <Chip color="primary" variant="solid">
                React Native
              </Chip>
              <Chip color="secondary" variant="flat">
                TypeScript
              </Chip>
              <Chip color="success" variant="dot">
                Active
              </Chip>
              <Chip color="warning" variant="bordered">
                Warning
              </Chip>
              <Chip color="danger" onClose={() => console.log('Closed')}>
                Closeable
              </Chip>
            </View>
          </CardBody>
        </Card>

        {/* Switches */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Switches
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.switchRow}>
              <View style={styles.flex}>
                <Text
                  style={[styles.label, { color: theme.colors.foreground }]}
                >
                  Push Notifications
                </Text>
                <Text
                  style={[
                    styles.helperText,
                    { color: theme.colors['default-500'] },
                  ]}
                >
                  Receive notifications about updates
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onChange={setNotificationsEnabled}
                color="success"
              />
            </View>
            <View style={[styles.switchRow, { marginTop: 16 }]}>
              <Text style={[styles.label, { color: theme.colors.foreground }]}>
                Email Marketing
              </Text>
              <Switch defaultValue={false} color="primary" />
            </View>
          </CardBody>
        </Card>

        {/* Spinners */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Spinners - Variants
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.chipContainer}>
              <Spinner variant="default" color="primary" label="Default" />
              <Spinner variant="simple" color="success" label="Simple" />
              <Spinner variant="gradient" color="secondary" label="Gradient" />
            </View>
            <Divider style={{ marginVertical: 12 }} />
            <View style={styles.chipContainer}>
              <Spinner variant="wave" color="warning" label="Wave" />
              <Spinner variant="dots" color="danger" label="Dots" />
              <Spinner variant="spinner" color="primary" label="Spinner" />
            </View>
            <Divider style={{ marginVertical: 16 }} />
            <View style={{ alignItems: 'center' }}>
              {isLoading ? (
                <Spinner
                  size="lg"
                  color="primary"
                  variant="gradient"
                  label="Loading data..."
                />
              ) : (
                <Button
                  onPress={() => {
                    setIsLoading(true);
                    setTimeout(() => setIsLoading(false), 3000);
                  }}
                  colorScheme="primary"
                >
                  Simulate Loading
                </Button>
              )}
            </View>
          </CardBody>
        </Card>

        {/* Radio Groups */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Radio Groups - Single Selection
            </Text>
          </CardHeader>
          <CardBody>
            <RadioGroup
              label="Select your favorite framework"
              description="Choose the one you use most often"
              value={selectedFramework}
              onValueChange={setSelectedFramework}
              style={{ marginBottom: 20 }}
            >
              <Radio value="react">React</Radio>
              <Radio value="vue">Vue.js</Radio>
              <Radio value="angular">Angular</Radio>
              <Radio value="svelte">Svelte</Radio>
            </RadioGroup>
            <Text
              style={[
                styles.helperText,
                { color: theme.colors['default-500'] },
              ]}
            >
              Selected: {selectedFramework}
            </Text>

            <Divider style={{ marginVertical: 20 }} />

            <RadioGroup
              orientation="horizontal"
              label="Size"
              defaultValue="md"
              color="secondary"
              style={{ marginBottom: 20 }}
            >
              <Radio value="sm">Small</Radio>
              <Radio value="md">Medium</Radio>
              <Radio value="lg">Large</Radio>
            </RadioGroup>

            <Divider style={{ marginVertical: 20 }} />

            <RadioGroup
              label="Choose your plan"
              value={selectedPlan}
              onValueChange={setSelectedPlan}
              color="success"
            >
              <Radio value="free" description="Best for personal projects">
                Free
              </Radio>
              <Radio value="pro" description="For professional developers">
                Pro ($10/month)
              </Radio>
              <Radio value="team" description="For teams and organizations">
                Team ($50/month)
              </Radio>
            </RadioGroup>
            <Text
              style={[
                styles.helperText,
                { color: theme.colors['default-500'], marginTop: 12 },
              ]}
            >
              Selected plan: {selectedPlan}
            </Text>
          </CardBody>
        </Card>

        {/* Radio Colors */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Radio Groups - Colors
            </Text>
          </CardHeader>
          <CardBody style={{ gap: 16 }}>
            <RadioGroup color="primary" defaultValue="1" label="Primary">
              <Radio value="1">Option 1</Radio>
              <Radio value="2">Option 2</Radio>
            </RadioGroup>

            <RadioGroup color="success" defaultValue="1" label="Success">
              <Radio value="1">Option 1</Radio>
              <Radio value="2">Option 2</Radio>
            </RadioGroup>

            <RadioGroup color="warning" defaultValue="1" label="Warning">
              <Radio value="1">Option 1</Radio>
              <Radio value="2">Option 2</Radio>
            </RadioGroup>

            <RadioGroup color="danger" defaultValue="1" label="Danger">
              <Radio value="1">Option 1</Radio>
              <Radio value="2">Option 2</Radio>
            </RadioGroup>
          </CardBody>
        </Card>

        {/* Skeletons - Standalone */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Skeletons - Standalone
            </Text>
          </CardHeader>
          <CardBody>
            <Skeleton style={{ width: '100%', height: 20, marginBottom: 8 }} />
            <Skeleton style={{ width: '80%', height: 20, marginBottom: 8 }} />
            <Skeleton style={{ width: '60%', height: 20 }} />
          </CardBody>
        </Card>

        {/* Skeletons - Loading Card */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Skeletons - Loading Card
            </Text>
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

        {/* Skeletons - With isLoaded */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Skeletons - With isLoaded
            </Text>
          </CardHeader>
          <CardBody>
            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
              <Skeleton isLoaded={contentLoaded}>
                <Avatar
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  size="lg"
                />
              </Skeleton>
              <View style={{ flex: 1, gap: 4 }}>
                <Skeleton isLoaded={contentLoaded}>
                  <Text
                    style={[
                      { fontSize: 18, fontWeight: 'bold' },
                      { color: theme.colors.foreground },
                    ]}
                  >
                    Jane Smith
                  </Text>
                </Skeleton>
                <Skeleton isLoaded={contentLoaded}>
                  <Text style={{ color: theme.colors['default-500'] }}>
                    Product Designer
                  </Text>
                </Skeleton>
              </View>
            </View>
            <Skeleton isLoaded={contentLoaded}>
              <Text style={{ color: theme.colors.foreground }}>
                Creating delightful user experiences with attention to detail.
              </Text>
            </Skeleton>
          </CardBody>
        </Card>

        {/* Skeletons - Interactive */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Skeletons - Interactive
            </Text>
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
                  <Text
                    style={[
                      { fontSize: 18, fontWeight: 'bold' },
                      { color: theme.colors.foreground },
                    ]}
                  >
                    Alex Johnson
                  </Text>
                </Skeleton>
                <Skeleton isLoaded={profileLoaded}>
                  <Text style={{ color: theme.colors['default-500'] }}>
                    Full Stack Developer
                  </Text>
                </Skeleton>
              </View>
            </View>
            <Skeleton isLoaded={profileLoaded} style={{ marginBottom: 16 }}>
              <Text style={{ color: theme.colors.foreground }}>
                Building scalable applications with modern technologies.
              </Text>
            </Skeleton>
            <Button onPress={reloadProfile} colorScheme="primary" size="sm">
              {profileLoaded ? 'Reload Profile' : 'Loading...'}
            </Button>
          </CardBody>
        </Card>

        {/* Image Component */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Image Component
            </Text>
          </CardHeader>
          <CardBody>
            <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
              <Image
                src="https://i.pravatar.cc/300?u=a042581f4e29026024d"
                width={150}
                height={150}
                radius="lg"
                alt="Avatar"
              />
              <Image
                src="https://picsum.photos/300"
                width={150}
                height={150}
                radius="full"
                alt="Random"
              />
            </View>
          </CardBody>
        </Card>

        {/* Textarea Component */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Textarea Component
            </Text>
          </CardHeader>
          <CardBody style={{ gap: 16 }}>
            <Textarea
              label="Message"
              placeholder="Enter your message"
              value={message}
              onChangeText={setMessage}
              variant="bordered"
              minRows={3}
            />
            <Textarea
              label="Description"
              placeholder="Enter description"
              variant="flat"
              description="Maximum 500 characters"
              minRows={4}
            />
          </CardBody>
        </Card>

        {/* Slider Component */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Slider Component
            </Text>
          </CardHeader>
          <CardBody style={{ gap: 16 }}>
            <Slider
              label="Volume"
              value={sliderValue}
              onChange={setSliderValue}
              color="primary"
              showValue
              minValue={0}
              maxValue={100}
            />
            <Slider
              label="Brightness"
              defaultValue={75}
              color="success"
              showValue
              size="sm"
            />
            <Slider
              label="Temperature"
              defaultValue={20}
              color="danger"
              showValue
              minValue={0}
              maxValue={40}
              size="lg"
            />
          </CardBody>
        </Card>

        {/* Select Component */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Select Component
            </Text>
          </CardHeader>
          <CardBody style={{ gap: 16 }}>
            <Select
              label="Country"
              placeholder="Select a country"
              value={selectedCountry}
              onChange={setSelectedCountry}
              items={[
                { label: 'United States', value: 'us' },
                { label: 'Canada', value: 'ca' },
                { label: 'United Kingdom', value: 'uk' },
                { label: 'Australia', value: 'au' },
                { label: 'Germany', value: 'de' },
              ]}
              variant="bordered"
            />
            <Select
              label="Framework"
              placeholder="Choose framework"
              defaultValue="react"
              items={[
                {
                  label: 'React',
                  value: 'react',
                  description: 'A JavaScript library',
                },
                {
                  label: 'Vue',
                  value: 'vue',
                  description: 'The Progressive Framework',
                },
                {
                  label: 'Angular',
                  value: 'angular',
                  description: 'Platform for building apps',
                },
              ]}
              variant="flat"
            />
          </CardBody>
        </Card>

        {/* Progress Component */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Progress Component
            </Text>
          </CardHeader>
          <CardBody style={{ gap: 16 }}>
            <Progress
              label="Loading"
              value={progressValue}
              color="primary"
              showValueLabel
            />
            <Progress
              label="Upload"
              value={65}
              color="success"
              size="sm"
              showValueLabel
            />
            <Progress
              label="Processing"
              isIndeterminate
              color="secondary"
              size="lg"
            />
          </CardBody>
        </Card>

        {/* Card Examples with Dividers */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Interactive Card with Dividers
            </Text>
          </CardHeader>
          <Divider />
          <CardBody>
            <Text
              style={[styles.bodyText, { color: theme.colors['default-600'] }]}
            >
              This is a card with header, body, and footer sections. Cards can
              be elevated, flat, or bordered.
            </Text>
            <Divider style={{ marginVertical: 12 }} />
            <Text
              style={[styles.bodyText, { color: theme.colors['default-500'] }]}
            >
              Dividers help separate content sections clearly.
            </Text>
          </CardBody>
          <Divider />
          <CardFooter>
            <View style={styles.cardFooter}>
              <Button variant="ghost" colorScheme="danger" size="sm">
                Cancel
              </Button>
              <Divider orientation="vertical" style={{ height: 32 }} />
              <Button variant="solid" colorScheme="primary" size="sm">
                Confirm
              </Button>
            </View>
          </CardFooter>
        </Card>

        {/* Accordion - Light Variant (Default) */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Accordion - Light Variant
            </Text>
          </CardHeader>
          <CardBody>
            <Accordion variant="light" defaultExpandedKeys={['1']}>
              <AccordionItem
                itemKey="1"
                title="What is React Native HeroUI?"
                subtitle="Learn about this library"
              >
                <Text style={{ color: theme.colors['default-600'] }}>
                  React Native HeroUI is a modern, beautiful UI component
                  library for React Native applications, inspired by NextUI.
                </Text>
              </AccordionItem>
              <AccordionItem
                itemKey="2"
                title="How to get started?"
                subtitle="Installation guide"
              >
                <Text style={{ color: theme.colors['default-600'] }}>
                  Install the package using npm or yarn and wrap your app with
                  ThemeProvider to get started.
                </Text>
              </AccordionItem>
              <AccordionItem
                itemKey="3"
                title="Key Features"
                subtitle="What makes it special"
              >
                <Text style={{ color: theme.colors['default-600'] }}>
                  Built-in dark mode, TypeScript support, customizable themes,
                  and a wide range of beautiful components.
                </Text>
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>

        {/* Accordion - Multiple Selection & Bordered Variant */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Accordion - Bordered & Multiple
            </Text>
          </CardHeader>
          <CardBody>
            <Accordion variant="bordered" selectionMode="multiple">
              <AccordionItem itemKey="a1" title="Components">
                <Text style={{ color: theme.colors['default-600'] }}>
                  Button, Input, Card, Avatar, Badge, Chip, Switch, Accordion,
                  and more!
                </Text>
              </AccordionItem>
              <AccordionItem itemKey="a2" title="Hooks">
                <Text style={{ color: theme.colors['default-600'] }}>
                  useTheme, useColorMode, useResponsive, useDisclosure for
                  powerful functionality.
                </Text>
              </AccordionItem>
              <AccordionItem itemKey="a3" title="Theming">
                <Text style={{ color: theme.colors['default-600'] }}>
                  Fully customizable theme system with light and dark mode
                  support out of the box.
                </Text>
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>

        {/* Accordion - Splitted Variant */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Accordion - Splitted Variant
            </Text>
          </CardHeader>
          <CardBody>
            <Accordion variant="splitted" isCompact>
              <AccordionItem
                itemKey="s1"
                title="💡 Installation"
                startContent={
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.colors.primary,
                    }}
                  />
                }
              >
                <Text style={{ color: theme.colors['default-600'] }}>
                  npm install react-native-heroui
                </Text>
              </AccordionItem>
              <AccordionItem
                itemKey="s2"
                title="🎨 Customization"
                startContent={
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.colors.secondary,
                    }}
                  />
                }
              >
                <Text style={{ color: theme.colors['default-600'] }}>
                  Customize themes, colors, spacing, and more to match your
                  brand.
                </Text>
              </AccordionItem>
              <AccordionItem
                itemKey="s3"
                title="🚀 Performance"
                startContent={
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.colors.success,
                    }}
                  />
                }
              >
                <Text style={{ color: theme.colors['default-600'] }}>
                  Optimized for performance with minimal re-renders and smooth
                  animations.
                </Text>
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>

        {/* Accordion - Shadow Variant with Custom Indicator */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Accordion - Custom Indicator
            </Text>
          </CardHeader>
          <CardBody>
            <Accordion variant="shadow">
              <AccordionItem
                itemKey="c1"
                title="Premium Features"
                indicator={({ isOpen }) => (
                  <Text style={{ fontSize: 16, color: theme.colors.primary }}>
                    {isOpen ? '−' : '+'}
                  </Text>
                )}
              >
                <Text style={{ color: theme.colors['default-600'] }}>
                  Get access to premium components, priority support, and
                  advanced features.
                </Text>
              </AccordionItem>
              <AccordionItem
                itemKey="c2"
                title="Documentation"
                indicator={({ isOpen }) => (
                  <Text style={{ fontSize: 16, color: theme.colors.primary }}>
                    {isOpen ? '−' : '+'}
                  </Text>
                )}
              >
                <Text style={{ color: theme.colors['default-600'] }}>
                  Comprehensive documentation with examples and API references.
                </Text>
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>

        {/* Alerts */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Alerts
            </Text>
          </CardHeader>
          <CardBody>
            <View style={{ gap: 12 }}>
              <Alert
                title="Success"
                description="Your changes have been saved successfully."
                color="success"
                isClosable
              />
              <Alert
                title="Warning"
                description="Your storage is almost full."
                color="warning"
              />
              <Alert
                title="Info"
                description="New features are now available!"
                color="primary"
                endContent={
                  <Button size="sm" variant="ghost" colorScheme="primary">
                    View
                  </Button>
                }
              />
              <Alert
                title="Error"
                description="Unable to connect to the server."
                color="danger"
                variant="bordered"
                isClosable
              />
            </View>
          </CardBody>
        </Card>

        {/* Toast Examples */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Toasts
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.buttonGrid}>
              <Button
                size="sm"
                colorScheme="success"
                onPress={() => toast.success('Operation successful!')}
              >
                Success
              </Button>
              <Button
                size="sm"
                colorScheme="danger"
                onPress={() => toast.error('Error occurred!')}
              >
                Error
              </Button>
              <Button
                size="sm"
                colorScheme="warning"
                onPress={() => toast.warning('Warning message!')}
              >
                Warning
              </Button>
              <Button
                size="sm"
                colorScheme="primary"
                onPress={() => toast.info('Information')}
              >
                Info
              </Button>
              <Button
                size="sm"
                variant="outline"
                colorScheme="primary"
                onPress={() =>
                  toast.success({
                    title: 'With Title',
                    description: 'This toast has both title and description',
                  })
                }
              >
                Detailed
              </Button>
              <Button
                size="sm"
                variant="outline"
                colorScheme="secondary"
                onPress={() =>
                  toast.show({
                    description: 'Auto-dismiss in 5s',
                    timeout: 5000,
                    shouldShowTimeoutProgress: true,
                  })
                }
              >
                Progress Bar
              </Button>
            </View>
          </CardBody>
        </Card>

        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}

function App() {
  return (
    <HeroUIProvider initialTheme="light">
      <ToastProvider placement="bottom-right" maxVisibleToasts={3}>
        <ComponentShowcase />
      </ToastProvider>
    </HeroUIProvider>
  );
}

let AppEntryPoint = App;

// Storybook integration - disabled by default
// To enable, set STORYBOOK_ENABLED=true in your environment
// if (Constants?.expoConfig?.extra?.storybookEnabled === 'true') {
//   AppEntryPoint = require('../.storybook').default;
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginVertical: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  helperText: {
    fontSize: 14,
    marginTop: 4,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  avatarRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
  },
});

export default AppEntryPoint;
