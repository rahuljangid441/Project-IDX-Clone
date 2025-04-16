import usePing from "../../hooks/apis/queries/usePing";


function PingComponent(){


    const { isLoading , data } = usePing();
      console.log("data" , data);
      if(isLoading){
        return (
          <>
            Loading...
          </>
        )
      }
      return (
        <>
          hello {data.message}
        </>
      )
}

export default PingComponent;