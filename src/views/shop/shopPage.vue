<template>
  <div class="shop-page">
    <Navbar />
    <main class="container my-5">
        
      <section class="featured-products mb-5">
        <div class="d-flex justify-content-between align-items-end mb-4 border-bottom pb-3">
          <div>
            <h2 class="section-title fw-bold text-dark mb-1">ផលិតផលលេចធ្លោ</h2>
            <p class="text-muted small mb-0">គ្រឿងអេឡិចត្រូនិកជំនាន់ថ្មីដែលទទួលបានការនិយមចូលចិត្តបំផុត</p>
          </div>
          <button class="btn btn-view-all btn-sm fw-semibold">មើលទាំងអស់ <i class="bi bi-chevron-right small"></i></button>
        </div>

        <div class="row g-4">
          <div class="col-6 col-md-4 col-lg-3" v-for="product in products" :key="product.id">
            <div class="card product-card h-100">
              
              <div class="card-img-wrapper position-relative">
                <div class="badge-tags position-absolute top-0 start-0 m-2 d-flex flex-column gap-1">
                  <span v-if="product.isBestseller" class="badge-custom bg-danger">Bestseller</span>
                  <span v-if="product.isSale" class="badge-custom bg-primary">Sale</span>
                </div>
                
                <img :src="product.image" class="product-img" :alt="product.title" @error="handleImageError">

                <button @click="addToCart(product)" class="btn btn-circle-cart-hover" title="ថែមក្នុងកន្ត្រក">
                  <i class="bi bi-cart-plus"></i>
                </button>
              </div>

              <div class="card-body p-3 d-flex flex-column bg-white">
                <span class="product-brand mb-1">{{ product.brand }}</span>
                <h5 class="product-title fw-semibold text-dark mb-2">{{ product.title }}</h5>
                
                <div class="d-flex align-items-center text-warning gap-1 mb-2" style="font-size: 0.8rem;">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <span class="text-muted fw-normal small ms-1">({{ product.reviews }})</span>
                </div>
                
                <div class="price-box mb-3">
                  <span class="current-price fw-bold text-dark">{{ product.price }}</span>
                  <span v-if="product.condition" class="old-price text-muted text-decoration-line-through ms-2 small">{{ product.condition }}</span>
                </div>

                <div class="mt-auto d-flex align-items-center justify-content-between">
                  <span class="stock-status text-success fw-medium">
                    <i class="bi bi-check-circle-fill me-1 small"></i>មានក្នុងស្តុក
                  </span>
                  
                  <button @click="viewDetails(product)" class="btn btn-details">
                    ព័ត៌មានលម្អិត
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </main>
    <Footer/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useauthStore } from '@/stores/auth'
import Navbar from '@/components/layout/Navbar.vue';
import Footer from '@/components/layout/Footer.vue';
import { useProductStore } from '@/stores/products';

const productsStore = useProductStore();
const auth = useauthStore(); 

const defaultImage = ref('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80')

