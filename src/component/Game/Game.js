


import { useState, useEffect } from 'react'
import './Game.scss'


export default function Game() {

    const [positionSnakeTop, setPositionSnakeTop] = useState(250)
    const [positionSnakeLeft, setPositionSnakeLeft] = useState(250)
    const [direction, setDirection] = useState(null)
    const [positionPointTop, setPositionPointTop] = useState(null)
    const [positionPointLeft, setPositionPointLeft] = useState(null)
    const [widthSnake, setWidthSnake] = useState(80)
    const [heightSnake, setHeightSnake] = useState(10)
    const [widthColaSnake, setWidthColaSnake] = useState(10)
    const [directionAnterior, setDirectionAnterior] = useState("")




    useEffect(() => {
        if (direction) {

            const interval = setInterval(() => {



                if (direction == 'top') {
                    setPositionSnakeTop(top => top + 10);
                }

                else if (direction == 'buttom') {
                    setPositionSnakeTop(top => top - 10);
                }
                else if (direction == 'left') {
                    setPositionSnakeLeft(left => left - 10);
                }
                else if (direction == 'right') {
                    setPositionSnakeLeft(left => left + 10);
                }




            }, 500);
            return () => clearInterval(interval);

            // else alert('iguales')

        }
    }, [direction]);



    const movimiento = (e) => {
        if (e.keyCode == 40) {
            setDirection('top')
        }
        if (e.keyCode == 38) {
            setDirection('buttom')
        }
        if (e.keyCode == 37) {
            setDirection('left')
        }
        if (e.keyCode == 39) {
            setDirection('right')
        }
    }

    function myStopFunction() {
        setDirection(null)
        setPositionSnakeLeft(250)
        setPositionSnakeTop(250)
        positionPoint()
    }

    function myPauseFunction() {
        setDirection(null)
    }

    const positionPoint = () => {
        let top = Math.floor(Math.random() * 299)
        let left = Math.floor(Math.random() * 299)

        if (top.toString().length == 2) top = top.toString()[0] + 0
        if (top.toString().length == 1) top = 0
        if (top.toString().length == 3) top = top.toString()[0] + top.toString()[1] + 0


        if (left.toString().length == 1) left = 0
        if (left.toString().length == 2) left = left.toString()[0] + 0
        if (left.toString().length == 3) left = left.toString()[0] + left.toString()[1] + 0

        setPositionPointTop(parseInt(top))
        setPositionPointLeft(parseInt(left))
    }

    useEffect(() => {
        positionPoint()

    }, [])

    useEffect(() => {
        // console.log('snake left', positionSnakeLeft);
        // console.log('snake top', positionSnakeTop);
        // console.log('point left', positionPointLeft);
        // console.log('point top', positionPointTop);
        // console.log(direction);


        if (positionSnakeTop == positionPointTop && positionSnakeLeft == positionPointLeft) {
            if (direction == 'left') {
                setWidthSnake(widthSnake + 10)

                // setHeightSnake(10)
            }
        }

        if (positionSnakeTop == positionPointTop && positionSnakeLeft + widthSnake - 10 == positionPointLeft) {
            if (direction == 'right') {
                console.log('crece')
                console.log('widthsnake', widthSnake)
                setWidthSnake(widthSnake + 10)
                // setHeightSnake(10)

            }
        }
        if (direction == 'top') {
            if (positionSnakeTop + heightSnake == positionPointTop && positionSnakeLeft == positionPointLeft) {
                setHeightSnake(heightSnake + 10)

                // setWidthSnake(10)
                positionPoint()
            }
        }

        if (direction == 'buttom') {
            if (positionSnakeTop == positionPointTop && positionSnakeLeft == positionPointLeft) {
                setHeightSnake(heightSnake + 10)
                // setWidthSnake(10)
                console.log('crece')
                positionPoint()

            }

        }





    }, [positionSnakeLeft, positionSnakeTop])

    return (
        <div className='game' onKeyDown={movimiento} tabIndex='0'>
            <div className="game_tablero"  >
                <div className='game_serpiente' style={{ top: positionSnakeTop, left: positionSnakeLeft, width: widthSnake, height: heightSnake }}>
                    <div className='cabeza'></div>
                    {/* <div className='cola' style={{ width: '10px', height: '10px' }}></div> */}
                </div>
                <div className='game_point' style={positionPointLeft ? { top: positionPointTop, left: positionPointLeft } : { display: 'none' }} />
                <div className='game_point2' />
            </div>
            <button onClick={myStopFunction}>Restart</button>
            <button onClick={myPauseFunction}>Pausar</button>


        </div>
    )
}