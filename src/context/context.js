import { useContext , useState, useEffect , createContext, useRef } from "react";
import { getGrid } from "../util/gridStart";

const context = createContext();

export const useParams = ()=>{
    return useContext(context);
}


export const ParamsProvider = ({children}) => {

      const [grid,setGrid] = useState(getGrid(50,25));
      const [res,setRes] = useState(false);
      const [mode, setMode] = useState(null);
      const [run, setRun] = useState(false);
      const [algo, setAlgo] =useState('');
      const [editflag, setEditflag] = useState(false);
      const start=useRef({x:25,y:12});
      const end=useRef({x:48,y:23});



      function restart(){
        setGrid(getGrid(50,25));
      }

      useEffect( ()=>{
        restart()
      },[res])

      return (
        <div>
          <context.Provider value = {
            {
                grid, setGrid,
                res, setRes,
                mode, setMode,
                run,setRun,
                algo,setAlgo,
                editflag, setEditflag,
                start,end
                
            }
          }>
            {children}
          </context.Provider>
        </div>
      )

}