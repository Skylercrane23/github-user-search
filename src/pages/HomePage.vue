<script>
import { getUserByQuery } from '../api/userSearch'

export default {
    name: 'HomePage',
    data() {
        return {
            userQuery: ''
        }
    },
    methods: {
        handleSearchSubmit() {
            getUserByQuery(this.userQuery)
                .then((response) => {
                    console.log(response.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
}
</script>

<template>
    <div class="">
        <!-- Heading/Search Bar -->
        <section class="py-12 lg:py-16 bg-primary">
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
                    <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                        <button
                            type="submit"
                            class="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </section>

        <!-- Results -->

        <!-- No Results -->
        <div class="grid grid-cols-3 max-w-5xl mx-auto z-10 px-4 sm:px-6 lg:px-8 mt-16">
            <div class="rounded-lg h-64 bg-primary border-2 border-secondary text-white px-4 py-4 sm:px-6 lg:px-8">
                Card
            </div>
        </div>
    </div>
</template>
