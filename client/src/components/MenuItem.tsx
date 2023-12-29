export default function MenuItem({label, onClick, image}: any) {


  return <div onClick={onClick}
              className={"flex flex-col items-center justify-center gap-[10px] cursor-pointer transition-all hover:brightness-125"}>
    <div className={"uppercase flex justify-center items-center orbitron"}>
      {label}
    </div>
    <img className={"w-[130px] h-[130px] border border-[#939393]"} style={{
      border: "1px solid #939393"
    }} src={image}/>

  </div>
}