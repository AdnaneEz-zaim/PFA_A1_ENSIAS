
//user-dropdown
$("#user").click(function(){
    $(".dropdown-menu").slideToggle();
    });


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
    let formId=document.getElementById("title").getAttribute("data-id");
    console.log(formId);
    $.ajax({
        type:"POST",
        url:`${url}save${formId}/`,
        data:data,
        success:function(response){
            console.log(response["status"]);
            if(response["status"]==200){
                let home=`${url}`.split('/');
                home.pop();
                home.pop();
                let home_url=home.join('/')
                console.log(home_url);
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




