<template>
    <div class="flex items-center justify-center">
        <button
            :disabled="page === 1"
            @click.prevent="$emit('previous', 'previous')"
            :class="{ 'cursor-not-allowed bg-opacity-50': page === 1 }"
            class="w-full flex items-center justify-center px-4 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
        >
            Previous
        </button>
        <button
            :disabled="resultsLength < perPage"
            :class="{ 'cursor-not-allowed bg-opacity-50': resultsLength < perPage }"
            @click.prevent="$emit('next', 'next')"
            class="w-full ml-4 flex items-center justify-center px-4 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
        >
            Next
        </button>
    </div>
</template>

<script>
export default {
    props: {
        page: {
            type: String,
            required: true
        },
        perPage: {
            type: String,
            required: true
        },
        resultsLength: {
            type: [String, Number],
            required: true
        }
    }
}
</script>
