import React from 'react'
import Part1 from './Part1'
import Part2 from './Part2'
import Part3 from './Part3'
import TestComponent from '../Test'

export default function HomeCom() {
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100vw", gap: "100px" }}>
    <Part1 />
    <Part3 />
    {/* <TestComponent /> */}
    {/* <Part2 /> */}
    </div>
  )
}
