import { Rating } from "@material-ui/lab";
import React from "react";

function StarRating(props: { quoteId: number, value: number, onChange: ((Event) => void) | any }) {
    return (<Rating
        name={`rating for quote #${props.quoteId}`}
        value={props.value || 0}
        onChange={props.onChange}
    />)
}

export default StarRating;
