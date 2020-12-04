import React, { useContext } from "react";
import { AuthContext } from "../contexts/adminContext"
import MatCard from './MatCard'


export const HomeTablesLayout = () =>   {
  const context = useContext(AuthContext)
  const state = context.state;

    return (
        <React.Fragment>
        <div className="home">
          {state.isFetching ? (
            <span className="loader">LOADING...</span>
          ) : state.hasError ? (
            <span className="error">AN ERROR HAS OCCURED</span>
          ) : (
            <>
          {/* {state.tables.length > 0 && */}
            {state.tables.map(table => (
              <MatCard key={table.id.toString()} table={table} />
            ))}
        </>
      )}
    </div>
    </React.Fragment>
    )
}