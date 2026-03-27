document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImg = document.getElementById('main-product-image');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');

    let currentImageIndex = 0;
    
    // Dynamically grab image URLs from the new 8 thumbnails structure!
    const thumbnailImgs = document.querySelectorAll('.thumbnail img');
    const images = Array.from(thumbnailImgs).map(img => img.src);

    function updateGallery(index) {
        thumbnails.forEach((thumb, i) => {
            if (i === index) thumb.classList.add('active');
            else thumb.classList.remove('active');
        });
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            if (i === index) dot.classList.add('active');
            else dot.classList.remove('active');
        });
        currentImageIndex = index;
        if(mainImg) mainImg.src = images[index];
    }

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            updateGallery(index);
        });
    });

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateGallery(index);
        });
    });

    prevBtn?.addEventListener('click', () => {
        let newIndex = currentImageIndex - 1;
        if (newIndex < 0) newIndex = thumbnails.length - 1;
        updateGallery(newIndex);
    });

    nextBtn?.addEventListener('click', () => {
        let newIndex = currentImageIndex + 1;
        if (newIndex >= thumbnails.length) newIndex = 0;
        updateGallery(newIndex);
    });

    // Subscription Toggle
    const subOptions = document.querySelectorAll('.sub-option');
    const subRadios = document.querySelectorAll('input[name="subscription"]');

    subRadios.forEach((radio) => {
        radio.addEventListener('change', (e) => {
            subOptions.forEach(opt => opt.classList.remove('active'));
            if(e.target.checked) {
                e.target.closest('.sub-option').classList.add('active');
            }
            updateAddToCartLink();
        });
    });

    const fragranceRadios = document.querySelectorAll('input[name="fragrance1"], input[name="fragrance_d1"], input[name="fragrance_d2"]');
    fragranceRadios.forEach(radio => {
        radio.addEventListener('change', updateAddToCartLink);
        radio.addEventListener('change', (e) => {
            const name = e.target.name;
            document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
                r.closest('.fragrance-item').classList.remove('selected');
            });
            if(e.target.checked) {
                e.target.closest('.fragrance-item').classList.add('selected');
            }
        });
    });

    function updateAddToCartLink() {
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        if(!addToCartBtn) return;
        
        const subType = document.querySelector('input[name="subscription"]:checked')?.value || 'single';
        let link = '';

        if (subType === 'single') {
            const frag1 = document.querySelector('input[name="fragrance1"]:checked')?.value || 'original';
            link = `#cart?type=${subType}&f1=${frag1}`;
        } else if (subType === 'double') {
            const fragD1 = document.querySelector('input[name="fragrance_d1"]:checked')?.value || 'original';
            const fragD2 = document.querySelector('input[name="fragrance_d2"]:checked')?.value || 'original';
            link = `#cart?type=${subType}&f1=${fragD1}&f2=${fragD2}`;
        }
        
        addToCartBtn.href = link;
        console.log("Updated Add To Cart Link:", link);
    }
    updateAddToCartLink(); 

    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            item.classList.toggle('active');
            
            const icon = header.querySelector('.icon');
            if(item.classList.contains('active')) {
                icon.textContent = '-';
            } else {
                icon.textContent = '+';
            }
        });
    });

    const counters = document.querySelectorAll('.counter');
    let counted = false;

    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 200; 
            
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const section = document.getElementById('counter-section');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !counted) {
            runCounters();
            counted = true;
        }
    }, { threshold: 0.5 });
    
    if(section) {
        observer.observe(section);
    }
});
