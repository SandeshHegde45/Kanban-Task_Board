// Mock auth backend that lives in LocalStorage.
// Every function is async and throws Error(message), so swapping this file for
// real API calls (fetch/axios) needs no changes anywhere else.
const USERS_KEY = "kanban-users";
const SESSION_KEY = "kanban-session";

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
const wait = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

// Salted with the user id. Fine for a demo, never for production.
const hashPassword = async (id, password) => {
  const bytes = new TextEncoder().encode(`${id}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
};

const startSession = ({ id, name, email }) => {
  const user = { id, name, email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
};

export const listUsers = () => read(USERS_KEY, []).map(({ id, name, email }) => ({ id, name, email }));

export const getSession = () => read(SESSION_KEY, null);

export const register = async ({ name, email, password }) => {
  await wait();
  const users = read(USERS_KEY, []);
  const cleanEmail = email.trim().toLowerCase();
  if (users.some((u) => u.email === cleanEmail)) {
    throw new Error("An account with this email already exists. Try logging in instead.");
  }
  const id = crypto.randomUUID();
  const user = { id, name: name.trim(), email: cleanEmail, passwordHash: await hashPassword(id, password) };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  return startSession(user);
};

export const login = async ({ email, password }) => {
  await wait();
  const user = read(USERS_KEY, []).find((u) => u.email === email.trim().toLowerCase());
  if (!user || user.passwordHash !== (await hashPassword(user.id, password))) {
    throw new Error("Incorrect email or password.");
  }
  return startSession(user);
};

export const logout = async () => {
  localStorage.removeItem(SESSION_KEY);
};
