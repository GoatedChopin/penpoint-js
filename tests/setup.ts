/**
 * Test setup file for Jest
 */

// Mock fetch globally for tests
global.fetch = jest.fn();

// Mock FormData for tests
global.FormData = jest.fn().mockImplementation(() => ({
  append: jest.fn(),
}));

// Mock Blob for tests
global.Blob = jest.fn().mockImplementation((content, options) => ({
  content,
  options,
}));

// Mock URL for tests
global.URL = jest.fn().mockImplementation((url, base) => ({
  searchParams: {
    append: jest.fn(),
  },
  toString: () => base ? `${base}${url}` : url,
}));

// Mock AbortController for tests
global.AbortController = jest.fn().mockImplementation(() => ({
  signal: {},
  abort: jest.fn(),
}));

// Mock setTimeout and clearTimeout
jest.useFakeTimers();
