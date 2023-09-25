import { writable } from "svelte/store";
import { UserType } from "./types/schemas";
import { AppConfigurationType } from "./types/schemas";

export const sessionUser = writable<UserType | null>(null);

export const isLoading = writable<boolean>(false);

export const appConfiguration = writable<AppConfigurationType | null>(null);
