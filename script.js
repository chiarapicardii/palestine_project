document.addEventListener('DOMContentLoaded', (event) => {
    
    const setupGallery = (sectionId, wrapperId) => {
        const section = document.getElementById(sectionId); 
        if (section) {
            const figures = section.querySelectorAll("figure");
            
            // 1. Creating the div-wrapper for the box 
            const gridWrapper = document.createElement("div");
            gridWrapper.id = wrapperId; 

            // 2. Moving all the imgs in the wrapper
            figures.forEach(fig => gridWrapper.appendChild(fig));

            // 3. Inserting the wrappen in the section 
            section.appendChild(gridWrapper);
        }
    };
    
    setupGallery("erasure", "erasure-gallery");
    setupGallery("resistance", "resistance-gallery");
})
