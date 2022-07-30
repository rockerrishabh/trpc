import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'

function Switcher() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  const { systemTheme, theme, setTheme } = useTheme()

  const renderThemeChanger = () => {
    if (!mounted) return null

    const currentTheme = theme === 'system' ? systemTheme : theme

    if (currentTheme === 'dark') {
      return (
        <SunIcon
          className="mt-[0.1rem] h-6 w-7 dark:text-gray-200 hover:dark:text-gray-400 "
          role="button"
          onClick={() => setTheme('light')}
        />
      )
    } else {
      return (
        <MoonIcon
          className="h-6 w-7 text-gray-900 hover:text-gray-600 "
          role="button"
          onClick={() => setTheme('dark')}
        />
      )
    }
  }

  return <div>{renderThemeChanger()}</div>
}

export default Switcher
