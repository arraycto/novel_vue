import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/Home/HomePage.vue')
const Login= () => import('../views/Login/LoginPage.vue')
const Personal = () => import('../views/Personal/PersonalPage.vue')
const Search = () => import('../views/Search/SearchPage.vue')
const Sort = () => import('../views/Sort/SortPage.vue')
const Upload = () => import('../views/Upload/Upload.vue')
const Register = () => import('../views/Login/Register.vue')
const ListOfNovels = () => import('../views/ListOfNovels/ListOfNovels.vue')
const Detail = () => import('../views/Detail/Detail.vue')
const ModifyImg = () => import('../views/Personal/ModifyImg.vue')
const ModifyMessage = () => import('../views/Personal/ModifyMessage.vue')

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/home',
		component: Home
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/personal',
		component: Personal,
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/search',
		component: Search
	},
	{
		path: '/sort',
		component: Sort,
		children: [
			{
				path: 'one',
				component: ListOfNovels
			},
			{
				path: 'two',
				component: ListOfNovels
			},
			{
				path: 'three',
				component: ListOfNovels
			},
			{
				path: 'four',
				component: ListOfNovels
			},
			{
				path: 'five',
				component: ListOfNovels
			},
			{
				path: 'six',
				component: ListOfNovels
			},
			{
				path: 'seven',
				component: ListOfNovels
			},
			{
				path: 'eight',
				component: ListOfNovels
			},
			{
				path: '',
				redirect: {path:'one',query:{type:'都市青春'}}
			}
		]
	},
	{
		path: '/upload',
		component: Upload
	},
	{
		path: '/register',
		component: Register
	},
	{
		path:'/detail/:id',
		component: Detail
	},
	{
		path: '/modifyImg',
		component: ModifyImg,
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/modifyMessage',
		component: ModifyMessage,
		meta: {
			requireAuth: true
		}
	}
]

//捕获路由的异常，浏览器就不会爆红
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

const router = new VueRouter({
  routes,
	mode: 'history',
	linkActiveClass: 'active',
	base: '/novel/'
})

export default router
