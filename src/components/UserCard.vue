<template>
    <li class="bg-primary hover:bg-secondary hover:bg-opacity-10 border-2 border-secondary rounded-lg">
        <a
            :href="user.html_url"
            target="_blank"
            class="text-center py-10 px-6 xl:px-10 flex items-center justify-center"
        >
            <div class="space-y-6 xl:space-y-10 max-w-full">
                <img class="mx-auto h-40 w-40 rounded-full border-2 border-secondary" :src="user.avatar_url" alt="" />
                <p class="text-white font-bold text-2xl leading-relaxed truncate break-word">{{ user.login }}</p>
            </div>
        </a>
    </li>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    }
}
</script>
