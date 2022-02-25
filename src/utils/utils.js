const Utils ={
        formateDate(time){
            if(!time)return '';
            let date = new Date(time);
            return date.getFullYear()
                    +'-'+(Number(date.getMonth())+1<10?Number('0'+date.getMonth())+1:Number(date.getMonth())+1)
                    +'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())
                    +' '+(date.getHours()<10?'0'+date.getHours():date.getHours())
                    +':'+(date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes())
                    +':'+(date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds())
        },
        pagination(data,callback){
            return {
                onChange:(current)=>{
                    callback(current)
                },
                current:data.result.page,
                pageSize:data.result.page_size,
                total:data.result.total,
                showTotal:()=>{
                    return `共${data.result.total}条`
                },
                // showQuickJumper:true
            }
        }
}
export default Utils;