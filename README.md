# @helptheweb/helper

The official accessibility helper widget from helptheweb.org, adding features like font size adjustment, contrast modes, and more.

## Installation

```bash
npm install @helptheweb/helper
```

## Usage

### Browser (CDN)

```html
<script src="https://unpkg.com/@helptheweb/helper"></script>
<script>
  window.addEventListener('load', function() {
    new AccessibilityHelper({
      defaultFontSize: 16,
      buttonColor: '#1e232f'
    });
  });
</script>
```

### ESM

```javascript
import { Helper } from '@helptheweb/helper';

new Helper({
  defaultFontSize: 16,
  buttonColor: '#1e232f'
});
```

### CommonJS

```javascript
const { Helper } = require('@helptheweb/helper');

new Helper({
  defaultFontSize: 16,
  buttonColor: '#1e232f'
});
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| defaultFontSize | number | 16 | Initial font size in pixels |
| buttonColor | string | '#1e232f' | Color of the accessibility toggle button |

## Features

- Font size adjustment
- Greyscale mode
- High contrast mode
- Negative contrast mode
- Underline links
- Readable font
- Reset functionality

## About

This package is maintained by [helptheweb.org](https://helptheweb.org), a project dedicated to making the web more accessible for everyone.

## License

MIT

## Support

For support, please visit [helptheweb.org](https://helptheweb.org)