import { useEffect, useRef } from 'react'
export default function Banner(): JSX.Element {
    const banner = useRef<HTMLDivElement>()

    const atOptions = {
        key: 'fbfe14d99dd78af78f889fa9e7198342',
        format: 'iframe',
        height: 90,
        width: 728,
        params: {},
    }
    useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
        const conf = document.createElement('script')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `//www.profitabledisplaynetwork.com/fbfe14d99dd78af78f889fa9e7198342/invoke.js`
        conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

        banner.current.append(conf)
        banner.current.append(script)
    }
}, [banner])

    return <div className="mx-2 my-5 border border-gray-200 justify-center items-center text-white text-center" ref={banner}></div>
}

