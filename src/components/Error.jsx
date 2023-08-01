import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  console.error(error);

    return (
      <>
        <p>How did you get all the way out here?</p>
        <p>{error.statusText || error.message}</p>
      </>
    )
  }
  
  export default Error