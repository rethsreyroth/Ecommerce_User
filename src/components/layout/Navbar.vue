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
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div class="container-fluid">
            <a class="navbar-brand me-4" href="#">ពិភពទំនិញ</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                
                <div class="search-wrapper col-12 col-lg-3 my-2 my-lg-0 me-3">
                    <i class="bi bi-search"></i>
                    <input class="form-control" type="search" placeholder="ស្វែងរក" aria-label="Search">
                </div>

                <div class="d-flex gap-2 my-2 my-lg-0 me-auto">
                    <a href="#" class="btn-nav-outline"><i class="bi bi-cart"></i> ចង់ទិញ</a>
                    <a href="#" class="btn-nav-outline"><i class="bi bi-shop"></i> ចង់លក់</a>
                </div>

                <ul class="navbar-nav align-items-center gap-3">
                    <li class="nav-item"><a class="nav-link text-dark" href="#">ទំព័រដើម</a></li>
                    <li class="nav-item"><a class="nav-link text-dark" href="#">អំពីយើង</a></li>
                    <li class="nav-item"><a class="nav-link text-dark" href="#">ផលិតផល</a></li>
                    <li class="nav-item me-2"><a class="nav-link text-dark" href="#">ទំនាក់ទំនង</a></li>
                    <li class="nav-item d-flex gap-3 ms-2">
                        <a href="#" class="text-dark fs-5"><i class="bi bi-cart"></i></a>
                        
                        
                        <router-link to="/profile" class="text-dark fs-5"><i class="bi bi-person"></i></router-link>
                        
                        <!-- <a  class="text-dark fs-5" @click="handleLogout"><i class="bi bi-box-arrow-right"></i></a> -->
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
