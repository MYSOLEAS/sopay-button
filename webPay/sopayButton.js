// Init Sopay Button
const scripts = document.getElementById('SBScript');
const language = scripts.getAttribute("data-lang");
//Plugin
const SopayButton = {
    billing: function({businessName, amount, description, orderId, currency, btnTitle, successUrl, loadInvoice, ref}){

        return new Promise((resolve, reject)=>{
            const scripts = document.getElementById('SBScript');
            const apiKey = scripts.getAttribute("data-apikey");
             
            const params = {
                businessName,
                amount,
                description,
                currency,
                btnTitle,
                successUrl,
                orderId,
                apiKey,
                loadInvoice,
                ref
            };
            // laod sopay button page
             // Init JQuery
            localStorage.setItem('sopaybuttonStorageKey', JSON.stringify(params));
            let initParams = JSON.parse(localStorage.getItem('sopaybuttonStorageKey'))
            if(initParams){
                if(!window.jQuery) {
                    const jquery = document.createElement('script');
                    jquery.src = "https://code.jquery.com/jquery-3.5.0.js";
                    document.getElementsByTagName('head')[0].appendChild(jquery);
                    jquery.onload = function() {
                        $( ".sopayButton" ).load(`https://soleaspay.com/webPay/v2/SopayButtonBill${language == 'fr'? 'Fr':'En'}.html`, function (){
                            // Save params in session storage
                        //    localStorage.setItem('sopaybuttonStorageKey', JSON.stringify(params));
                        });
                    };
                }else{
                    $( ".sopayButton" ).load(`https://soleaspay.com/webPay/v2/SopayButtonBill${language == 'fr'? 'Fr':'En'}.html`, function (){
                    });
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
    },
    tiping: function ({businessName, btnTitle, orderId, successUrl, currency, description, loadInvoice, ref}){

        return new Promise((resolve, reject)=>{
            const scripts = document.getElementById('SBScript');
            const apiKey = scripts.getAttribute("data-apikey");
            
            const params = {
                businessName,
                description,
                currency,
                btnTitle,
                successUrl,
                orderId,
                apiKey,
                loadInvoice,
                ref
            };
            
            // Init JQuery
            localStorage.setItem('sopaybuttonStorageKey', JSON.stringify(params));
            let initParams = JSON.parse(localStorage.getItem('sopaybuttonStorageKey'))
            if(initParams){
                if(!window.jQuery) {
                    const jquery = document.createElement('script');
                    jquery.src = "https://code.jquery.com/jquery-3.5.0.js";
                    document.getElementsByTagName('head')[0].appendChild(jquery);
                    jquery.onload = function() {
                        $(".sopayButton").load(`https://soleaspay.com/webPay/v2/SopayButtonTip${language == 'fr'? 'Fr':'En'}.html`, function(){
                            // Save params in session storage
                            //localStorage.setItem('sopaybuttonStorageKey', JSON.stringify(params));
                        })
                    }
                }else{
                    $(".sopayButton").load(`https://soleaspay.com/webPay/v2/SopayButtonTip${language == 'fr'? 'Fr':'En'}.html`, function(){
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
                    initButton() 
                }
            },1000);
        });   
    }
}



