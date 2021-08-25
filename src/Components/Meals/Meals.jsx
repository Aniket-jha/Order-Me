import { Fragment } from "react"
import MealsSummery from "./MealsSummery"
import Available from "./Available"

export default function Meals() {
    return (
        <Fragment>
            <MealsSummery />
            <Available />
        </Fragment>
    )
}
