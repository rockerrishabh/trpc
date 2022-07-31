import { useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

function Loader() {
  let [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(false)
  }, [])
  return (
    <div>
      <ClipLoader color="#03fcdb" loading={loading} size={50} />
    </div>
  )
}

export default Loader
