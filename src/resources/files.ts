/**
 * Files resource for file-related operations
 */

import type {
  File,
  FileList,
  FileUploadRequest,
  FileUpdateRequest,
  PaginationParams,
} from '../types';
import { HttpClient } from '../http-client';
import { PenpointValidationError } from '../types';

export class FilesResource {
  constructor(private readonly client: HttpClient) {}

  /**
   * List files with pagination
   */
  async list(params?: PaginationParams): Promise<FileList> {
    const query: Record<string, string | number> = {};
    
    if (params?.limit !== undefined) {
      query.limit = params.limit;
    }
    
    if (params?.offset !== undefined) {
      query.offset = params.offset;
    }

    const response = await this.client.get<FileList>('/files', { query });
    return response.data;
  }

  /**
   * Upload a file to the API
   */
  async upload(request: FileUploadRequest): Promise<File> {
    if (!request.filename) {
      throw new PenpointValidationError('Filename is required');
    }

    const formData = new FormData();
    
    if (request.file instanceof File) {
      formData.append('file', request.file);
    } else if (request.file instanceof Buffer) {
      const blob = new Blob([request.file]);
      formData.append('file', blob, request.filename);
    } else if (typeof request.file === 'string') {
      // Assume it's a file path or URL
      throw new PenpointValidationError('File upload from string path is not supported in browser environment');
    } else {
      throw new PenpointValidationError('Invalid file type');
    }

    if (request.summary) {
      formData.append('summary', request.summary);
    }

    const response = await this.client.post<File>('/files', formData);
    return response.data;
  }

  /**
   * Update file metadata
   */
  async update(fileId: number, request: FileUpdateRequest): Promise<File> {
    if (!request.summary) {
      throw new PenpointValidationError('Summary is required');
    }

    const body: Record<string, string> = {
      summary: request.summary,
    };

    if (request.expirationDate) {
      body.expirationDate = request.expirationDate;
    }

    const response = await this.client.put<File>(`/files/${fileId}`, JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' },
    });
    
    return response.data;
  }

  /**
   * Delete a file
   */
  async delete(fileId: number): Promise<boolean> {
    await this.client.delete(`/files/${fileId}`);
    return true;
  }

  /**
   * Get a specific file by ID
   */
  async get(fileId: number): Promise<File> {
    const response = await this.client.get<File>(`/files/${fileId}`);
    return response.data;
  }
}
