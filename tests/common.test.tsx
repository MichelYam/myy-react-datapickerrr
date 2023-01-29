import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { Datapicker } from '../src'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<Datapicker dataFormat={''} selectedDate={''} setSelectedDate={function (value: React.SetStateAction<string>): void {
      throw new Error('Function not implemented.')
    }} />)
  })
})
