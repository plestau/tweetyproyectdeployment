<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { usePage } from '@inertiajs/inertia-vue3'
import { defineProps } from 'vue'
import TweetyPieHomeLayout from '@/Layouts/TweetyPieHomeLayout.vue'
import Post from '@/Components/Post.vue'

let { posts: postsProp, recentUsers } = defineProps({
    posts: Object,
    recentUsers: Array
})

let posts = ref(postsProp)
let page = ref(posts.value.current_page)
let isLastPage = ref(false)


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
