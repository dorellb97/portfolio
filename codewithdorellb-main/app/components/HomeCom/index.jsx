import React from 'react'
import Part1 from './Part1'
import Part2 from './Part2'
import Part3 from './Part3'

export default function HomeCom() {
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100vw", gap: "100px"}}>
    <Part1 />
    <Part2 />
    <Part3 />
    </div>
  )
}
