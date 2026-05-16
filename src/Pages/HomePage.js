import React, { useState } from 'react';
import ProductCard from '../Components/ProductCard';
import { CATEGORIES } from '../Interfaces/Product';

const HomePage = ({ products, onDelete, onEdit }) => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Filtreleme + Arama + Sıralama
  let filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()));
    const matchCategory = filterCategory ? p.category === filterCategory : true;
    return matchSearch && matchCategory;
  });

  if (sortBy === 'newest') filtered = [...filtered].reverse();
  else if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name, 'tr'));

  // İstatistikler
  const totalStock = products.reduce((sum, p) => sum + Number(p.stock), 0);
  const totalValue = products.reduce((sum, p) => sum + (Number(p.price) * Number(p.stock)), 0);
  const outOfStock = products.filter((p) => p.stock === 0).length;

  return (
    <div className="container py-4">
      {/* İstatistik Kartları */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card border-0 text-center shadow-sm" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', borderRadius: '12px' }}>
            <div className="card-body py-3">
              <div className="fs-2 fw-bold">{products.length}</div>
              <div className="small opacity-75"><i className="bi bi-box-seam me-1"></i>Toplam Ürün</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 text-center shadow-sm" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', borderRadius: '12px' }}>
            <div className="card-body py-3">
              <div className="fs-2 fw-bold">{totalStock}</div>
              <div className="small opacity-75"><i className="bi bi-stack me-1"></i>Toplam Stok</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 text-center shadow-sm" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', borderRadius: '12px' }}>
            <div className="card-body py-3">
              <div className="fs-4 fw-bold">₺{totalValue.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</div>
              <div className="small opacity-75"><i className="bi bi-currency-dollar me-1"></i>Envanter Değeri</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 text-center shadow-sm" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white', borderRadius: '12px' }}>
            <div className="card-body py-3">
              <div className="fs-2 fw-bold">{outOfStock}</div>
              <div className="small opacity-75"><i className="bi bi-exclamation-circle me-1"></i>Tükenen Ürün</div>
            </div>
          </div>
        </div>
      </div>

      {/* Arama ve Filtreler */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
        <div className="card-body p-3">
          <div className="row g-2 align-items-center">
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Ürün ara..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button className="btn btn-outline-secondary" onClick={() => setSearch('')}>
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <select className="form-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="">Tüm Kategoriler</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">En Yeni</option>
                <option value="price-asc">Fiyat (Artan)</option>
                <option value="price-desc">Fiyat (Azalan)</option>
                <option value="name">İsme Göre</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Sonuç Sayısı */}
      {products.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="text-muted mb-0">
            <i className="bi bi-funnel me-1"></i>
            <strong>{filtered.length}</strong> ürün gösteriliyor
            {(search || filterCategory) && <span className="text-primary"> (filtrelenmiş)</span>}
          </p>
          {(search || filterCategory) && (
            <button className="btn btn-sm btn-outline-secondary" onClick={() => { setSearch(''); setFilterCategory(''); }}>
              <i className="bi bi-x-circle me-1"></i>Filtreyi Temizle
            </button>
          )}
        </div>
      )}

      {/* Ürün Listesi */}
      {products.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-inbox display-1 text-muted"></i>
          <h4 className="mt-3 text-muted">Henüz ürün eklenmedi</h4>
          <p className="text-muted">Üst menüden "Ürün Ekle" butonuna tıklayarak başlayın.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-search display-1 text-muted"></i>
          <h4 className="mt-3 text-muted">Sonuç bulunamadı</h4>
          <p className="text-muted">Arama veya filtre kriterlerini değiştirin.</p>
        </div>
      ) : (
        <div className="row">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
