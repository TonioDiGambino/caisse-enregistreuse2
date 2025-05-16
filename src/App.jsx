import React, { useState } from 'react';

const sampleProducts = [
  { id: 1, name: 'Menu Burger', price: 1.2, stock: 50, category: 'Boulangerie' },
  { id: 2, name: 'Menu Salade', price: 0.9, stock: 30, category: 'Épicerie' },
  { id: 3, name: 'Menu Pizza', price: 1.5, stock: 20, category: 'Épicerie' },
  { id: 4, name: 'Menu Perals', price: 1.5, stock: 20, category: 'Épicerie' },
];

export default function App() {
  const [products] = useState(sampleProducts);
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');

  const addToCart = (product) => {
  const qty = quantities[product.id] || 1;
  setCart((prev) => {
    const existing = prev.find((item) => item.id === product.id);
    if (existing) {
      return prev.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
      );
    } else {
      return [...prev, { ...product, quantity: qty }];
    }
  });
};

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tva = total * 0.2;

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-bold mb-4">Produits</h2>
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price.toFixed(2)} €</td>
                <td className="flex gap-2 items-center">
  <input
    type="number"
    min="1"
    value={quantities[product.id] || 1}
    onChange={(e) =>
      setQuantities({ ...quantities, [product.id]: parseInt(e.target.value) })
    }
    className="w-16 border rounded px-1 py-1"
  />
  <button
    onClick={() => addToCart(product)}
    className="bg-blue-500 text-white px-2 py-1 rounded"
  >
    Ajouter
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-bold mb-4">Ticket de caisse</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Qté</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{(item.price * item.quantity).toFixed(2)} €</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-right">
          <p>Sous-total: {total.toFixed(2)} €</p>
          <p>TVA (20%): {tva.toFixed(2)} €</p>
          <p className="font-bold">Total TTC: {(total + tva).toFixed(2)} €</p>
          <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded">
            Payer
          </button>
        </div>
      </div>
    </div>
  );
}
