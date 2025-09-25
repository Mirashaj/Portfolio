import React, { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const [matrixMode, setMatrixMode] = useState(false)
  // store both client (viewport) and page (document) coords to handle scrolling correctly
  const lastPos = useRef(
    typeof window !== 'undefined'
      ? { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2, pageX: window.innerWidth / 2, pageY: window.innerHeight / 2 }
      : { clientX: 100, clientY: 100, pageX: 100, pageY: 100 }
  )

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor) return

    // Initialize styles
  // explicit inline sizing/visuals to avoid CSS conflicts
  cursor.style.position = 'fixed'
  cursor.style.zIndex = '2147483647'
  cursor.style.pointerEvents = 'none'
  cursor.style.display = 'block'
  cursor.style.opacity = '1'
  cursor.style.visibility = 'visible'
  cursor.style.width = '20px'
  cursor.style.height = '20px'
  cursor.style.border = '2px solid var(--primary-color)'
  cursor.style.borderRadius = '50%'
  cursor.style.background = 'transparent'
  cursor.style.transition = 'transform 0.1s ease'
  cursor.style.transform = 'translate(-50%, -50%)'
  // ensure an initial position in center
  cursor.style.left = (window.innerWidth / 2) + 'px'
  cursor.style.top = (window.innerHeight / 2) + 'px'

    if (follower) {
      follower.style.position = 'fixed'
      follower.style.zIndex = '2147483646'
      follower.style.pointerEvents = 'none'
      follower.style.display = 'block'
      follower.style.opacity = '1'
      follower.style.visibility = 'visible'
      // explicit follower (dot) styling
      follower.style.width = '8px'
      follower.style.height = '8px'
      follower.style.background = 'var(--primary-color)'
      follower.style.borderRadius = '50%'
      follower.style.transform = 'translate(-50%, -50%)'
      follower.style.left = (window.innerWidth / 2) + 'px'
      follower.style.top = (window.innerHeight / 2) + 'px'
    }

    let isScrolling = false
    let scrollTimeout

    function updatePosition(pos) {
      // pos: { clientX, clientY, pageX, pageY }
      const { clientX, clientY, pageX, pageY } = pos || lastPos.current
      lastPos.current = {
        clientX: clientX ?? lastPos.current.clientX,
        clientY: clientY ?? lastPos.current.clientY,
        pageX: pageX ?? lastPos.current.pageX,
        pageY: pageY ?? lastPos.current.pageY
      }

      if (matrixMode) {
        // In matrix mode position absolutely using page coordinates (document space)
        const left = lastPos.current.pageX ?? (lastPos.current.clientX + window.scrollX)
        const top = lastPos.current.pageY ?? (lastPos.current.clientY + window.scrollY)
        cursor.style.position = 'absolute'
        cursor.style.left = left + 'px'
        cursor.style.top = top + 'px'
        cursor.style.transform = 'translate(-50%, -50%)'
        if (follower) {
          follower.style.position = 'absolute'
          follower.style.left = left + 'px'
          follower.style.top = top + 'px'
        }
      } else {
        // Normal mode: use client (viewport) coords with fixed positioning
        const left = lastPos.current.clientX ?? (lastPos.current.pageX - window.scrollX)
        const top = lastPos.current.clientY ?? (lastPos.current.pageY - window.scrollY)
        cursor.style.position = 'fixed'
        cursor.style.left = left + 'px'
        cursor.style.top = top + 'px'
        cursor.style.transform = 'translate(-50%, -50%)'
        if (follower) {
          follower.style.position = 'fixed'
          follower.style.left = left + 'px'
          follower.style.top = top + 'px'
        }
      }
    }

    function onMouseMove(e) {
      // update position from mouse
      updatePosition({ clientX: e.clientX, clientY: e.clientY, pageX: e.pageX, pageY: e.pageY })
    }

    function onScroll() {
      // Keep cursor aligned when scrolling in matrix mode; use stored page coords
      if (matrixMode) {
        updatePosition(lastPos.current)
      }
      // onScroll handler
      isScrolling = true
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrolling = false
      }, 100)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('scroll', onScroll, { passive: true })

    // listen for global matrixModeActive changes on window (legacy script toggles it)
    function onMatrixChange(e) {
      setMatrixMode(!!window.matrixModeActive)
    }

    window.addEventListener('matrix-mode-change', onMatrixChange)

    // initial read + set initial position to current center or last known
    setMatrixMode(!!window.matrixModeActive)
    try {
      updatePosition(lastPos.current)
    } catch (err) {
      // ignore
    }
    // Tell legacy script that React manages the cursor to avoid style conflicts
    try {
      window.reactCursorManaged = true
    } catch (e) {}

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('matrix-mode-change', onMatrixChange)
      try { window.reactCursorManaged = false } catch (e) {}
    }
  }, [matrixMode])

  // Expose a simple handler to toggle matrix mode from React if needed
  useEffect(() => {
    window.matrixModeActive = matrixMode
    const evt = new Event('matrix-mode-change')
    window.dispatchEvent(evt)
  }, [matrixMode])

  return (
    <>
      <div ref={cursorRef} className="cursor" aria-hidden="true"></div>
      <div ref={followerRef} className="cursor-follower" aria-hidden="true"></div>
      {/* Debug overlay - temporary for diagnostics */}
      {/* debug overlay removed */}
    </>
  )
}
