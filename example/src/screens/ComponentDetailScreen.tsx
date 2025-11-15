import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Avatar,
  Badge,
  Checkbox,
  Chip,
  Switch,
  Spinner,
  Radio,
  RadioGroup,
  Skeleton,
  Image,
  Textarea,
  Slider,
  Select,
  Progress,
  Spacer,
  InputOtp,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Accordion,
  AccordionItem,
  Alert,
  Tooltip,
  Tabs,
  Tab,
  BottomSheet,
  BottomSheetHeader,
  BottomSheetBody,
  BottomSheetFooter,
  Drawer,
  DrawerHeader,
  DrawerBody,
  Divider,
  useTheme,
  toast,
} from 'react-native-heroui';
import type { RootStackParamList } from '../navigation';

type ComponentDetailRouteProp = RouteProp<
  RootStackParamList,
  'ComponentDetail'
>;

// Component showcase renderers
const componentShowcases: Record<
  string,
  (theme: any, styles: any) => React.ReactNode
> = {
  Button: (theme, styles) => (
    <>
      <Card variant="elevated" style={styles.section}>
        <CardHeader>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.foreground }]}
          >
            Button Variants
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
            style={styles.buttonMarginTop}
          >
            Full Width Button
          </Button>
          <Button
            variant="solid"
            colorScheme="secondary"
            isLoading
            fullWidth
            style={styles.buttonMarginTop}
          >
            Loading Button
          </Button>
        </CardBody>
      </Card>
    </>
  ),

  Input: (theme, styles) => {
    const [email, setEmail] = useState('');
    return (
      <Card variant="elevated" style={styles.section}>
        <CardHeader>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.foreground }]}
          >
            Input Examples
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
            style={styles.inputMarginTop}
          />
          <Input
            label="Disabled Input"
            placeholder="Disabled"
            isDisabled
            style={styles.inputMarginTop}
          />
        </CardBody>
      </Card>
    );
  },

  Avatar: (theme, styles) => (
    <Card variant="elevated" style={styles.section}>
      <CardHeader>
        <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
          Avatar Examples
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
      </CardBody>
    </Card>
  ),

  Badge: (theme, styles) => (
    <Card variant="elevated" style={styles.section}>
      <CardHeader>
        <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
          Badge Variants
        </Text>
      </CardHeader>
      <CardBody>
        <View style={styles.avatarRow}>
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
  ),

  Checkbox: (theme, styles) => {
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [tasks] = useState([
      { id: 1, text: 'Review documentation', done: false },
      { id: 2, text: 'Test components', done: true },
    ]);
    return (
      <Card variant="elevated" style={styles.section}>
        <CardHeader>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.foreground }]}
          >
            Checkbox Examples
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
            {tasks.map((task) => (
              <Checkbox
                key={task.id}
                isSelected={task.done}
                onValueChange={() => {}}
                lineThrough
                color="success"
              >
                {task.text}
              </Checkbox>
            ))}
          </View>
        </CardBody>
      </Card>
    );
  },

  Chip: (theme, styles) => (
    <Card variant="elevated" style={styles.section}>
      <CardHeader>
        <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
          Chip Variants
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
  ),

  Switch: (theme, styles) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    return (
      <Card variant="elevated" style={styles.section}>
        <CardHeader>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.foreground }]}
          >
            Switch Examples
          </Text>
        </CardHeader>
        <CardBody>
          <View style={styles.switchRow}>
            <View style={styles.flex}>
              <Text style={[styles.label, { color: theme.colors.foreground }]}>
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
          <View style={[styles.switchRow, styles.switchMarginTop]}>
            <Text style={[styles.label, { color: theme.colors.foreground }]}>
              Email Marketing
            </Text>
            <Switch defaultValue={false} color="primary" />
          </View>
        </CardBody>
      </Card>
    );
  },

  Spinner: (theme, styles) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
      <Card variant="elevated" style={styles.section}>
        <CardHeader>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.foreground }]}
          >
            Spinner Variants
          </Text>
        </CardHeader>
        <CardBody>
          <View style={styles.chipContainer}>
            <Spinner variant="default" color="primary" label="Default" />
            <Spinner variant="simple" color="success" label="Simple" />
            <Spinner variant="gradient" color="secondary" label="Gradient" />
          </View>
          <Divider style={styles.dividerMarginVertical} />
          <View style={styles.chipContainer}>
            <Spinner variant="wave" color="warning" label="Wave" />
            <Spinner variant="dots" color="danger" label="Dots" />
            <Spinner variant="spinner" color="primary" label="Spinner" />
          </View>
          <Divider style={styles.dividerMarginVerticalLarge} />
          <View style={styles.centerAlign}>
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
    );
  },

  Radio: (theme, styles) => {
    const [selectedFramework, setSelectedFramework] = useState('react');
    return (
      <Card variant="elevated" style={styles.section}>
        <CardHeader>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.foreground }]}
          >
            Radio Group Examples
          </Text>
        </CardHeader>
        <CardBody>
          <RadioGroup
            label="Select your favorite framework"
            description="Choose the one you use most often"
            value={selectedFramework}
            onValueChange={setSelectedFramework}
            style={styles.radioGroupMarginBottom}
          >
            <Radio value="react">React</Radio>
            <Radio value="vue">Vue.js</Radio>
            <Radio value="angular">Angular</Radio>
            <Radio value="svelte">Svelte</Radio>
          </RadioGroup>
          <Text
            style={[styles.helperText, { color: theme.colors['default-500'] }]}
          >
            Selected: {selectedFramework}
          </Text>
        </CardBody>
      </Card>
    );
  },

  Skeleton: (theme, styles) => {
    const [contentLoaded, setContentLoaded] = useState(false);
    React.useEffect(() => {
      const timer = setTimeout(() => setContentLoaded(true), 2500);
      return () => clearTimeout(timer);
    }, []);
    return (
      <>
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Skeleton - Standalone
            </Text>
          </CardHeader>
          <CardBody>
            <Skeleton style={styles.skeletonFull} />
            <Skeleton style={styles.skeletonEighty} />
            <Skeleton style={styles.skeletonSixty} />
          </CardBody>
        </Card>
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Skeleton - With isLoaded
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.skeletonRow}>
              <Skeleton isLoaded={contentLoaded}>
                <Avatar
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  size="lg"
                />
              </Skeleton>
              <View style={styles.skeletonContent}>
                <Skeleton isLoaded={contentLoaded}>
                  <Text
                    style={[
                      styles.skeletonTitle,
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
          </CardBody>
        </Card>
      </>
    );
  },

  Image: (theme, styles) => (
    <Card variant="elevated" style={styles.section}>
      <CardHeader>
        <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
          Image Component
        </Text>
      </CardHeader>
      <CardBody>
        <View style={styles.imageRow}>
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
  ),

  Textarea: (theme, styles) => {
    const [message, setMessage] = useState('');
    return (
      <Card variant="elevated" style={styles.section}>
        <CardHeader>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.foreground }]}
          >
            Textarea Component
          </Text>
        </CardHeader>
        <CardBody style={styles.cardBodyGap}>
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
    );
  },

  Slider: (theme, styles) => {
    const [sliderValue, setSliderValue] = useState(50);
    return (
      <Card variant="elevated" style={styles.section}>
        <CardHeader>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.foreground }]}
          >
            Slider Component
          </Text>
        </CardHeader>
        <CardBody style={styles.cardBodyGap}>
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
        </CardBody>
      </Card>
    );
  },

  Select: (theme, styles) => {
    const [selectedCountry, setSelectedCountry] = useState('');
    return (
      <Card variant="elevated" style={styles.section}>
        <CardHeader>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.foreground }]}
          >
            Select Component
          </Text>
        </CardHeader>
        <CardBody style={styles.cardBodyGap}>
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
        </CardBody>
      </Card>
    );
  },

  Progress: (theme, styles) => {
    const [progressValue, setProgressValue] = useState(0);
    React.useEffect(() => {
      const interval = setInterval(() => {
        setProgressValue((prev) => (prev >= 100 ? 0 : prev + 10));
      }, 500);
      return () => clearInterval(interval);
    }, []);
    return (
      <Card variant="elevated" style={styles.section}>
        <CardHeader>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.foreground }]}
          >
            Progress Component
          </Text>
        </CardHeader>
        <CardBody style={styles.cardBodyGap}>
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
    );
  },

  Spacer: (theme, styles) => (
    <Card variant="elevated" style={styles.section}>
      <CardHeader>
        <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
          Spacer Component
        </Text>
      </CardHeader>
      <CardBody>
        <Text
          style={[styles.spacerText, { color: theme.colors['default-600'] }]}
        >
          Spacer adds space between components:
        </Text>
        <View style={styles.spacerRow}>
          <Chip color="primary">Item 1</Chip>
          <Spacer x={2} />
          <Chip color="secondary">Item 2</Chip>
          <Spacer x={4} />
          <Chip color="success">Item 3</Chip>
        </View>
      </CardBody>
    </Card>
  ),

  InputOtp: (theme, styles) => {
    const [otpValue, setOtpValue] = useState('');
    return (
      <Card variant="elevated" style={styles.section}>
        <CardHeader>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.foreground }]}
          >
            Input OTP Component
          </Text>
        </CardHeader>
        <CardBody style={styles.cardBodyGap}>
          <InputOtp
            length={6}
            value={otpValue}
            onChange={setOtpValue}
            variant="bordered"
            color="primary"
            description="Enter the code sent to your phone"
          />
          <InputOtp
            length={4}
            type="password"
            variant="flat"
            color="secondary"
            size="lg"
          />
        </CardBody>
      </Card>
    );
  },

  Modal: (theme, styles) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
      <>
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Modal Component
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBodyGapSmall}>
            <Button colorScheme="primary" onPress={() => setIsModalOpen(true)}>
              Open Modal
            </Button>
          </CardBody>
        </Card>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="md"
          placement="center"
        >
          <ModalContent>
            <ModalHeader>Welcome to HeroUI</ModalHeader>
            <ModalBody>
              <Text style={{ color: theme.colors.foreground }}>
                This is a modal example with header, body, and footer sections.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onPress={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                colorScheme="primary"
                onPress={() => {
                  toast.success('Action confirmed!');
                  setIsModalOpen(false);
                }}
              >
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  },

  Accordion: (theme, styles) => (
    <Card variant="elevated" style={styles.section}>
      <CardHeader>
        <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
          Accordion Examples
        </Text>
      </CardHeader>
      <CardBody>
        <Accordion variant="default" defaultExpandedKeys={['1']}>
          <AccordionItem
            itemKey="1"
            title="What is React Native HeroUI?"
            subtitle="Learn about this library"
          >
            <Text style={{ color: theme.colors['default-600'] }}>
              React Native HeroUI is a modern, beautiful UI component library
              for React Native applications, inspired by NextUI.
            </Text>
          </AccordionItem>
          <AccordionItem itemKey="2" title="How to get started?">
            <Text style={{ color: theme.colors['default-600'] }}>
              Install the package and wrap your app with ThemeProvider.
            </Text>
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  ),

  Alert: (theme, styles) => (
    <Card variant="elevated" style={styles.section}>
      <CardHeader>
        <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
          Alert Examples
        </Text>
      </CardHeader>
      <CardBody>
        <View style={styles.alertContainer}>
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
  ),

  Tabs: (theme, styles) => (
    <Card variant="elevated" style={styles.section}>
      <CardHeader>
        <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
          Tabs Component
        </Text>
      </CardHeader>
      <CardBody>
        <Tabs defaultSelectedKey="profile" color="primary" variant="solid">
          <Tab tabKey="profile" title="Profile">
            <View style={styles.tabContent}>
              <Text
                style={[styles.tabText, { color: theme.colors.foreground }]}
              >
                Profile Settings
              </Text>
            </View>
          </Tab>
          <Tab tabKey="settings" title="Settings">
            <View style={styles.tabContent}>
              <Text
                style={[styles.tabText, { color: theme.colors.foreground }]}
              >
                Application Settings
              </Text>
            </View>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  ),

  BottomSheet: (theme, styles) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              BottomSheet Component
            </Text>
          </CardHeader>
          <CardBody>
            <Button colorScheme="primary" onPress={() => setIsOpen(true)}>
              Open Bottom Sheet
            </Button>
          </CardBody>
        </Card>
        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          snapPoints={['40%', '80%']}
          showDragHandle
        >
          <BottomSheetHeader showCloseButton>
            <Text
              style={[styles.headerTitle, { color: theme.colors.foreground }]}
            >
              Bottom Sheet
            </Text>
          </BottomSheetHeader>
          <BottomSheetBody>
            <Text style={{ color: theme.colors.foreground }}>
              This is a gesture-driven bottom sheet component.
            </Text>
          </BottomSheetBody>
          <BottomSheetFooter>
            <Button
              colorScheme="primary"
              onPress={() => setIsOpen(false)}
              fullWidth
            >
              Close
            </Button>
          </BottomSheetFooter>
        </BottomSheet>
      </>
    );
  },

  Drawer: (theme, styles) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Drawer Component
            </Text>
          </CardHeader>
          <CardBody>
            <Button colorScheme="primary" onPress={() => setIsOpen(true)}>
              Open Drawer
            </Button>
          </CardBody>
        </Card>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement="left"
          size="md"
        >
          <DrawerHeader showCloseButton>
            <Text
              style={[styles.headerTitle, { color: theme.colors.foreground }]}
            >
              Navigation Menu
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <Text style={{ color: theme.colors.foreground }}>
              Drawer content goes here
            </Text>
          </DrawerBody>
        </Drawer>
      </>
    );
  },

  Divider: (theme, styles) => (
    <Card variant="elevated" style={styles.section}>
      <CardHeader>
        <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
          Divider Component
        </Text>
      </CardHeader>
      <CardBody>
        <Text style={[styles.dividerText, { color: theme.colors.foreground }]}>
          Horizontal Divider:
        </Text>
        <Divider />
        <View style={styles.dividerVerticalContainer}>
          <Text
            style={[styles.dividerText, { color: theme.colors.foreground }]}
          >
            Vertical Divider:
          </Text>
          <View style={styles.dividerRow}>
            <Text style={{ color: theme.colors.foreground }}>Left</Text>
            <Divider orientation="vertical" style={styles.dividerVertical} />
            <Text style={{ color: theme.colors.foreground }}>Right</Text>
          </View>
        </View>
      </CardBody>
    </Card>
  ),

  Tooltip: (theme, styles) => (
    <Card variant="elevated" style={styles.section}>
      <CardHeader>
        <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
          Tooltip Examples
        </Text>
      </CardHeader>
      <CardBody>
        <Text
          style={[
            styles.helperText,
            styles.tooltipHelperText,
            { color: theme.colors['default-600'] },
          ]}
        >
          Long press buttons to see tooltips
        </Text>
        <View style={styles.buttonGrid}>
          <Tooltip content="Click to save your work" placement="top">
            <Button size="sm" colorScheme="primary">
              Save
            </Button>
          </Tooltip>
          <Tooltip
            content="Delete this item"
            placement="top"
            color="danger"
            showArrow
          >
            <Button size="sm" colorScheme="danger">
              Delete
            </Button>
          </Tooltip>
        </View>
      </CardBody>
    </Card>
  ),

  Toast: (theme, styles) => (
    <Card variant="elevated" style={styles.section}>
      <CardHeader>
        <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
          Toast Examples
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
        </View>
      </CardBody>
    </Card>
  ),

  Card: (theme, styles) => (
    <Card variant="elevated" style={styles.section}>
      <CardHeader>
        <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
          Card Component
        </Text>
      </CardHeader>
      <CardBody>
        <Text style={{ color: theme.colors['default-600'] }}>
          This is a card with header, body, and footer sections.
        </Text>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button variant="ghost" colorScheme="danger" size="sm">
          Cancel
        </Button>
        <Button variant="solid" colorScheme="primary" size="sm">
          Confirm
        </Button>
      </CardFooter>
    </Card>
  ),
};

