import './RefreshButton.scss'
import Segment from 'segment-js'
import { useEffect } from "react";
import { elasticOut } from "d3-ease/src/elastic";

function RefreshButton(props) {

    useEffect(() => {
        const refreshButton = document.querySelector('.refresh-icon')
        const circlePath = refreshButton.querySelector('.circle-path')
        const arrowPath = refreshButton.querySelector('.arrow-path')
        const arrowSvg = refreshButton.querySelector('.arrow-svg')
        const circleSegment = new Segment(circlePath, '25%', '90%')
        const arrowSegment = new Segment(arrowPath, '25%', '75%')

        const listener = function(){
            if(!animating){
                animating = true
                triggerAnimation()
                props.onRefresh()
            }
        }

        let animating = false
        refreshButton.addEventListener('click', listener, false)

        function triggerAnimation(){
            circleSegment.draw('75%', '165%', 0.5, {circular: true, callback: () => {
                    circleSegment.draw('10%', '90%', 0.2, {circular: true, callback: () => {
                            circleSegment.draw('25%', '90%', 1.5, {circular: true, easing: elasticOut.ease, callback: () => {
                                }
                            })
                        }
                    })
                }
            })

            arrowSvg.setAttribute('class', 'arrow-svg arrow-animation');

            arrowSegment.draw('50%', '50% + 0.01', 0.8, {callback: () => {
                    arrowSegment.draw('25%', '75%', 1.4, {easing: elasticOut.ease, callback: () => {
                            arrowSvg.setAttribute('class', 'arrow-svg')
                            animating = false
                        }
                    })
                }
            })
        }

        return function cleanup() {
            refreshButton.removeEventListener('click', listener)
        }
    }, [props])

    return (
        <>
            <button className="refresh-icon tooltip" data-tip="New random quote!" aria-label="New random quote!">
                <svg viewBox="0 0 90 90">
                    <path className="circle-path" d="M 45 45 m 0 -30 a 30 30 0 1 1 0 60 a 30 30 0 1 1 0 -60"/>
                </svg>
                <svg className="arrow-svg" viewBox="0 0 90 90">
                    <path className="arrow-path" d="M 50 15 m -18 -18 l 18 18 l -18 18"/>
                </svg>
            </button>
        </>
    );
}

export default RefreshButton;
