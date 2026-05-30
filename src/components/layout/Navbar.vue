<style scoped>
.modal-overlay,
.modal-container,
.modal-header,
.modal-body,
.modal-footer,
.btn-cancel,
.btn-confirm {
    font-family: "Kantumruy Pro", sans-serif;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
}

.modal-container {
    background-color: white;
    border-radius: 12px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    animation: slideUp 0.3s ease;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
}

.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #6b7280;
    transition: color 0.2s;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-btn:hover {
    color: #111827;
}

.modal-body {
    padding: 24px;
}

.modal-body p {
    margin: 0;
    font-size: 16px;
    color: #374151;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 20px 24px;
    border-top: 1px solid #e5e7eb;
}

.btn-cancel,
.btn-confirm {
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
}

.btn-cancel {
    background-color: #f3f4f6;
    color: #374151;
}

.btn-cancel:hover {
    background-color: #e5e7eb;
}

.btn-confirm {
    background-color: #ef4444;
    color: white;
}

.btn-confirm:hover {
    background-color: #dc2626;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Optional: Add a subtle scale effect when clicking the logout icon */
a {
    display: inline-block;
    transition: transform 0.2s;
}

a:hover {
    transform: scale(1.1);
}
</style>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
        <div class="container">

            <!-- Logo -->
            <router-link to="/" class="navbar-brand fw-bold fs-4 text-primary">
                ពិភពទំនិញ
            </router-link>


            <!-- Navbar -->
            <div class="collapse navbar-collapse" id="navbarNav">

                <!-- Buy / Sell -->
                <div class="d-flex gap-2 my-3 my-lg-0">

                    <router-link to="/" class="btn btn-primary rounded-pill px-4">
                        <i class="bi bi-cart me-1"></i>
                        ចង់ទិញ
                    </router-link>

                    <router-link to="/sell" class="btn btn-outline-primary rounded-pill px-4">
                        <i class="bi bi-shop me-1"></i>
                        ចង់លក់
                    </router-link>

                </div>

                <!-- Menu -->
                <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-3 mt-3 mt-lg-0">

                    <li class="nav-item">
                        <router-link to="/" class="nav-link">
                            ទំព័រដើម
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/about" class="nav-link">
                            អំពីយើង
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/contact" class="nav-link">
                            ទំនាក់ទំនង
                        </router-link>
                    </li>

                    <!-- Right Side -->
                    <li class="nav-item d-flex align-items-center gap-2 ms-lg-3">

                        <!-- Cart -->
                        <router-link to="/cart" class="icon-link">
                            <i class="bi bi-cart3"></i>
                        </router-link>

                        <!-- Wishlist -->
                        <router-link to="/wishlist" class="icon-link">
                            <i class="bi bi-heart"></i>
                        </router-link>

                        <router-link v-if="auth.token" to="/profile" class="icon-link">
                            <i class="bi bi-person-circle"></i>
                        </router-link>
                        
                        <!-- Login -->
                        <router-link v-else to="/login" class="btn btn-outline-primary rounded-pill px-4">
                            Login
                        </router-link>
                        <a class="text-dark fs-5" @click="handleLogout" style="cursor: pointer;">
                            <i class="bi bi-box-arrow-right"></i>
                        </a>
                        
                        <!-- Logout Confirmation Modal -->
                        <div v-if="showLogoutModal" class="modal-overlay" @click.self="cancelLogout">
                            <div class="modal-container">
                                <div class="modal-header">
                                    <h3>ចាកចេញពីគណនី</h3>
                                    <button class="close-btn" @click="cancelLogout">&times;</button>
                                </div>
                                <div class="modal-body">
                                    <p>តើអ្នកពិតជាចង់ចាកចេញពីកម្មវិធីមែនទេ?</p>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn-cancel" @click="cancelLogout">បោះបង់</button>
                                    <button class="btn-confirm" @click="confirmLogout">ចាកចេញ</button>
                                </div>
                            </div>
                        </div>
                         
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useauthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const auth = useauthStore();
const router = useRouter();
const showLogoutModal = ref(false);

const handleLogout = () => {
    showLogoutModal.value = true;
}

const confirmLogout = () => {
    auth.Logout();
    showLogoutModal.value = false;
    router.push('/login');
}

const cancelLogout = () => {
    showLogoutModal.value = false;
}
// const handleLogout = () => {
//     auth.Logout()
//     alert('are you sure to log out ?')
//     router.push('/login')
// }
</script>