export default function ComponentDetailScreen() {
  const route = useRoute<ComponentDetailRouteProp>();
  const componentName = route.params?.componentName ?? '';
  const { theme } = useTheme();

  const showcaseRenderer = componentShowcases[componentName];

  if (!showcaseRenderer) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.content}>
          <Text style={{ color: theme.colors.foreground }}>
            Component showcase not available for {componentName}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>{showcaseRenderer(theme, styles)}</View>
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
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  helperText: {
    fontSize: 14,
    marginTop: 4,
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
    flexWrap: 'wrap',
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
  flex: {
    flex: 1,
  },
  buttonMarginTop: {
    marginTop: 12,
  },
  inputMarginTop: {
    marginTop: 16,
  },
  checkboxContainer: {
    gap: 12,
  },
  switchMarginTop: {
    marginTop: 16,
  },
  dividerMarginVertical: {
    marginVertical: 12,
  },
  dividerMarginVerticalLarge: {
    marginVertical: 16,
  },
  centerAlign: {
    alignItems: 'center',
  },
  radioGroupMarginBottom: {
    marginBottom: 20,
  },
  skeletonFull: {
    width: '100%',
    height: 20,
    marginBottom: 8,
  },
  skeletonEighty: {
    width: '80%',
    height: 20,
    marginBottom: 8,
  },
  skeletonSixty: {
    width: '60%',
    height: 20,
  },
  skeletonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  skeletonContent: {
    flex: 1,
    gap: 4,
  },
  skeletonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  cardBodyGap: {
    gap: 16,
  },
  cardBodyGapSmall: {
    gap: 12,
  },
  spacerText: {
    marginBottom: 12,
  },
  spacerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabContent: {
    padding: 16,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dividerText: {
    marginBottom: 12,
  },
  dividerVerticalContainer: {
    marginVertical: 24,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerVertical: {
    height: 32,
    marginHorizontal: 16,
  },
  alertContainer: {
    gap: 12,
  },
  tooltipHelperText: {
    marginBottom: 16,
  },
});
