// profile
import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from "@/API/api";
import { useauthStore } from './auth';
export const useProfileStore = defineStore('profile', () => {
    const profile = ref('');
    const imagePreview = ref("https://api-loukbontor.g2.ant.com.kh/storage/avatars/no_photo.jpg");
    const getProfile = async () => {
        const auth = useauthStore();
        if(auth.token){
            try {
                const response = await api.get("/api/me");
                profile.value = response.data;
                // imagePreview.value = (profile.value.avatar || "https://api-loukbontor.g2.ant.com.kh/storage/avatars/no_photo.jpg"); 
                imagePreview.value = (profile.value.avatar); 
                // imagePreview.value =+ "?t=" + new Date().getTime();
                // console.log(imagePreview);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        }else{
            return imagePreview;
        }
    };
    const updateImage = (newUrl) => {
        imagePreview.value = newUrl + "?t=" + new Date().getTime();
    };
    return { profile, imagePreview, getProfile, updateImage };
});