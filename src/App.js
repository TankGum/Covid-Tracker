
import { useEffect, useState } from 'react'
import { getCountries, getReportByCountry } from './apis'
import CountrySelector from './components/CountrySelector'
import Highlight from './components/Highlight'
import Summary from './components/Summary'

function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountryId, setSelectedCountryId] = useState('')
  const [report, setReport] = useState([])

  useEffect(() => {
    getCountries()
    .then(res => {
      console.log({ res })
      setCountries(res.data)

      setSelectedCountryId('vn')
    })
  }, [])

  const handleOnChange = (e) => {
    
    setSelectedCountryId(e.target.value)
  }

  useEffect(() => {
    if (selectedCountryId) {
      const selectedCountry = countries.find(
        (country) => country.ISO2 === selectedCountryId.toUpperCase()
      )
      getReportByCountry(selectedCountry.Slug).then((res) => {
        console.log('getReportByCountry', { res })
        // remove last item = current date
        res.data.pop()
        setReport(res.data)
      })
    }
  }, [selectedCountryId, countries])

  return (
    <>
      <CountrySelector 
      countries={countries} 
      handleOnChange={handleOnChange} 
      value={selectedCountryId}
      />
      <Highlight report={report} />
      <Summary report={report} />
    </>
  )
}

export default App
