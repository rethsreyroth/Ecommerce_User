<!-- <template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div class="container-fluid d-flex justify-content-between gap-5">
            <a class="navbar-brand me-4" href="#">ពិភពទំនិញ</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                
                <div class="search-wrapper col-12 col-lg-3 my-2 my-lg-0 me-3">
                    <i class="bi bi-search"></i>
                    <input class="form-control" type="search" placeholder="ស្វែងរក" aria-label="Search">
                </div>

                <div class="d-flex gap-3 my-2 my-lg-0 me-auto">
                    <router-link to="/" class="btn-nav-outline"><i class="bi bi-cart"></i> ទិញ</router-link>
                    <router-link to="/" class="btn-nav-outline"><i class="bi bi-shop"></i> លក់</router-link>
                </div>

                <ul class="navbar-nav align-items-center gap-3">
                    <li class="nav-item"><router-link to="/" class="nav-link text-dark">ទំព័រដើម</router-link></li>
                    <li class="nav-item"><router-link to="/about" class="nav-link text-dark">អំពីយើង</router-link></li>
                    <li class="nav-item"><router-link to="/products" class="nav-link text-dark">ផលិតផល</router-link></li>
                    <li class="nav-item me-2"><router-link to="/contactUS" class="nav-link text-dark">ទំនាក់ទំនង</router-link></li>
                    <li class="nav-item d-flex gap-3 ms-2">
                        <router-link to="/" class="text-dark fs-5"><i class="bi bi-cart"></i></router-link>
                        <router-link to="/" class="text-dark fs-5"><i class="bi bi-person"></i></router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    
</template>  -->

<template>
        <nav class="navbar navbar-expand-lg top-navbar sticky-top py-3">
        <div class="container-fluid custom-padding-container d-flex align-items-center justify-content-between flex-nowrap">
            
            <div class="d-flex align-items-center gap-3">
                <router-link to="/" class="navbar-brand text-dark m-0">ពិភពទំនិញ</router-link>
            </div>

            <div class="search-container-wrapper">
                <div class="search-wrapper">
                    <i class="bi bi-search"></i>
                    <input type="text" class="search-input" placeholder="ស្វែងរក" v-model="search">
                </div>
            </div>

            <div class="extra-nav-buttons d-flex gap-2">
                <router-link to="/" class="btn-nav-action"><i class="bi bi-cart"></i> ទិញ</router-link>
                <router-link to="/" class="btn-nav-action"><i class="bi bi-shop"></i> លក់</router-link>
            </div>

            <div class="collapse navbar-collapse navbar-nav-links flex-grow-0" id="navbarNav">
                <ul class="navbar-nav gap-3 align-items-center">
                    <li class="nav-item"><router-link to="/" class="nav-link">ទំព័រដើម</router-link></li>
                    <li class="nav-item"><router-link to="/" class="nav-link">អំពីយើង</router-link></li>
                    <li class="nav-item"><router-link to="/" class="nav-link">ផលិតផល</router-link></li>
                    <li class="nav-item"><router-link to="/" class="nav-link">ទំនាក់ទំនង</router-link></li>
                    <li class="nav-item ms-2"><router-link to="/" class="nav-link p-1"><i class="bi bi-cart3 fs-5"></i></router-link></li>
                    <li class="nav-item"><router-link to="/" class="nav-link p-1"><i class="bi bi-person fs-5"></i></router-link></li>
                </ul>
            </div>

        </div>
    </nav>

    <div class="aeon-bottom-nav">
        <router-link to="/" class="nav-item">
            <i class="bi bi-house-door-fill"></i>
            <span>ទំព័រដើម</span>
        </router-link>
        <router-link to="/" class="nav-item">
            <i class="bi bi-grid"></i>
            <span>ប្រភេទ</span>
        </router-link>
        <router-link to="/" class="nav-item">
            <i class="bi bi-cart3"></i>
            <span>ទិញ</span>
        </router-link>
        <router-link to="/" class="nav-item">
            <i class="bi bi-shop"></i>
            <span>លក់</span>
        </router-link>

        <router-link to="/" class="nav-item">
            <i class="bi bi-cart3 fs-5"></i>
            <span>កន្ត្រក</span>
        </router-link>
        <router-link to="/" class="nav-item">
            <i class="bi bi-person"></i>
            <span>គណនី</span>
        </router-link>
    </div>
    
</template>

<script setup>
    document.addEventListener("DOMContentLoaded", function () {
        const currentUrl = window.location.pathname.split("/").pop();

        // ១. ផ្តល់ពណ៌ទៅឱ្យ Desktop Navbar
        const desktopLinks = document.querySelectorAll('.navbar-nav .nav-link');
        desktopLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (currentUrl === linkHref || (currentUrl === "" && linkHref === "index.html")) {
                link.classList.add('active-page');
            } else {
                link.classList.remove('active-page');
            }
        });

        // ២. ផ្តល់ពណ៌ទៅឱ្យ Mobile Bottom Navbar
        const mobileTabs = document.querySelectorAll('.aeon-bottom-nav .nav-item');
        mobileTabs.forEach(tab => {
            const tabHref = tab.getAttribute('href');
            if (currentUrl === tabHref || (currentUrl === "" && tabHref === "index.html")) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    });

    import { useProductStore } from '@/stores/products';
    import { onMounted, ref, watch } from 'vue';
    let productStore = useProductStore();
    let search = ref('');
    console.log(search.value);

    watch(search, async(value) => {
        console.log(search.value);
        await productStore.fetchProduct({search : value});
    })


    onMounted(async () => {
    await productStore.fetchProduct();
    })
</script>