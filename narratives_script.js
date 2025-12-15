
// Mapping the themes and associating them to the css file
const themeFiles = {
    immersive: "theme_immersive.css",
    minimal: "theme_minimal.css"
}

const themeLink = document.getElementById("themeStyle");
const defaultThemeKey = 'minimal'; // default style

function applyTheme(key) {
    const themeToApply = themeFiles[key] ? key : defaultThemeKey; 

    const href = themeFiles[themeToApply]

    if (href) {
        themeLink.setAttribute("href", href);
        themeLink.disabled = false; 

        localStorage.setItem("selectedTheme", themeToApply);
        return;
    }

    console.error("Error: theme not found");
    themeLink.disabled = true;
}

function applySavedTheme(){
    const savedTheme = localStorage.getItem("selectedTheme") || defaultThemeKey;
    applyTheme(savedTheme); 

    const selector = document.getElementById("themeSelector");
    if (selector){
        selector.value = savedTheme
    }
}

document.addEventListener("DOMContentLoaded", applySavedTheme);

//Implementing an animation when scrolling //
document.addEventListener("DOMContentLoaded", () => {
    const elementsToAnimate = document.querySelectorAll(".is_hidden");
    const observerOptions = {
        root: null, 
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    }; 

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){
                entry.target.classList.remove("is_hidden"); 
                entry.target.classList.add("fade_in"); 
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
})