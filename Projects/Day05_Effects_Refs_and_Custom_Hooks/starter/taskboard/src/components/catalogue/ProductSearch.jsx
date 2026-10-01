import { useState, useEffect } from 'react'

function ProductSearch(){
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDebouncedQuery(query)
    }, 400)
    return ()=> clearTimeout(timer)
  }, [query])

  useEffect(()=>{
    // Step 7: skip if < 2 chars
    if(debouncedQuery.length < 2){
      setResults([])
      setError(null)
      return
    }

    const controller = new AbortController()
    const signal = controller.signal

    async function fetchResults(){
      setLoading(true)
      setError(null)
      try{
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${debouncedQuery}`,
          { signal }
        )
        if(!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setResults(data.products)
      }catch(err){
        if(err.name!== 'AbortError'){
          setError(err.message)
        }
      }finally{
        setLoading(false)
      }
    }

    fetchResults()

    return ()=> controller.abort()

  }, [debouncedQuery])

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e)=> setQuery(e.target.value)}
        placeholder="Search products..."
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{color:'red'}}>Error: {error}</p>}
      {!loading &&!error && debouncedQuery.length >=2 && results.length === 0 && <p>No results</p>}
      {!loading &&!error && results.length > 0 && (
        <ul>
          {results.map(p=> <li key={p.id}>{p.title}</li>)}
        </ul>
      )}
    </div>
  )
}

export default ProductSearch