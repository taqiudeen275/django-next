// React hook for file upload state management
import React, { useState, useCallback } from 'react';
import { FileUploadError, UploadFileOptions, validateFiles } from '../upload-file';

export interface UseFileUploadReturn {
  files: File[];
  progress: number;
  isUploading: boolean;
  error: FileUploadError | null;
  addFiles: (newFiles: File | FileList | File[]) => boolean;
  removeFile: (index: number) => void;
  clearFiles: () => void;
  setIsUploading: (uploading: boolean) => void;
  updateProgress: (progress: number) => void;
  setError: (error: FileUploadError | null) => void;
}

export function useFileUpload(options: UploadFileOptions = {}): UseFileUploadReturn {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<FileUploadError | null>(null);

  const addFiles = useCallback((newFiles: File | FileList | File[]) => {
    const fileArray = Array.isArray(newFiles) 
      ? newFiles 
      : newFiles instanceof FileList 
        ? Array.from(newFiles) 
        : [newFiles];
    
    const validationError = validateFiles(fileArray, options);
    if (validationError) {
      setError(validationError);
      options.onError?.(validationError);
      return false;
    }
    
    setFiles(prev => [...prev, ...fileArray]);
    setError(null);
    return true;
  }, [options]);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    setProgress(0);
    setError(null);
  }, []);

  const updateProgress = useCallback((newProgress: number) => {
    setProgress(newProgress);
    options.onProgress?.(newProgress);
  }, [options]);

  return {
    files,
    progress,
    isUploading,
    error,
    addFiles,
    removeFile,
    clearFiles,
    setIsUploading,
    updateProgress,
    setError,
  };
}
