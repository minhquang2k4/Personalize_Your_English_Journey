import { useRoutes } from 'react-router-dom'
import { routes } from './index'

function RouterProvider() {
  const element = useRoutes(routes)
  return element
}

export default RouterProvider