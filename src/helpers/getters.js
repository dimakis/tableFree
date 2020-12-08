import {useContext} from 'react'
import {AuthContext} from '../App'


const GetTable = id =>  {
    const context = useContext(AuthContext);
    let tables = context.state.tables
        return (
          tables.filter(
            table => table.id === id
          )
        )
      }

export default GetTable