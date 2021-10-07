function send_submission(){
    let url=window.location.href;
    var data={};
    data['csrfmiddlewaretoken']=document.getElementsByName('csrfmiddlewaretoken')[0].value;
    var questions=[...document.getElementsByClassName("wrapper-quest")];
    var questions_data=[];
    questions.forEach(function(q){
        var quest_data={};
        quest_data["type"]=q.getAttribute("data-type");
        quest_data["id"]=q.getAttribute("data-question-id");
        quest_data["responses"]=[];
        if(q.getAttribute("data-type")!="text"){
            let res=[...q.querySelectorAll(".option-response")];
            
            res.forEach(function(resp){
                console.log(resp);
                if(resp.querySelector('input').checked==true){quest_data["responses"].push(resp.getAttribute("data-opt-id"));}
                   
            });    
        }
        else{
            quest_data["responses"].push(q.querySelector('textarea').value);
        }
        questions_data.push(quest_data);
    });
    data["quest_responses"]=JSON.stringify(questions_data);
    $.ajax({
        type:"POST",
        url:`${url}save/`,
        data:data,
        success:function(response){  
            // let home=`${url}`.split('/');
            // home.pop();
            // home.pop();
            //     let home_url=home.join('/')
            //     console.log(home_url);
            //     window.location.assign(`${home_url}`);
        },
        error:function(error){
            
        }
    }
    )
}


var form=document.getElementById("form");
form.addEventListener("submit",function(e){
    e.preventDefault();
    send_submission();

})

