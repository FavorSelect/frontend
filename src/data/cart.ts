export let cart = [
  {
    id: "1",
    name: "Cosmetic",
    imageUrl: "/bag-4.jpg",
    price: 599,
    quantity: 1,
    deliveryText: "Estimated between 4 Aug to 7 Aug",
    shipping: 25,
    tax: 20,
  },
  {
    id: "2",
    name: "Spice Item",
    imageUrl: "/bag-4.jpg",
    price: 199,
    quantity: 3,
    deliveryText: "Estimated between 4 Aug to 7 Aug",
    shipping: 10,
    tax: 10,
  },
  {
    id: "3",
    name: "Spice Item",
    imageUrl: "/bag-2.jpg",
    price: 199,
    quantity: 3,
    deliveryText: "Estimated between 4 Aug to 7 Aug",
    shipping: 10,
    tax: 10,
  },
  {
    id: "4",
    name: "Spice Item",
    imageUrl: "/bag-1.jpg",
    price: 199,
    quantity: 3,
    deliveryText: "Estimated between 4 Aug to 7 Aug",
    shipping: 10,
    tax: 10,
  },
];

export function updateQuantity(id: string, type: "increase" | "decrease") {
  cart = cart.map((item) => {
    if (item.id === id) {
      const newQty =
        type === "increase"
          ? item.quantity + 1
          : Math.max(1, item.quantity - 1);
      return { ...item, quantity: newQty };
    }
    return item;
  });
}

export function removeItem(id: string) {
  cart = cart.filter((item) => item.id !== id);
}

export function removeManyItems(ids: string[]) {
  cart = cart.filter((item) => !ids.includes(item.id));
}
