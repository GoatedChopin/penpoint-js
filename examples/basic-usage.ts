/**
 * Basic usage example for the Penpoint JavaScript/TypeScript client library
 * 
 * This example demonstrates how to:
 * 1. Initialize the client
 * 2. List files
 * 3. Upload a file
 * 4. Search for references
 * 5. Update file metadata
 */

import { PenpointClient } from '../src';

async function main() {
  // Initialize the client with your API key
  // You can get your API key from https://api.penpoint.ai
  const apiKey = process.env.PENPOINT_API_KEY;
  if (!apiKey) {
    console.log('Please set the PENPOINT_API_KEY environment variable');
    return;
  }

  const client = new PenpointClient({ apiKey });

  console.log('🚀 Penpoint JavaScript/TypeScript Client Example');
  console.log('='.repeat(50));

  try {
    // Example 1: List existing files
    console.log('\n📁 Listing existing files...');
    const files = await client.files.list({ limit: 5 });
    console.log(`Found ${files.data.length} files:`);
    
    files.data.forEach(file => {
      console.log(`  - ${file.name} (ID: ${file.id})`);
      if (file.summary) {
        console.log(`    Summary: ${file.summary}`);
      }
    });

    // Example 2: Upload a file (if you have one)
    // Uncomment and modify the path to test file upload
    /*
    console.log('\n📤 Uploading a file...');
    try {
      const filePath = 'path/to/your/document.pdf';
      const fs = require('fs');
      
      if (fs.existsSync(filePath)) {
        const buffer = fs.readFileSync(filePath);
        const uploadedFile = await client.files.upload({
          file: buffer,
          filename: 'document.pdf',
          summary: 'Example document for testing'
        });
        
        console.log(`✅ File uploaded successfully! ID: ${uploadedFile.id}`);
        console.log(`   Name: ${uploadedFile.name}`);
        console.log(`   Pages: ${uploadedFile.pages}`);
        console.log(`   Created: ${uploadedFile.created_at}`);
      } else {
        console.log('⚠️  File not found, skipping upload example');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    */

    // Example 3: Search for references (requires an existing file ID)
    // Uncomment and modify the file_id to test reference search
    /*
    console.log('\n🔍 Searching for references...');
    try {
      const fileId = 123; // Replace with an actual file ID from your account
      
      // Basic search
      console.log('  Performing basic search...');
      const basicResults = await client.discreteReferences.basic(
        fileId,
        'CMake integration',
        false
      );
      
      if (basicResults.refs.parts.length > 0) {
        console.log(`    Found ${basicResults.refs.parts.length} references:`);
        basicResults.refs.parts.slice(0, 3).forEach(part => {
          console.log(`      - ${part.segment.substring(0, 100)}...`);
          console.log(`        Score: ${part.hybrid_score.toFixed(3)}`);
        });
      } else {
        console.log('    No references found');
      }
      
      // Advanced search
      console.log('  Performing advanced search...');
      const advancedResults = await client.discreteReferences.advanced(
        fileId,
        'performance profiling',
        true,
        '#FF0000'
      );
      
      if (advancedResults.refs.parts.length > 0) {
        console.log(`    Found ${advancedResults.refs.parts.length} references:`);
        advancedResults.refs.parts.slice(0, 3).forEach(part => {
          console.log(`      - ${part.segment.substring(0, 100)}...`);
          console.log(`        Score: ${part.hybrid_score.toFixed(3)}`);
        });
      } else {
        console.log('    No references found');
      }
    } catch (error) {
      console.error('Error searching references:', error);
    }
    */

    // Example 4: Update file metadata (requires an existing file ID)
    // Uncomment and modify the file_id to test metadata update
    /*
    console.log('\n✏️  Updating file metadata...');
    try {
      const fileId = 123; // Replace with an actual file ID from your account
      
      const updatedFile = await client.files.update(fileId, {
        summary: 'Updated description with new information',
        expirationDate: '2025-12-31'
      });
      
      console.log('✅ File updated successfully!');
      console.log(`   New summary: ${updatedFile.summary}`);
      console.log(`   Expires: ${updatedFile.expires_at}`);
    } catch (error) {
      console.error('Error updating file:', error);
    }
    */

  } catch (error) {
    console.error('Unexpected error:', error);
  }

  console.log('\n✨ Example completed!');
  console.log('\nTo run the full examples:');
  console.log('1. Set your PENPOINT_API_KEY environment variable');
  console.log('2. Uncomment the example sections above');
  console.log('3. Modify file paths and IDs as needed');
}

// Run the example
if (require.main === module) {
  main().catch(console.error);
}
