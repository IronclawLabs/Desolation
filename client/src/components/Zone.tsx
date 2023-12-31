import {ZoneType} from "@sharedtypes/AllTypes"
import {useContext} from "react"
import {GlobalStateContext} from "@/App.tsx"

interface ZoneProps {
  zone: ZoneType,
  isHover: boolean,
  index: number,
}

export default function Zone({index, zone, isHover}: ZoneProps) {

  const {globalState, setGlobal} = useContext(GlobalStateContext)

  isHover = isHover && globalState.currentModal === ""

  return <div className={"absolute "} style={{
    left: zone.left,
    top: zone.top,
    width: zone.width,
    height: zone.height
  }}>
    <img id={index + ""}
         src={zone.image}
         className={"zone  cursor-pointer transition-all duration-75 " + (isHover ? " brightness-125" : "")}
    />
    <div className={"absolute ui panel z-[3] !w-[200px] !h-[100px] " + (isHover ? " opacity-100" : "opacity-0")}
         style={{
           transform: zone.transform,
           transformOrigin: "left center"
         }}>
      <div className={"content orbitron text-[14px] "}>
        <div className={"!mt-[15px]"}>
          NFTs on mission: <span className={"text-[#fff]"}>150</span>
        </div>

        <div>
          Hourly Emission: <span className={"text-[#fff]"}>253,000</span>
        </div>

      </div>
    </div>
    <div className={"absolute z-[4] " + (isHover ? " opacity-100" : "opacity-0")} style={zone.lineStyle}>

    </div>
  </div>
}