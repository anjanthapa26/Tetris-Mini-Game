import React from 'react'
import { StyledCell } from './styles/StyleCell'
import { TETROMINOS } from '../tetrominos'

const cell = ({type}) => {
  return (
    <StyledCell type={type} color={TETROMINOS[type].color} />
  )
}

export default cell