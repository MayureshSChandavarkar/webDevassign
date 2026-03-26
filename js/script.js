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
    const images = [
        'assets/Group 1000004277.png', 
        'assets/Group 1000004093.png',
        'assets/Group 1000004283.png',
        'assets/Group 1000004277.png'
    ];

    function updateGallery(index) {
        thumbnails.forEach((thumb, i) => {
            if (i === index) thumb.classList.add('active');
            else thumb.classList.remove('active');
        });
        currentImageIndex = index;
    }

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
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

    const fragranceRadios = document.querySelectorAll('input[name="fragrance1"], input[name="fragrance2"]');
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
        const frag1 = document.querySelector('input[name="fragrance1"]:checked')?.value || 'original';
        
        let link = `#cart?type=${subType}&f1=${frag1}`;
        
        if (subType === 'double') {
            const frag2 = document.querySelector('input[name="fragrance2"]:checked')?.value || 'original';
            link += `&f2=${frag2}`;
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
            const speed = 200; // lower is faster
            
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
