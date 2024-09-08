export class Helper {
  private fontSizeDefault: number = 16;
  private fontSizeCurrent: number = this.fontSizeDefault;
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

  constructor() {
    this.styleElement = document.createElement('style');
    document.head.appendChild(this.styleElement);
    this.createUI();
  }

  public increaseFontSize(): void {
    this.fontSizeCurrent += 2;
    this.updateFontSize();
  }

  public decreaseFontSize(): void {
    this.fontSizeCurrent = Math.max(this.fontSizeCurrent - 2, 8);
    this.updateFontSize();
  }

  public resetFontSize(): void {
    this.fontSizeCurrent = this.fontSizeDefault;
    this.updateFontSize();
  }

  private updateFontSize(): void {
    document.body.style.fontSize = `${this.fontSizeCurrent}px`;
  }

  public toggleSetting(setting: keyof typeof this.settings): void {
    if (this.settings.hasOwnProperty(setting)) {
      this.settings[setting] = !this.settings[setting];
      this.applySettings();
    }
  }

  private applySettings(): void {
    let css = '';

    if (this.settings.greyscale) {
      css += 'html { filter: grayscale(100%); }';
    }

    if (this.settings.highContrast) {
      css += 'html { filter: contrast(150%); }';
    }

    if (this.settings.negativeContrast) {
      css += 'html { filter: invert(100%); }';
    }

    if (this.settings.underlineLinks) {
      css += 'a { text-decoration: underline !important; }';
    }

    if (this.settings.readableFont) {
      css += 'body { font-family: Arial, sans-serif !important; }';
    }

    this.styleElement.textContent = css;
  }

  private createUI(): void {
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      top: 100px;
      right: 0px;
      z-index: 9999;
      font-family: Arial, sans-serif;
      display: flex;
      align-items: flex-start;
      transition: transform 0.3s ease-in-out;
      transform: translateX(222px);
    `;

    const toggleButton = document.createElement('button');
    toggleButton.setAttribute('aria-label', 'Toggle accessibility options');
    toggleButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M256 112a56 56 0 1 1 56-56a56.06 56.06 0 0 1-56 56"/><path fill="currentColor" d="m432 112.8l-.45.12l-.42.13c-1 .28-2 .58-3 .89c-18.61 5.46-108.93 30.92-172.56 30.92c-59.13 0-141.28-22-167.56-29.47a74 74 0 0 0-8-2.58c-19-5-32 14.3-32 31.94c0 17.47 15.7 25.79 31.55 31.76v.28l95.22 29.74c9.73 3.73 12.33 7.54 13.6 10.84c4.13 10.59.83 31.56-.34 38.88l-5.8 45l-32.19 176.19q-.15.72-.27 1.47l-.23 1.27c-2.32 16.15 9.54 31.82 32 31.82c19.6 0 28.25-13.53 32-31.94s28-157.57 42-157.57s42.84 157.57 42.84 157.57c3.75 18.41 12.4 31.94 32 31.94c22.52 0 34.38-15.74 32-31.94a57 57 0 0 0-.76-4.06L329 301.27l-5.79-45c-4.19-26.21-.82-34.87.32-36.9a1 1 0 0 0 .08-.15c1.08-2 6-6.48 17.48-10.79l89.28-31.21a17 17 0 0 0 1.62-.52c16-6 32-14.3 32-31.93S451 107.81 432 112.8"/></svg>
    `;
    toggleButton.style.cssText = `
      background-color: #1e232f;
      border: none;
      color: white;
      padding: 10px;
      border-radius: 5px 0 0 5px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      position: absolute;
      right: 222px;
      top: 0;
      transition: transform 0.3s ease-in-out;
    `;

    const panel = document.createElement('div');
    panel.style.cssText = `
      background-color: #ffffff;
      border-radius: 0 0 0 5px;
      border: 2px solid #1e232f;
      border-right: none;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      width: 200px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 10px;
    `;

    const createButton = (text: string, onClick: () => void): HTMLButtonElement => {
      const button = document.createElement('button');
      button.textContent = text;
      button.style.cssText = `
        padding: 8px 12px;
        background-color: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
        width: 100%;
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

    panel.appendChild(createButton('Increase Text Size', () => this.increaseFontSize()));
    panel.appendChild(createButton('Decrease Text Size', () => this.decreaseFontSize()));
    panel.appendChild(createButton('Reset text size', () => this.resetFontSize()));
    panel.appendChild(createButton('Greyscale', () => this.toggleSetting('greyscale')));
    panel.appendChild(createButton('High Contrast', () => this.toggleSetting('highContrast')));
    panel.appendChild(createButton('Negative Contrast', () => this.toggleSetting('negativeContrast')));
    panel.appendChild(createButton('Underline Links', () => this.toggleSetting('underlineLinks')));
    panel.appendChild(createButton('Readable Font', () => this.toggleSetting('readableFont')));

    let isPanelOpen = false;

    toggleButton.addEventListener('click', () => {
      isPanelOpen = !isPanelOpen;
      container.style.transform = isPanelOpen ? 'translateX(0px)' : 'translateX(222px)';
    });

    container.appendChild(panel);
    container.appendChild(toggleButton);
    document.body.appendChild(container);
  }
}

export default Helper;