<template>
    <div class="">
        <!-- Heading/Search Bar -->
        <section class="pt-32 py-12 lg:pt-32 lg:py-16 bg-primary">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="inline text-3xl font-extrabold tracking-tight text-white sm:block sm:text-4xl">
                    Github User Search
                </h2>
                <p class="mt-2 text-xl font-extrabold tracking-tight text-secondary sm:block sm:text-2xl">
                    Find Github users by their username.
                </p>
                <form @submit.prevent="handleSearchSubmit" class="mt-8 sm:flex">
                    <label for="username" class="sr-only">Username</label>
                    <input
                        v-model="userQuery"
                        id="username"
                        name="username"
                        type="text"
                        required
                        class="form-input w-full px-5 py-3 placeholder-gray-500 focus:ring-secondary focus:border-secondary sm:max-w-xs border-gray-300 rounded-md"
                        placeholder="Search by username"
                    />
                    <div class="mt-3 sm:mt-0 sm:flex-shrink-0 flex items-center">
                        <button
                            type="submit"
                            class="w-full sm:ml-3 flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                        >
                            Search
                        </button>
                        <button
                            @click.prevent="resetForm"
                            class="w-full ml-3 flex items-center justify-center px-5 py-3 border-2 border-secondary text-base font-medium rounded-md text-secondary bg-primary hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </section>

        <!-- Results -->
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-12 lg:pb-16">
            <div v-if="loading">
                <LoadingIcon />
            </div>
            <div v-else-if="results && results.items.length > 0">
                <div class="flex items-center justify-between mb-6">
                    <div class="text-gray-400 text-sm">Showing {{ perPage }} of {{ results.total_count }} results</div>
                    <PaginationButtons
                        :page="page"
                        :per-page="per_page"
                        :results-length="results.items.length"
                        @next="handleSearchPagination"
                        @previous="handleSearchPagination"
                    />
                </div>
                <ul class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <UserCard v-for="(user, index) in results.items" :data-index="index" :user="user" :key="user" />
                </ul>
                <div v-if="results.items.length > 3" class="w-auto mt-6 ml-auto flex items-center justify-end">
                    <PaginationButtons
                        :page="page"
                        :per-page="per_page"
                        :results-length="results.items.length"
                        @next="handleSearchPagination"
                        @previous="handleSearchPagination"
                    />
                </div>
            </div>
            <div v-else class="w-full mx-auto flex items-center justify-center">
                <div
                    v-if="results && results.items.length <= 0"
                    class="border-2 border-secondary py-6 px-12 text-center rounded-lg inline-block"
                >
                    <h3 class="text-2xl font-bold text-white">No Users Found</h3>
                    <p class="text-gray-400">Please try entering a valid Github username and press search.</p>
                </div>
                <div v-else class="border-2 border-secondary py-6 px-12 text-center rounded-lg inline-block">
                    <h3 class="text-2xl font-bold text-white">Search by Github username.</h3>
                    <p class="text-gray-400">Please try entering a valid Github username and press search.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getUserByQuery } from '../api/userSearch'

import UserCard from '../components/UserCard.vue'
import LoadingIcon from '../components/common/LoadingIcon.vue'
import PaginationButtons from '../components/PaginationButtons.vue'

export default {
    name: 'HomePage',
    components: {
        UserCard,
        LoadingIcon,
        PaginationButtons
    },
    data() {
        return {
            userQuery: '',
            loading: false,
            results: null,
            page: 1,
            per_page: 18
        }
    },
    computed: {
        perPage() {
            return this.results.total_count > this.per_page ? this.per_page : this.results.total_count
        }
    },
    methods: {
        handleGetUserByQuery() {
            getUserByQuery({ query: this.userQuery, page: this.page, per_page: this.per_page })
                .then((response) => {
                    this.results = response.data
                    this.loading = false
                })
                .catch((err) => {
                    // Handle Error Here
                    console.log(err)
                })
        },
        handleSearchSubmit() {
            this.loading = true
            // Similate slow api call
            setTimeout(() => {
                this.handleGetUserByQuery().then(() => {
                    this.loading = false
                })
            }, 1000)
        },
        handleSearchPagination(direction) {
            if (direction === 'next') {
                this.page++
            } else {
                this.page--
            }
            this.handleGetUserByQuery()
        },
        resetForm() {
            this.userQuery = ''
            this.loading = false
            this.results = null
            this.page = 1
            this.per_page = 18
        }
    }
}
</script>
