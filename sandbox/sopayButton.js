// Init Sopay Button
const scripts = document.getElementById('SBScript');
const language = scripts.getAttribute("data-lang");
//Plugin
const SopayButton = {
    billing: function({businessName, amount, description, currency, btnTitle, successUrl, ref}){

        return new Promise((resolve, reject)=>{
            const scripts = document.getElementById('SBScript');
            const apiKey = scripts.getAttribute("data-apikey");
             
            const params = {
                businessName,
                amount : amount,
                description,
                currency,
                btnTitle,
                successUrl,
                ref,
                apiKey,
            };
            // laod sopay button page
             // Init JQuery
            localStorage.setItem('sopaybuttonStorageKey', JSON.stringify(params));
            let initParams = JSON.parse(localStorage.getItem('sopaybuttonStorageKey'))
            if(initParams){
                const jquery = document.createElement('script');
                jquery.src = "https://code.jquery.com/jquery-3.5.0.js";
                document.getElementsByTagName('head')[0].appendChild(jquery);
                jquery.onload = function() {
                    $( ".sopayButton" ).load(`https://soleaspay.com/sandbox/test/SopayButtonBill${language == 'fr'? 'Fr':'En'}.html`, function (){
                        // Save params in session storage
                    //    localStorage.setItem('sopaybuttonStorageKey', JSON.stringify(params));
                    });
                };
            }
            
            const subscribe = setInterval(()=>{
                let params = JSON.parse(localStorage.getItem('sopaybuttonStorageKey'))
                if(params.res){
                    if(params.res.success == true){
                        resolve(params.res);
                    }
                    
                    if(params.res.success == false){
                        reject(params.res);
                    }
                    delete params.res;
                    localStorage.setItem('sopaybuttonStorageKey', JSON.stringify(params));
                    clearInterval(subscribe);
                }
            },1000);

        });        
    },
    tiping: function ({businessName, btnTitle, successUrl, currency, description, ref}){

        return new Promise((resolve, reject)=>{
            const scripts = document.getElementById('SBScript');
            const apiKey = scripts.getAttribute("data-apikey");
            
            const params = {
                businessName,
                description,
                currency,
                btnTitle,
                successUrl,
                ref,
                apiKey,
            };
            
            // Init JQuery
            localStorage.setItem('sopaybuttonStorageKey', JSON.stringify(params));
            let initParams = JSON.parse(localStorage.getItem('sopaybuttonStorageKey'))
            if(initParams){
                const jquery = document.createElement('script');
                jquery.src = "https://code.jquery.com/jquery-3.5.0.js";
                document.getElementsByTagName('head')[0].appendChild(jquery);
                jquery.onload = function() {
                    $(".sopayButton").load(`https://soleaspay.com/sandbox/test/SopayButtonTip${language == 'fr'? 'Fr':'En'}.html`, function(){
                        // Save params in session storage
                        //localStorage.setItem('sopaybuttonStorageKey', JSON.stringify(params));
                    })
                }
            }
            
            const subscribe = setInterval(()=>{
                let params = JSON.parse(localStorage.getItem('sopaybuttonStorageKey'))
                if(params.res){
                    if(params.res.success == true){
                        resolve(params.res);
                    }
                    if(params.res.success == false){
                        reject(params.res);
                    }
                    delete params.res;
                    localStorage.setItem('sopaybuttonStorageKey', JSON.stringify(params));
                    clearInterval(subscribe);
                }
            },1000);
        });   
    }
}



