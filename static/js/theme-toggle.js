// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Exit if toggle button doesn't exist
    if (!themeToggle) {
        console.warn('Theme toggle button not found');
        return;
    }
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the current theme
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
    } else {
        body.removeAttribute('data-theme');
    }
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            // Switch to light theme
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to dark theme
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
});