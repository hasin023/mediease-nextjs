"use client"

import React, { useState, ReactNode } from "react"
import SidebarContext from "../context/SidebarContext"

interface SidebarProviderProps {
  children: ReactNode
}

const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isCollapsed, setCollapse] = useState<boolean>(false)

  const toggleSidebarcollapse = () => {
    setCollapse((prevState) => !prevState)
  }

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebarcollapse }}>
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarProvider
