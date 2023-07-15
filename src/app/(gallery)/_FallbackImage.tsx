import type { FunctionComponent, ImgHTMLAttributes, ReactElement } from "react"
import { useState } from "react"

type FallbackImageProps = {
    srcList: string[],
    alt: string,
    fallback?: ReactElement,
} & ImgHTMLAttributes<HTMLImageElement>

const FallbackImage: FunctionComponent<FallbackImageProps> = ({ srcList, alt, fallback, ...props }) => {
    const [imgSrcIndex, setImgSrcIndex] = useState(0)

    if (imgSrcIndex >= srcList.length) {
        return fallback ?? undefined
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element -- using next/image costs money
        <img
            {...props}
            alt={alt}
            src={srcList[imgSrcIndex]}
            onError={() => { setImgSrcIndex((value) => value + 1) }}
        />
    )
}

export default FallbackImage
