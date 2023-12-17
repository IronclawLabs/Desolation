import {Zone} from "@sharedtypes/AllTypes"

interface ZoneProps {
  zone: Zone,
  isHover: boolean,
  index: number,
}

export default function Zone({index, zone, isHover}: ZoneProps) {


  return <img id={index + ""}
              src={zone.image}
              className={"zone absolute cursor-pointer left-0 right-0 transition-all duration-75 " + (isHover ? " brightness-125" : "")}
              style={{
                left: zone.left,
                top: zone.top,
                width: zone.width,
                height: zone.height
              }}/>
}