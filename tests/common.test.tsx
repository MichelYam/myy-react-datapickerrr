import * as React from 'react'
import { render } from "@testing-library/react"

import 'jest-canvas-mock'

import { Datapicker } from '../src/index'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<Datapicker dataFormat={''} selectedDate={''} setSelectedDate={function (_value: React.SetStateAction<string>): void {
      throw new Error('Function not implemented.')
    }} />)
  })
})
