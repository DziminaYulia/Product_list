let container = document.querySelector(".container");
const cart = document.querySelector(".cart");

// Змінна cartItems повинна бути оголошена до використання
let cartItems = []; // Оголошуємо змінну для кошика

const products = [
  {
    id: 1,
    name: "Рюкзак туристичний",
    description: "Легкий і міцний рюкзак на 40 л з водонепроникного матеріалу.",
    price: 1899,
  },
  {
    id: 2,
    name: "Термокружка",
    description: "Нержавіюча сталь, зберігає тепло до 8 годин.",
    price: 499,
  },
  {
    id: 3,
    name: "Палатка 2-місна",
    description: "Компактна палатка для кемпінгу, швидко складається.",
    price: 2499,
  },
  {
    id: 4,
    name: "Спальний мішок",
    description: "Зручний спальний мішок для температури від +5 до -10 °C.",
    price: 1299,
  },
  {
    id: 5,
    name: "Ліхтарик налобний",
    description: "LED-ліхтарик з трьома режимами освітлення та акумулятором.",
    price: 699,
  },
];

// Функція для рендерингу товарів на сторінці
function renderProducts() {
  container.innerHTML = "";

  products.forEach((prod) => {
    container.innerHTML += `
      <div class="product-card">
        <h3>${prod.name}</h3>
        <p>${prod.description}</p>
        <p class="price">${prod.price} грн</p>
        <button class="buy-btn" data-id="${prod.id}">Купити</button>
      </div>
    `;
  });
}

// Використовуємо делегування подій для кнопок "Купити"
container.addEventListener("click", (event) => {
  if (event.target.classList.contains("buy-btn")) {
    const productId = event.target.dataset.id;
    addToCart(productId);
  }
});

// Функція для додавання товару до кошика
function addToCart(id) {
  const product = products.find((prod) => prod.id == id); // знаходимо товар по id
  cartItems.push(product); // додаємо товар в масив кошика
  renderCart(); // оновлюємо кошик
}

// Функція для рендерингу кошика
function renderCart() {
  cart.innerHTML = "<h3>Ваш кошик:</h3>";

  if (cartItems.length === 0) {
    cart.innerHTML += "<p>Кошик порожній</p>";
    return;
  }

  cartItems.forEach((item) => {
    cart.innerHTML += `
      <div class="cart-item">
        <p>${item.name} - ${item.price} грн</p>
      </div>
    `;
  });

  // Підсумкова сума товарів у кошику
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  cart.innerHTML += `<p>Загальна сума: ${total} грн</p>`;
}

renderProducts(); // Викликаємо рендеринг товарів на сторінці

//Модальне вікно корзина

const cartModal = document.querySelector(".cart-modal");
const cartBtn = document.querySelector(".cart-btn");
const closeBtn = document.querySelector(".close-btn");

// відкриваємо модалку
cartBtn.addEventListener("click", () => {
  cartModal.classList.remove("hidden");
  renderCart(); // оновлюємо вміст корзини при відкритті
});

// закриваємо модалку
closeBtn.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

// закриваємо при кліку на фон
cartModal.addEventListener("click", (event) => {
  if (event.target === cartModal) {
    cartModal.classList.add("hidden");
  }
});
