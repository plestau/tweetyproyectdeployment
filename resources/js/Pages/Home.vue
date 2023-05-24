<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { usePage } from '@inertiajs/inertia-vue3'
import { defineProps } from '@vue/runtime-core'
import TweetyPieHomeLayout from '@/Layouts/TweetyPieHomeLayout.vue'
import Post from '@/components/Post.vue'

let { posts: postsProp, recentUsers } = defineProps({
    posts: Object,
    recentUsers: Array
})

let posts = ref(postsProp)
let page = ref(posts.value.current_page)
let isLastPage = ref(false)

onMounted(() => {
    if (page.value >= posts.value.last_page) {
        isLastPage.value = true
    }
})

watch(page, async (newPage, oldPage) => {
    if (newPage > oldPage && !isLastPage.value) {
        const response = await axios.get(`/?page=${page}&json=true`, { headers: { 'Accept': 'application/json' }})
        if (response.data) {
            console.log(response.data)
            console.log(response.data.data)
            if (response.data && Array.isArray(response.data.data)) {
                posts.value.data = [...posts.value.data, ...response.data.data];
            } else {
                console.log('response.data.data is not an array');
            }

            if (Array.isArray(response.data.data)) {
                posts.value.data.push(...response.data.data)
                if (response.data.current_page >= response.data.last_page) {
                    isLastPage.value = true
                }
            }
        }
    }
})

function loadMorePosts() {
    if (!isLastPage.value) {
        page.value++
    }
}

const observer = ref(null)
const postsContainer = ref(null)

onMounted(() => {
    observer.value = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            loadMorePosts()
        }
    }, { threshold: 0.5 })

    observer.value.observe(postsContainer.value)
})

onUnmounted(() => {
    if (observer.value) {
        observer.value.disconnect()
    }
})
</script>

<template>
    <TweetyPieHomeLayout>
        <div class="text-white" ref="postsContainer">
            <div class="flex" v-for="post in posts.data" :key="post.id">
                <Post :post="post" />
            </div>
            <div v-if="!isLastPage">
                Cargando más posts...
            </div>
        </div>
    </TweetyPieHomeLayout>
</template>
