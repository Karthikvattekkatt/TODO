//redirect if not valid login
let currentUser=JSON.parse(window.localStorage.getItem('user'));
if(!currentUser){
    window.location='index.html';

}

// setting welcome text
$('#welcomeText').html(`Hello ${currentUser.uname}! <br> Welcome to your Todo List`);

// code for log out
$('#logOut').on('click',(e)=>{
    e.preventDefault();
    // Sign-out successful.
    window.localStorage.removeItem('user');
    window.location="index.html";
    console.log('Logout successfully..');
})

// AJAX call to fetch data using axios library.
const getList=async ()=>{
    try{
        const res=await axios.get('https://jsonplaceholder.typicode.com/todos');
        const lists=res.data;
        // console.log(lists);
        let listcontent='';
        lists.forEach((el,index)=>{
            listcontent+=`          
            <tr>
            <td> <label > ${el.id}</label>
            </li></td>
            <td><label > ${el.title}</label><span class="badge" style="float:right"> </span>
            </li></td>
            <td> <li class="list-group-item ${el.completed?'disabledList':''} ${index%2?'list-group-item-info':'list-group-item-success'}"> <input type="checkbox"  value=${el.id} class="checkbox" ${el.completed?' checked':''  }/></span>
            </li></td>
          </tr>`
        });
        $('#todoList').html(listcontent);
        if(checkedCount){
            checkedCount=0;
        }

    }
    catch(e){
        console.log('Failed to fetch lists data',e);
    }
}
// call getlist() when GET LIST is clicked.
$('#getList').on('click',(e)=>{
    e.preventDefault();
    getList();
});

//variable to keep track of cheking list items
let checkedCount=0;

const alertPromise= ()=>{
     return new Promise((resolve,reject)=>{

        if(checkedCount===5){
            resolve(checkedCount)
        }
        else{
            reject('Count not equal to 5');
        }
    });
}

const promiseCall=()=>{
    alertPromise().then((data)=>{
        alert(`Congrats, ${data} Tasks have been Successfully Completed`);
    })
    .catch((err)=>{
        console.log('Promise Rejected');
    })
}


getList();

$('#todoList').on('change','.checkbox',function(e){
    var rowNo = $(this).val();
    if($(this).prop('checked')===true){
        // console.log('checked');      
        // console.log(rowNo);
        checkedCount++; 
        $('table tr:nth-child('+rowNo+')').each(function(index, element) {
            if($(this).html()!= ' ') $(this).css("background-color","rgb(30 193 145)");
         });
         var tblHeader = $('#tblList thead tr');
         tblHeader.css("background-color","#FFF");
        
    }
    else{
        checkedCount--;
        // console.log('unchecked');
        $('table tr:nth-child('+rowNo+')').each(function(index, element) {
            if($(this).html()!= ' ') $(this).css("background-color","#FFF");
         });
    }
    
    promiseCall();


});
