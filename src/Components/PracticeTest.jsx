import React from 'react'
import { useParams } from 'react-router-dom'

export default function PracticeTest() {
    const {id} = useParams('id');
  return (
    <div>PracticeTest number {id}</div>
  )
}
