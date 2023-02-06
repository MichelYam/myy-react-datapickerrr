import React from 'react'
import PropTypes from 'prop-types'
// import './stylesheets/datapicker.css'

type props = {
  selectedDate: string
  dataFormat: string
  setSelectedDate: (value: string | ((prevVar: string) => string)) => void
}
const Index = ({ selectedDate, dataFormat, setSelectedDate }: props) => {
  return (
    <input
      id='data'
      type='text'
      placeholder={dataFormat ? dataFormat : 'DD/MM/AAAA'}
      value={selectedDate}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedDate(e.target.value)}
    />
  )
}

export default Index

Index.prototype = {
  selectedDate: PropTypes.string,
  setSelectedDate: PropTypes.func,
  dataFormat: PropTypes.string
}
