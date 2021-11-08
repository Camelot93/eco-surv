 export default async function CallFetch(url:RequestInfo):Promise<Object | String | null> { 

    const requestOptions: Object = {
    method: 'GET',
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'omit', 
    referrerPolicy: 'no-referrer', 
    }

   try{
    const response = await fetch(url, requestOptions);
    const result = await response.json()
    return result.message

   }catch(e){
    console.log(e)
    return null
   }

}
