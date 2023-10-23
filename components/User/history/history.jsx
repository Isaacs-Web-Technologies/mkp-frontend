import { HistorySearchBar } from '@/components/landingPgComponents/searchBar'
import React from 'react'

const History = () => {
  return (
    <div className='history container w-1/6 dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] flex-col'>
      <h1>History</h1>
      <HistorySearchBar />
      <p>how to cook jollof</p>
      <p>how to cook egusi</p>
      <p>how to make amala</p>
      </div>
  )
}
export default History