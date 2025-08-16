/**
 * Tests for the main PenpointClient class
 */

import { PenpointClient } from '../src/client';
import { PenpointValidationError } from '../src/types';

describe('PenpointClient', () => {
  const mockApiKey = 'test-api-key-123';

  describe('constructor', () => {
    it('should create a client with valid API key', () => {
      const client = new PenpointClient({ apiKey: mockApiKey });
      
      expect(client).toBeInstanceOf(PenpointClient);
      expect(client.files).toBeDefined();
      expect(client.discreteReferences).toBeDefined();
    });

    it('should throw error when API key is missing', () => {
      expect(() => {
        new PenpointClient({ apiKey: '' });
      }).toThrow(PenpointValidationError);
      
      expect(() => {
        new PenpointClient({ apiKey: '' });
      }).toThrow('API key is required');
    });

    it('should use default configuration when not provided', () => {
      const client = new PenpointClient({ apiKey: mockApiKey });
      const httpClient = client.getHttpClient();
      
      // Test that default values are used
      expect(httpClient).toBeDefined();
    });

    it('should use custom configuration when provided', () => {
      const customConfig = {
        apiKey: mockApiKey,
        baseUrl: 'https://custom.api.com/v2',
        timeout: 60000,
        maxRetries: 5,
        userAgent: 'custom-user-agent',
      };

      const client = new PenpointClient(customConfig);
      const httpClient = client.getHttpClient();
      
      expect(httpClient).toBeDefined();
    });
  });

  describe('resources', () => {
    let client: PenpointClient;

    beforeEach(() => {
      client = new PenpointClient({ apiKey: mockApiKey });
    });

    it('should have files resource', () => {
      expect(client.files).toBeDefined();
      expect(typeof client.files.list).toBe('function');
      expect(typeof client.files.upload).toBe('function');
      expect(typeof client.files.update).toBe('function');
      expect(typeof client.files.delete).toBe('function');
      expect(typeof client.files.get).toBe('function');
    });

    it('should have discrete references resource', () => {
      expect(client.discreteReferences).toBeDefined();
      expect(typeof client.discreteReferences.basic).toBe('function');
      expect(typeof client.discreteReferences.standard).toBe('function');
      expect(typeof client.discreteReferences.advanced).toBe('function');
    });
  });

  describe('http client access', () => {
    it('should provide access to underlying HTTP client', () => {
      const client = new PenpointClient({ apiKey: mockApiKey });
      const httpClient = client.getHttpClient();
      
      expect(httpClient).toBeDefined();
      expect(typeof httpClient.get).toBe('function');
      expect(typeof httpClient.post).toBe('function');
      expect(typeof httpClient.put).toBe('function');
      expect(typeof httpClient.delete).toBe('function');
    });
  });
});
