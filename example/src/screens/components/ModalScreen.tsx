import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Spacer,
  useTheme,
  toast,
} from 'react-native-heroui';

export default function ModalScreen() {
  const { theme } = useTheme();
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);
  const [modalEmail, setModalEmail] = useState('');
  const [modalPassword, setModalPassword] = useState('');

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Basic Modal */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Basic Modal
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <Button
              colorScheme="primary"
              onPress={() => setIsBasicModalOpen(true)}
            >
              Open Basic Modal
            </Button>
          </CardBody>
        </Card>

        {/* Form Modal */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Form Modal
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <Button
              colorScheme="secondary"
              onPress={() => setIsFormModalOpen(true)}
            >
              Open Form Modal
            </Button>
          </CardBody>
        </Card>

        {/* Large Modal */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Large Modal
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <Button
              colorScheme="success"
              onPress={() => setIsLargeModalOpen(true)}
            >
              Open Large Modal
            </Button>
          </CardBody>
        </Card>

        {/* Basic Modal Component */}
        <Modal
          isOpen={isBasicModalOpen}
          onClose={() => setIsBasicModalOpen(false)}
          size="md"
          placement="center"
        >
          <ModalContent>
            <ModalHeader>Welcome to HeroUI</ModalHeader>
            <ModalBody>
              <Text style={{ color: theme.colors.foreground }}>
                This is a basic modal example with header, body, and footer
                sections.
              </Text>
              <Spacer y={4} />
              <Text style={{ color: theme.colors['default-500'] }}>
                Click the backdrop or close button to dismiss.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                onPress={() => setIsBasicModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                colorScheme="primary"
                onPress={() => {
                  toast.success('Action confirmed!');
                  setIsBasicModalOpen(false);
                }}
              >
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Form Modal Component */}
        <Modal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          size="lg"
          placement="center"
        >
          <ModalContent>
            <ModalHeader>Sign In</ModalHeader>
            <ModalBody>
              <Input
                label="Email"
                placeholder="Enter your email"
                value={modalEmail}
                onChangeText={setModalEmail}
              />
              <Spacer y={3} />
              <Input
                label="Password"
                placeholder="Enter your password"
                value={modalPassword}
                onChangeText={setModalPassword}
                secureTextEntry
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onPress={() => setIsFormModalOpen(false)}>
                Cancel
              </Button>
              <Button
                colorScheme="primary"
                onPress={() => {
                  toast.success(`Signed in as ${modalEmail}`);
                  setIsFormModalOpen(false);
                  setModalEmail('');
                  setModalPassword('');
                }}
              >
                Sign In
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Large Modal Component */}
        <Modal
          isOpen={isLargeModalOpen}
          onClose={() => setIsLargeModalOpen(false)}
          size="lg"
          placement="center"
        >
          <ModalContent>
            <ModalHeader>Large Modal</ModalHeader>
            <ModalBody>
              <Text style={{ color: theme.colors.foreground }}>
                This is a large modal with more content space. You can add
                forms, images, or any other content here.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                onPress={() => setIsLargeModalOpen(false)}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

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
});
