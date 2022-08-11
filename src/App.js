
import { Container, Typography } from '@material-ui/core'
import { sortBy } from 'lodash'
import { useEffect, useState } from 'react'
import { getCountries, getReportByCountry } from './apis'
import CountrySelector from './components/CountrySelector'
import Highlight from './components/Highlight'
import Summary from './components/Summary'
import '@fontsource/roboto'
import moment from 'moment'
import 'moment/locale/vi'

moment.locale('vi')

function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountryId, setSelectedCountryId] = useState('')
  const [report, setReport] = useState([])

  useEffect(() => {
    getCountries()
    .then(res => {
      const countries = sortBy(res.data, 'Country')

      setCountries(countries)

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
        // remove last item = current date
        res.data.pop()
        setReport(res.data)
      })
    }
  }, [selectedCountryId, countries])

  return (
    <Container>
        <Typography variant='h3' component='h3'>
          Số liệu Covid - 19
        </Typography>
        <Typography>
          {moment().format('LLL')}
        </Typography>
        <CountrySelector 
        countries={countries} 
        handleOnChange={handleOnChange} 
        value={selectedCountryId}
        />
        <Highlight report={report} />
        <Summary report={report} />
    </Container>
  )
}

export default App
