$(document).ready(function() {
    $('.dropdown').hover(
        function() {
            $(this).find('.dropdown-content').fadeIn(300);
        },
        function() {
            $(this).find('.dropdown-content').fadeOut(300);
        }
    );

    const createMobileMenu = () => {
        if (!$('.mobile-menu-toggle').length) {
            const $toggle = $('<button class="mobile-menu-toggle"><i class="fas fa-bars"></i></button>');
            const $nav = $('nav');
            
            $toggle.click(function() {
                $nav.toggleClass('mobile-active');
                $(this).find('i').toggleClass('fa-bars fa-times');
            });
            
            $('.logo-container').after($toggle);
            
            $('nav a').click(function() {
                if ($nav.hasClass('mobile-active')) {
                    $nav.removeClass('mobile-active');
                    $toggle.find('i').removeClass('fa-times').addClass('fa-bars');
                }
            });
        }
    };

    const handleResponsive = () => {
        if (window.innerWidth <= 768) {
            createMobileMenu();
            $('nav').addClass('mobile-nav');
        } else {
            $('nav').removeClass('mobile-nav mobile-active');
            $('.mobile-menu-toggle').remove();
        }
    };

    handleResponsive();

    $(window).resize(function() {
        handleResponsive();
    });

    $(window).scroll(function() {
        $('.hero-content, .hero-image').each(function() {
            const elementPos = $(this).offset().top;
            const scrollPos = $(window).scrollTop();
            const windowHeight = $(window).height();
            
            if (scrollPos > elementPos - windowHeight + 100) {
                $(this).addClass('animated');
            }
        });
    });

    const fetchFurnitureData = () => {
        const furnitureImages = [
            'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60',
            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60'
        ];
        
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/photos?_limit=8',
            method: 'GET',
            success: function(data) {
                const furniture = data.map((item, index) => ({
                    id: item.id,
                    title: `Furniture ${item.id}`,
                    price: Math.floor(Math.random() * 500) + 100,
                    imageUrl: index < furnitureImages.length ? furnitureImages[index] : item.url,
                    description: `${['Modern', 'Classic', 'Designer', 'Luxurious', 'Minimalist'][Math.floor(Math.random() * 5)]} ${['Sofa', 'Chair', 'Table', 'Lamp', 'Desk'][Math.floor(Math.random() * 5)]}`
                }));
                
                sessionStorage.setItem('furnitureData', JSON.stringify(furniture));
                
                const featuredItem = {
                    id: 1,
                    title: 'Featured Sofa',
                    price: 329,
                    imageUrl: furnitureImages[0],
                    description: 'Pösht Sofa'
                };
                
                updateFeaturedProduct(featuredItem);
            },
            error: function(error) {
                console.error('Error fetching furniture data:', error);
                
                const fallbackItem = {
                    id: 1,
                    title: 'Featured Sofa',
                    price: 329,
                    imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60',
                    description: 'Pösht Sofa'
                };
                updateFeaturedProduct(fallbackItem);
            }
        });
    };

    const updateFeaturedProduct = (product) => {
        $('.product-name').text(product.description);
        $('.product-price').text(`$${product.price}`);
        
        if (product.imageUrl) {
            $('.hero-image').css({
                'background-image': `url(${product.imageUrl})`,
                'background-position': 'center center',
                'background-size': 'cover'
            });
            
            const preloadImg = new Image();
            preloadImg.src = product.imageUrl;
            preloadImg.onload = function() {
                $('.hero-image').addClass('image-loaded');
            };
        }
    };

    fetchFurnitureData();

    $('.btn').hover(
        function() {
            $(this).css('transform', 'translateY(-3px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );

    $('.btn-cart').click(function() {
        $(this).addClass('btn-pop');
        setTimeout(() => {
            $(this).removeClass('btn-pop');
        }, 300);
    });

    $('.btn-view').click(function() {
        const furnitureData = JSON.parse(sessionStorage.getItem('furnitureData'));
        if (furnitureData && furnitureData.length > 0) {
            alert(`Product details for ${$('.product-name').text()}:\nPrice: ${$('.product-price').text()}\nID: ${furnitureData[0].id}`);
        }
    });

    $('.btn-search').click(function() {
        const searchSection = $('<div class="search-overlay"></div>');
        const searchContent = $(`
            <div class="search-content">
                <h3>Search Our Catalog</h3>
                <input type="text" placeholder="Type to search..." class="search-input">
                <button class="btn close-search">Close</button>
            </div>
        `);
        
        searchSection.append(searchContent);
        $('body').append(searchSection);
        
        searchSection.fadeIn(300);
        $('.search-input').focus();
        
        $('.close-search, .search-overlay').click(function(e) {
            if (e.target === this) {
                searchSection.fadeOut(300, function() {
                    $(this).remove();
                });
            }
        });
    });

    $('.btn-watch').click(function() {
        const videoOverlay = $('<div class="video-overlay"></div>');
        const videoContent = $(`
            <div class="video-content">
                <h3>Product Videos</h3>
                <div class="video-placeholder">
                    <i class="fas fa-play-circle"></i>
                    <p>Video content would load here</p>
                </div>
                <button class="btn close-video">Close</button>
            </div>
        `);
        
        videoOverlay.append(videoContent);
        $('body').append(videoOverlay);
        
        videoOverlay.fadeIn(300);
        
        $('.close-video, .video-overlay').click(function(e) {
            if (e.target === this) {
                videoOverlay.fadeOut(300, function() {
                    $(this).remove();
                });
            }
        });
    });

    const heroImage = document.querySelector('.hero-image');
    const images = [
        'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
        'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    ];
    
    if (heroImage) {
        heroImage.style.backgroundImage = `url(${images[0]})`;
        heroImage.classList.add('image-loaded');
        
        let currentImageIndex = 0;
        
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            heroImage.classList.remove('image-loaded');
            
            setTimeout(() => {
                heroImage.style.backgroundImage = `url(${images[currentImageIndex]})`;
                heroImage.classList.add('image-loaded');
            }, 500);
        }, 5000);
    }
    
    const productsSlider = document.querySelector('.products-slider');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    let productItems = document.querySelectorAll('.product-item');
    
    if (productsSlider && prevButton && nextButton && productItems.length) {
        const originalItems = Array.from(productItems);
        const totalOriginalItems = originalItems.length;
        
        const visibleItems = 5;
        
        productsSlider.innerHTML = '';
        
        const requiredItems = visibleItems * 3;
        
        for (let i = 0; i < requiredItems; i++) {
            const clone = originalItems[i % totalOriginalItems].cloneNode(true);
            productsSlider.appendChild(clone);
        }
        
        productItems = document.querySelectorAll('.product-item');
        
        let currentIndex = 0;
        const itemWidth = productItems[0].offsetWidth + 30;
        
        setFeaturedItem(0);
        
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalOriginalItems) % totalOriginalItems;
            updateSliderPosition();
            setFeaturedItem(0);
        });
        
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalOriginalItems;
            updateSliderPosition();
            setFeaturedItem(0);
        });
        
        function updateSliderPosition() {
            productsSlider.style.transition = 'transform 0.5s ease-in-out';
            productsSlider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            
            setTimeout(() => {
                if (currentIndex >= totalOriginalItems * 2 - visibleItems) {
                    currentIndex = currentIndex % totalOriginalItems;
                    productsSlider.style.transition = 'none';
                    productsSlider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
                }
            }, 500);
        }
        
        function setFeaturedItem(offset) {
            const featuredIndex = (currentIndex + offset) % productItems.length;
            
            productItems.forEach(item => item.classList.remove('featured'));
            
            productItems[featuredIndex].classList.add('featured');
        }
        
        window.addEventListener('resize', () => {
            const newItemWidth = productItems[0].offsetWidth + 30;
            productsSlider.style.transition = 'none';
            productsSlider.style.transform = `translateX(-${currentIndex * newItemWidth}px)`;
        });
    }

    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterSubmit = document.querySelector('.newsletter-submit');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterInput.value.trim();
            if (email === '') {
                newsletterInput.style.borderColor = '#ff4d4d';
                newsletterInput.placeholder = 'Please enter your email';
                
                setTimeout(() => {
                    newsletterInput.style.borderColor = '#e0e0e0';
                    newsletterInput.placeholder = 'Enter your email here';
                }, 3000);
                
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                newsletterInput.style.borderColor = '#ff4d4d';
                newsletterInput.value = '';
                newsletterInput.placeholder = 'Please enter a valid email';
                
                setTimeout(() => {
                    newsletterInput.style.borderColor = '#e0e0e0';
                    newsletterInput.placeholder = 'Enter your email here';
                }, 3000);
                
                return;
            }
            
            newsletterInput.value = '';
            newsletterInput.style.borderColor = '#4CAF50';
            newsletterInput.placeholder = 'Thank you for subscribing!';
            
            newsletterSubmit.innerHTML = '<i class="fas fa-check"></i>';
            newsletterSubmit.style.backgroundColor = '#4CAF50';
            newsletterSubmit.style.color = '#fff';
            
            setTimeout(() => {
                newsletterInput.style.borderColor = '#e0e0e0';
                newsletterInput.placeholder = 'Enter your email here';
                newsletterSubmit.innerHTML = '<i class="fas fa-envelope"></i>';
                newsletterSubmit.style.backgroundColor = '#e5f0b6';
                newsletterSubmit.style.color = '#2f241f';
            }, 3000);
        });
    }
}); 