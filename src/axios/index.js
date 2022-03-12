import axios from "axios";
import { Modal } from "antd";
import Utils from "../utils/utils";
export default class Axios {

    static requestList = (_this,url,params,isMock)=>{
        var data = {
            params : params,
            isMock
        }
        this.ajax({
            url,
            data
        }).then((data)=>{
            if(data && data.result){
                _this.setState({
                    list: data.result.item_list.map((item,index)=>{
                        item.key = index;
                        return item;
                    }),
                    pagination:Utils.pagination(data,(current)=>{
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
    }

    static ajax(options){
        let loading;
        if(options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi = '';
        if(options.isMock){
            baseApi = 'https://www.fastmock.site/mock/c20d56cecbc589f400ebb4580883a435/table/list1';
        }else{
            baseApi = 'https://www.fastmock.site/mock/c20d56cecbc589f400ebb4580883a435/table/list1';
        }
        return new Promise((resolve,reject)=>{
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then((response)=>{
                if(options.data && options.data.isShowLoading !== false){
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display='none';
                }
                if(response.status === 200){
                    let res = response.data;
                    if(res.code === 0){
                        resolve(res);
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.msg || 'url error!'
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        })
    }
}