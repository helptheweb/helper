# Accessibility Helper

A TypeScript-based accessibility tool that enhances web page usability with customizable font sizes and display settings.

## Features

- Adjustable font size (increase, decrease, reset)
- Greyscale mode
- High contrast mode
- Negative contrast mode
- Link underlining
- Readable font option (Arial)

## Installation

To use the Accessibility Helper in your project, follow these steps:

1. Install the package
   ```
   npm install @helptheweb/helper
   ```

2. Import and initialize the Helper class in your TypeScript or JavaScript file:
   ```typescript
   import Helper from '@helptheweb/helper';

   const accessibilityHelper = new Helper();
   ```

## Usage

The Accessibility Helper automatically creates a UI panel that users can interact with.

### Initialization Options

You can customize the Helper instance by passing options:

```typescript
const options = {
  defaultFontSize: 18, // Default is 16
  buttonColor: '#007bff' // Default is '#1e232f'
};

const accessibilityHelper = new Helper(options);
```

### Methods

While the UI provides buttons for all functions, you can also programmatically control the Helper:

```typescript
// Adjust font size
accessibilityHelper.increaseFontSize();
accessibilityHelper.decreaseFontSize();
accessibilityHelper.resetFontSize();

// Toggle settings
accessibilityHelper.toggleSetting('greyscale');
accessibilityHelper.toggleSetting('highContrast');
accessibilityHelper.toggleSetting('negativeContrast');
accessibilityHelper.toggleSetting('underlineLinks');
accessibilityHelper.toggleSetting('readableFont');
```

## Accessibility Considerations

This tool aims to improve web accessibility, but it's important to note that it should complement, not replace, good accessibility practices in your base website design.

## Browser Compatibility

This tool should work in modern browsers that support ES6+ features. Ensure you're using appropriate polyfills or transpilation for older browser support.

## Contributing

Contributions are welcome!
