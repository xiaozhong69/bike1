import React,{Component} from 'react';
// import Utils from '../../utils/utils';
import {Table} from 'antd';

export default class ETable extends Component{

    tableInit = ()=>{
      let row_selection = this.props.rowSelection;
      let { selectedRowKeys } = this.props;

      const rowSelection = {
        type: 'radio',
        selectedRowKeys,
      }

      if(row_selection === false || row_selection===null) {
        row_selection = false;
      }else if(row_selection === "checkbox"){
        rowSelection.type = "checkbox";
      }else{
        row_selection = 'radio';
      }

      return <Table
          bordered
          {...this.props}
          rowSelection={row_selection ? rowSelection : null}
          onRow={(record,index) => {
              return {
                onClick: ()=>{
                  if(!row_selection){
                    return;
                  }                      // index 用于selectedRowKeys
                    this.onRowClick(record,index);
                }, // 点击行
              };
          }}
      />
    }

    onRowClick = (record,index)=>{
      let row_selection = this.props.rowSelection;
      
      if(row_selection === 'checkbox'){
        
          let selectedRowKeys = this.props.selectedRowKeys;
          let selectedItem = this.props.selectedItem;
          let selectedIds = this.props.selectedIds;
          if(selectedIds){
              const i = selectedIds.indexOf(record.id);
              if(i === -1){
                  selectedIds.push(record.id);
                  selectedRowKeys.push(index);
                  selectedItem.push(record);
              }else{
                  selectedIds.splice(i,1);
                  selectedRowKeys.splice(i,1);
                  selectedItem.splice(i,1);
              }
          }else{
              selectedIds = [record.id];
              selectedRowKeys = [index];
              selectedItem = [record];
              this.props.updateSelectedItem(selectedRowKeys,selectedItem,selectedIds);
          }
      }else{
          let selectedRowKeys = [index];
          let selectedItem = record;
          this.props.updateSelectedItem(selectedRowKeys,selectedItem);
      }
    }

    render(){
        return(
            <div>
                {this.tableInit()}
            </div>
        )
    }
}