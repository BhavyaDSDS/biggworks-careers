import NavBar from '../../components/layoutsComponents/NavBar'
import React from 'react'

function layout({children}) {
  return (
   <>
   <NavBar />
   {children}
   </>
  )
}

export default layout