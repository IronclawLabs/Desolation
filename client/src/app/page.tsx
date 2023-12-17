"use client"
import WalletButton from '@/components/WalletButton'
import {SolWallet} from '@/context/SolWallet'
import {Box, Button, Center, Heading, VStack} from '@chakra-ui/react'
import Image from 'next/image'
import Zone from "@components/Zone"
import {useEffect, useState} from "react"
import {help} from "tailwindcss/src/oxide/cli/help"
import _ from "lodash"
import Loading from "@components/loading"
import Navs from "@components/navs"
import MenuItem from "@components/MenuItem"


const zones = [
  {
    image: require("@assets/zone-1.png").default.src,

    left: "15.5%",
    top: "45.6%",
    width: "23%",
    height: "auto"

  },

  {
    image: require("@assets/zone-2.png").default.src,

    left: "20.5%",
    top: "58.2%",
    width: "26.2%",
    height: "auto"

  },


  {
    image: require("@assets/zone-3.png").default.src,

    left: "40.33%",
    top: "64.2%",
    width: "15.5%",
    height: "auto"

  },

  {
    image: require("@assets/zone-6.png").default.src,

    left: "58.83%",
    top: "6.8%",
    width: "41%",
    height: "auto"

  },

  {
    image: require("@assets/zone-5.png").default.src,

    left: "58.2%",
    top: "37.8%",
    width: "24%",
    height: "auto"

  },


  {
    image: require("@assets/zone-4.png").default.src,

    left: "51.53%",
    top: "58.8%",
    width: "27.5%",
    height: "auto"

  },


  {
    image: require("@assets/zone-7.png").default.src,

    left: "24.83%",
    top: "-2.2%",
    width: "48%",
    height: "auto"

  },

  {
    image: require("@assets/zone-8.png").default.src,

    left: "0%",
    top: "7.8%",
    width: "36%",
    height: "auto"

  },

  {
    image: require("@assets/zone-middle.png").default.src,

    left: "35%",
    top: "33.8%",
    width: "29%",
    height: "auto"

  },


]

// const helperObj : {currentZone: any, previousZone: any} = {
//   currentZone : null,
//   previousZone: null
// }


export default function Home() {
  const [hoverIndex, setHoverIndex] = useState(-1)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  })

  useEffect(() => {
    function detectTransparency(el: HTMLImageElement, x: any, y: any) {
      const canvas = document.createElement('canvas')
      canvas.width = el.width
      canvas.height = el.height

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        return // Context couldn't be retrieved
      }

      ctx.drawImage(el, 0, 0, el.width, el.height)

      const pixel = ctx.getImageData(x, y, 1, 1).data
      const alpha = pixel[3]

      return !(alpha > 0)
    }

    document.addEventListener('mousemove', (event) => {
      const x = event.clientX
      const y = event.clientY

      const elements = document.elementsFromPoint(x, y)
      const filteredElements = elements.filter(el => el.classList.contains('zone'))

      if (filteredElements.length === 0) setHoverIndex(-1)
      for (let el of filteredElements) {
        const rect = el.getBoundingClientRect()
        if (!detectTransparency(el as HTMLImageElement, x - rect.left, y - rect.top)) {
          setHoverIndex(+el.id)
          break
        }
      }
    })


  }, [])

  return (
    <VStack>
      <Loading isLoading={isLoading}></Loading>
      <VStack>
        <Heading>sdfsd</Heading>
        <WalletButton></WalletButton>

      </VStack>
      <Box display={"flex"} w={1900} h={970} className={"bg-cover bg-center relative justify-center"}
           backgroundImage={`url("${require("@assets/bg.png").default.src}")`}>
        <div className={"w-[70%] h-[70%] scale-[1] translate-y-[50px]  relative flex items-center justify-center"}>
          {
            zones.map((zone, index) => <Zone key={index} index={index} isHover={hoverIndex === index} zone={zone}/>)
          }

          <div className={"absolute top-[73%]"}>
            <Navs/>
          </div>
        </div>


        <div className={"flex justify-center items-end fixed bottom-0 w-full gap-[10px]"}>


          <MenuItem label={"social"} image={require("@assets/menu1.png").default.src}/>
          <MenuItem label={"characters"} image={require("@assets/menu2.png").default.src}/>
          <MenuItem label={"inventory"} image={require("@assets/menu3.png").default.src}/>
          <MenuItem label={"leadeboard"} image={require("@assets/menu4.png").default.src}/>
        </div>
      </Box>
    </VStack>
)
}
