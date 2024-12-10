from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    # Featured products for homepage
    products = [
        {
            'name': 'Ключ Steam: Red Dead Redemption 2',
            'price': '2499₽',
            'hot_sale': True
        },
        {
            'name': 'Подписка Xbox Game Pass Ultimate 3 месяца',
            'price': '1599₽',
            'hot_sale': True
        },
        {
            'name': 'Ключ Steam: Baldur\'s Gate 3',
            'price': '2999₽',
            'hot_sale': True
        },
        {
            'name': 'PlayStation Plus Essential 12 месяцев',
            'price': '3999₽',
            'hot_sale': False
        }
    ]
    
    # Sample reviews data
    reviews = [
        {
            'name': 'Иван Петров',
            'rating': 5,
            'text': 'Потрясающий сервис! Купил ключ для игры, активировал без проблем. Буду рекомендовать друзьям!'
        },
        {
            'name': 'Анна Смирнова',
            'rating': 5,
            'text': 'Приобрела ключ для Steam и электронную книгу. Все пришло быстро, цены хорошие. Буду покупать снова!'
        },
        {
            'name': 'Вася Пупкин',
            'rating': 5,
            'text': 'Купил VPN — работает отлично! Быстрая установка и поддержка на высоте. Рекомендую!'
        }
    ]
    
    return render_template('home.html', products=products, reviews=reviews)

@app.route('/catalog')
def catalog():
    products = [
        # Категория: Ключи Steam
        {
            'name': 'Ключ Steam: Red Dead Redemption 2',
            'price': '2499₽',
            'hot_sale': True,
            'category': 'Ключи Steam'
        },
        {
            'name': 'Ключ Steam: Baldur\'s Gate 3',
            'price': '2999₽',
            'hot_sale': True,
            'category': 'Ключи Steam'
        },
        {
            'name': 'Ключ Steam: Cyberpunk 2077',
            'price': '1999₽',
            'hot_sale': False,
            'category': 'Ключи Steam'
        },
        {
            'name': 'Ключ Steam: Starfield',
            'price': '4999₽',
            'hot_sale': True,
            'category': 'Ключи Steam'
        },
        {
            'name': 'Ключ Steam: Elden Ring',
            'price': '3499₽',
            'hot_sale': False,
            'category': 'Ключи Steam'
        },
        {
            'name': 'Ключ Steam: Resident Evil 4 Remake',
            'price': '3999₽',
            'hot_sale': True,
            'category': 'Ключи Steam'
        },

        # Категория: VPN
        {
            'name': 'NordVPN Premium на 2 года',
            'price': '2799₽',
            'hot_sale': True,
            'category': 'VPN'
        },
        {
            'name': 'ExpressVPN на 1 год',
            'price': '3499₽',
            'hot_sale': False,
            'category': 'VPN'
        },
        {
            'name': 'Surfshark VPN на 2 года',
            'price': '2299₽',
            'hot_sale': True,
            'category': 'VPN'
        },
        {
            'name': 'ProtonVPN Plus на 1 год',
            'price': '2999₽',
            'hot_sale': False,
            'category': 'VPN'
        },

        # Категория: Подписки
        {
            'name': 'Netflix Premium на 1 год',
            'price': '4999₽',
            'hot_sale': True,
            'category': 'Подписки'
        },
        {
            'name': 'Spotify Premium на 1 год',
            'price': '1999₽',
            'hot_sale': False,
            'category': 'Подписки'
        },
        {
            'name': 'YouTube Premium на 1 год',
            'price': '2499₽',
            'hot_sale': True,
            'category': 'Подписки'
        },
        {
            'name': 'Discord Nitro на 1 год',
            'price': '3299₽',
            'hot_sale': False,
            'category': 'Подписки'
        },

        # Категория: Антивирусы
        {
            'name': 'Kaspersky Total Security',
            'price': '1999₽',
            'hot_sale': True,
            'category': 'Антивирусы'
        },
        {
            'name': 'ESET NOD32 Internet Security',
            'price': '1799₽',
            'hot_sale': False,
            'category': 'Антивирусы'
        },
        {
            'name': 'Bitdefender Total Security',
            'price': '2299₽',
            'hot_sale': True,
            'category': 'Антивирусы'
        },
        {
            'name': 'Norton 360 Deluxe',
            'price': '2499₽',
            'hot_sale': False,
            'category': 'Антивирусы'
        },

        # Категория: Программы
        {
            'name': 'Microsoft Office 365 Personal',
            'price': '3999₽',
            'hot_sale': True,
            'category': 'Программы'
        },
        {
            'name': 'Adobe Creative Cloud на 1 год',
            'price': '5999₽',
            'hot_sale': True,
            'category': 'Программы'
        },
        {
            'name': 'WinRAR Пожизненная лицензия',
            'price': '999₽',
            'hot_sale': False,
            'category': 'Программы'
        },
        {
            'name': 'CCleaner Professional Plus',
            'price': '1499₽',
            'hot_sale': False,
            'category': 'Программы'
        },

        # Категория: Игровые подписки
        {
            'name': 'Xbox Game Pass Ultimate 3 месяца',
            'price': '1599₽',
            'hot_sale': True,
            'category': 'Игровые подписки'
        },
        {
            'name': 'PlayStation Plus Essential 12 месяцев',
            'price': '3999₽',
            'hot_sale': False,
            'category': 'Игровые подписки'
        },
        {
            'name': 'EA Play Pro на 1 год',
            'price': '2999₽',
            'hot_sale': True,
            'category': 'Игровые подписки'
        },
        {
            'name': 'Ubisoft+ на 3 месяца',
            'price': '2499₽',
            'hot_sale': False,
            'category': 'Игровые подписки'
        }
    ]
    
    # Получаем выбранную категорию из параметров запроса
    selected_category = request.args.get('category', 'Все')
    
    # Фильтруем товары по категории
    if selected_category != 'Все':
        filtered_products = [p for p in products if p['category'] == selected_category]
    else:
        filtered_products = products
    
    # Пагинация для отфильтрованных товаров
    page = request.args.get('page', 1, type=int)
    per_page = 12
    start = (page - 1) * per_page
    end = start + per_page
    
    paginated_products = filtered_products[start:end]
    total_pages = (len(filtered_products) + per_page - 1) // per_page
    
    # Получаем список всех уникальных категорий
    categories = ['Все'] + sorted(list(set(p['category'] for p in products)))
    
    return render_template('catalog.html',
                         products=paginated_products,
                         current_page=page,
                         total_pages=total_pages,
                         categories=categories,
                         selected_category=selected_category)

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)
