import { AiOutlineStar, AiFillStar} from 'react-icons/ai'

const Rating = ({ rating, handleClick, style }) => {
    return (
        <ul className="row clickable" onClick={handleClick} style={{ listStyle: "none", margin: 0, padding: 0, ...style }}>
            {
                [1, 2, 3, 4, 5].map((num) => (
                    <li key={num} style={{ paddingTop: 5, }}>
                        {rating >= num ? <AiFillStar /> : <AiOutlineStar />}
                    </li>
                ))
            }
        </ul>
    )
}

export default Rating