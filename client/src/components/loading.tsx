export default function Loading({isLoading}: any) {


  return <div className={"container transition-all " + (!isLoading ? " opacity-0 pointer-events-none" : "")}>
    <div className="row">
      <div className="col dark">
        <div className="loader">
          <span data-flicker-0="LOAD" data-flicker-1="ING" className="loader-text">LOADING</span>
        </div>
      </div>
    </div>
  </div>
}