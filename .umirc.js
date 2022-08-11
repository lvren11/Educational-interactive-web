
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      exact: true,
      // component: '../layouts/Qlayout.js',
      routes: [
        { path: '/', component: '../pages/login/login' }
      ]
    },
    {
      path: '/fquestion_1',
      
      component: '../layouts/Qlayout.js',
      routes: [
        { path: '/fquestion_1/fquestion', component: '../pages/fquestion_1/fquestion' },
      ]
    },
    {
      path: '/fquestion_2',
      
      component: '../layouts/Qlayout.js',
      routes: [
        { path: '/fquestion_2/fquestion', component: '../pages/fquestion_2/fquestion' },
      ]
    },
    {
      path: '/fquestion_3',
      
      component: '../layouts/Qlayout.js',
      routes: [
        { path: '/fquestion_3/fquestion', component: '../pages/fquestion_3/fquestion' },
      ]
    },
    {
      path: '/fquestion_4',
      
      component: '../layouts/Qlayout.js',
      routes: [
        { path: '/fquestion_4/fquestion', component: '../pages/fquestion_4/fquestion' },
      ]
    },
    {
      path: '/fquestion_5',
      
      component: '../layouts/Qlayout.js',
      routes: [
        { path: '/fquestion_5/fquestion', component: '../pages/fquestion_5/fquestion' },
      ]
    },
    {
      path: '/fquestion_6',
      
      component: '../layouts/Qlayout.js',
      routes: [
        { path: '/fquestion_6/fquestion', component: '../pages/fquestion_6/fquestion' },
      ]
    },
    {
      path: '/fquestion_7',
      
      component: '../layouts/Qlayout.js',
      routes: [
        { path: '/fquestion_7/fquestion', component: '../pages/fquestion_7/fquestion' },
      ]
    },
    {
      path: '/fquestion_8',
      
      component: '../layouts/Qlayout.js',
      routes: [
        { path: '/fquestion_8/fquestion', component: '../pages/fquestion_8/fquestion' },
      ]
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'v',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
