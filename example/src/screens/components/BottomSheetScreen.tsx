import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  BottomSheet,
  BottomSheetHeader,
  BottomSheetBody,
  BottomSheetFooter,
  Input,
  Textarea,
  Alert,
  useTheme,
  toast,
} from 'react-native-heroui';

export default function BottomSheetScreen() {
  const { theme } = useTheme();
  const [isBasicOpen, setIsBasicOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [sheetName, setSheetName] = useState('');
  const [sheetEmail, setSheetEmail] = useState('');

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Basic Bottom Sheet */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Basic Bottom Sheet
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <Button colorScheme="primary" onPress={() => setIsBasicOpen(true)}>
              Open Basic Sheet
            </Button>
          </CardBody>
        </Card>

        {/* Form Bottom Sheet */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Form Bottom Sheet
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <Button variant="outline" onPress={() => setIsFormOpen(true)}>
              Open Form Sheet
            </Button>
          </CardBody>
        </Card>

        {/* Share Bottom Sheet */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Share Bottom Sheet
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <Button variant="ghost" onPress={() => setIsShareOpen(true)}>
              Open Share Sheet
            </Button>
          </CardBody>
        </Card>

        {/* Basic Bottom Sheet Component */}
        <BottomSheet
          isOpen={isBasicOpen}
          onClose={() => setIsBasicOpen(false)}
          snapPoints={['40%', '80%']}
          showDragHandle
          onSnapChange={(index) => {
            console.log('Snapped to index:', index);
          }}
        >
          <BottomSheetHeader showCloseButton>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: theme.colors.foreground,
              }}
            >
              Welcome to BottomSheet
            </Text>
          </BottomSheetHeader>
          <BottomSheetBody>
            <View style={styles.bottomSheetContent}>
              <Text style={{ color: theme.colors.foreground, fontSize: 16 }}>
                This is a gesture-driven bottom sheet component with smooth
                animations powered by Reanimated!
              </Text>
              <Alert color="primary" variant="flat">
                <Text style={{ color: theme.colors.primary }}>
                  💡 Drag the handle or swipe down to change snap points
                </Text>
              </Alert>
            </View>
          </BottomSheetBody>
          <BottomSheetFooter>
            <View style={styles.footerContent}>
              <Button
                colorScheme="primary"
                onPress={() => setIsBasicOpen(false)}
                fullWidth
              >
                Got it!
              </Button>
            </View>
          </BottomSheetFooter>
        </BottomSheet>

        {/* Form Bottom Sheet Component */}
        <BottomSheet
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          snapPoints={['70%']}
          closeOnBackdropPress={false}
          backdrop="blur"
        >
          <BottomSheetHeader showCloseButton>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: theme.colors.foreground,
              }}
            >
              User Information
            </Text>
          </BottomSheetHeader>
          <BottomSheetBody scrollable={false}>
            <View style={styles.bottomSheetContent}>
              <Input
                label="Name"
                placeholder="Enter your name"
                value={sheetName}
                onChangeText={setSheetName}
                variant="bordered"
              />
              <Input
                label="Email"
                placeholder="Enter your email"
                value={sheetEmail}
                onChangeText={setSheetEmail}
                variant="bordered"
              />
              <Textarea
                label="Bio"
                placeholder="Tell us about yourself"
                variant="bordered"
                minRows={3}
              />
            </View>
          </BottomSheetBody>
          <BottomSheetFooter>
            <View style={styles.footerContent}>
              <Button
                colorScheme="primary"
                onPress={() => {
                  toast.success('Form submitted!');
                  setIsFormOpen(false);
                  setSheetName('');
                  setSheetEmail('');
                }}
                fullWidth
              >
                Submit
              </Button>
              <Button
                variant="outline"
                onPress={() => setIsFormOpen(false)}
                fullWidth
              >
                Cancel
              </Button>
            </View>
          </BottomSheetFooter>
        </BottomSheet>

        {/* Share Bottom Sheet Component */}
        <BottomSheet
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          snapPoints={[320]}
          showDragHandle
        >
          <BottomSheetHeader>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                textAlign: 'center',
                color: theme.colors.foreground,
              }}
            >
              Share via
            </Text>
          </BottomSheetHeader>
          <BottomSheetBody scrollable={false}>
            <View style={styles.shareGrid}>
              {[
                { icon: '📱', label: 'SMS', color: 'success' },
                { icon: '📧', label: 'Email', color: 'primary' },
                { icon: '🔗', label: 'Copy Link', color: 'secondary' },
                { icon: '💾', label: 'Save', color: 'warning' },
              ].map((option) => (
                <View key={option.label} style={styles.shareItem}>
                  <Button
                    size="lg"
                    variant="outline"
                    colorScheme={option.color as any}
                    onPress={() => {
                      toast.success(`Shared via ${option.label}!`);
                      setIsShareOpen(false);
                    }}
                    style={styles.shareButton}
                  >
                    <Text style={{ fontSize: 24 }}>{option.icon}</Text>
                  </Button>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 6,
                      textAlign: 'center',
                      color: theme.colors['default-600'],
                    }}
                  >
                    {option.label}
                  </Text>
                </View>
              ))}
            </View>
          </BottomSheetBody>
        </BottomSheet>

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
    gap: 12,
  },
  bottomSheetContent: {
    gap: 16,
  },
  footerContent: {
    gap: 8,
  },
  shareGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  shareItem: {
    width: '22%',
    alignItems: 'center',
    padding: 12,
  },
  shareButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 0,
  },
});
