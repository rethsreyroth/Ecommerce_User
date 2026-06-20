<template>
    <main class="container-fluid custom-padding-container py-5 mt-0" style="background-color: #ffffff !important;">
        <div class="mb-1">
            <h2 class="section-title text-dark">ផលិតផល</h2>
        </div>

        <div class="mb-2 d-flex justify-content-between">
            <div class="dropdown">
                <select class="border-0 p-1 exact-btn-action fs-6" @change="handleCategoryChange">
                    <option value="">ផលិតផលទាំងអស់</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                        {{ cat.name }}
                    </option>
                </select>
            </div>

            <div class="search-input-wrapper">
                <input type="text" v-model="search" class="form-control form-control-sm" placeholder="🔍 ស្វែងរកផលិតផល...">
            </div>
        </div>

        <div v-if="displayedProducts && displayedProducts.length === 0" class="text-center my-5 py-5 text-muted">
            <i class="bi bi-box-seam fs-1 d-block mb-3"></i>
            មិនមានផលិតផលណាត្រូវនឹងការស្វែងរករបស់អ្នកឡើយ។
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            <div class="col" v-for="product in displayedProducts" :key="product.id">
                <div class="product-card-exact text-decoration-none">
                    <div class="badge-container"><span class="badge-red-exact">{{product.condition}}</span></div>
                    
                    <router-link class="exact-img-wrapper text-decoration-none" :to="`/detailpage/${product.id}`">
                        <img :src="product.image" alt="Smart Watch">
                    </router-link>

                    <router-link class="card-body-content d-flex justify-content-between text-decoration-none" :to="`/detailpage/${product.id}`">
                        <div class="exact-info-title">{{product.title}}</div>
                        <div class="exact-info-brand text-start">{{product.description}}</div>
                        <div class="exact-price-box">
                            <span class="exact-price-current">$ {{product.price}}</span>
                        </div>
                    </router-link>
                    
                    <div class="exact-card-footer d-flex justify-content-between">
                        <!-- <span class="exact-stock-text">មានក្នុងស្តុក</span> -->
                        <button @click="handleFormSubmit(product)" class="exact-btn-action">បន្ថែមក្នុងកន្រ្តក់</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center mt-4" v-if="visibleCount < filteredProducts.length">
            <button @click="loadMore" class="exact-btn-action">មើលបន្ថែម</button>
        </div>
    </main>
    
</template>

<script setup>
    import { onMounted, ref, computed } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useProductStore } from '@/stores/products';
    import { useCart } from '@/stores/addToCart';

    const productStore = useProductStore();
    const { products, categories } = storeToRefs(productStore);

    onMounted(async () => {
        // ទាញយកទិន្នន័យទាំងពីរមកទុកម្តងឱ្យហើយ
        await productStore.fetchProduct();
        await productStore.fetchCategories();
    });

    const search = ref('');
    const selectCategory = ref(null);

    // គ្រប់គ្រងការច្រោះ (Search + Category) ក្នុងពេលតែមួយ
    const filteredProducts = computed(() => {
        let result = products.value;

        if (search.value) {
            const query = search.value.toLowerCase();
            result = result.filter(p => 
                p.title?.toLowerCase().includes(query) || 
                p.description?.toLowerCase().includes(query)
            );
        }

        if (selectCategory.value) {
            result = result.filter(p => 
                p.categories?.some(cat => cat.id === selectCategory.value)
            );
        }
        return result;
    });

    const visibleCount = ref(12);
    const displayedProducts = computed(() => {
        return filteredProducts.value.slice(0, visibleCount.value);
    });

    const loadMore = () => { visibleCount.value += 12; };

    // មុខងារជ្រើសរើស Category
    const handleCategoryChange = (event) => {
        const val = event.target.value;
        selectCategory.value = val === "" ? null : Number(val);
        visibleCount.value = 12; // Reset ចំនួនពេលប្តូរ Category
    };
</script>


<style>
    .product-card-exact .btn-cart{
        display: inline-block;
        text-align: center;
        color: white;
        font-size: 20px;
        background-color: #181616;
        border-radius: 10px;
        padding: 5px 10px;
        position: absolute;
        top: 50px;
        left: 82%;
        opacity: 0;
        transition: 0.8s;
    }
    .product-card-exact:hover .btn-cart{
        opacity: 1;
        top: 16px;
    }
    .product-card-exact .btn-cart:hover{
        color: black;
        background-color: white;
        box-shadow: 0px 0px 5px #2768f4;
    }
</style>