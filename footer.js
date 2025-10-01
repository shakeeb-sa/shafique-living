// This is component-loader.js
document.addEventListener("DOMContentLoaded", () => {
    // This function finds a placeholder and fills it with content from a file
    const loadHTMLComponent = (selector, filePath) => {
        const element = document.querySelector(selector);
        if (element) {
            fetch(filePath)
                .then(response => {
                    if (!response.ok) throw new Error("Component not found");
                    return response.text();
                })
                .then(data => {
                    element.innerHTML = data;
                })
                .catch(error => console.error(`Error loading ${filePath}:`, error));
        }
    };

    // Tell the function to load footer.html into the #footer-placeholder
    loadHTMLComponent("#footer-placeholder", "footer.html");
});