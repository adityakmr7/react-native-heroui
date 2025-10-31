import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Switch,
  useTheme,
  useColorMode,
} from 'react-native-heroui';

export default function ThemeScreen() {
  const { theme, themeMode } = useTheme();
  const { toggleColorMode } = useColorMode();
  const customPrimary = '#0070f3';
  const customSecondary = '#7928ca';

  const exampleThemes = [
    {
      name: 'Default',
      colors: {
        primary: '#0070f3',
        secondary: '#7928ca',
        success: '#17c964',
        warning: '#f5a524',
        danger: '#f31260',
      },
    },
    {
      name: 'Ocean',
      colors: {
        primary: '#00b4d8',
        secondary: '#0077b6',
        success: '#06d6a0',
        warning: '#ffd60a',
        danger: '#e63946',
      },
    },
    {
      name: 'Forest',
      colors: {
        primary: '#06a77d',
        secondary: '#0d7377',
        success: '#4ade80',
        warning: '#fbbf24',
        danger: '#ef4444',
      },
    },
    {
      name: 'Sunset',
      colors: {
        primary: '#ff6b35',
        secondary: '#f7931e',
        success: '#06d6a0',
        warning: '#ffd60a',
        danger: '#e63946',
      },
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Theme Switcher */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Theme Mode
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.row}>
              <View style={styles.flex}>
                <Text
                  style={[styles.label, { color: theme.colors.foreground }]}
                >
                  Current Mode: {themeMode}
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
                onChange={toggleColorMode}
                color="primary"
              />
            </View>
          </CardBody>
        </Card>

        {/* Example Themes */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Example Themes
            </Text>
          </CardHeader>
          <CardBody>
            <Text
              style={[
                styles.helperText,
                { color: theme.colors['default-500'], marginBottom: 16 },
              ]}
            >
              Here are some example theme color combinations you can use:
            </Text>
            <View style={styles.themeGrid}>
              {exampleThemes.map((exampleTheme) => (
                <Card
                  key={exampleTheme.name}
                  variant="bordered"
                  style={styles.themeCard}
                >
                  <CardBody style={styles.themeCardBody}>
                    <Text
                      style={[
                        styles.themeName,
                        { color: theme.colors.foreground },
                      ]}
                    >
                      {exampleTheme.name}
                    </Text>
                    <View style={styles.colorPalette}>
                      {Object.entries(exampleTheme.colors).map(
                        ([key, color]) => (
                          <View
                            key={key}
                            style={[
                              styles.colorSwatch,
                              { backgroundColor: color },
                            ]}
                          >
                            <Text style={styles.colorLabel}>{key}</Text>
                          </View>
                        )
                      )}
                    </View>
                  </CardBody>
                </Card>
              ))}
            </View>
          </CardBody>
        </Card>

        {/* Custom Theme Colors */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Custom Theme Colors
            </Text>
          </CardHeader>
          <CardBody>
            <Text
              style={[
                styles.helperText,
                { color: theme.colors['default-500'], marginBottom: 16 },
              ]}
            >
              You can customize theme colors by passing customColors to
              HeroUIProvider:
            </Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                {`const customTheme = {
  light: {
    primary: '${customPrimary}',
    secondary: '${customSecondary}',
    success: '#17c964',
    warning: '#f5a524',
    danger: '#f31260',
  },
  dark: {
    primary: '${customPrimary}',
    secondary: '${customSecondary}',
    success: '#4ade80',
    warning: '#ffb74d',
    danger: '#f44336',
  },
};

<HeroUIProvider 
  initialTheme="light" 
  customColors={customTheme}
>
  <App />
</HeroUIProvider>`}
              </Text>
            </View>
          </CardBody>
        </Card>

        {/* Theme Tokens */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Available Theme Tokens
            </Text>
          </CardHeader>
          <CardBody>
            <Text
              style={[
                styles.helperText,
                { color: theme.colors['default-500'], marginBottom: 16 },
              ]}
            >
              Theme provides various color tokens you can use:
            </Text>
            <View style={styles.tokenList}>
              <View style={styles.tokenItem}>
                <Text
                  style={[styles.tokenName, { color: theme.colors.primary }]}
                >
                  primary
                </Text>
                <View
                  style={[
                    styles.tokenColor,
                    { backgroundColor: theme.colors.primary },
                  ]}
                />
              </View>
              <View style={styles.tokenItem}>
                <Text
                  style={[styles.tokenName, { color: theme.colors.secondary }]}
                >
                  secondary
                </Text>
                <View
                  style={[
                    styles.tokenColor,
                    { backgroundColor: theme.colors.secondary },
                  ]}
                />
              </View>
              <View style={styles.tokenItem}>
                <Text
                  style={[styles.tokenName, { color: theme.colors.success }]}
                >
                  success
                </Text>
                <View
                  style={[
                    styles.tokenColor,
                    { backgroundColor: theme.colors.success },
                  ]}
                />
              </View>
              <View style={styles.tokenItem}>
                <Text
                  style={[styles.tokenName, { color: theme.colors.warning }]}
                >
                  warning
                </Text>
                <View
                  style={[
                    styles.tokenColor,
                    { backgroundColor: theme.colors.warning },
                  ]}
                />
              </View>
              <View style={styles.tokenItem}>
                <Text
                  style={[styles.tokenName, { color: theme.colors.danger }]}
                >
                  danger
                </Text>
                <View
                  style={[
                    styles.tokenColor,
                    { backgroundColor: theme.colors.danger },
                  ]}
                />
              </View>
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
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  helperText: {
    fontSize: 14,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
  },
  themeGrid: {
    gap: 12,
  },
  themeCard: {
    marginBottom: 12,
  },
  themeCardBody: {
    padding: 16,
  },
  themeName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorSwatch: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  colorLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  codeBlock: {
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  codeText: {
    color: '#d4d4d4',
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 18,
  },
  tokenList: {
    gap: 12,
  },
  tokenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  tokenName: {
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  tokenColor: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
});
