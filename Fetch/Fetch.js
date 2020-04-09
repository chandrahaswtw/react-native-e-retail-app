const FetchFunc = (URL, METHOD, BODY = "") => {
   return fetch(URL,{
        method : METHOD,
        headers : {
            'Content-Type' : "application/json"
        },
        body : JSON.stringify(BODY)
    })
}

export default FetchFunc