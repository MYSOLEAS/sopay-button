let params;
let origin;
window.onload = function(){
    window.opener.postMessage('isReady', '*')
} 
window.addEventListener("message", (event) => {
// Do we trust the sender of this message?  (might be
// different from what we originally opened, for example).
if (event.origin !== window.location.origin)
    params = event.data
    origin = event.origin
    $("#detail_amount").html(`${params.currency}`)
    $("#detail_description").html(`${params.description}`)
// event.source is popup
// event.data is "hi there yourself!  the secret response is: rheeeeet!"
}, false);

//Tip
 function tip({elem, successUrl, currency, description, businessName, orderId, apiKey}) {
    const services = ["#momo", "#eu", "#om", "#bitcoin", "#paypal", "#pm"]
    const amount = $(`${elem}_amount`).val()
    const wallet = $(`${elem}_wallet`).val()
    const service = $(`${elem}_service`).val()
    const payer = $('#payer_name').val()
    const otp = $(`${elem}_otp`).val()
    const url = "https://soleaspay.com/api/agent/bills";
    // Init JQuery
   
    const callback = (res) =>{
        if(res.success && params.loadInvoice){
            const propsObject = {
            outputType: "save",
            returnJsPDFDocObject: true,
            fileName: `Invoicing-${businessName}`,
            orientationLandscape: false,
            logo: {
                src: "https://soleaspay.com/qr/pay/asset/sopay.png",
                width: 43.33, //aspect ratio = width/height
                height: 26.66,
                margin: {
                    top: 0, //negative or positive num, from the current position
                    left: 0 //negative or positive num, from the current position
                }
            },
            business: {
                name: businessName,
            },
            contact: {
                label: "Invoice issued for:",
                name: payer,
                otherInfo: "https://app.soleaspay.com",
            },
            invoice: {
                label: "Invoice #: ",
                num: res.data.payId,
                invDate: `Payment Date: ${new Date().toDateString()}`,
                headerBorder: false,
                tableBodyBorder: false,
                header: ["Ref", "Description", "Price"],
                table: [[`${res.data.payId}`, `${description}`, amount]],
                invTotalLabel: "Total:",
                invTotal: `${amount}`,
                invCurrency: currency,
                // invDescLabel: "Invoice Note",
                // invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
            },
            footer: {
                text: "SoleasPay Payment Gateway",
            },
            pageEnable: false,
        }

        jsPDFInvoiceTemplate.default( propsObject );
        }
        
        handleSendResponse(res);
        setTimeout(()=>window.close(), 5000)
    }
    switch (elem) {
        case '#om':
            $("#loader").show()
            $.ajax({
                type: "POST",
                beforeSend: function (request){
                },
                url: url,
                dataType : 'JSON',
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": `${apiKey}`,
                    "operation": "2",
                    "service": `${service}`,
                    "otp": `${otp}`
                },
                data: JSON.stringify({
                     amount: amount,
                      wallet: wallet,
                       currency: currency,
                        description,
                         payer,
                         "order_id" : orderId,
                    })
            })
            .done(function (res){
                    callback(res)
            })
            .fail((err)=>console.error(err))
            .always(function () {
                $("#loader").hide()
            })
            break;
        case '#momo':
            $("#loader").show()
            //Alert user to confirm on his mobile phone
            $.alert({
                title: lang.momo.title,
                content: lang.momo.content,
            });
            $.ajax({
                type: "POST",
                beforeSend: function (request){
                },
                url: url,
                dataType : 'JSON',
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": `${apiKey}`,
                    "operation": "2",
                    "service": `${service}`,
                    "otp": `${otp}`
                },
                data: JSON.stringify({
                     amount: amount,
                      wallet: wallet,
                      currency: currency,
                       description,
                        payer,
                        "order_id" : orderId,
                    })
            })
            .done(function(res){
                callback(res)
            })
            .fail((err)=>console.error(err))
            .always(function () {
                $("#loader").hide()
            })
            break;
            case '#eu':
                $("#loader").show()
                //Alert user to confirm on his mobile phone
                $.alert({
                    title: lang.eu.title,
                    content: lang.eu.content,
                });
                $.ajax({
                    type: "POST",
                    beforeSend: function (request){
                    },
                    url: url,
                    dataType : 'JSON',
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": `${apiKey}`,
                        "operation": "2",
                        "service": `${service}`,
                        "otp": `${otp}`
                    },
                    data: JSON.stringify({ amount, wallet, currency, description, payer, "order_id" : orderId })
                })
                .done(function (res){
                    callback(res)
                })
                .fail((err)=>console.error(err))
                .always(function () {
                    $("#loader").hide()
                })
                break;
                case '#bitcoin':
                    $("#loader").show()
                $.ajax({
                    type: "POST",
                    beforeSend: function (request){
                    },
                    url: url,
                    dataType : 'JSON',
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": `${apiKey}`,
                        "operation": "2",
                        "service": `${service}`,
                    },
                    data: JSON.stringify({ amount, currency, description, payer, "order_id" : orderId})
                })
                .done(function (res){
                    if(res.success){
                        $.alert({
                            title: lang.bitcoin.title,
                            content: `${lang.bitcoin.title}. <br>
                                    
                                    <div class="alert alert-secondary" role="alert">
                                    <div id="qrcode"></div>
                                    <input type="text" value="${res.data.wallet}" disabled id="myInput">
                                        <input type="button" value="Copy wallet" class="btn btn-default" onclick="copyToClipboard(); this.value='Copied!'">
                                    </div>
                                       <br> ${lang.bitcoin.total} : <b>${res.data.value} ${res.data.currency}</b>`,
                            
                        });
                       
                    }       
                    handleSendResponse(res)     //Alert user to confirm on his mobile phone
                   
                })
                .fail((err)=>console.error(err))
                .always(function () {
                    $("#loader").hide()
                })
                    break;
                case '#paypal':
                    $("#loader").show()
                    $.ajax({
                        type: "POST",
                        beforeSend: function (request){
                        },
                        url: url,
                        dataType : 'JSON',
                        headers: {
                            "Content-Type": "application/json",
                            "x-api-key": `${apiKey}`,
                            "operation": "2",
                            "service": `${service}`
                        },
                        data: JSON.stringify({ amount, wallet, currency, description, payer, "order_id" : orderId})
                    })
                    .done(function (res){
                        if(res.success){
                            //$.alert({ title: 'Success!', content:'Transaction succeed '+ details.payer.name.given_name + ' amount : ' + data['amount']});
                            window.open(`${res.data.payLink}`, 'newwindow', 'width=900, height=800')

                        }
                         //Alert user to confirm on his mobile phone
                         handleSendResponse(res)
                        setTimeout(()=>window.close(), 5000)
                       
                    })
                    .fail((err)=>console.error(err))
                    .always(function () {
                        $("#loader").hide()
                    })
                    
                    break;
                    case '#pm':
                        $("#loader").show()
                        $.ajax({
                            type: "POST",
                            beforeSend: function (request){
                            },
                            url: url,
                            dataType : 'JSON',
                            headers: {
                                "Content-Type": "application/json",
                                "x-api-key": `${apiKey}`,
                                "operation": "2",
                                "service": `${service}`,

                            },
                            data: JSON.stringify({ amount, currency, description, payer, "order_id" : orderId})
                        })
                        .done(function (res){
                            if(res.success){
                                window.open(`https://soleaspay.com/pm/pay.html?amount=${amount}&ref=${res.data.payId}&currency=${currency}&successUrl=${successUrl}`, 'newwindow', 'width=900, height=800');
                                
                            }
                            handleSendResponse(res)
                            setTimeout(()=>window.close(), 5000)                //Alert user to confirm on his mobile phone
                           
                        })
                        .fail((err)=>console.error(err))
                        .always(function () {
                            $("#loader").hide()
                        })
                        break;
                    default:
                        break;
            
                }
        }
            //Orange Money
            $("#om_form").submit(function(e) {
            e.preventDefault();
            params.elem = "#om";
            tip(params)
            });
            //Mobile money
            $("#momo_form").submit(function(e) {
                e.preventDefault();
                params.elem = "#momo";
                tip(params)
            });

            
           
            //Express Union 
            $("#eu_form").submit(function(e) {
                e.preventDefault();
                params.elem = "#eu";
                tip(params)
            });
            //Bitcoin
            $("#bitcoin_form").submit(function(e) {
                e.preventDefault();
                params.elem = "#bitcoin";
                tip(params)
            });

            //Perfect money
            $("#pm_form").submit(function(e) {
                e.preventDefault();
                params.elem = "#pm";
                tip(params)
            });
            //Paypal
            $("#paypal_form").submit(function(e) {
                e.preventDefault();
                params.elem = "#paypal";
                tip(params)
            });
            $("#detail_amount").html(`${params.currency}`)
            $("#detail_description").html(`${params.description}`)
            
            //Utils
            function copyToClipboard() {
                /* Get the text field */
                var copyText = document.getElementById("myInput");
            
                /* Select the text field */
                copyText.select();
                copyText.setSelectionRange(0, 99999); /* For mobile devices */
            
                /* Copy the text inside the text field */
                navigator.clipboard.writeText(copyText.value);
            
            }
            function handleSendResponse(data){
                window.opener.postMessage(data, origin)
            }