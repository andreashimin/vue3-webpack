import imgSrc from '../image.jpg'

const addImage = () => {
    const image = new Image();
    image.src = imgSrc
    image.width = 500
    return image
}

export default addImage