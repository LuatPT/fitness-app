import type { NextPage } from 'next'
import HomePage from '../src/components/HomePage'
import TableList from '../src/components/TableList'

const Home: NextPage = () => {
  return (
    <div>
      <HomePage /> <br/><br/>
      Exercise <br/><br/>
      <TableList />
    </div>
  )
}


export default Home
