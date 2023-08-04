import { writable } from 'svelte/store';

export const sessionUser = writable(undefined);

export const isLoading = writable(false);
