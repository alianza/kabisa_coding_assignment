import { Rating } from "@material-ui/lab";
import React from "react";

function StarRating(props: { quote: any, value: number, onChange: ((Event) => void) | any }) {
    return <Rating
        className="tooltip"
        data-tip="Your rating!"
        name={`rating for quote #${props.quote.id}`}
        value={props.value}
        onChange={props.onChange}
    />;
}

export default StarRating;
