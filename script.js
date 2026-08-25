/**
 * Kisan Goat Farm - High-End Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        // Close menu on nav-link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                menuToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // 2. Active Navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navItem = document.querySelector(`.nav-list a[href*=${sectionId}]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navItem) navItem.classList.add('active');
            } else {
                if (navItem) navItem.classList.remove('active');
            }
        });
    });

    // 3. Breeds Filter Tabs
    const filterBtns = document.querySelectorAll('.tab-btn');
    const breedCards = document.querySelectorAll('.breed-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            breedCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 4. Live Investment & Budget Estimator Calculator
    const calcBreed = document.getElementById('calc-breed');
    const calcWeight = document.getElementById('calc-weight');
    const calcQty = document.getElementById('calc-qty');
    
    const weightVal = document.getElementById('weight-val');
    const qtyVal = document.getElementById('qty-val');
    const pricePerGoat = document.getElementById('price-per-goat');
    const totalWeight = document.getElementById('total-weight');
    const totalPrice = document.getElementById('total-price');
    const calcWhatsappBtn = document.getElementById('calc-whatsapp-btn');

    function updateCalculator() {
        if (!calcBreed || !calcWeight || !calcQty) return;

        const ratePerKg = parseFloat(calcBreed.value);
        const weight = parseInt(calcWeight.value);
        const qty = parseInt(calcQty.value);

        weightVal.textContent = `${weight} kg`;
        qtyVal.textContent = `${qty} शेळ्या`;

        const perGoatCost = ratePerKg * weight;
        const totalKg = weight * qty;
        const finalCost = perGoatCost * qty;

        pricePerGoat.textContent = `₹ ${perGoatCost.toLocaleString('en-IN')}`;
        totalWeight.textContent = `${totalKg} किलो`;
        totalPrice.textContent = `₹ ${finalCost.toLocaleString('en-IN')}*`;

        const breedText = calcBreed.options[calcBreed.selectedIndex].text.split('(')[0].trim();
        const waMsg = `नमस्कार, मला गोट फार्म अंदाजपत्रकानुसार ${qty} ${breedText} (सरासरी वजन ${weight} kg, अंदाजे बजेट ₹ ${finalCost.toLocaleString('en-IN')}) बद्दल माहिती हवी आहे.`;
        calcWhatsappBtn.href = `https://wa.me/919876543210?text=${encodeURIComponent(waMsg)}`;
    }

    if (calcBreed && calcWeight && calcQty) {
        calcBreed.addEventListener('change', updateCalculator);
        calcWeight.addEventListener('input', updateCalculator);
        calcQty.addEventListener('input', updateCalculator);
        updateCalculator();
    }

    // 5. FAQ Accordion Toggle
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const body = accordionItem.querySelector('.accordion-body');
            const isActive = accordionItem.classList.contains('active');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-body').style.maxHeight = null;
            });

            if (!isActive) {
                accordionItem.classList.add('active');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    // 6. Quick WhatsApp Forms
    const heroQuickForm = document.getElementById('hero-quick-form');
    if (heroQuickForm) {
        heroQuickForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('quick-name').value;
            const phone = document.getElementById('quick-phone').value;
            const breed = document.getElementById('quick-breed').value;

            const msg = `नमस्कार! माझे नाव ${name} (${phone}) आहे. मला ${breed} शेळी/बोकडाबद्दल तातडीने माहिती आणि उपलब्ध स्टॉकचे फोटो हवे आहेत.`;
            window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('धन्यवाद! तुमची माहिती मिळाली आहे. आमची टीम लवकरच तुमच्याशी संपर्क करेल.');
            contactForm.reset();
        });
    }

    // 7. Modal Popup for Details
    const modal = document.getElementById('breed-modal');
    const closeModal = document.getElementById('close-modal');
    const modalBody = document.getElementById('modal-body-content');

    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const breedName = btn.getAttribute('data-breed');
            modalBody.innerHTML = `
                <h3 style="color: #15803d; font-size: 24px; margin-bottom: 10px;">${breedName} - संपूर्ण तपशील</h3>
                <p style="color: #64748b; margin-bottom: 15px;">या जातीच्या शेळ्या व बोकड थेट आमच्या फार्ममध्ये उपलब्ध आहेत. सर्व जनावरांचे वजन व आरोग्य तपासलेले आहे.</p>
                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <p><strong>✓ लसीकरण:</strong> १००% पूर्ण (PPR, ET, FMD)</p>
                    <p><strong>✓ चारा:</strong> संतुलित हिरवा व सुका चारा</p>
                    <p><strong>✓ वाहतूक:</strong> महाराष्ट्रभर सुरक्षित डिलिव्हरी उपलब्ध</p>
                </div>
                <a href="https://wa.me/919876543210?text=मला%20${encodeURIComponent(breedName)}%20बद्दल%20अधिक%20माहिती%20हवी%20आहे." target="_blank" class="btn btn-whatsapp btn-block" style="text-align:center;">
                    <i class="fa-brands fa-whatsapp"></i> थेट व्हॉट्सॲपवर फोटो व भाव मिळवा
                </a>
            `;
            modal.classList.add('open');
        });
    });

    if (closeModal && modal) {
        closeModal.addEventListener('click', () => modal.classList.remove('open'));
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('open');
        });
    }
});
