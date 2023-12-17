//@ts-nocheck
//TODO: fix typescript errors
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
import {useWallet} from "@solana/wallet-adapter-react"


const zones = [
  {
    image: require("@assets/zone-1.png").default.src,

    left: "15.5%",
    top: "45.6%",
    width: "23%",
    height: "auto",
    transform: "rotate3d(0,1,1,-10deg) skewX(-7deg) translateY(-210%) translateX(-200%)",
    lineStyle: {
      borderRight: "1px solid #ffffffaa",
      borderTop: "1px solid #ffffffaa",
      width: "100%",
      height: "40%",
      transform: "rotate3d(0,1,1,-10deg) skewX(-7deg) translateY(-230%) translateX(-66.5%)",
    }

  },

  {
    image: require("@assets/zone-2.png").default.src,

    left: "20.5%",
    top: "58.2%",
    width: "26.2%",
    height: "auto",
    transform: "rotate3d(0,1,1,-6deg) skewX(-4deg) translateY(-145%) translateX(-100%)",
    lineStyle: {
      borderRight: "1px solid #ffffffaa",
      borderTop: "1px solid #ffffffaa",
      width: "40%",
      height: "20%",
      transform: "rotate3d(0,1,1,-6deg) skewX(-4deg) translateY(-220%) translateX(-2%)",
    }

  },


  {
    image: require("@assets/zone-3.png").default.src,

    left: "40.33%",
    top: "64.2%",
    width: "15.5%",
    height: "auto",
    transform: "translateY(-130px) translateX(0px)"

  },

  {
    image: require("@assets/zone-6.png").default.src,

    left: "58.83%",
    top: "6.8%",
    width: "41%",
    height: "auto",
    transform: "rotate3d(0,1,1,10deg) skewX(7deg) translateY(-340%) translateX(265%)",
    lineStyle: {
      borderLeft: "1px solid #ffffffaa",
      borderTop: "1px solid #ffffffaa",
      width: "35%",
      height: "65%",
      transform: "rotate3d(0,1,1,10deg) skewX(7deg) translateY(-150%) translateX(176%)",
    }

  },

  {
    image: require("@assets/zone-5.png").default.src,

    left: "58.2%",
    top: "37.8%",
    width: "24%",
    height: "auto",
    transform: "rotate3d(0,1,1,10deg) skewX(7deg)  translateY(-310%) translateX(270%)",
    lineStyle: {
      borderLeft: "1px solid #ffffffaa",
      borderTop: "1px solid #ffffffaa",
      width: "95%",
      height: "35%",
      transform: "rotate3d(0,1,1,10deg) skewX(7deg) translateY(-250%) translateX(77.5%)",
    }

  },


  {
    image: require("@assets/zone-4.png").default.src,

    left: "51.53%",
    top: "58.8%",
    width: "27.5%",
    height: "auto",
    transform: "rotate3d(0,1,1,6deg) skewX(4deg) translateY(-150%) translateX(200%)",
    lineStyle: {
      borderLeft: "1px solid #ffffffaa",
      borderTop: "1px solid #ffffffaa",
      width: "65%",
      height: "20%",
      transform: "rotate3d(0,1,1,6deg) skewX(4deg) translateY(-220%) translateX(68.5%)",
    }

  },


  {
    image: require("@assets/zone-7.png").default.src,

    left: "24.83%",
    top: "-2.2%",
    width: "48%",
    height: "auto",
    transform: "translateY(-315%) translateX(200%)",
    lineStyle: {
      borderLeft: "1px solid #ffffffaa",
      borderTop: "1px solid #ffffffaa",
      width: "30%",
      height: "45%",
      transform: "rotate3d(0, 1, 1, -12deg) skewX(-9deg) translateY(-151%) translateX(111.5%)",
    }


  },

  {
    image: require("@assets/zone-8.png").default.src,

    left: "0%",
    top: "7.8%",
    width: "36%",
    height: "auto",
    transform: "rotate3d(0,1,1,-10deg) skewX(-7deg)  translateY(-230%) translateX(-92%)",
    lineStyle: {
      borderRight: "1px solid #ffffffaa",
      borderTop: "1px solid #ffffffaa",
      width: "40%",
      height: "45%",
      transform: "rotate3d(0, 1, 1, -10deg) skewX(-7deg) translateY(-152%) translateX(7%)",
    }

  },

  {
    image: require("@assets/zone-middle.png").default.src,

    left: "35%",
    top: "33.8%",
    width: "29%",
    height: "auto",
    transform: "translateY(-445%) translateX(-120%)",
    lineStyle: {
      borderLeft: "1px solid #ffffffaa",
      borderBottom: "1px solid #ffffffaa",
      width: "75%",
      height: "45%",
      transform: "rotate3d(0, 1, 1, 23deg) skewX(16deg) translateY(-249%) translateX(-59.5%)",
    }

  },


]

