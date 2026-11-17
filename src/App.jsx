import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import Auth from './Login.jsx';

function App() {
  const [activePage, setActivePage] = useState('Dashboard')
  const [session, setSession] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) console.error(error)
      setSession(data?.session ?? null)
      setChecking(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession)
        setChecking(false)
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    const { error } = await supabase.auth.signOut()
    if (error) alert(error.message)
  }

  if (checking) {
    return <div className="loading-screen">Loading JusLab...</div>
  }

  if (!session) {
    return <Auth />
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>⚗ JusLab</h2>
        <p className="menu-title">WORKSPACE</p>

        <nav>
          {['Dashboard', 'Simulation', 'Process Flow', 'Analysis', 'Reports'].map(page => (
            <a
              key={page}
              href="#"
              className={activePage === page ? 'active' : ''}
              onClick={e => {
                e.preventDefault()
                setActivePage(page)
              }}
            >
              {page}
            </a>
          ))}
        </nav>
<div className="sidebar-bottom">
  <strong>Fruit Juice Project</strong>
  <small>Chemical Engineering</small>

  <div className="creator-credit">
    <span>DESIGNED & DEVELOPED BY</span>
    <strong>IBTISSAM CHAANOUNE</strong>
    <small>Quality control & process 
  
    </small>
  </div>
</div>
        
          
          
      
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <small>PROCESS ENGINEERING / PROJECT</small>
            <h1>Fruit Juice Concentration</h1>
          </div>

          <div>
            <span className="status">● Project ready</span>
            <button onClick={handleLogout}>Sign Out</button>
          </div>
        </header>

        <section className="welcome">
          <div>
            <p>SCIENTIFIC SIMULATION PLATFORM</p>
            <h2>Welcome to JusLab</h2>
            <span>
              Model, calculate and analyze your juice concentration process.
            </span>
            <p>{session.user.email}</p>
          </div>
          <div className="welcome-icon">⚗️</div>
        </section>

        <h2 className="section-title">
          {activePage === 'Dashboard' ? 'Process Overview' : activePage}
        </h2>

        <section className="operations">
          {[
            ['01', 'Filtration', 'Remove insoluble particles'],
            ['02', 'Mixing', 'Combine juice streams'],
            ['03', 'Heating', 'Heat the mixture to 80°C'],
            ['04', 'Evaporation', 'Remove water by evaporation'],
            ['05', 'Cooling', 'Cool the final concentrate']
          ].map(([number, title, description]) => (
            <article className="operation" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </section>

        <footer>
          JusLab · Chemical Engineering Simulation
        </footer>
      </main>
    </div>
  )
}

export default App
