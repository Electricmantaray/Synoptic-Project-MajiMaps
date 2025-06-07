// Handles the interactions with database using postgresql
const { Pool } = require ('pg');
const fs = require ('fs');

// Global pool connection
let pool = null;

// Default user
let currentUser = 'User';

// === Connection Credentials ===
const config = {}