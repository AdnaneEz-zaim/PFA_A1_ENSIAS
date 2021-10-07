
//user-dropdown
$("#user").click(function(){
    $(".dropdown-menu").slideToggle();
    });

//textarea--on overflow rraise rows
//  (function($){
     
//    $.fn.autoResize = function(options) {
       
//        // Just some abstracted details,
//        // to make plugin users happy:
//        var settings = $.extend({
//            onResize : function(){},
//            animate : true,
//            animateDuration : 150,
//            animateCallback : function(){},
//            extraSpace : 20,
//            limit: 1000
//        }, options);
       
//        // Only textarea's auto-resize:
//        this.filter('textarea').each(function(){
           
//                // Get rid of scrollbars and disable WebKit resizing:
//            var textarea = $(this).css({resize:'none','overflow-y':'hidden'}),
           
//                // Cache original height, for use later:
//                origHeight = textarea.height(),
               
//                // Need clone of textarea, hidden off screen:
//                clone = (function(){
                   
//                    // Properties which may effect space taken up by chracters:
//                    var props = ['height','width','lineHeight','textDecoration','letterSpacing'],
//                        propOb = {};
                       
//                    // Create object of styles to apply:
//                    $.each(props, function(i, prop){
//                        propOb[prop] = textarea.css(prop);
//                    });
                   
//                    // Clone the actual textarea removing unique properties
//                    // and insert before original textarea:
//                    return textarea.clone().removeAttr('id').removeAttr('name').css({
//                        position: 'absolute',
//                        top: 0,
//                        left: -9999
//                    }).css(propOb).attr('tabIndex','-1').insertBefore(textarea);
         
//                })(),
//                lastScrollTop = null,
//                updateSize = function() {
         
//                    // Prepare the clone:
//                    clone.height(0).val($(this).val()).scrollTop(10000);
         
//                    // Find the height of text:
//                    var scrollTop = Math.max(clone.scrollTop(), origHeight) + settings.extraSpace,
//                        toChange = $(this).add(clone);
           
//                    // Don't do anything if scrollTip hasen't changed:
//                    if (lastScrollTop === scrollTop) { return; }
//                    lastScrollTop = scrollTop;
         
//                    // Check for limit:
//                    if ( scrollTop >= settings.limit ) {
//                        $(this).css('overflow-y','');
//                        return;
//                    }
//                    // Fire off callback:
//                    settings.onResize.call(this);
         
//                    // Either animate or directly apply height:
//                    settings.animate && textarea.css('display') === 'block' ?
//                        toChange.stop().animate({height:scrollTop}, settings.animateDuration, settings.animateCallback)
//                        : toChange.height(scrollTop);
//                };
           
//            // Bind namespaced handlers to appropriate events:
//            textarea
//                .unbind('.dynSiz')
//                .bind('keyup.dynSiz', updateSize)
//                .bind('keydown.dynSiz', updateSize)
//                .bind('change.dynSiz', updateSize);
           
//        });
       
//        // Chain:
//        return this;
       
//    };
   
   
   
//  })(jQuery);
//  $("textarea").autoResize();
 //-------------------------------------
 //--create_form

var quest_count=0;
var opt_count=0;
function createQuestion(type){
    quest_count++;
    opt_count=0;
    const question=document.createElement("textarea");
    question.setAttribute("class","question d-block");
    question.setAttribute("placeholder","Question");
    question.setAttribute("name","question:");
    question.setAttribute("rows","1");
    question.setAttribute("data-type",type);
    return question;
}

function createOpt(is_choice_unique){
    opt_count++;
    var option_response=document.createElement("div");
        option_response.setAttribute("class","option-response d-flex");
            let check_response=document.createElement("div");
                check_response.setAttribute("class","check-response");
                let checkboxOpt=document.createElement("input");
                if(is_choice_unique)checkboxOpt.setAttribute("type","radio");
                else checkboxOpt.setAttribute("type","checkbox");
                checkboxOpt.setAttribute("name","opt");
                let optionDesc=document.createElement("textarea");
                optionDesc.setAttribute("class","response-desc");
                optionDesc.setAttribute("placeholder","option 1...");
                optionDesc.setAttribute("name","opt:"+opt_count+"-quest:"+quest_count);
                optionDesc.setAttribute("rows","1");
                check_response.appendChild(checkboxOpt);
                check_response.appendChild(optionDesc);
            let plus_minus=document.createElement("span");
                let minus_opt=document.createElement("i");
                minus_opt.setAttribute("class","bi bi-dash-circle");
                minus_opt.onclick=function(){
                    if(option_response.parentNode.querySelectorAll(".option-response").length<=2){
                        option_response.parentNode.querySelectorAll(".option-response")[0].querySelector(".bi-dash-circle").remove();
                    }
                    option_response.remove();                    
                }
                let plus_opt=document.createElement("i");
                plus_opt.setAttribute("class","bi bi-plus-circle");                              
                plus_minus.appendChild(plus_opt);
                plus_minus.appendChild(minus_opt);
                plus_opt.onclick=function(){
                    option_response.parentNode.appendChild(createOpt(is_choice_unique));
                    if(plus_minus.querySelectorAll("i").length==1)
                        {plus_minus.appendChild(minus_opt);}
                    // $("textarea").autoResize();
                    
                }
                option_response.appendChild(check_response);
                option_response.appendChild(plus_minus);
        return option_response;}

