const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {path: '', component: () => import('pages/Dashboard.vue')},
            {
                path: '/shipping/list',
                name: 'shipping_list',
                component: () => import('pages/shipping/list.vue')
            },
            {
                path: '/shipping/edit/:id?',
                name: 'shipping_edit',
                component: () => import('pages/shipping/edit.vue')
            },

            // Not completed yet
            // {path: '/Taskboard', component: () => import('pages/TaskBoard.vue')},
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/Error404.vue')
    },
    {
        path: '/Mail',
        component: () => import('layouts/Mail.vue')
    },
    {
        path: '/Maintenance',
        component: () => import('pages/Maintenance.vue')
    },
    {
        path: '/Pricing',
        component: () => import('pages/Pricing.vue')
    },
    {
        path: '/Login-1',
        component: () => import('pages/Login-1.vue')
    },
    {
        path: '/Lock',
        component: () => import('pages/LockScreen.vue')
    },
    {
        path: '/Lock-2',
        component: () => import('pages/LockScreen-2.vue')
    }
]

export default routes
