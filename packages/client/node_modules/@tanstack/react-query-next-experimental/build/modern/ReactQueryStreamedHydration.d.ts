import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import { HydrationStreamProviderProps } from './HydrationStreamProvider.js';
import { QueryClient, HydrateOptions, DehydrateOptions, DehydratedState } from '@tanstack/react-query';

/**
 * This component is responsible for:
 * - hydrating the query client on the server
 * - dehydrating the query client on the server
 */
declare function ReactQueryStreamedHydration(props: {
    children: React.ReactNode;
    queryClient?: QueryClient;
    nonce?: string;
    options?: {
        hydrate?: HydrateOptions;
        dehydrate?: DehydrateOptions;
    };
    transformer?: HydrationStreamProviderProps<DehydratedState>['transformer'];
}): react_jsx_runtime.JSX.Element;

export { ReactQueryStreamedHydration };
