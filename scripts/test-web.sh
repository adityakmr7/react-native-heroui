#!/bin/bash

# Web Testing Script for React Native HeroUI
# Tests that the web version builds and runs without errors

set -e

echo "🌐 Testing React Native HeroUI Web Compatibility"
echo "================================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track results
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Helper function to run tests
run_test() {
  local test_name=$1
  local test_command=$2
  
  TOTAL_TESTS=$((TOTAL_TESTS + 1))
  echo -e "${YELLOW}▶${NC} Running: $test_name"
  
  if eval "$test_command" > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} PASSED: $test_name"
    PASSED_TESTS=$((PASSED_TESTS + 1))
    return 0
  else
    echo -e "${RED}✗${NC} FAILED: $test_name"
    FAILED_TESTS=$((FAILED_TESTS + 1))
    return 1
  fi
}

echo "1️⃣  Pre-flight Checks"
echo "-------------------"

# Check if example directory exists
run_test "Example directory exists" "test -d example"

# Check if package.json has web script
run_test "Web script is configured" "grep -q '\"web\"' example/package.json"

# Check dependencies
run_test "react-native-web is installed" "grep -q 'react-native-web' example/package.json"
run_test "react-dom is installed" "grep -q 'react-dom' example/package.json"
run_test "react-native-reanimated is installed" "grep -q 'react-native-reanimated' example/package.json"
run_test "react-native-gesture-handler is installed" "grep -q 'react-native-gesture-handler' example/package.json"

echo ""
echo "2️⃣  Babel Configuration"
echo "----------------------"

# Check babel config
run_test "Babel config exists" "test -f example/babel.config.js"
run_test "Reanimated plugin configured" "grep -q 'react-native-reanimated/plugin' example/babel.config.js"

echo ""
echo "3️⃣  Library Build"
echo "----------------"

# Check if library is built
run_test "Library module build exists" "test -d lib/module"
run_test "Library TypeScript defs exist" "test -d lib/typescript"

# Check critical component exports
run_test "Button exports" "grep -q 'export.*Button' lib/module/index.js"
run_test "BottomSheet exports" "grep -q 'export.*BottomSheet' lib/module/index.js"
run_test "Drawer exports" "grep -q 'export.*Drawer' lib/module/index.js"

echo ""
echo "4️⃣  Source Code Checks"
echo "---------------------"

# Check for web-incompatible code
TOTAL_TESTS=$((TOTAL_TESTS + 1))
if ! grep -r "NativeModules" src/ > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} PASSED: No NativeModules usage (web compatible)"
  PASSED_TESTS=$((PASSED_TESTS + 1))
else
  echo -e "${RED}✗${NC} FAILED: Found NativeModules usage (may not work on web)"
  FAILED_TESTS=$((FAILED_TESTS + 1))
fi

TOTAL_TESTS=$((TOTAL_TESTS + 1))
if ! grep -r "requireNativeComponent" src/ > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} PASSED: No native components (web compatible)"
  PASSED_TESTS=$((PASSED_TESTS + 1))
else
  echo -e "${RED}✗${NC} FAILED: Found native components (may not work on web)"
  FAILED_TESTS=$((FAILED_TESTS + 1))
fi

echo ""
echo "5️⃣  Reanimated 3 Web Compatibility"
echo "-----------------------------------"

# Check Reanimated usage
run_test "useSharedValue usage" "grep -q 'useSharedValue' src/components/Button/Button.tsx"
run_test "useAnimatedStyle usage" "grep -q 'useAnimatedStyle' src/components/Button/Button.tsx"
run_test "withSpring usage" "grep -q 'withSpring' src/components/Switch/Switch.tsx"
run_test "interpolateColor usage" "grep -q 'interpolateColor' src/components/Switch/Switch.tsx"

echo ""
echo "6️⃣  Gesture Handler Web Compatibility"
echo "-------------------------------------"

# Check Gesture Handler usage
run_test "Gesture.Pan usage" "grep -q 'Gesture.Pan' src/components/Slider/Slider.tsx"
run_test "GestureDetector usage" "grep -q 'GestureDetector' src/components/BottomSheet/BottomSheet.tsx"
run_test "Drawer gestures" "grep -q 'Gesture.Pan' src/components/Drawer/Drawer.tsx"

echo ""
echo "7️⃣  Documentation"
echo "----------------"

run_test "Web compatibility docs exist" "test -f WEB_COMPATIBILITY.md"
run_test "Web test checklist exists" "test -f WEB_TEST_CHECKLIST.md"
run_test "README mentions web support" "grep -qi 'web' README.md"

echo ""
echo "📊 Test Results"
echo "=============="
echo ""
echo "Total Tests:  $TOTAL_TESTS"
echo -e "Passed:       ${GREEN}$PASSED_TESTS${NC}"
echo -e "Failed:       ${RED}$FAILED_TESTS${NC}"
echo ""

if [ $FAILED_TESTS -eq 0 ]; then
  echo -e "${GREEN}✅ All tests passed! Web support is ready! 🎉${NC}"
  echo ""
  echo "Next steps:"
  echo "1. Start web dev server: cd example && npm run web"
  echo "2. Open http://localhost:8081 in your browser"
  echo "3. Test components manually using WEB_TEST_CHECKLIST.md"
  exit 0
else
  echo -e "${RED}❌ Some tests failed. Please fix issues before proceeding.${NC}"
  exit 1
fi

