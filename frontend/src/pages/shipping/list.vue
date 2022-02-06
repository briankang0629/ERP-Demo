<template>
    <q-page class="q-pa-sm">
        <q-card-actions align="right">
            <q-btn :to="{ name: 'shipping_edit'}" label="新增一筆" class="text-capitalize q-ma-sm" color="green-6"/>
        </q-card-actions>
        <q-card class="q-mt-lg">
            <q-card-section>
                <div class="text-h6 text-grey-8">
                    物流清單
                </div>
            </q-card-section>
            <q-card-section class="q-pa-none">
                <q-table :rows="data" :columns="columns" hide-bottom>
                    <template v-slot:body-cell-shipping_type="props">
                        <q-td :props="props">
                            <span>{{ shipping_type[props.row.shipping_type] }}</span >
                        </q-td>
                    </template>
                    <template v-slot:body-cell-operate="props">
                        <q-td :props="props">
                            <q-btn :to="{ name: 'shipping_edit', params: {id: props.row.order_id} }" icon="edit" size="md" flat dense color="blue-6">
                            </q-btn>
                            <q-btn icon="delete" size="md" class="q-ml-sm" flat dense color="pink-6"/>
                        </q-td>
                    </template>
                </q-table>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent} from 'vue';

const columns = [
    {name: 'order_number', label: '訂單編號', field: 'order_number', sortable: true, align: 'left'},
    {name: 'content', label: '訂單內容', field: 'content', sortable: true, align: 'left'},
    {name: 'shipping_type', label: '物流來源', field: 'shipping_type', sortable: true, align: 'left'},
    {name: 'shipping_date', label: '出貨日期', field: 'shipping_date', sortable: true, align: 'left'},
    {name: 'created_at', label: '新增日期', field: 'created_at', sortable: false, align: 'center'},
    {name: 'updated_at', label: '更新日期', field: 'updated_at', sortable: false, align: 'center'},
    {name: 'operate', label: '操作', field: 'operate', sortable: false, align: 'center'}
];
import {axios} from 'boot/axios'

export default defineComponent({
    name: "shipping_list",
    setup() {
        return {
            columns,
        }
    },
    data() {
        return {
            data: [],
            shipping_type: {
                1: "黑貓物流",
                2: "新竹物流",
                3: "7-11 店到店",
                4: "全家物流"
            }
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            axios.get('/api/shipping')
                .then((response) => {
                    this.data = response.data.data
                })
                .catch(() => {
                    this.$q.notify({
                        color: 'negative',
                        position: 'top',
                        message: '取得資料有誤',
                        icon: 'error'
                    })
                })
        }
    }
})
</script>

<style>

</style>
