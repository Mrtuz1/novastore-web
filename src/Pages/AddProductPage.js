import React from 'react';
import ProductForm from '../Components/ProductForm';

const AddProductPage = ({ onSave, editingProduct, onCancelEdit }) => {
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9">
          {/* Başlık */}
          <div className="mb-4">
            <h2 className="fw-bold mb-1">
              <i className="bi bi-plus-circle me-2 text-primary"></i>
              {editingProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
            </h2>
            <p className="text-muted">
              {editingProduct
                ? 'Ürün bilgilerini güncelleyip kaydet butonuna basın.'
                : 'Aşağıdaki formu doldurarak sisteme yeni ürün ekleyin.'}
            </p>
          </div>

          {/* Form */}
          <ProductForm
            onSave={onSave}
            editingProduct={editingProduct}
            onCancelEdit={onCancelEdit}
          />

          {/* Bilgi kutusu */}
          <div className="alert alert-info mt-4 border-0 shadow-sm" style={{ borderRadius: '12px' }}>
            <i className="bi bi-info-circle me-2"></i>
            <strong>Bilgi:</strong> Eklediğiniz ürünler tarayıcı belleğine (localStorage) kaydedilir. Sayfayı kapatsanız bile veriler kaybolmaz.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
