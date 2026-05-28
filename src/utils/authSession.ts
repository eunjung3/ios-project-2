const AUTH_STORAGE_KEY = "mw-authenticated";

export function isAuthenticated() {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function setAuthenticated() {
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
}

export function clearAuthenticated() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}
