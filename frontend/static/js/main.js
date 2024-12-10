document.addEventListener('DOMContentLoaded', function() {
    // Бургер-меню
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            burgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            // Запрещаем прокрутку body при открытом меню
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Закрываем меню при клике на ссылку
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Закрываем меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!burgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Инициализация корзины из localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Функция обновления счетчика корзины
    function updateCartCounter() {
        const counter = document.querySelector('.cart-count');
        if (counter) {
            const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
            if (totalItems > 0) {
                counter.textContent = totalItems;
                counter.classList.add('visible');
            } else {
                counter.textContent = '';
                counter.classList.remove('visible');
            }
        }
    }

    // Обновляем счетчик при загрузке страницы
    updateCartCounter();

    // Добавление в корзину
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            
            // Проверяем, есть ли уже такой товар в корзине
            const existingItemIndex = cartItems.findIndex(item => item.name === productName);
            
            if (existingItemIndex !== -1) {
                // Если товар уже есть, увеличиваем количество
                cartItems[existingItemIndex].quantity = (cartItems[existingItemIndex].quantity || 1) + 1;
            } else {
                // Если товара нет, добавляем новый
                cartItems.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }
            
            // Сохраняем в localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            // Обновляем счетчик
            updateCartCounter();
            
            // Визуальный фидбек
            const originalText = this.textContent;
            this.textContent = 'Добавлено ✓';
            this.classList.add('added');
            
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('added');
            }, 2000);
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send this to your backend
            console.log(`Newsletter subscription for: ${email}`);
            
            // Show success message
            alert('Спасибо за подписку!');
            this.reset();
        });
    }

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.background = 'rgba(26, 26, 46, 0.95)';
        } else {
            header.style.background = 'rgba(26, 26, 46, 0.98)';
        }
    });

    // Если мы на странице корзины
    if (window.location.pathname === '/cart') {
        const cartItemsList = document.getElementById('cartItemsList');
        const template = document.getElementById('cartItemTemplate');

        function renderCart() {
            if (!cartItemsList) return;
            
            cartItemsList.innerHTML = '';
            
            if (cartItems.length === 0) {
                cartItemsList.innerHTML = '<p class="empty-cart">Ваша корзина пуста</p>';
                return;
            }

            cartItems.forEach((item, index) => {
                const clone = template.content.cloneNode(true);
                
                clone.querySelector('.item-name').textContent = item.name;
                clone.querySelector('.price').textContent = item.price;
                clone.querySelector('.quantity').textContent = item.quantity || 1;

                const cartItem = clone.querySelector('.cart-item');
                cartItem.dataset.index = index;

                cartItemsList.appendChild(clone);
            });

            updateTotalPrice();
            updateCartCounter();
        }

        // Обработчик событий для кнопок в корзине
        if (cartItemsList) {
            cartItemsList.addEventListener('click', function(e) {
                const cartItem = e.target.closest('.cart-item');
                if (!cartItem) return;

                const index = parseInt(cartItem.dataset.index);
                
                if (e.target.classList.contains('plus')) {
                    cartItems[index].quantity = (cartItems[index].quantity || 1) + 1;
                } else if (e.target.classList.contains('minus') && cartItems[index].quantity > 1) {
                    cartItems[index].quantity--;
                } else if (e.target.closest('.remove-btn')) {
                    cartItems.splice(index, 1);
                }

                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                renderCart();
                updateCartCounter();
            });
        }

        // Функция обновления общей стоимости
        function updateTotalPrice() {
            const totalPriceElement = document.querySelector('.total-price');
            if (!totalPriceElement) return;

            const total = cartItems.reduce((sum, item) => {
                const price = parseInt(item.price.replace(/[^\d]/g, ''));
                return sum + price * (item.quantity || 1);
            }, 0);

            totalPriceElement.textContent = total + ' ₽';
        }

        // Рендерим корзину при загрузке страницы
        renderCart();
    }

    // Cart icon functionality
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '/cart';
        });
    }

    // Функция сортировки товаров
    function sortProducts(sortType) {
        const productsGrid = document.querySelector('.products-grid');
        if (!productsGrid) return;

        const products = Array.from(productsGrid.children);
        
        products.sort((a, b) => {
            const priceA = parseInt(a.querySelector('.price').textContent.replace(/[^\d]/g, ''));
            const priceB = parseInt(b.querySelector('.price').textContent.replace(/[^\d]/g, ''));
            const nameA = a.querySelector('h3').textContent;
            const nameB = b.querySelector('h3').textContent;

            switch (sortType) {
                case 'По цене (возр.)':
                    return priceA - priceB;
                case 'По цене (убыв.)':
                    return priceB - priceA;
                case 'По названию':
                    return nameA.localeCompare(nameB);
                default:
                    return 0;
            }
        });

        // Очищаем и заново наполняем сетку товаров
        productsGrid.innerHTML = '';
        products.forEach(product => productsGrid.appendChild(product));
    }

    // Обработчик изменения сортировки
    const sortSelect = document.querySelector('.sort-dropdown select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }

    // Функция поиска товаров
    function searchProducts(query) {
        const productsGrid = document.querySelector('.products-grid');
        if (!productsGrid) return;

        const products = Array.from(productsGrid.children);
        
        products.forEach(product => {
            const name = product.querySelector('h3').textContent.toLowerCase();
            const price = product.querySelector('.price').textContent.toLowerCase();
            const searchQuery = query.toLowerCase();

            if (name.includes(searchQuery) || price.includes(searchQuery)) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });

        // Если нет результатов, показываем сообщение
        const hasVisibleProducts = products.some(product => product.style.display !== 'none');
        let noResultsMessage = document.querySelector('.no-results-message');
        
        if (!hasVisibleProducts) {
            if (!noResultsMessage) {
                noResultsMessage = document.createElement('p');
                noResultsMessage.className = 'no-results-message';
                noResultsMessage.textContent = 'Товары не найдены';
                productsGrid.parentNode.insertBefore(noResultsMessage, productsGrid.nextSibling);
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }

    // Обработчик поиска
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        let debounceTimer;
        searchInput.addEventListener('input', function() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                searchProducts(this.value);
            }, 300);
        });
    }
});
