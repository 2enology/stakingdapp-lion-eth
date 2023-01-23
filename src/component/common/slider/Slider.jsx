import { SliderWrapper, SliderItemWrapper } from './Slider.style';


const Slider = ({children, className, ...props}) => {

    const AllClasses = ['slick__slider']
    if(className){
        AllClasses.push(className)
    }

    return ( 
        <SliderWrapper className={AllClasses.join(' ')} {...props}>
            {children}
        </SliderWrapper>
    )
}

const SliderItem = ({children, className}) => {
    const AllClasses = ['slick__slider__item']
    if(className){
        AllClasses.push(className)
    }

    return (
        <SliderItemWrapper className={AllClasses.join(className)}>
            {children}
        </SliderItemWrapper>
    )
}

export {Slider, SliderItem};