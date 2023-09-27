import { derived, writable } from "svelte/store";
import { UserType } from "./types/schemas";
import { AppConfigurationType } from "./types/schemas";

export const sessionUser = writable<UserType | null>(null);
export const userIsAdmin = derived(sessionUser, ($sessionUser) => {
  return (
    $sessionUser?.roles.includes("admin") ||
    $sessionUser?.roles.includes("superAdmin")
  );
});

export const isLoading = writable<boolean>(false);

export const appConfiguration = writable<AppConfigurationType | null>(null);
