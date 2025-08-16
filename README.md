# Penpoint JavaScript/TypeScript Client

Official JavaScript/TypeScript client library for the Penpoint API. This library provides a modern, type-safe interface for interacting with Penpoint's document processing and reference search capabilities.

## Features

- **TypeScript First**: Full TypeScript support with comprehensive type definitions
- **Modern JavaScript**: ES2020+ features with CommonJS and ESM support
- **File Management**: Upload, list, update, and delete files
- **Discrete References**: Search documents with three levels of precision (Basic, Standard, Advanced)
- **File Markup**: Generate marked-up versions of documents with highlighted references
- **Error Handling**: Comprehensive error handling with custom error classes
- **Retry Logic**: Built-in retry mechanism with exponential backoff
- **Browser & Node.js**: Works in both browser and Node.js environments

## Installation

```bash
npm install @penpoint/js
```

## Quick Start

```typescript
import { PenpointClient } from '@penpoint/js';

// Initialize the client with your API key
const client = new PenpointClient({
  apiKey: 'your_api_key_here'
});

// List files
const files = await client.files.list({ limit: 20 });

// Upload a file
const fileInput = document.getElementById('fileInput') as HTMLInputElement;
const file = fileInput.files?.[0];
if (file) {
  const uploadedFile = await client.files.upload({
    file,
    filename: file.name,
    summary: 'A sample document for testing'
  });
  
  // Search for references
  const references = await client.discreteReferences.basic(
    uploadedFile.id,
    'CMake integration',
    true,
    '#362580'
  );
  
  console.log(`Found ${references.refs.parts.length} references`);
}
```

## API Reference

### Authentication

All API requests require an API key, which should be passed in the `x-api-key` header.

### Client Configuration

```typescript
const client = new PenpointClient({
  apiKey: 'your_api_key',
  baseUrl: 'https://api.penpoint.ai/v1', // Optional, defaults to production
  timeout: 30000, // Optional, defaults to 30 seconds
  maxRetries: 3,  // Optional, defaults to 3
  userAgent: 'custom-user-agent' // Optional
});
```

### Files

#### List Files
```typescript
const files = await client.files.list({
  limit: 20,
  offset: 0
});
```

#### Upload File
```typescript
const uploadedFile = await client.files.upload({
  file: fileObject, // File, Buffer, or string
  filename: 'document.pdf',
  summary: 'Document description'
});
```

#### Update File
```typescript
const updatedFile = await client.files.update(123, {
  summary: 'Updated description',
  expirationDate: '2025-12-31'
});
```

#### Delete File
```typescript
const success = await client.files.delete(123);
```

#### Get File
```typescript
const file = await client.files.get(123);
```

### Discrete References

#### Basic Search
```typescript
const references = await client.discreteReferences.basic(
  123, // fileId
  'search term', // prompt
  true, // markupFile
  '#FF0000' // markupColor (optional)
);
```

#### Standard Search
```typescript
const references = await client.discreteReferences.standard(
  123, // fileId
  'search term', // prompt
  true, // markupFile
  '#FF0000' // markupColor (optional)
);
```

#### Advanced Search
```typescript
const references = await client.discreteReferences.advanced(
  123, // fileId
  'search term', // prompt
  true, // markupFile
  '#FF0000' // markupColor (optional)
);
```

## Error Handling

The library provides comprehensive error handling:

```typescript
import { PenpointError, PenpointApiError, PenpointValidationError } from '@penpoint/js';

try {
  const files = await client.files.list();
} catch (error) {
  if (error instanceof PenpointApiError) {
    console.error(`API Error: ${error.status} - ${error.message}`);
  } else if (error instanceof PenpointValidationError) {
    console.error(`Validation Error: ${error.message}`);
  } else if (error instanceof PenpointError) {
    console.error(`Client Error: ${error.message}`);
  } else {
    console.error('Unknown error:', error);
  }
}
```

## Advanced Usage

### Custom HTTP Client

```typescript
const httpClient = client.getHttpClient();

// Make custom requests
const response = await httpClient.get('/custom-endpoint', {
  query: { param: 'value' },
  headers: { 'Custom-Header': 'value' }
});
```

### File Upload with Buffer (Node.js)

```typescript
import { readFileSync } from 'fs';

const buffer = readFileSync('document.pdf');
const uploadedFile = await client.files.upload({
  file: buffer,
  filename: 'document.pdf',
  summary: 'PDF document'
});
```

## Browser vs Node.js

### Browser Environment
- Uses native `fetch` API
- Supports `File` objects for uploads
- FormData for multipart requests

### Node.js Environment
- Requires `node-fetch` (peer dependency)
- Supports `Buffer` for file uploads
- Full Node.js compatibility

## Development

### Setup

```bash
git clone https://github.com/penpoint/penpoint-js.git
cd penpoint-js
npm install
```

### Available Scripts

```bash
npm run build          # Build the library
npm run dev            # Build in watch mode
npm run test           # Run tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests with coverage
npm run lint           # Run ESLint
npm run lint:fix       # Fix ESLint issues
npm run format         # Format code with Prettier
npm run type-check     # Run TypeScript type checking
npm run docs           # Generate documentation
```

### Testing

```bash
npm test                    # Run all tests
npm run test:coverage      # Run tests with coverage
npm run test:watch         # Run tests in watch mode
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Documentation: [https://penpoint-js.readthedocs.io/](https://penpoint-js.readthedocs.io/)
- Issues: [https://github.com/penpoint/penpoint-js/issues](https://github.com/penpoint/penpoint-js/issues)
- API Reference: [https://api.penpoint.ai/docs](https://api.penpoint.ai/docs)
