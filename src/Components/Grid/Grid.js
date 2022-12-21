import React, { useEffect, useRef, useState } from 'react';
import { BDS } from '../../Algorithms/Visualize Algorithm/BDS';
import { BFS } from '../../Algorithms/Visualize Algorithm/BFS';
import { useParams } from '../../context/context';
import './Grid.css';

const Grid = () => {

    const {grid , setGrid, editflag, setEditflag, mode , start, end , run , res , algo}= useParams();


    const [refArray] = useState(getrefArray(grid));
   
    function getrefArray(grid){
      let array = [];
      grid.forEach((element) => {
        element.forEach((child) => {
           // eslint-disable-next-line
          array.push(useRef());
        })
      });

      return array;
    }
    
    useEffect(() => {

      if(algo === 'BFS')
      {
        let hashmap = {};
        let prevmap = {};
  
        for (let j = 0; j < 25; j++) {
           for (let i = 0; i < 50; i++) 
           {
            hashmap[`${i}-${j}`]=false
            prevmap[`${i}-${j}`]=null
           }
        }

        let result = BFS(grid,hashmap,prevmap,start.current,end.current,refArray);
        let path=[];

        if(result != null)
        {
           let current = result[0];

           while (prevmap[`${current.x}-${current.y}`] != null){
            path.push(current)
            current=prevmap[`${current.x}-${current.y}`]
          }
           setTimeout(()=>{path.reverse().forEach((elem,index)=> {
              refArray[elem.x+elem.y*50].current.style['transition-delay']=`${( index) * 15}ms`
              refArray[elem.x+elem.y*50].current.classList.add('path')
            
            }
              
            )},result[1]*9)
        }
      }

      if(algo === 'BDS')
      {
        let hashmap = {};
        let prevmap = {};
  
        for (let j = 0; j < 25; j++) {
           for (let i = 0; i < 50; i++) 
           {
            hashmap[`${i}-${j}`]=false
            prevmap[`${i}-${j}`]=null
           }
        }

        let result = BDS(grid,hashmap,prevmap,start.current,end.current,refArray);
        let path=[];

        if(result != null)
        {
           let current = result[0];

           while (prevmap[`${current.x}-${current.y}`] != null){
            path.push(current)
            current=prevmap[`${current.x}-${current.y}`]
          }
           setTimeout(()=>{path.reverse().forEach((elem,index)=> {
              refArray[elem.x+elem.y*50].current.style['transition-delay']=`${( index) * 15}ms`
              refArray[elem.x+elem.y*50].current.classList.add('path')
            
            }
              
            )},result[1]*9)
        }
      }
       // eslint-disable-next-line
    }, [run])


    useEffect(()=>{
      refArray.forEach((elem)=>{elem.current.style['transition-delay']='0ms'})
      refArray.forEach((elem)=>{elem.current.classList.remove('visited');elem.current.classList.remove('path')})
       // eslint-disable-next-line
     },[res])
    


  return (
    <div className='grid_layout'>
      {
        refArray.map((element,index) => 
        {

            let classList = ['cell'];

            let y_index = Math.floor(index/50);
            let x_index = index % 50;
            let cell = grid[y_index][x_index];

            if (cell.iswall) {
              classList.push('wall')
            }


            return <div  key={`${index}`} ref={element}  className={classList.join('')} 
            onMouseDown ={()=>{setEditflag(true)}}
            onMouseUp={()=> {setEditflag(false)}}
            onMouseMove = {()=>{
              if(!editflag) return;

              const current = grid[y_index][x_index];

              if(current.isStart || current.isTarget) return;

              switch (mode) {
                case 'setstart':
                   var newgrid = grid.map((element)=>{

                    return element.map((element) =>{

                      if(!element.isStart) return element;
                      return {...element, isStart:false}
                    })
                   })

                   newgrid[y_index][x_index] = {...newgrid[y_index][x_index] , isStart:true,isTarget:false, weight:1,iswall:false}
                   start.current = {x:x_index,y:y_index}
                   setGrid(newgrid)
                  break;

                  case 'target':
                    var newgrid1 = grid.map((element)=>{
 
                     return element.map((element) =>{
 
                       if(!element.isTarget) return element;
                       return {...element, isTarget:false}
                     })
                    })
 
                    newgrid1[y_index][x_index] = {...newgrid1[y_index][x_index] , isStart:false, isTarget:true, weight:1,iswall:false}
                    end.current = {x:x_index,y:y_index}
                    setGrid(newgrid1)
                   break;

                   case 'addbricks':
                    var newgrid2=grid.slice()
                   newgrid2[y_index][x_index]={...newgrid2[y_index][x_index],weight:1,iswall:true}
                   setGrid(newgrid2)
                   break;
              
                default:
                  return
              }}}>
                      {cell.isStart ? <i className="bi bi-geo-alt"></i> : null }
                      {cell.isTarget ? <i className="bi bi-geo"></i> : null }

                  </div>

          })

      }  
    </div>
  )
}

export default Grid;