const products = ref([
  { id: 1, title: 'iPhone 15 Pro', brand: 'Apple', price: 'BDT 119,900', condition: 'BDT 131,900', reviews: 1247, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', isBestseller: true, isSale: true },
  { id: 2, title: 'MacBook Pro 16-inch', brand: 'Apple', price: 'BDT 299,900', condition: '', reviews: 892, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80', isBestseller: false, isSale: false },
  { id: 3, title: 'Sony WH-1000XM5', brand: 'Sony', price: 'BDT 47,900', condition: 'BDT 53,900', reviews: 2156, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80', isBestseller: true, isSale: true }
])

onMounted( async ()  => {
  await productsStore.fetchProduct();
  if(productsStore.products && productsStore.products.length > 0) {
    products.value = productsStore.products.slice(0, 8); 
  }
})

const handleImageError = (event) => {
  event.target.src = defaultImage.value;
}

const addToCart = (product) => {
  console.log('បានបន្ថែមទៅក្នុងកន្ត្រក៖', product.title)
}

const viewDetails = (product) => {
  console.log('មើលព័ត៌មានលម្អិតនៃ៖', product.title)
}
</script>

<style scoped>
.shop-page {
  font-family: 'Kantumruuy Pro', sans-serif;
  background-color: #ffffff;
  min-height: 100vh;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111111;
}

.btn-view-all {
  color: #6c757d;
  background: transparent;
  border: none;
  font-size: 0.88rem;
}

/* =================================================== */
/* ផ្នែកស្ទីលកាតផលិតផល (Product Card Styles)              */
/* =================================================== */

.product-card {
  background: #ffffff;
  border: 1px solid #e5e7eb !important; 
  border-radius: 12px !important;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

/* ពេល Hover លើកាត គឺឡើងស្រមោលព្រាលៗពីក្រោម */
.product-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08); 
}

/* ប្រអប់ផ្ទុកដុំរូបភាព */
.card-img-wrapper {
  background-color: #f9fafb;
  aspect-ratio: 1.1 / 1; 
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
}

.product-img {
  max-height: 85%;
  max-width: 85%;
  object-fit: contain;
}

/* --------------------------------------------------- */
/* ប៊ូតុងរង្វង់កន្ត្រកខ្មៅ (នៅចំជ្រុងខាងក្រោមស្តាំនៃប្រអប់រូបភាព) */
/* --------------------------------------------------- */
.btn-circle-cart-hover {
  position: absolute;
  bottom: 10px;               /* ទីតាំងនៅកៀនជ្រុងខាងក្រោម */
  right: 10px;                /* ទីតាំងនៅកៀនជ្រុងខាងស្តាំ */
  background-color: #111111 !important;
  color: #ffffff !important;
  border: none !important;
  width: 38px;
  height: 38px;
  border-radius: 50% !important; /* រាងមូលក្រឡំ */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  cursor: pointer;
  z-index: 5;
  
  /* ស្ថានភាពដើម៖ លាក់ខ្លួន និងស្រុតចុះក្រោមបន្តិច */
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  
  /* ចលនាអណ្ដែតឡើង (Transition) */
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.3s;
}

/* ពេល Hover លើកាត -> ប៊ូតុងរង្វង់កន្ត្រកអណ្ដែតលេចចេញមកចំជ្រុង */
.product-card:hover .btn-circle-cart-hover {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* ពេលយក Mouse ទៅដាក់ចំពីលើប៊ូតុងរង្វង់កន្ត្រកផ្ទាល់ ឱ្យវារីកធំបន្តិច (Scale) */
.btn-circle-cart-hover:hover {
  transform: scale(1.12) !important;
  background-color: #000000 !important;
}

/* --------------------------------------------------- */
/* ប៊ូតុងចតុកោណកែងខាងក្រោម "ព័ត៌មានលម្អិត"                  */
/* --------------------------------------------------- */
.btn-details {
  background-color: #111111 !important; /* ពណ៌ខ្មៅដិត */
  color: #ffffff !important;
  border: none !important;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 6px 14px !important;
  border-radius: 6px !important; /* ជ្រុងមូលតិចៗ */
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease !important;
}

.btn-details:hover {
  background-color: #000000 !important; /* ពេល hover គឺដិតពណ៌ជាងមុនបន្តិច */
}

/* ស្ទីលព័ត៌មានអត្ថបទផ្សេងៗ */
.badge-custom { font-size: 0.68rem; font-weight: 600; padding: 3px 8px; border-radius: 4px; }
.product-brand { font-size: 0.78rem; color: #9ca3af; text-transform: uppercase; font-weight: 500; }
.product-title { font-size: 0.95rem; color: #111111; font-weight: 600; line-height: 1.4; }
.text-warning { color: #ffb800 !important; }
.current-price { font-size: 1.05rem; color: #111111; font-weight: 700; }
.old-price { font-size: 0.82rem; color: #9ca3af; }
.stock-status { font-size: 0.82rem; color: #10b981 !important; }

/* Responsive សម្រាប់ទូរស័ព្ទដៃ (បង្ហាញប៊ូតុងកន្ត្រកជានិច្ចព្រោះអត់មាន Hover) */
@media (max-width: 576px) {
  .btn-circle-cart-hover { opacity: 1; visibility: visible; transform: translateY(0); width: 32px; height: 32px; font-size: 1rem; bottom: 6px; right: 6px; }
  .product-title { font-size: 0.88rem; }
  .current-price { font-size: 0.92rem; }
  .btn-details { padding: 5px 10px !important; font-size: 0.75rem; }
}
</style>