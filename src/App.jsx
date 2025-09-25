import React, { useEffect } from 'react'
import Cursor from './components/Cursor'

export default function App() {
  useEffect(() => {
    import('../script.js').then(module => {
      console.log('Legacy script loaded for cursor and effects');
    }).catch(err => console.error('Failed to load legacy script', err))
  }, [])

  return (
    <>
      <Cursor />
    </>
  )
}