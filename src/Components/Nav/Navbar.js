import React from 'react';
import { useParams } from '../../context/context';
import './Navbar.css'

export const Navbar = () => {

  const {mode,setMode,setRun,algo,setAlgo,setRes} = useParams();

  return (
    <div className='navbar'>
       <div className="container">
        <h4 class="text-white">Map Visualizer</h4>
          <button type="button" className={['btn' ,'btn-primary', mode==='setstart'? 'selected' : ''].join(' ') } 
              onClick ={()=>{
                  if(mode==='setstart') setMode(null);
                  else setMode('setstart');
                  }} > 
                  Start 
                  <i className="bi bi-geo-alt"></i>
          </button>
          <button type="button" className={['btn' ,'btn-danger', mode==='target'? 'selected' : ''].join(' ') } 
              onClick ={()=>{
                if(mode==='target') setMode(null);
                else setMode('target');
                }} >
                End  
                <i className="bi bi-geo"></i>
          </button>
          <button type="button" className={['btn' ,'btn-dark', mode==='addbricks'? 'selected' : ''].join(' ') } 
              onClick ={()=>{
                if(mode==='addbricks') setMode(null);
                else setMode('addbricks');
                }} >
                Bricks<i className="pad bi bi-bricks"></i>
          </button>
          
          <select aria-label="Default select example" value={algo} onChange={(e) =>{setAlgo(e.target.value)}}  >
              <option value=''>Choose Algorithm</option>
              <option value="DFS">DFS</option>
              <option value="BFS">BFS</option>
          </select>
          <button type="button" className='btn btn-success' onClick={()=>{setRun((x)=>{return !x})}} >Visualize <i className="bi bi-caret-right"></i> </button>
          <button type="button" className='btn btn-danger' onClick={()=>{setRes((x)=>{return !x})}} >Reset <i className="bi bi-arrow-counterclockwise"></i> </button>
       </div>

    </div>
  )
}
