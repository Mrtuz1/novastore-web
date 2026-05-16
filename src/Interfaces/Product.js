// Ürün modeli - Interface tanımı
// Her ürün bu yapıya sahip olacak

const ProductInterface = {
  id: null,           // number - benzersiz kimlik
  name: '',           // string - ürün adı
  category: '',       // string - kategori
  price: 0,           // number - fiyat (TL)
  stock: 0,           // number - stok adedi
  description: '',    // string - açıklama
  createdAt: '',      // string - oluşturulma tarihi
};

export const CATEGORIES = [
  'Elektronik',
  'Giyim',
  'Kitap',
  'Kozmetik',
  'Ev ve Yaşam',
  'Spor',
  'Oyuncak',
  'Diğer',
];

export default ProductInterface;
