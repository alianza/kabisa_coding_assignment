import { useEffect } from "react";

function useTheme(darkTheme) {
    useEffect(() => { // Set dark theme attribute
        if (darkTheme) {
            document.body.dataset.theme = 'dark'
        } else {
            document.body.dataset.theme = ''
        }
    }, [darkTheme])
}

export default useTheme
