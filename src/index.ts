export interface HelperOptions {
  defaultFontSize?: number;
  buttonColor?: string;
}

export class Helper {
  private readonly fontSizeDefault: number;
  private fontSizeCurrent: number;
  private readonly buttonColor: string;
  private settings: {
    greyscale: boolean;
    highContrast: boolean;
    negativeContrast: boolean;
    underlineLinks: boolean;
    readableFont: boolean;
  } = {
      greyscale: false,
      highContrast: false,
      negativeContrast: false,
      underlineLinks: false,
      readableFont: false
    };
  private styleElement: HTMLStyleElement;
  private fontSizeMultiplier: number = 1;
  private helperContainer: HTMLElement | null = null;

  constructor(options: HelperOptions = {}) {
    this.fontSizeDefault = options.defaultFontSize || 16;
    this.fontSizeCurrent = this.fontSizeDefault;
    this.buttonColor = options.buttonColor || '#1e232f';
    this.styleElement = document.createElement('style');
    document.head.appendChild(this.styleElement);
    this.createUI();
    this.initializeFontSizeObserver();
  }

  private initializeFontSizeObserver(): void {
    const observer = new MutationObserver(() => {
      this.updateAllTextElements();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  }

  private updateAllTextElements(): void {
    const elementsToUpdate = document.querySelectorAll(
      'h1, h2, h3, h4, h5, h6, p, span, a, li, td, th, div, button, input, textarea, label'
    );

    elementsToUpdate.forEach(element => {
      // Skip elements that are part of the helper UI
      if (this.helperContainer && this.helperContainer.contains(element)) {
        return;
      }

      const computedStyle = window.getComputedStyle(element);
      const originalSize = parseFloat(computedStyle.fontSize);

      if (!element.hasAttribute('data-original-size')) {
        element.setAttribute('data-original-size', originalSize.toString());
      }

      const newSize = parseFloat(element.getAttribute('data-original-size')!) * this.fontSizeMultiplier;
      (element as HTMLElement).style.fontSize = `${newSize}px`;
    });
  }

  public increaseFontSize = (): void => {
    this.fontSizeMultiplier += 0.1;
    this.updateAllTextElements();
  }

  public decreaseFontSize = (): void => {
    this.fontSizeMultiplier = Math.max(0.5, this.fontSizeMultiplier - 0.1);
    this.updateAllTextElements();
  }

  public resetFontSize = (): void => {
    this.fontSizeMultiplier = 1;
    this.updateAllTextElements();
  }

  public resetAll = (): void => {
    this.resetFontSize();
    Object.keys(this.settings).forEach(setting => {
      this.settings[setting as keyof typeof this.settings] = false;
    });
    this.applySettings();
  }

  public toggleSetting = (setting: keyof typeof this.settings): void => {
    if (this.settings.hasOwnProperty(setting)) {
      this.settings[setting] = !this.settings[setting];
      this.applySettings();
    }
  }

  private applySettings = (): void => {
    let css = '';

    if (this.settings.greyscale) {
      css += 'html:not(.helper-ui) { filter: grayscale(100%); }';
    }

    if (this.settings.highContrast) {
      css += 'html:not(.helper-ui) { filter: contrast(150%); }';
    }

    if (this.settings.negativeContrast) {
      css += 'html:not(.helper-ui) { filter: invert(100%); }';
    }

    if (this.settings.underlineLinks) {
      css += 'a:not(.helper-ui-link) { text-decoration: underline !important; }';
    }

    if (this.settings.readableFont) {
      css += 'body:not(.helper-ui) { font-family: Arial, sans-serif !important; }';
    }

    this.styleElement.textContent = css;
  }

  private createUI = (): void => {
    // Create a shadow root container for style isolation
    const container = document.createElement('aside');
    container.setAttribute('aria-label', 'Accessibility options');
    container.classList.add('helper-ui');

    // Apply base styles that won't be affected by page styles
    const baseStyles = `
      .helper-ui {
        all: initial;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #000000;
        * {
          box-sizing: border-box;
        }
      }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = baseStyles;
    document.head.appendChild(styleSheet);

    container.style.cssText = `
      position: fixed;
      top: 100px;
      right: 0;
      z-index: 9999;
      display: flex;
      align-items: flex-start;
      transition: transform 0.3s ease-in-out;
      transform: translateX(200px);  /* 200px panel width - 48px button width */
      font-size: 16px !important;
    `;

    const toggleButton = document.createElement('button');
    toggleButton.classList.add('helper-ui');
    toggleButton.setAttribute('aria-label', 'Toggle accessibility options');
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512" style="color: white"><path fill="white" d="M256 112a56 56 0 1 1 56-56a56.06 56.06 0 0 1-56 56"/><path fill="white" d="m432 112.8l-.45.12l-.42.13c-1 .28-2 .58-3 .89c-18.61 5.46-108.93 30.92-172.56 30.92c-59.13 0-141.28-22-167.56-29.47a74 74 0 0 0-8-2.58c-19-5-32 14.3-32 31.94c0 17.47 15.7 25.79 31.55 31.76v.28l95.22 29.74c9.73 3.73 12.33 7.54 13.6 10.84c4.13 10.59.83 31.56-.34 38.88l-5.8 45l-32.19 176.19q-.15.72-.27 1.47l-.23 1.27c-2.32 16.15 9.54 31.82 32 31.82c19.6 0 28.25-13.53 32-31.94s28-157.57 42-157.57s42.84 157.57 42.84 157.57c3.75 18.41 12.4 31.94 32 31.94c22.52 0 34.38-15.74 32-31.94a57 57 0 0 0-.76-4.06L329 301.27l-5.79-45c-4.19-26.21-.82-34.87.32-36.9a1 1 0 0 0 .08-.15c1.08-2 6-6.48 17.48-10.79l89.28-31.21a17 17 0 0 0 1.62-.52c16-6 32-14.3 32-31.93S451 107.81 432 112.8"/></svg>
    `;
    toggleButton.style.cssText = `
      background-color: ${this.buttonColor};
      border: none;
      color: white;
      padding: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      position: absolute;
      right: 200px;
      top: 0;
      transition: transform 0.3s ease-in-out;
      font-size: 16px !important;
    `;

    const panel = document.createElement('div');
    panel.classList.add('helper-ui');
    panel.style.cssText = `
      background-color: #ffffff !important;
      border: 2px solid ${this.buttonColor};
      border-right: none;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      width: 200px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 10px;
      font-size: 16px !important;
    `;
    panel.setAttribute('role', 'menu');
    panel.setAttribute('aria-label', 'Accessibility adjustment options');

    const createButton = (text: string, onClick: () => void): HTMLButtonElement => {
      const button = document.createElement('button');
      button.classList.add('helper-ui');
      button.textContent = text;
      button.style.cssText = `
        padding: 8px 12px;
        background-color: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
        width: 100%;
        font-size: 14px !important;
        color: #000000;
        line-height: 1.5;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
        text-align: center;
      `;
      button.addEventListener('click', onClick);
      button.addEventListener('mouseover', () => {
        button.style.backgroundColor = '#e9ecef';
      });
      button.addEventListener('mouseout', () => {
        button.style.backgroundColor = '#f8f9fa';
      });
      return button;
    };

    panel.appendChild(createButton('Increase Text Size', this.increaseFontSize));
    panel.appendChild(createButton('Decrease Text Size', this.decreaseFontSize));
    panel.appendChild(createButton('Reset Text Size', this.resetFontSize));
    panel.appendChild(createButton('Greyscale', () => this.toggleSetting('greyscale')));
    panel.appendChild(createButton('High Contrast', () => this.toggleSetting('highContrast')));
    panel.appendChild(createButton('Negative Contrast', () => this.toggleSetting('negativeContrast')));
    panel.appendChild(createButton('Underline Links', () => this.toggleSetting('underlineLinks')));
    panel.appendChild(createButton('Readable Font', () => this.toggleSetting('readableFont')));

    const separator = document.createElement('hr');
    separator.classList.add('helper-ui');
    separator.style.cssText = `
      width: 100%;
      border: none;
      border-top: 1px solid #dee2e6;
      margin: 4px 0;
    `;
    panel.appendChild(separator);

    panel.appendChild(createButton('Reset All Settings', () => this.resetAll()));

    const link = document.createElement('a');
    link.classList.add('helper-ui', 'helper-ui-link');
    link.href = 'https://helptheweb.org';
    link.target = '_blank';
    link.style.cssText = `
      text-align: center;
      color: ${this.buttonColor};
      text-decoration: none;
      font-size: 12px !important;
      margin-top: 8px;
      padding: 4px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
      cursor: pointer;
    `;
    link.textContent = 'Powered by helptheweb.org';
    link.addEventListener('mouseover', () => {
      link.style.textDecoration = 'underline';
    });
    link.addEventListener('mouseout', () => {
      link.style.textDecoration = 'none';
    });
    panel.appendChild(link);

    let isPanelOpen = false;

    toggleButton.addEventListener('click', () => {
      isPanelOpen = !isPanelOpen;
      toggleButton.setAttribute('aria-expanded', isPanelOpen.toString());
      container.style.transform = isPanelOpen ? 'translateX(0px)' : 'translateX(200px)';
    });

    container.appendChild(panel);
    container.appendChild(toggleButton);
    document.body.appendChild(container);
  }
}
