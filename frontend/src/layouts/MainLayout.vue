<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    @click="toggleLeftDrawer"
                    icon="menu"
                    aria-label="Menu"
                />
                <q-toolbar-title>
                    物流管控中心
                </q-toolbar-title>
                <q-space/>
                <div class="q-gutter-sm row items-center no-wrap">
                    <q-btn round dense flat color="white" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
                           @click="$q.fullscreen.toggle()"
                           v-if="$q.screen.gt.sm">
                    </q-btn>
                    <q-btn round flat>
                        <q-avatar size="26px">
                            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                        </q-avatar>
                    </q-btn>
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            class="bg-primary text-white"
        >
            <q-list>
<!--                <q-item to="/" active-class="q-item-no-link-highlighting">-->
<!--                    <q-item-section avatar>-->
<!--                        <q-icon name="dashboard"/>-->
<!--                    </q-item-section>-->
<!--                    <q-item-section>-->
<!--                        <q-item-label>首頁</q-item-label>-->
<!--                    </q-item-section>-->
<!--                </q-item>-->
                <q-expansion-item
                    icon="pages"
                    label="物流中心"
                >
                    <q-list class="q-pl-lg">
                        <q-item to="/shipping/list" active-class="q-item-no-link-highlighting">
                            <q-item-section avatar>
                                <q-icon name="dashboard"/>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>物流清單</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-expansion-item>
            </q-list>
        </q-drawer>

        <q-page-container class="bg-grey-2">
            <router-view/>
        </q-page-container>
    </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import Messages from "./Messages";

import {defineComponent, ref} from 'vue'

export default defineComponent({
    name: 'MainLayout',

    components: {
        EssentialLink,
        Messages
    },

    setup() {
        const leftDrawerOpen = ref(false)

        return {
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value
            }
        }
    }
})
</script>
