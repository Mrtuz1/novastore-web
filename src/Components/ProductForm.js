import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../Interfaces/Product';

const emptyForm = {
  name: '',
  category: '',
  price: '',
  stock: '',
  description: '',
};

const ProductForm = ({ onSave, editingProduct, onCancelEdit }) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // Düzenleme modunda formu doldur
  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        category: editingProduct.category,
        price: editingProduct.price,
        stock: editingProduct.stock,
        description: editingProduct.description || '',
      });
      setErrors({});
    }
  }, [editingProduct]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Ürün adı zorunludur.';
    if (!form.category) newErrors.category = 'Kategori seçiniz.';
    if (!form.price || isNaN(form.price) || Number(form.price) < 0)
      newErrors.price = 'Geçerli bir fiyat giriniz.';
    if (!form.stock || isNaN(form.stock) || Number(form.stock) < 0)
      newErrors.stock = 'Geçerli bir stok miktarı giriniz.';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const productData = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    onSave(productData);
    setForm(emptyForm);
    setErrors({});
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setErrors({});
    onCancelEdit();
  };

  const isEditing = !!editingProduct;

  return (
    <div className="card border-0 shadow" style={{ borderRadius: '16px' }}>
      <div className="card-header text-white fw-bold fs-5 py-3" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '16px 16px 0 0' }}>
        <i className={`bi ${isEditing ? 'bi-pencil-square' : 'bi-plus-circle'} me-2`}></i>
        {isEditing ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
      </div>

      <div className="card-body p-4">
        <form onSubmit={handleSubmit} noValidate>
          {/* Ürün Adı */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-box-seam me-1 text-primary"></i>Ürün Adı *
            </label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Örn: Samsung Galaxy S24"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Kategori */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-tags me-1 text-primary"></i>Kategori *
            </label>
            <select
              name="category"
              className={`form-select ${errors.category ? 'is-invalid' : ''}`}
              value={form.category}
              onChange={handleChange}
            >
              <option value="">-- Kategori Seçin --</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <div className="invalid-feedback">{errors.category}</div>}
          </div>

          {/* Fiyat + Stok */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">
                <i className="bi bi-currency-dollar me-1 text-success"></i>Fiyat (₺) *
              </label>
              <div className="input-group">
                <span className="input-group-text">₺</span>
                <input
                  type="number"
                  name="price"
                  className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                />
                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">
                <i className="bi bi-stack me-1 text-warning"></i>Stok Adedi *
              </label>
              <input
                type="number"
                name="stock"
                className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                placeholder="0"
                min="0"
                value={form.stock}
                onChange={handleChange}
              />
              {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
            </div>
          </div>

          {/* Açıklama */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              <i className="bi bi-card-text me-1 text-secondary"></i>Açıklama
            </label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              placeholder="Ürün hakkında kısa bir açıklama..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Butonlar */}
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary flex-fill fw-semibold">
              <i className={`bi ${isEditing ? 'bi-check-circle' : 'bi-plus-lg'} me-2`}></i>
              {isEditing ? 'Güncelle' : 'Ürün Ekle'}
            </button>
            {isEditing && (
              <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
                <i className="bi bi-x-circle me-1"></i>İptal
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
