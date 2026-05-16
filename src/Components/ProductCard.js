import React from 'react';

const CATEGORY_COLORS = {
  'Elektronik': 'primary',
  'Giyim': 'success',
  'Kitap': 'warning',
  'Kozmetik': 'danger',
  'Ev ve Yaşam': 'info',
  'Spor': 'secondary',
  'Oyuncak': 'dark',
  'Diğer': 'secondary',
};

const ProductCard = ({ product, onEdit, onDelete }) => {
  const color = CATEGORY_COLORS[product.category] || 'secondary';

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm border-0 product-card">
        {/* Renkli üst şerit */}
        <div className={`card-header bg-${color} text-white d-flex justify-content-between align-items-center`}>
          <span className="badge bg-white text-dark fw-semibold">
            <i className="bi bi-tag me-1"></i>{product.category}
          </span>
          <small className="opacity-75">
            <i className="bi bi-calendar3 me-1"></i>
            {new Date(product.createdAt).toLocaleDateString('tr-TR')}
          </small>
        </div>

        <div className="card-body d-flex flex-column">
          {/* Ürün Adı */}
          <h5 className="card-title fw-bold mb-1">{product.name}</h5>

          {/* Açıklama */}
          <p className="card-text text-muted small flex-grow-1" style={{ minHeight: '40px' }}>
            {product.description || <em>Açıklama girilmedi.</em>}
          </p>

          {/* Fiyat + Stok */}
          <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
            <div>
              <span className="fs-5 fw-bold text-success">
                ₺{Number(product.price).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div>
              <span className={`badge ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning text-dark' : 'bg-danger'}`}>
                <i className="bi bi-boxes me-1"></i>
                {product.stock > 0 ? `${product.stock} adet` : 'Tükendi'}
              </span>
            </div>
          </div>

          {/* Butonlar */}
          <div className="d-flex gap-2 mt-auto">
            <button
              className="btn btn-outline-primary btn-sm flex-fill"
              onClick={() => onEdit(product)}
            >
              <i className="bi bi-pencil-square me-1"></i>Düzenle
            </button>
            <button
              className="btn btn-outline-danger btn-sm flex-fill"
              onClick={() => onDelete(product.id)}
            >
              <i className="bi bi-trash3 me-1"></i>Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
