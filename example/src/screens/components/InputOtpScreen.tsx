import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  InputOtp,
  useTheme,
  toast,
} from 'react-native-heroui';

export default function InputOtpScreen() {
  const { theme } = useTheme();
  const [otpValue, setOtpValue] = useState('');
  const [pinValue, setPinValue] = useState('');

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Basic OTP */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Basic OTP Input
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <InputOtp
              length={6}
              value={otpValue}
              onChange={setOtpValue}
              variant="bordered"
              color="primary"
              description="Enter the code sent to your phone"
            />
            {otpValue.length === 6 && (
              <Text
                style={{
                  color: theme.colors.success,
                  marginTop: 8,
                  fontSize: 14,
                }}
              >
                ✓ Code entered: {otpValue}
              </Text>
            )}
          </CardBody>
        </Card>

        {/* Password Type */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Password Type
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <InputOtp
              length={4}
              type="password"
              value={pinValue}
              onChange={setPinValue}
              variant="flat"
              color="secondary"
              size="lg"
              onComplete={(value) => {
                toast.success(`PIN completed: ${value}`);
              }}
            />
          </CardBody>
        </Card>

        {/* Variants */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Variants
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <InputOtp
              length={4}
              defaultValue="1234"
              variant="bordered"
              size="sm"
            />
            <InputOtp
              length={4}
              defaultValue="5678"
              variant="faded"
              color="success"
              size="sm"
            />
            <InputOtp
              length={4}
              defaultValue="9012"
              variant="underlined"
              color="warning"
              size="sm"
            />
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
          <CardBody style={styles.cardBody}>
            <InputOtp length={4} defaultValue="1234" size="sm" />
            <InputOtp length={4} defaultValue="5678" size="md" />
            <InputOtp length={4} defaultValue="9012" size="lg" />
          </CardBody>
        </Card>

        {/* Different Lengths */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Different Lengths
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <InputOtp length={4} defaultValue="1234" variant="bordered" />
            <InputOtp length={6} defaultValue="123456" variant="bordered" />
            <InputOtp length={8} defaultValue="12345678" variant="bordered" />
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
          <CardBody style={styles.cardBody}>
            <InputOtp length={4} defaultValue="1234" color="primary" />
            <InputOtp length={4} defaultValue="5678" color="success" />
            <InputOtp length={4} defaultValue="9012" color="warning" />
            <InputOtp length={4} defaultValue="3456" color="danger" />
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
  cardBody: {
    gap: 16,
  },
});
