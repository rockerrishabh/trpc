import { useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

function Loader() {
  let [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(false)
  }, [])
  return (
    <div>
      <ClipLoader color="#7e20e3" loading={loading} size={50} />
    </div>
  )
}

export default Loader
