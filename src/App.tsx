import React from 'react'
import AppShell from './AppShell'
import {Redirect, Route, Switch} from 'react-router-dom'
import Movies from './pages/movies'
import Movie from './pages/movies/movie'
import Admin from './pages/admin'
import AdminMovie from './pages/admin/movie'

function App() {
  return (
    <AppShell>
      <Switch>
        <Route path='/admin/:movieId'>
          <AdminMovie />
        </Route>
        <Route path='/admin'>
          <Admin />
        </Route>

        <Route path='/movies/:movieId'>
          <Movie />
        </Route>

        <Route path='/movies'>
          <Movies />
        </Route>

        <Route path='/'>
          <Redirect to='/movies' />
        </Route>
      </Switch>
    </AppShell>
  )
}

export default App