// const helperObj : {currentZone: any, previousZone: any} = {
//   currentZone : null,
//   previousZone: null
// }


export default function Home() {
  const [hoverIndex, setHoverIndex] = useState(-1)
  const [menuVisible, setMenuVisible] = useState(false)
  const [chatVisible, setChatVisible] = useState(false)
  const {publicKey, connected, signIn} = useWallet()


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

    document.addEventListener('mousemove', _.throttle((event) => {
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
    }, 50))


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
          <img className={"absolute"} src={require("@assets/flames.png").default.src}/>
          <img className={"absolute"}  src={require("@assets/clouds.png").default.src}/>

          {
            zones.map((zone, index) => <Zone key={index} index={index} isHover={hoverIndex === index} zone={zone}/>)
          }

          <div className={"absolute top-[73%]"}>
            <Navs/>
          </div>
        </div>


        <div className={"flex justify-center items-end fixed bottom-0 w-full gap-[10px]"}>


          <MenuItem label={"User Profile"} image={require("@assets/characters.png").default.src}/>
          <MenuItem label={"characters"} image={require("@assets/inventory.png").default.src}/>
          <MenuItem label={"inventory"} image={require("@assets/leaderboard.png").default.src}/>
          <MenuItem label={"game documents"} image={require("@assets/social.png").default.src}/>
        </div>
        <div className={"fixed bottom-[30px] left-[30px]"}>
          <div id="side-panel" className={"ui panel !h-[300px] mb-[30px] " + (menuVisible ? " " : "hide ")}>
            <div className="content">
              <div className={""}>
                Profile
              </div>
              <div className={""}>
                Asset Manager
              </div>
              <div className={""}>
                Connect Socials
              </div>
              <div className={""}>
                Log Out
              </div>

            </div>
          </div>


          <div onClick={() => {
            setMenuVisible(prev => !prev)
          }} className={"cursor-pointer flex gap-[20px] items-center justify-center"}>
            <img className={"w-[70px] h-[70px] bg-[#5865F2] rounded-full"}
                 src={require("@assets/profile.png").default.src}/>
            <div className={"ui panel orbitron gap-[10px] p-[10px]"}>
              <div className={"content"}>
                <div>Wallet</div>
                <div className={"font-[12px]"}>{publicKey && (publicKey.toString().substring(0, 20) + "...")}</div>
              </div>

            </div>
          </div>

        </div>

        <div className={"fixed bottom-[30px] right-[30px] w-[400px]"}>
          <div id="side-panel" className={"ui panel !h-[300px] mb-[30px] " + (chatVisible ? " " : "hide ")}>
            <div className="content">
              <div className={"flex items-center gap-[20px]"}>
                <img className={"w-[40px] h-[40px] bg-[#5865F2] rounded-full"}
                     src={require("@assets/profile.png").default.src}/>
                <div className={"flex flex-col gap-[5px]"}>
                  <div>
                    Foreson
                  </div>
                  <div className={"text-[12px] text-[#fff]"}>
                    LOREM IPSUM LOREM IPSUM LOREM
                  </div>
                </div>
              </div>

              <div className={"flex items-center gap-[20px]"}>
                <img className={"w-[40px] h-[40px] bg-[#5865F2] rounded-full"}
                     src={require("@assets/profile.png").default.src}/>
                <div className={"flex flex-col gap-[5px]"}>
                  <div>
                    Foreson
                  </div>
                  <div className={"text-[12px] text-[#fff]"}>
                    LOREM IPSUM LOREM IPSUM LOREM
                  </div>
                </div>
              </div>

              <div className={"flex items-center gap-[20px]"}>
                <img className={"w-[40px] h-[40px] bg-[#5865F2] rounded-full"}
                     src={require("@assets/profile.png").default.src}/>
                <div className={"flex flex-col gap-[5px]"}>
                  <div>
                    Foreson
                  </div>
                  <div className={"text-[12px] text-[#fff]"}>
                    LOREM IPSUM LOREM IPSUM LOREM
                  </div>
                </div>
              </div>

              <div className={"flex items-center gap-[20px]"}>
                <img className={"w-[40px] h-[40px] bg-[#5865F2] rounded-full"}
                     src={require("@assets/profile.png").default.src}/>
                <div className={"flex flex-col gap-[5px]"}>
                  <div>
                    Foreson
                  </div>
                  <div className={"text-[12px] text-[#fff]"}>
                    LOREM IPSUM LOREM IPSUM LOREM
                  </div>
                </div>
              </div>

            </div>
          </div>


          <div onClick={() => {
            setChatVisible(prev => !prev)
          }} className={"cursor-pointer flex gap-[20px] items-center justify-center"}>
            <div className={"ui panel orbitron gap-[10px] p-[10px]"}>
              <div className={"content"}>
                <div>Chat</div>
              </div>

            </div>
          </div>

        </div>
      </Box>
    </VStack>
  )
}
