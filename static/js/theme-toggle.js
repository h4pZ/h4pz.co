// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Exit if toggle button doesn't exist
    if (!themeToggle) {
        console.warn('Theme toggle button not found');
        return;
    }
    
    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the current theme
    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        themeToggle.textContent = '🌙';
    } else {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '☀️';
    }
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        
        if (currentTheme === 'light') {
            // Switch to dark theme
            body.removeAttribute('data-theme');
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            // Switch to light theme
            body.setAttribute('data-theme', 'light');
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
});