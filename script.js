document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header Effect
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Smooth interaction for feature boxes
    const featureBoxes = document.querySelectorAll('.feature-box');
    
    featureBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            const icon = box.querySelector('.f-icon i');
            if(icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        box.addEventListener('mouseleave', () => {
            const icon = box.querySelector('.f-icon i');
            if(icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // 3. Search Bar interactiveness
    const searchInput = document.querySelector('.hero-search input');
    const searchContainer = document.querySelector('.hero-search');

    if(searchInput) {
        searchInput.addEventListener('focus', () => {
            searchContainer.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
            searchContainer.style.transform = 'translateY(-2px)';
            searchContainer.style.transition = 'all 0.3s ease';
        });

        searchInput.addEventListener('blur', () => {
            searchContainer.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
            searchContainer.style.transform = 'translateY(0)';
        });
    }
});
