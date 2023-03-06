import PropTypes from 'prop-types'

export const APIPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
})

export const ingredientPropTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    handleClick: PropTypes.func
}

export const modalOverlayPropTypes = {
    // isOpened: PropTypes.bool.isRequired,
    // heading: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
}

export const modalPropTypes = {
    // heading: PropTypes.string.isRequired,
    // handleClick: PropTypes.func.isRequired
}
