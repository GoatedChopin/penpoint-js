/**
 * Discrete References resource for reference search operations
 */

import type {
  DiscreteReferenceResponse,
  DiscreteReferenceRequest,
} from '../types';
import { HttpClient } from '../http-client';
import { PenpointValidationError } from '../types';

export class DiscreteReferencesResource {
  constructor(private readonly client: HttpClient) {}

  /**
   * Perform basic discrete reference search
   */
  async basic(
    fileId: number,
    prompt: string,
    markupFile: boolean,
    markupColor?: string
  ): Promise<DiscreteReferenceResponse> {
    return this.searchReferences('/discrete-references/basic', {
      fileId,
      prompt,
      markupFile,
      markupColor: markupColor || undefined,
    });
  }

  /**
   * Perform standard discrete reference search
   */
  async standard(
    fileId: number,
    prompt: string,
    markupFile: boolean,
    markupColor?: string
  ): Promise<DiscreteReferenceResponse> {
    return this.searchReferences('/discrete-references/standard', {
      fileId,
      prompt,
      markupFile,
      markupColor: markupColor || undefined,
    });
  }

  /**
   * Perform advanced discrete reference search
   */
  async advanced(
    fileId: number,
    prompt: string,
    markupFile: boolean,
    markupColor?: string
  ): Promise<DiscreteReferenceResponse> {
    return this.searchReferences('/discrete-references/advanced', {
      fileId,
      prompt,
      markupFile,
      markupColor: markupColor || undefined,
    });
  }

  /**
   * Internal method for performing reference searches
   */
  private async searchReferences(
    endpoint: string,
    request: DiscreteReferenceRequest
  ): Promise<DiscreteReferenceResponse> {
    if (!request.prompt) {
      throw new PenpointValidationError('Prompt is required');
    }

    const body: Record<string, unknown> = {
      fileId: request.fileId,
      prompt: request.prompt,
      markupFile: request.markupFile,
    };

    if (request.markupColor) {
      body.markupColor = request.markupColor;
    }

    const response = await this.client.post<DiscreteReferenceResponse>(
      endpoint,
      JSON.stringify(body),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return response.data;
  }
}
