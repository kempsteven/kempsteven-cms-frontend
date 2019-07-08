const Home = () => import('@/views/home/Home')
const Login = () => import('@/views/guest/Login')
const Dashboard = () => import('@/views/home/dashboard/Dashboard')

export default [
	...middleware('guest', [
		{
			path: '/login',
			name: 'login',
			component: Login
		},
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
				}
			]
		}
	])
]

function middleware(middleware, routes) {
	// setting middleware for every route
	routes.forEach(route =>
		route.middleware = middleware
	)

	return routes
}