function createTextResponse(){
    var response=document.createElement("textarea");
    response.setAttribute("class","response");
    response.setAttribute("placeholder","Enter your response here....");
    response.setAttribute("name","textResponse-quest:"+quest_count);
    response.setAttribute("rows","5");
    return response;
}

function createMultipleChoiceResponse(is_choice_unique){
        var option_block=document.createElement("div");
        let option=createOpt(is_choice_unique);
        option_block.appendChild(option);
        return option_block;}
    
function createAdditionalTools(){
    let tools_wrapper=document.createElement("div");
    tools_wrapper.setAttribute("class","additional-tools d-flex");

        let trash=document.createElement("i");
        trash.setAttribute("class","bi bi-trash");
        trash.onclick = function(){
            tools_wrapper.parentNode.remove();
        }

        let is_required=document.createElement("div");
            
            let is_required_check=document.createElement("input");
            is_required_check.setAttribute("class","is-required");
            is_required_check.setAttribute("type","checkbox");
            is_required_check.setAttribute("name","is_required-quest:"+quest_count);

            let spanRe=document.createElement("span");
            spanRe.innerText="required";

            is_required.appendChild(is_required_check);
            is_required.appendChild(spanRe);

        tools_wrapper.appendChild(trash);
        tools_wrapper.appendChild(is_required);
    return tools_wrapper;

        
}
function addTextQuestion() {
    let quest_wrapper=document.createElement("div");
    quest_wrapper.setAttribute("class","wrapper-quest quest-text row");
    let question=createQuestion("text");
    let response=createTextResponse();
    let tools=createAdditionalTools();
    quest_wrapper.appendChild(question);
    quest_wrapper.appendChild(response);
    quest_wrapper.appendChild(tools);
    quest_wrapper.onmouseenter=function(){
            $(this).addClass("rowActive");
    };
    quest_wrapper.onmouseleave=function(){
        $(this).removeClass("rowActive");
    } ; 
    $("#form").append(quest_wrapper);
    // $("textarea").autoResize();
}
function addMultipleChoiceQuest(){
    let quest_wrapper=document.createElement("div");
    quest_wrapper.setAttribute("class","wrapper-quest quest-text row");
    let question=createQuestion("checkbox");
    let response=createMultipleChoiceResponse(false);
    let tools=createAdditionalTools();
    quest_wrapper.appendChild(question);
    quest_wrapper.appendChild(response);
    quest_wrapper.appendChild(tools);
    quest_wrapper.onmouseenter=function(){
            $(this).addClass("rowActive");
    };
    quest_wrapper.onmouseleave=function(){
        $(this).removeClass("rowActive");
    };  
    $("#form").append(quest_wrapper);
    // $("textarea").autoResize();
    
}
function addUniqueChoiceQuest(){
    let quest_wrapper=document.createElement("div");
    quest_wrapper.setAttribute("class","wrapper-quest quest-text row");
    let question=createQuestion("radio");
    let response=createMultipleChoiceResponse(true);
    let tools=createAdditionalTools();
    quest_wrapper.appendChild(question);
    quest_wrapper.appendChild(response);
    quest_wrapper.appendChild(tools);
    quest_wrapper.onmouseenter=function(){
            $(this).addClass("rowActive");
    };
    quest_wrapper.onmouseleave=function(){
        $(this).removeClass("rowActive");
    };      

    $("#form").append(quest_wrapper);
    // $("textarea").autoResize();
    
}
var url=window.location.href;
function send_data(){
    var data={};
    data['title']=document.getElementById("title").value;
    data['desc']=document.getElementById("desc").value;
    data['csrfmiddlewaretoken']=document.getElementsByName('csrfmiddlewaretoken')[0].value;
    var questions=[...document.getElementsByClassName("wrapper-quest")];
    var questions_data=[];
    var quest_data={};
    questions.forEach(function(q){
        quest_data={};
        quest_data["text"]=q.children[0].value;
        quest_data["type"]=q.children[0].getAttribute("data-type");
        quest_data["options"]=[];
        if(quest_data.type!="text"){
            let opts=[...q.children[1].children];
            opts.forEach(function(opt){
                quest_data["options"].push(opt.children[0].children[1].value);
            });
            
        }
        quest_data["is_required"]=q.children[2].children[1].children[0].checked;
        questions_data.push(quest_data);
    })
    data["questions"]=JSON.stringify(questions_data);
    $.ajax({
        type:"POST",
        url:`${url}save/`,
        data:data,
        success:function(response){
            if(response["status"]==200){
                let home=`${url}`.split('/');
                home.pop();
                home.pop();
                let home_url=home.join('/')
                window.location.assign(`${home_url}`)};
        },
        error:function(error){
            
        }
    }
    )
}


