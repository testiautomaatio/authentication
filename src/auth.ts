/**
 * This is a mock authentication implementation using localStorage.
 *
 * Assumptions:
 * - This is not a secure authentication system and should not be used in production.
 * - Usernames (emails) and passwords should be validated elsewhere before calling these functions.
 * - localStorage is used for persistence, which means data can be easily modified by the user.
 * - Authentication is based on email (case-insensitive) and bcrypt-hashed passwords.
 * - There is no session management or token-based authentication.
 */

import { useState, useCallback } from "react";
import bcrypt from "bcryptjs";

const STORAGE_KEY = "auth_users";
const AUTH_STORAGE_KEY = "auth_current_user";
const SALT_ROUNDS = 10;

interface User {
    name: string;
    email: string;
    password: string;
}

function getUsersFromStorage(): User[] {
    const users = localStorage.getItem(STORAGE_KEY);
    return users ? JSON.parse(users) : [];
}

function saveUsersToStorage(users: User[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function getCurrentUserFromStorage(): string | null {
    return localStorage.getItem(AUTH_STORAGE_KEY);
}

function saveCurrentUserToStorage(email: string | null): void {
    if (email) {
        localStorage.setItem(AUTH_STORAGE_KEY, email);
    } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
    }
}

async function delay(min: number = 100, max: number = 1000): Promise<void> {
    const ms = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function useAuth() {
    const [currentUser, setCurrentUser] = useState<string | null>(getCurrentUserFromStorage());
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isUsernameAvailable = useCallback(async (email: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            await delay();
            const users = getUsersFromStorage();
            return !users.some(user => user.email.toLowerCase() === email.toLowerCase());
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createUser = useCallback(async (name: string, email: string, password: string): Promise<void> => {
        setIsLoading(true);
        try {
            await delay();
            const users = getUsersFromStorage();

            if (!(await isUsernameAvailable(email))) {
                throw new Error("Email is already in use");
            }

            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            users.push({ name, email: email.toLowerCase(), password: hashedPassword });
            saveUsersToStorage(users);
        } finally {
            setIsLoading(false);
        }
    }, [isUsernameAvailable]);

    const authenticate = useCallback(async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            await delay();
            const users = getUsersFromStorage();
            const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());

            if (!user) {
                throw new Error("Invalid email or password");
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Invalid email or password");
            }

            setCurrentUser(email);
            saveCurrentUserToStorage(email);
            return true;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setIsLoading(true);
        try {
            setCurrentUser(null);
            saveCurrentUserToStorage(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { createUser, authenticate, isUsernameAvailable, logout, currentUser, isLoading };
}
