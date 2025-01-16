# Help The Web Accessibility Helper

A lightweight TypeScript library that adds an accessibility toolbar to any website. This helper provides users with various options to customize their viewing experience, including text size adjustment, contrast modes, and readability enhancements.

## Features

- Font size controls (increase, decrease, reset)
- Greyscale mode
- High contrast mode
- Negative contrast mode
- Link underlining
- Readable font option
- Settings reset functionality
- Collapsible interface

## Installation

```bash
npm install @helptheweb/helper
```

## Usage

```typescript
import { Helper } from '@helptheweb/helper';

// Initialize with default options
const helper = new Helper();

// Or initialize with custom options
const customHelper = new Helper({
  defaultFontSize: 18,
  buttonColor: '#0066cc'
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `defaultFontSize` | number | 16 | The base font size in pixels |
| `buttonColor` | string | '#1e232f' | The color of the toggle button and UI elements |

## Methods

### Public Methods

- `increaseFontSize()`: Increases the font size by 2 pixels
- `decreaseFontSize()`: Decreases the font size by 2 pixels (minimum: 8px)
- `resetFontSize()`: Resets font size to the default value
- `toggleSetting(setting)`: Toggles a specific accessibility setting
- `resetAll()`: Resets all settings to their default values

## User Interface

The helper adds a collapsible panel to the right side of the webpage with the following controls:

1. Text Size Controls:
   - Increase Text Size
   - Decrease Text Size
   - Reset Text Size

2. Display Options:
   - Greyscale
   - High Contrast
   - Negative Contrast
   - Underline Links
   - Readable Font

3. Global Controls:
   - Reset All Settings

## Development

### Building the Project

```bash
npm install
npm run build
```

## Releasing

This package follows semantic releases. With each generated GitHub release, a GitHub action will bundle the package and release it to NPM.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

Powered by [helptheweb.org](https://helptheweb.org)