var form=document.getElementById("form");
form.addEventListener("submit",function(e){
    e.preventDefault();
    e.stopPropagation();
    send_data();

})






//
// <div class="wrapper-question quest-unique row " style="border: #f3c1d6 1px solid;border-radius: 5px;width: 750px;padding: 5px; margin: 10px auto; border-top: #f0649e 8px solid;">
// <textarea class="question d-block " rows="1"  type="text" name="question" placeholder="Question"></textarea>
// 
// </div>
// <div class="option-response d-flex">
//   <div class="check-response ">
//     <input type="radio" name="response">
//     <textarea class="response-desc  " rows="1"  type="text" name="question" placeholder="option 1..."></textarea>
//   </div>
//   <span>
//     <i class="bi bi-dash-circle"></i>
//     <i class="bi bi-plus-circle"></i>
//   </span>
  
// </div>
// <div class="option-response d-flex">
//   <div class="check-response ">
//     <input type="radio" name="response">
//     <textarea class="response-desc  " rows="1"  type="text" name="question" placeholder="option 1..."></textarea>
//   </div>
//   <span>
//     <i class="bi bi-dash-circle"></i>
//     <i class="bi bi-plus-circle"></i>
//   </span>
  
// </div>

// <div class="additional-tools d-flex ">
//   <i class="bi bi-trash"></i>
//   <div class="is-required"><input type="checkbox" name="is-required"><span >required</span></div>
// // </div>
// // </div>
// return response;
//     <div class=" " style="border: #f3c1d6 1px solid;border-radius: 5px;width: 750px;padding: 5px; margin: 10px auto; border-top: #f0649e 8px solid;">
//     // <textarea class="question d-block " rows="1"  type="text" name="question" placeholder="Question"></textarea>
//     // <div class="option-response d-flex">
//     //   <div class="check-response ">
//     //     <input type="checkbox" name="response">
//     //     <textarea class="  " rows="1"  type="text" name="question" placeholder="option 1..."></textarea>
//     //   </div>
//     //   <span>
//     //     <i class="bi bi-dash-circle"></i>
//     //     <i class="bi bi-plus-circle"></i>
//     //   </span>
      
//     // </div>
//     // <div class="option-response d-flex">
//     //   <div class="check-response ">
//     //     <input type="checkbox" name="response">
//     //     <textarea class="response-desc  " rows="1"  type="text" name="question" placeholder="option 1..."></textarea>
//     //   </div>
//     //   <span>
//     //     <i class="bi bi-dash-circle"></i>
//     //     <i class="bi bi-plus-circle"></i>
//     //   </span>
      
//     // </div>
//     // <div class="option-response d-flex">
//     //   <div class="check-response ">
//     //     <input type="checkbox" name="response">
//     //     <textarea class="response-desc  " rows="1"  type="text" name="question" placeholder="option 1..."></textarea>
//     //   </div>
//     //   <span>
//     //     <i class="bi bi-dash-circle"></i>
//     //     <i class="bi bi-plus-circle"></i>
//     //   </span>
      
//     // </div>
    
//     // <div class="additional-tools d-flex ">
//     //   <i class="bi bi-trash"></i>
//     //   <div class="is-required"><input type="checkbox" name="is-required"><span >required</span></div>
//     // </div>
//     // </div>
