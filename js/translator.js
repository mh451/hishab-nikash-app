
function monthNameT(name){
    let data = [
        {
            name:'Jan',
            ban:'জানুয়ারী'
        },
        {
            name:'Feb',
            ban:'ফেব্রুয়ারী'
        },
        {
            name:'Mar',
            ban:'মার্চ'
        },
        {
            name:'Apr',
            ban:'এপ্রিল'
        },
        {
            name:'May',
            ban:'মে'
        },
        {
            name:'Jun',
            ban:'জুন'
        },
        {
            name:'Jul',
            ban:'জুলাই'
        },
        {
            name:'Aug',
            ban:'আগস্ট'
        },
        {
            name:'Sep',
            ban:'সেপ্টেম্বর'
        },
        {
            name:'Oct',
            ban:'অক্টোবর'
        },
        {
            name:'Nov',
            ban:'নভেম্বর'
        },
        {
            name:'Dec',
            ban:'ডিসেম্বর'
        },
       
        
    ];
    let info =  data.find(item => item.name === name ? item :undefined  );
    return info.ban;
}

function numberT(item){

 data =[
    {
        eng:'0',
        ban:'০'
    },
    {
        eng:'1',
        ban:'১'
    },
    {
        eng:'2',
        ban:'২'
    },
    {
        eng:'3',
        ban:'৩'
    },
    {
        eng:'4',
        ban:'৪'
    },
    {
        eng:'5',
        ban:'৫'
    },
    {
        eng:'6',
        ban:'৬'
    },
    {
        eng:'7',
        ban:'৭'
    },
    {
        eng:'8',
        ban:'৮'
    },
    {
        eng:'9',
        ban:'৯'
    },

    
 ];

 let convert = typeof item === 'number' ? `${item}`: item;
 let array = [...convert];
 let translatedData = array.map(char =>{
   let x =  data.find(item =>{
        if(item.eng === char ){
            return item.ban;
        }
    });
    return x.ban;
 });
 return translatedData.join('');
}


