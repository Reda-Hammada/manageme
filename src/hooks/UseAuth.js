import {useState} from 'react';

function UseAuth({acces_token}) {  

  const [accessToken, setAccessToken] = useState(null);

  const setUser = (acces_token) =>{

      setAccessToken(acces_token);
      
  }

}
export default UseAuth;