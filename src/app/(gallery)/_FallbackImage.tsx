import { FunctionComponent, ImgHTMLAttributes, ReactElement, useState } from "react"

type FallbackImageProps = {
    srcList: string[]
    alt: string
    fallback?: ReactElement
} & ImgHTMLAttributes<HTMLImageElement>

const FallbackImage: FunctionComponent<FallbackImageProps> = ({srcList, alt, fallback, ...props}) => {
    const [imgSrcIndex, setImgSrcIndex] = useState(0)

    if (imgSrcIndex >= srcList.length) {
        return fallback || undefined
    }

    return (
        <img
            {...props}
            alt={alt}
            src={srcList[imgSrcIndex]}
            onError={() => setImgSrcIndex((value) => value + 1)}
        />
    )
}

export default FallbackImage
