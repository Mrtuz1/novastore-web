import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage';
import AddProductPage from './Pages/AddProductPage';
import './App.css';

// Başlangıç örnek ürünleri
const INITIAL_PRODUCTS = [
  { id: 1, name: 'Samsung Galaxy S24', category: 'Elektronik', price: 32999, stock: 15, description: 'Android akıllı telefon, 6.2" ekran', createdAt: '2025-01-10T10:00:00Z' },
  { id: 2, name: 'Levi\'s 501 Kot Pantolon', category: 'Giyim', price: 1299, stock: 40, description: 'Klasik kesim, koyu mavi', createdAt: '2025-01-11T10:00:00Z' },
  { id: 3, name: 'Dune - Frank Herbert', category: 'Kitap', price: 149, stock: 0, description: 'Bilim kurgu klasiği, Türkçe çeviri', createdAt: '2025-01-12T10:00:00Z' },
  { id: 4, name: 'CeraVe Nemlendirici Krem', category: 'Kozmetik', price: 389, stock: 25, description: '250ml, tüm cilt tipleri için', createdAt: '2025-01-13T10:00:00Z' },
  { id: 5, name: 'Dyson V15 Süpürge', category: 'Ev ve Yaşam', price: 19990, stock: 5, description: 'Kablosuz şarjlı elektrikli süpürge', createdAt: '2025-01-14T10:00:00Z' },
  { id: 6, name: 'Apple MacBook Air M3', category: 'Elektronik', price: 55999, stock: 8, description: '15", 16GB RAM, 512GB SSD', createdAt: '2025-01-15T10:00:00Z' },
];

function App() {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem('novastore-products');
    return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
  });

  const [currentPage, setCurrentPage] = useState('home');
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState(null);

  // LocalStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('novastore-products', JSON.stringify(products));
  }, [products]);

  // Toast bildirimi göster
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ✅ EKLE (Create)
  const handleAddProduct = (formData) => {
    const newProduct = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [...prev, newProduct]);
    showToast(`"${formData.name}" başarıyla eklendi!`, 'success');
    setCurrentPage('home');
  };

  // ✅ GÜNCELLE (Update)
  const handleUpdateProduct = (formData) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? { ...p, ...formData } : p))
    );
    showToast(`"${formData.name}" başarıyla güncellendi!`, 'info');
    setEditingProduct(null);
    setCurrentPage('home');
  };

  // ✅ SİL (Delete)
  const handleDeleteProduct = (id) => {
    const product = products.find((p) => p.id === id);
    if (window.confirm(`"${product?.name}" ürününü silmek istediğinizden emin misiniz?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast(`"${product?.name}" silindi.`, 'danger');
    }
  };

  // Düzenleme moduna geç
  const handleEdit = (product) => {
    setEditingProduct(product);
    setCurrentPage('add');
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setCurrentPage('home');
  };

  // Kaydetme yönlendirmesi
  const handleSave = editingProduct ? handleUpdateProduct : handleAddProduct;

  return (
    <div className="App">
      {/* Navbar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={(page) => {
          setCurrentPage(page);
          if (page === 'home') setEditingProduct(null);
        }}
        productCount={products.length}
      />

      {/* Toast Bildirimi */}
      {toast && (
        <div
          className={`toast show position-fixed bottom-0 end-0 m-3 text-white border-0`}
          style={{
            zIndex: 9999,
            background: toast.type === 'success' ? '#10b981' : toast.type === 'danger' ? '#ef4444' : '#6366f1',
            borderRadius: '12px',
            minWidth: '280px',
          }}
        >
          <div className="toast-body fw-semibold">
            <i className={`bi bi-${toast.type === 'success' ? 'check-circle' : toast.type === 'danger' ? 'trash3' : 'pencil-square'} me-2`}></i>
            {toast.message}
          </div>
        </div>
      )}

      {/* Sayfa İçeriği */}
      <main>
        {currentPage === 'home' ? (
          <HomePage
            products={products}
            onDelete={handleDeleteProduct}
            onEdit={handleEdit}
          />
        ) : (
          <AddProductPage
            onSave={handleSave}
            editingProduct={editingProduct}
            onCancelEdit={handleCancelEdit}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 mt-4 text-muted border-top">
        <small>
          <i className="bi bi-shop-window me-1 text-primary"></i>
          <strong>NovaStore</strong> Ürün Yönetim Paneli &nbsp;|&nbsp; TNC Group Staj Projesi &nbsp;|&nbsp;
          <i className="bi bi-code-slash mx-1"></i>React.js + Bootstrap 5
        </small>
      </footer>
    </div>
  );
}

export default App;
