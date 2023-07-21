<template>
    <div class="px-4 lg:px-32 py-10">
        <h1 class="text-emerald-400 text-4xl font-bold uppercase font-oswald">Basic Setup for All EB Project with nuxt 3</h1>
        <div class="mt-4">
            <p class="uppercase font-bold font-oswald text-xl pb-2 text-sky-600">test nuxt icon</p>
            <div class="flex gap-4 flex-wrap pt-2">
                <div>
                    <Icon name="carbon:moon" class="font-semibold text-4xl text-purple-500" />
                </div>
                <div>
                    <Icon name="carbon:bee" class="font-semibold text-4xl text-amber-500" />
                </div>
                <div>
                    <Icon name="carbon:rain-heavy" class="font-semibold text-4xl text-sky-500" />
                </div>
                <div>
                    <Icon name="carbon:bee-bat" class="font-semibold text-4xl text-indigo-500" />
                </div>
                <div>
                    <Icon name="carbon:sun" class="font-semibold text-4xl text-yellow-500" />
                </div>
            </div>

        </div>
        <div class="mt-4 border-t pt-2">
            <p class="uppercase font-bold font-oswald text-xl pb-2 text-sky-600">test formkit</p>
            <FormKit
                v-model="value"
                type="range"
                label="Volume"
                min="0"
                max="11"
                help="Select your volume level."
                />
                <p class="-mt-3 mb-2">
                    {{ value }}
                </p>
                <FormKit
                    type="time"
                    label="Time"
                    value="23:15"
                    help="jam piro muleh kowe le?"
                />
                <FormKit
                    type="text"
                    label="Your username"
                    placeholder="you nameeeeee"
                    help="Pick a username people will remember!"
                />
        </div>

        <div class="mt-4 border-t pt-2">
            <p class="uppercase font-bold font-oswald text-xl pb-2 text-sky-600">text axios and fecth data</p>
            <div class="p-3 border-2 shadow-sm rounded w-96" :class="loadingIcon ? 'border-red-500' : ''">
                <p v-if="loadingIcon" class="text-center"><Icon name="carbon:circle-packing" class="font-semibold text-6xl text-red-500" /></p>
                <ul v-for="(item, index) in users" :key="index">
                    <li>
                       {{ index+1 }}. {{ item.name }}
                    </li>
                </ul>
            </div>
        </div>

        <div class="mt-4 border-t pt-2 flex flex-col gap-1">
            <h1 class="text-5xl font-semibold uppercase font-oswald text-rose-500">
                test font oswald for heading
            </h1>
            <h3 class="text-5xl font-semibold font-oswald text-rose-500">
                test font oswald for heading
            </h3>
            <h3 class="text-3xl font-semibold uppercase font-oswald text-rose-500">
                test font oswald for heading
            </h3>
            <h3 class="text-3xl font-semibold font-oswald text-rose-500">
                test font oswald for heading
            </h3>
            <h3 class="text-xl">
                test font Montserrat for body
            </h3>
            <h3 class="text-lg">
                test font Montserrat for body
            </h3>
            <h3 class="text-base">
                test font Montserrat for body
            </h3>
            <h3 class="text-xl font-tektur text-teal-500">
                test font tektur for variation
            </h3>
            <h3 class="text-lg font-tektur text-teal-500">
                test font tektur for variation
            </h3>
            <h3 class="text-base font-tektur text-teal-500">
                test font tektur for variation
            </h3>
        </div>
        
        <div class="mt-4 border-t pt-2">
            <p class="uppercase font-bold mb-3 font-oswald text-xl pb-2 text-sky-600">Test Headless UI</p>
            <div class="flex gap-x-2 items-center">
                <HeadlessSwitch
                    v-model="enabled"
                    :class="enabled ? 'bg-blue-600' : 'bg-gray-200'"
                    class="relative inline-flex h-6 w-11 items-center rounded-full"
                >
                    <span class="sr-only">Enable notifications</span>
                    <span
                    :class="enabled ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition"
                    />
                </HeadlessSwitch>

                <ClientOnly>
                    <HeadlessTransitionRoot
                        :show="enabled"
                        enter="transition-opacity duration-200"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="transition-opacity duration-400"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                    >
                        <span>
                            <Icon name="carbon:touch-1-filled" class="text-5xl font-bold text-sky-500" />
                        </span>
                    </HeadlessTransitionRoot>
                </ClientOnly>
            </div>
            
            <div class="py-4">
                <button :class="isOpen ? 'bg-purple-400' : 'bg-emerald-400'" class="p-4" @click="setIsOpen(true)">
                    tes Modal
                </button>
            </div>

        </div>
        <ClientOnly>
            <HeadlessDialog :open="isOpen" @close="setIsOpen" class="relative z-50">
                <!-- The backdrop, rendered as a fixed sibling to the panel container -->
                <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

                <!-- Full-screen container to center the panel -->
                <div class="fixed inset-0 flex items-center justify-center p-4">
                <!-- The actual dialog panel -->
                <HeadlessDialogPanel class="w-full max-w-sm rounded bg-white">
                    <HeadlessDialogTitle>Complete your order</HeadlessDialogTitle>
                    <button class="bg-red-300 p-4" @click="setIsOpen(false)">
                        get outttt
                    </button>
                    <!-- ... -->
                </HeadlessDialogPanel>
                </div>
            </HeadlessDialog>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';

const value = ref()
const users = ref()

const enabled = ref(false)

const loadingIcon = ref(false)
const isOpen = ref(false)

function setIsOpen(value : any) {
    isOpen.value = value
}

onMounted( async () => {
    await fetchUser()
})

const fetchUser = async () => {
    loadingIcon.value = true
    await axios.get('https://jsonplaceholder.typicode.com/users', {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
    })
    .then(res => {
        users.value = res.data
        loadingIcon.value = false
    })
}

</script>

<style scoped>

</style>