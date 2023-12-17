import {Zone} from "@sharedtypes/AllTypes"

interface ZoneProps {
  zone: Zone,
  isHover: boolean,
  index: number,
}

export default function Zone({index, zone, isHover}: ZoneProps) {


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
    <div className={"absolute ui panel z-[3] !w-[200px] !h-[100px] "} style={{
      transform: zone.transform,
      transformOrigin: "left center"
    }}>
			<div className={"content orbitron text-[14px] " + (isHover ? " brightness-125" : "brightness-90")}>
        <div className={"!mt-[15px]"}>
          NFTs on mission: <span className={"text-[#fff]"}>150</span>
        </div>

        <div>
          Hourly Emission: <span className={"text-[#fff]"}>253,000</span>
        </div>

      </div>
    </div>
    <div className={"absolute z-[4]"} style={zone.lineStyle}>

    </div>
  </div>
}