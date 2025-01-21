# @helptheweb/helper

The official accessibility helper widget from helptheweb.org, adding features like font size adjustment, contrast modes, and more.

## Installation and Usage

### HTML (CDN)

```html
<script src="https://unpkg.com/@helptheweb/helper"></script>

<!-- Then initialize with default settings -->
<script>
  const accessibilityHelper = new AccessibilityHelper.Helper();
</script>

<!-- Or initialize with custom options -->
<script>
  const accessibilityHelper = new AccessibilityHelper.Helper({
    defaultFontSize: 18,
    buttonColor: '#000000'
  });
</script>
```

### ESM

```bash
npm install @helptheweb/helper
```

```typescript
import { Helper } from 'web-accessibility-helper';

// Initialize with default settings
const accessibilityHelper = new Helper();

// Or initialize with custom options
const accessibilityHelper = new Helper({
  defaultFontSize: 18,
  buttonColor: '#000000'
});
```

### CommonJS

```bash
npm install @helptheweb/helper
```

```typescript
const { Helper } = require('@helptheweb/helper');

// Initialize with default settings
const accessibilityHelper = new Helper();

// Or initialize with custom options
const accessibilityHelper = new Helper({
  defaultFontSize: 18,
  buttonColor: '#000000'
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `defaultFontSize` | number | 16 | The base font size in pixels |
| `buttonColor` | string | '#1e232f' | The color of the accessibility toggle button |

## Features Explanation

### Font Size Controls

- Increase: Enlarges text by 2px increments
- Decrease: Reduces text by 2px increments (minimum: 8px)
- Reset: Returns to default font size

### Visual Adjustments

- Greyscale: Converts all colors to grayscale
- High Contrast: Increases contrast by 150%
- Negative Contrast: Inverts colors
- Underline Links: Forces underlines on all link elements
- Readable Font: Switches to Arial font family

## UI Elements

The helper adds a floating toolbar to your website that includes:

- A toggle button with an accessibility icon
- A panel containing all accessibility controls
- A collapsible interface that slides in/out from the right side
- A link to helptheweb.org

## Programmatic Control

You can programmatically control the helper through its methods:

```typescript
// Font size controls
accessibilityHelper.increaseFontSize();
accessibilityHelper.decreaseFontSize();
accessibilityHelper.resetFontSize();

// Toggle individual settings
accessibilityHelper.toggleSetting('greyscale');
accessibilityHelper.toggleSetting('highContrast');
accessibilityHelper.toggleSetting('negativeContrast');
accessibilityHelper.toggleSetting('underlineLinks');
accessibilityHelper.toggleSetting('readableFont');

// Reset all settings
accessibilityHelper.resetAll();
```

## Browser Support

The helper is compatible with modern browsers including:

- Chrome
- Firefox
- Safari
- Edge

## Best Practices

1. Initialize the helper as early as possible in your application lifecycle
2. Ensure the toggle button remains visible and doesn't conflict with existing UI elements
3. Test the helper with various screen sizes and viewport dimensions

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## Support

For support, please visit [helptheweb.org](https://helptheweb.org) or open an issue in the GitHub repository.
