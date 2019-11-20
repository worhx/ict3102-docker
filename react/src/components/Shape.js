import React, { Component } from 'react'
import BgImage from "./../background.jpg"

import {
    Rectangle
} from 'draw-shape-reactjs';

    const Shape = ({ label, confidence, cornerleft, cornertop, height, width }) => (
        <div>
            <Rectangle corner={[cornerleft, cornertop]} height={height} width={width} color='#3AEE00'>
            </Rectangle>
            <div
                style={{
                    left: `${cornerleft+4}px`,
                    top: `${cornertop-30}px`,
                    position: 'absolute',
                    color: '#3AEE00',
                    fontSize: '25px',
                }}>
                <p>{label + " " + Number((confidence).toFixed(2))}</p>
             </div>
        </div>
    );
export default Shape;