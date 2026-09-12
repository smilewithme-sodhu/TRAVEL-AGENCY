/** @jest-environment jsdom */

import { jest } from '@jest/globals';
import { convertImageToWebP } from '../imageUtils.js';

describe('convertImageToWebP', () => {
  let originalFileReader;
  let originalImage;
  let originalCreateElement;

  beforeEach(() => {
    originalFileReader = global.FileReader;
    originalImage = global.Image;
    originalCreateElement = document.createElement;
  });

  afterEach(() => {
    global.FileReader = originalFileReader;
    global.Image = originalImage;
    document.createElement = originalCreateElement;
    jest.clearAllMocks();
  });

  it('rejects if no file is provided', async () => {
    await expect(convertImageToWebP(null)).rejects.toThrow('No file provided');
  });

  it('resolves with webp data url when image does not need resizing', async () => {
    // Mock FileReader
    global.FileReader = class {
      readAsDataURL(file) {
        setTimeout(() => {
          if (this.onload) {
            this.onload({ target: { result: 'data:image/png;base64,fake' } });
          }
        }, 0);
      }
    };

    // Mock Image
    global.Image = class {
      set src(url) {
        this.width = 800;
        this.height = 600;
        setTimeout(() => {
          if (this.onload) this.onload();
        }, 0);
      }
    };

    // Mock document.createElement
    const mockCanvas = {
      getContext: jest.fn().mockReturnValue({
        drawImage: jest.fn()
      }),
      toDataURL: jest.fn().mockReturnValue('data:image/webp;base64,fakewebp')
    };

    document.createElement = jest.fn((tagName) => {
      if (tagName === 'canvas') return mockCanvas;
      return originalCreateElement.call(document, tagName);
    });

    const file = new File([''], 'test.png', { type: 'image/png' });
    const result = await convertImageToWebP(file);

    expect(result).toBe('data:image/webp;base64,fakewebp');
    expect(mockCanvas.width).toBe(800);
    expect(mockCanvas.height).toBe(600);
    expect(mockCanvas.getContext).toHaveBeenCalledWith('2d');
    // We cannot expect `expect.any(global.Image)` since we recreated the class
    expect(mockCanvas.getContext().drawImage).toHaveBeenCalledWith(expect.any(Object), 0, 0, 800, 600);
    expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/webp', 0.85); // default quality
  });

  it('resolves with resized image when width exceeds maxWidth', async () => {
    global.FileReader = class {
      readAsDataURL() {
        setTimeout(() => {
          if (this.onload) this.onload({ target: { result: 'data:image/png;base64,fake' } });
        }, 0);
      }
    };

    global.Image = class {
      set src(url) {
        this.width = 2400;
        this.height = 1200;
        setTimeout(() => {
          if (this.onload) this.onload();
        }, 0);
      }
    };

    const mockCanvas = {
      getContext: jest.fn().mockReturnValue({ drawImage: jest.fn() }),
      toDataURL: jest.fn().mockReturnValue('data:image/webp;base64,fakewebp_resized')
    };

    document.createElement = jest.fn((tagName) => {
      if (tagName === 'canvas') return mockCanvas;
      return originalCreateElement.call(document, tagName);
    });

    const file = new File([''], 'large.png', { type: 'image/png' });
    const result = await convertImageToWebP(file, 0.9, 1200);

    expect(result).toBe('data:image/webp;base64,fakewebp_resized');
    expect(mockCanvas.width).toBe(1200);
    expect(mockCanvas.height).toBe(600); // (1200 / 2400) * 1200 = 600
    expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/webp', 0.9);
  });

  it('rejects when FileReader throws an error', async () => {
    global.FileReader = class {
      readAsDataURL() {
        setTimeout(() => {
          if (this.onerror) this.onerror(new Error('FileReader error'));
        }, 0);
      }
    };

    const file = new File([''], 'test.png');
    await expect(convertImageToWebP(file)).rejects.toThrow('FileReader error');
  });

  it('rejects when Image throws an error', async () => {
    global.FileReader = class {
      readAsDataURL() {
        setTimeout(() => {
          if (this.onload) this.onload({ target: { result: 'data:image/png;base64,fake' } });
        }, 0);
      }
    };

    global.Image = class {
      set src(url) {
        setTimeout(() => {
          if (this.onerror) this.onerror(new Error('Image error'));
        }, 0);
      }
    };

    const file = new File([''], 'test.png');
    await expect(convertImageToWebP(file)).rejects.toThrow('Image error');
  });
});
