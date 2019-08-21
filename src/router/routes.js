const PageNotFound = () => import('@/views/PageNotFound')

const Home = () => import('@/views/home/Home')
const Login = () => import('@/views/guest/Login')

const Dashboard = () => import('@/views/home/dashboard/Dashboard')
const Skill = () => import('@/views/home/skill/Skill')
const Portfolio = () => import('@/views/home/portfolio/Portfolio')

export default [
	...middleware('guest', [
		{
			path: '/login',
			name: 'login',
			component: Login
		},

		{
			path: '*',
			name: 'PageNotFound',
			component: PageNotFound,
		}
	]),

	...middleware('auth', [
		{
			path: '/',
			name: 'home',
			component: Home,
			redirect: '/dashboard',
			children: [
				{
					path: '/dashboard',
					name: 'dashboard',
					component: Dashboard,
					meta: {
						header: 'dashboard'
					}
				},

				{
					path: '/skill',
					name: 'skill',
					component: Skill,
					meta: {
						header: 'Skill'
					}
				},

				{
					path: '/portfolio',
					name: 'portfolio',
					component: Portfolio,
					meta: {
						header: 'Portfolio'
					}
				}
			]
		},

		{
			path: '*',
			name: 'PageNotFound',
			component: PageNotFound,
		}
	]),
]

function middleware(middleware, routes) {
	// setting middleware for every route
	routes.forEach(route =>
		route.middleware = middleware
	)

	return routes
}
