import { AxiosInstance } from 'axios';
import React from 'react';

export interface UploadFileOptions {
  onProgress?: (progress: number) => void;
  headers?: Record<string, string>;
  maxSize?: number; // in bytes
  allowedTypes?: string[]; // MIME types
  maxFiles?: number;
  onError?: (error: FileUploadError) => void;
}

export interface FileUploadError {
  type: 'size' | 'type' | 'count' | 'network';
  message: string;
  file?: File;
}

export interface FileUploadResult {
  success: boolean;
  data?: any;
  error?: FileUploadError;
  progress?: number;
}

// Enhanced file detection
export function isFileUpload(data: any): boolean {
  if (data instanceof File || data instanceof FileList) {
    return true;
  }

  if (Array.isArray(data)) {
    return data.some(item => item instanceof File);
  }

  if (data && typeof data === 'object') {
    return Object.values(data).some(value =>
      value instanceof File ||
      value instanceof FileList ||
      (Array.isArray(value) && value.some(item => item instanceof File))
    );
  }

  return false;
}

// Validate files before upload
export function validateFiles(files: File | FileList | File[], options: UploadFileOptions = {}): FileUploadError | null {
  const fileArray = Array.isArray(files) ? files : files instanceof FileList ? Array.from(files) : [files];

  // Check file count
  if (options.maxFiles && fileArray.length > options.maxFiles) {
    return {
      type: 'count',
      message: `Too many files. Maximum allowed: ${options.maxFiles}`,
    };
  }

  // Check each file
  for (const file of fileArray) {
    // Check file size
    if (options.maxSize && file.size > options.maxSize) {
      return {
        type: 'size',
        message: `File "${file.name}" is too large. Maximum size: ${formatFileSize(options.maxSize)}`,
        file,
      };
    }

    // Check file type
    if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
      return {
        type: 'type',
        message: `File "${file.name}" has unsupported type. Allowed types: ${options.allowedTypes.join(', ')}`,
        file,
      };
    }
  }

  return null;
}

// Enhanced FormData preparation
export function prepareFormData(data: Record<string, any>, options: UploadFileOptions = {}): FormData {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value instanceof File) {
      const error = validateFiles(value, options);
      if (error) {
        options.onError?.(error);
        continue;
      }
      formData.append(key, value);
    } else if (value instanceof FileList) {
      const error = validateFiles(value, options);
      if (error) {
        options.onError?.(error);
        continue;
      }

      for (let i = 0; i < value.length; i++) {
        formData.append(`${key}[${i}]`, value[i]);
      }
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item instanceof File) {
          const error = validateFiles(item, options);
          if (error) {
            options.onError?.(error);
            return;
          }
          formData.append(`${key}[${index}]`, item);
        } else {
          formData.append(`${key}[${index}]`, typeof item === 'object' ? JSON.stringify(item) : String(item));
        }
      });
    } else if (value !== undefined && value !== null) {
      formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
    }
  }

  return formData;
}

/**
 * Enhanced file upload function with validation and better error handling
 */
export async function uploadFile(
  axiosInstance: AxiosInstance,
  endpoint: string,
  file: File,
  data?: Record<string, any>,
  options?: UploadFileOptions
): Promise<FileUploadResult> {
  try {
    // Validate file
    const validationError = validateFiles(file, options);
    if (validationError) {
      options?.onError?.(validationError);
      return { success: false, error: validationError };
    }

    // Prepare form data
    const formData = prepareFormData({ file, ...data }, options);

    const response = await axiosInstance.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(options?.headers || {}),
      },
      onUploadProgress: (event) => {
        if (options?.onProgress && event.total) {
          const progress = Math.round((event.loaded * 100) / event.total);
          options.onProgress(progress);
        }
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    const uploadError: FileUploadError = {
      type: 'network',
      message: error instanceof Error ? error.message : 'Upload failed',
    };

    options?.onError?.(uploadError);
    return { success: false, error: uploadError };
  }
}

// Utility functions
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
