import React from "react";
import { AuthContext } from "../App";

const tablesList 
<>
{/* {state.tables.length > 0 && */}
  {state.tables.map(table => (
    <MatCard key={table.id.toString()} table={table} />
  ))}
</>