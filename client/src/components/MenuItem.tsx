



export default function MenuItem({label, image} : any) {


  return <div className={"flex flex-col items-center justify-center gap-[10px] cursor-pointer transition-all hover:brightness-125"}>
    <div className={"uppercase flex justify-center items-center orbitron"}>
      {label}
    </div>
    <img className={"w-[150px] h-[100px]"} src={image}/>

  </div>
}