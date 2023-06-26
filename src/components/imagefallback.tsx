import Image, { ImageProps } from "next/image"
import { useState } from "react"

interface ImageFallbackProps extends ImageProps {
    fallbackSrc: string
}

const ImageFallback = (props: ImageFallbackProps) => {
    const { src, fallbackSrc, alt, ...rest } = props
    const [imgSrc, setImgSrc] = useState(src)

    return (
        <Image
            {...rest}
            alt={alt}
            src={imgSrc}
            onError={(event) => {
                // remove listener to avoid infinite loop if the fallback also fails
                event.currentTarget.removeEventListener("error", event.currentTarget.onerror)
                setImgSrc(() => fallbackSrc)
            }}
        />
    )
}

export default ImageFallback
