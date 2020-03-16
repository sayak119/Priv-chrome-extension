//chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
//    var data = request.data || {};
//    var required_url="";
//    var linksList = document.querySelectorAll('a');
//    for(var i =0; i < linksList.length;i++)
//    {
//        var a_tag_name=linksList[i].innerText ;
//        if (a_tag_name =="Terms")
//            {
//                required_url=linksList[i].getAttribute("href");
//            }
//            
//    }
//    console.log(required_url);
//    sendResponse({data: required_url, success: true});
//    
//});
//

function isPathAbsolute(path) {
  return /^(?:\/|[a-z]+:\/\/)/.test(path);
}
function checkforhttp_tag(path){
     return path.includes("http");
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if(request.data=="FindLink")
          {
                var linksList = document.querySelectorAll('a');
               for(var i =0; i < linksList.length;i++)
                {
                    var a_tag_name=linksList[i].innerText ;
                    terms_promise_words=['terms','service','term','condition','conditions'];
                    //if (a_tag_name.toLowerCase().includes("terms"))
                    if(terms_promise_words.some(substring=>a_tag_name.toLowerCase().includes(substring)))
                        {
                            required_url=linksList[i].getAttribute("href");
                            var status_=isPathAbsolute(required_url);
                            if(!status_)
                            {
                                var absolute_path=location.href;
                                required_url=absolute_path+required_url;
                            }
                            if(!checkforhttp_tag(required_url)){
                                var absolute_path=location.href;
                                required_url=absolute_path+required_url;
                            }
                        }

                }
                console.log(required_url);
                  sendResponse({data: required_url});
          }
      if(request.data=="Summarize")
          {
              var body_tag=document.querySelectorAll("body");
              var body_text=body_tag[0].innerText;
              console.log(body_text);
              Text_promise_words=['Terms','Service'];
              if(body_text.length > 200 && Text_promise_words.some(substring=>body_text.includes(substring)))
                  {
//                      replace_chars_list=['\"','”','“']
                      body_text=body_text.replace(/["|:|”|“|\r\n|\n|\r|\t]/g,' ');
                      body_text=body_text.trim()
                      sendResponse({data: body_text});
                      
                  }
              
          }
  });
