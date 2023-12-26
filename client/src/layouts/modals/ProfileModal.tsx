import ModalWrapper from "@/layouts/modals/ModalWrapper"
import {getAssetUrl} from "@/init.ts"


export default function ProfileModal() {
  const CustomInput = (name, value) => {
    return <div className={"w-[45%] border rounded px-[20px] py-[10px] flex flex-col gap-[5px] w-[300px]"}>
      <div className={"text-[#888]"}>{name}</div>
      <div className={"text-[24px]"}>{value}</div>
    </div>
  }

  return <div className={"w-[1000px] h-[600px] flex flex-col border border-[#fff] uppercase bg-[#000000AA]"}>
    <div className={"flex w-full justify-start gap-[50px] p-[30px] border-b border-[#c1c1c1]"}>
      <img src={getAssetUrl("./src/assets/profile.png")} className={" bg-[#000]"}/>
      <div className={"flex flex-col gap-[5px] w-[200px]"}>
        <div>display name</div>
        <div className={"px-[10px] py-[5px] border rounded"}>
          FORESEON_
        </div>
      </div>
    </div>
    <div className={"text-[24px] p-[25px]"}>STATS</div>
    <div className={"flex justify-center gap-[20px] flex-wrap p-[20px] px-[40px]"}>
      {CustomInput("hours played", "3 days 14 hours")}
      {CustomInput("MISSIONs COMPLETED", "22")}
      {CustomInput("$DESO LOOTED", "2234,44  $DESO")}
      {CustomInput("0DAY ATTACK/DEFENCE EARNED", "582,33 $DESO")}
      {CustomInput("HOURS SPENT IN JAIL", "8 DAYS 14 Hours")}
      {CustomInput("DESOLATION OWNED", "18")}
    </div>
  </div>
}