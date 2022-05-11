
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
        // { path: '/', component: '../pages/DiaCanvas/DiaCanvas' }
      ]
    },
    {
      path: '/fquestion',
      
      component: '../layouts/Qlayout.js',
      routes: [
        { path: '/fquestion/fquestion', component: '../pages/fquestion/fquestion' },
      ]
    },
    {
      path: '/DiaCanvas',
      routes: [
        { path: '/DiaCanvas/Emulation', component: '../pages/DiaCanvas/Carcanvas' },
      ]
    }
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
