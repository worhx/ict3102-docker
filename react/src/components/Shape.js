import React, { Component } from 'react'

import {
    Rectangle
} from 'draw-shape-reactjs';

// class Shape extends Component {

//     newRect(){
//         React.createElement('div', null, "Hello")
//         React.createElement(Rectangle, {corner: [430, 160], height: 500, width: 1000, color: '#ff8f00'})
//     }

    // const Image = ({ source }) => (
    //     <img src={`./images/${source}`} alt="Example" className="w-25 m-2" />
    //   );
      
    // const Shape = ({ corner }) => (
    //     <div className='centered'>
    //     <Rectangle corner={430,160} height={500} width={1000} color='#ff8f00'/>
    //     </div>
    // );

    const Shape = ({ label, cornerleft, cornertop, height, width }) => (
        <div>
            <Rectangle corner={[cornerleft, cornertop]} height={height} width={width} color='#ff8f00'>
                <div className="label">
                    {label}
                </div>
            </Rectangle>
            <div
                style={{
                    left: `${cornerleft+10}px`,
                    top: `${cornertop-55}px`,
                    position: 'absolute',
                    color: '#fff',
                    fontSize: '25px'
                }}>
                <p>{label}</p>
             </div>

        </div>
    );
//     render() {
        
//     return (
//         <div className='centered'>
            // <div
            //     // style={{
            //     //     left: '500px',
            //     //     height: '100vh',
            //     //     width: '50vw',
            //     //     position: 'relative'
            //     // }}
            //     >
            //     {/* {this.newRect()}    */}
            //     <Rectangle
            //         corner={[430, 160]}
            //         height={500}
            //         width={1000}
            //         color='#ff8f00'
            //     />            
//             </div>
//         </div>
//     );
// }
// }
export default Shape;