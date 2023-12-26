import {useContext} from "react"
import ProfileModal from "@/layouts/modals/ProfileModal"
import {GlobalStateContext} from "@/App.tsx"


export default function ModalsContainer() {
  const {globalState, setGlobal} = useContext(GlobalStateContext)


  return <div
    onClick={() => {
      setGlobal({currentModal: ""})
    }}
    className={"bg-[#00000077] z-[15] transition-all fixed left-0 top-0 w-[100dvw] h-[100dvh] flex items-center justify-center "
      + (globalState.currentModal !== "" ? " opacity-100 " : " opacity-0 pointer-events-none")}>
    {
      globalState.currentModal === "profile" ? <ProfileModal></ProfileModal>
        : <></>
    }
  </div>
}