"use client"

import { createContext } from "react"

interface SidebarContextValue {
  isCollapsed: boolean
  toggleSidebarcollapse: () => void
}

const initialValue: SidebarContextValue = {
  isCollapsed: false,
  toggleSidebarcollapse: () => {},
}

const SidebarContext = createContext<SidebarContextValue>(initialValue)

export default SidebarContext
