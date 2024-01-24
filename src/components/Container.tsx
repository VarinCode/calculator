import { FC, ReactElement} from 'react'
import { ContainerProps } from "../model/model"

const Container:FC<ContainerProps> = ({ children }):ReactElement => {
  return (
    <section className=" absolute top-[100%] left-[50%] translate-x-[-50%] translate-y-[10%]">
        {children}
    </section>
  )
}

export default Container;