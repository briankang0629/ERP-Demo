<template>
    <q-page class="q-pa-sm bg-white">
        <q-card>
            <q-card-section>
                <div class="text-h6 text-grey-8">
                    編輯物流單
                </div>
            </q-card-section>
            <q-separator/>
            <q-card-section>
                <div class="row">
                    <div class="col-12">
                        <q-item>
                            <q-input dense autogrow outlined v-model="shipping.order_number" class="full-width"
                                     label="訂單編號"/>
                        </q-item>
                    </div>
                    <div class="col-12">
                        <q-item>
                            <q-input dense autogrow outlined v-model="shipping.content" class="full-width"
                                     label="訂單內容"/>
                        </q-item>
                    </div>
                    <div class="col-12">
                        <q-item>
                            <div style="min-width: 300px">
                                <q-select
                                    v-model="shipping.shipping_type"
                                    :options="shipping_type"
                                    label="請選擇物流方式"
                                    option-value="id"
                                    option-label="name"
                                    emit-value
                                    map-options
                                />
                            </div>
                        </q-item>
                    </div>
                    <div class="col-12">
                        <q-item>
                            <q-date
                                v-model="shipping.shipping_date"
                                title="出貨日期"
                                subtitle="請選擇出貨日期"
                                mask="YYYY-MM-DD"
                            />
                        </q-item>
                    </div>
                </div>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn :to="{ name: 'shipping_list'}" label="返回" class="text-capitalize q-ma-sm" color="pink-6"/>
                <q-btn label="儲存" class="text-capitalize q-ma-sm" color="green-6" @click="save()"/>
            </q-card-actions>
        </q-card>
    </q-page>
</template>

<script>
import {defineComponent} from 'vue';
import {axios} from "boot/axios";

export default defineComponent({
    name: "shipping_edit",
    data() {
        return {
            shipping: {
                order_number: null,
                content: null,
                shipping_date: null,
                shipping_type: null,
            },
            shipping_type: [
                {
                    id: 1,
                    name: '黑貓物流',
                },
                {
                    id: 2,
                    name: '新竹物流',
                },
                {
                    id: 3,
                    name: '7-11 店到店',
                },
                {
                    id: 4,
                    name: '全家物流',
                },
            ],
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if (this.$route.params.id) {
                return Promise.all([
                    this.edit()
                ]);
            }
        },

        edit() {
            return axios.get('/api/shipping/' + this.$route.params.id)
                .then((response) => {
                    this.shipping = response.data;
                })
                .catch(() => {
                    this.$q.notify({
                        color: 'negative',
                        position: 'top',
                        message: error.response.data.msg,
                        icon: 'error'
                    })
                })
        },

        save() {
            let url = '/api/shipping';
            if (this.$route.params.id) {
                url = url + '/' + this.$route.params.id;
            }

            const params = this.shipping;

            return axios.post(url, params)
                .then((response) => {
                    this.$q.notify({
                        color: 'green-6',
                        position: 'top',
                        message: response.data.msg,
                        icon: 'check'
                    })

                    this.$router.push({name: 'shipping_list'});
                }).catch((error) => {
                    this.$q.notify({
                        color: 'negative',
                        position: 'top',
                        message: error.response.data.msg,
                        icon: 'report_problem'
                    })
                })
        }
    }
})
</script>

<style scoped>

</style>
