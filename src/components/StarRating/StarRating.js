import { Rating } from "@material-ui/lab";
import React from "react";

function StarRating(props: { quoteId: number, value: number, onChange: ((Event) => void) | any }) {
    return <Rating
        className="tooltip"
        data-tip="Your rating!"
        name={`rating for quote #${props.quoteId}`}
        value={props.value}
        onChange={props.onChange}
    />;
}

export default StarRating;
