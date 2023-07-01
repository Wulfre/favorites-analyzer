import {type ImgHTMLAttributes, type ReactElement, useState } from "react"

type FallbackImageProps = {
    srcList: string[]
    fallback?: ReactElement
} & ImgHTMLAttributes<HTMLImageElement>

const FallbackImage = ({srcList, fallback, ...props}: FallbackImageProps) => {
    const [imgSrcIndex, setImgSrcIndex] = useState(0)

    if (imgSrcIndex >= srcList.length) {
        return fallback || undefined
    }

    return (
        <img
            src={srcList[imgSrcIndex]}
            onError={() => setImgSrcIndex((value) => value + 1)}
            alt={""}
            {...props}
        />
    )
}

export default FallbackImage
