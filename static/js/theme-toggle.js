// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Exit if toggle button doesn't exist
    if (!themeToggle) {
        console.warn('Theme toggle button not found');
        return;
    }
    
    // Function to switch code highlighting theme
    function switchCodeTheme(isDark) {
        const lightTheme = document.getElementById('highlight-light');
        const darkTheme = document.getElementById('highlight-dark');
        
        if (lightTheme && darkTheme) {
            if (isDark) {
                lightTheme.disabled = true;
                darkTheme.disabled = false;
            } else {
                lightTheme.disabled = false;
                darkTheme.disabled = true;
            }
        }
    }
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the current theme
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        switchCodeTheme(true);
    } else {
        body.removeAttribute('data-theme');
        switchCodeTheme(false);
    }
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            // Switch to light theme
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            switchCodeTheme(false);
        } else {
            // Switch to dark theme
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            switchCodeTheme(true);
        }
    });
});