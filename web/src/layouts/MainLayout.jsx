import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div>
      <header>
        <h1>My App</h1>
        {/* Các thành phần header khác */}
      </header>
      <main>
        <Outlet /> {/* Outlet sẽ render các tuyến đường con */}
      </main>
      <footer>
        <h1>Footer</h1>
      </footer>
    </div>
  )
}

export default MainLayout