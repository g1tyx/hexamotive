/**
 * Analytics tracking for hex strategy game
 * Provides simple functions to track game events
 */

const API_BASE = '/api';
const USER_ID_KEY = 'hexGameUserID';

/**
 * Generate or retrieve user ID from localStorage
 * @returns {string} User ID
 */
export function getUserID() {
    let userID = localStorage.getItem(USER_ID_KEY);
    
    if (!userID) {
        // Generate random user ID
        userID = 'user_' + 
                 Math.random().toString(36).substring(2, 15) + 
                 Math.random().toString(36).substring(2, 15);
        localStorage.setItem(USER_ID_KEY, userID);
        console.log('Generated new user ID:', userID);
    }
    
    return userID;
}

/**
 * Send event to analytics API
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Data to send
 */
async function sendEvent(endpoint, data = {}) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: getUserID(),
                ...data
            })
        });

        if (!response.ok) {
            console.warn(`Analytics: Failed to send event to ${endpoint}`);
        }
    } catch (error) {
        // Fail silently - don't break the game if analytics are down
        console.warn('Analytics error:', error.message);
    }
}

/**
 * Track when game is started
 */
export function trackGameStarted() {
    console.log('Analytics: Game started');
    sendEvent('/gamestarted');
}

/**
 * Track when game is finished
 */
export function trackGameFinished() {
    console.log('Analytics: Game finished');
    sendEvent('/gamefinished');
}

/**
 * Generic event tracker for custom events
 * @param {string} eventName - Name of the event
 * @param {Object} additionalData - Optional additional data
 */
export function trackCustomEvent(eventName, additionalData = {}) {
    console.log(`Analytics: Custom event - ${eventName}`);
    sendEvent('/customevent', {
        event: eventName,
        ...additionalData
    });
}