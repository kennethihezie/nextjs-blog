import { parseISO } from "date-fns"
import format from "date-fns/format"

const DateComponent = ({ dateString }) => {
    const date = parseISO(dateString)
    return (
        <time datatype={ dateString }>
            {
                format(date, 'LLLL d, yyyy')
            }
        </time>
    )
}

export default DateComponent

//Note: You can view the different format() string options on the date-fns website.