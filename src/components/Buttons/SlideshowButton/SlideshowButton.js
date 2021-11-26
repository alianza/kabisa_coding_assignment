import React, { useEffect, useState } from "react";
import TimerOffIcon from "@material-ui/icons/TimerOff";
import TimerIcon from "@material-ui/icons/Timer";

const sliderInterval = 10000
let timer
let progressTimer

function SlideshowButton(props) {
    const [slideshow, setSlideShow] = useState(false)
    const [progress, setProgress] = useState('')

    useEffect(() => { // Start slideshow timer
        if (slideshow) {
            timer = setInterval(() => {
                props.fetchRandomQuote()
            }, sliderInterval)

            progressTimer = setInterval(() => {
                setProgress(prevProgress => {
                    return prevProgress.length < 3 ? prevProgress + '.' : '' // Add timer progress dots
                })
            }, sliderInterval / 4)
        } else {
            setProgress('')
        }

        return function cleanup () { clearInterval(timer); clearInterval(progressTimer) }
    }, [slideshow, props])

    return (
        <span data-tip={`${slideshow ? "Stop" : "Start"} slideshow`} data-progress={progress} className="tooltip">
        {slideshow ?
            <TimerOffIcon onClick={() => setSlideShow(false)} className="svgButton"/> :
            <TimerIcon onClick={() => setSlideShow(true)} className="svgButton"/>
        }
    </span>)
}

export default SlideshowButton;
