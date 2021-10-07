var url=window.location.href
url=url.split('/');
url.pop();
url.pop();
url=url.join('/')+"/";
const formBody=$("#form-body");
[...$("input,textarea")].map(el=>$(el).addClass("view-mode"));
// ;

$.ajax({
    type:'GET',
    url:`${url}data/?user=true`,
    success:function(form){
        $("#title").html(form.title);
        $("#desc").html(form.desc);
        const questions =form.questions;
        questions.map(function(el){
            
            let checked="";
            if(el.is_required)checked ="*required";
            let quest_row=`
            <div class="wrapper-quest quest-text row" data-question-id=${el.id} data-type="${el.quest_type}">
                <h3 class="question d-block"> 
                ${el.text}
                </h3>
                `;
            if(el.quest_type=="text"){
                quest_row+=`<textarea class="response"  name="response-question:${el.id}" rows="5" placeholder="Enter your response here...."></textarea>`
            }
            else if(el.quest_type=="radio"){
                el.options.map(opt=>{
                    
                    quest_row+=`
                <div class="option-response d-flex" data-opt-id=${opt.r}>
                    <input type="radio"  name="response-quest:${el.id}" value="${opt.text}">
                    <h5 class="response-desc">${opt.text}</h5>
                </div>
                
                
                `;});
            }
            else{
                el.options.map(opt=>{
                    let i=0;
                    quest_row+=`
                <div class="option-response d-flex" data-opt-id=${opt.r}>
                    <input type="checkbox"  name="response${i++}-quest:${el.id}" value="${opt.text}">
                    <h5 class="response-desc ml-2" >${opt.text}</h5>
                </div>
                
                `;});
            }
            quest_row+= `<div class="additional-tools d-flex"><h5>`+checked+`</h5>
                    
            </div> 
        </div>`;
        if (el.quest_type!="text"){
            quest_row+=`<img src="data:image/png;base64,${el.pie_graph}"></img>
        <img src="data:image/png;base64,${el.bar_graph}"></img>`;
        }
        
        formBody.html(formBody.html()+quest_row);                       
        });
       
        

    },
    error:function(error){
        console.error(error);
    }
});
