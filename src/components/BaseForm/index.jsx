import React,{Component} from 'react';
import {Input,Select,Form,Button,Checkbox,DatePicker } from 'antd';
import Utils from '../../utils/utils';
const FormItem = Form.Item;

export default class BaseForm extends Component{


  handleFilterSubmit = ()=>{
    let FilterValue = this.myForm.getFieldValue();
    this.props.filterSubmit(FilterValue);
  }

  reset = ()=>{
    this.myForm.resetFields();
  }

  initFormList = ()=>{
    let formItemList = [];
    let formList = this.props.formList;
    if( formList && formList.length > 0 ){
      formList.forEach(item=>{
        let { type , label, field, placeholder , initialValue , width , list } = item;

        if( type === 'CITY' ){
        const city =
            <FormItem label='城市' name='city' key='city' initialValue={initialValue}>
                <Select placeholder={placeholder} style={{ width : width }}>
                    {Utils.getOptionList(list)}
                </Select>
            </FormItem>;
          formItemList.push(city);
        }
        else if( type === '时间查询' ){
            const begin_time = 
              <FormItem label="订单时间" name='start_time' key={'begin_time'}>
                  <DatePicker placeholder='起始时间'/>
              </FormItem>;
            const end_time = 
              <FormItem label="~" colon={false} name='end_time' key={'end_time'}>
                  <DatePicker placeholder='结束时间' showTime/>
              </FormItem>;
            formItemList.push(begin_time,end_time);
        }
        else if( type === 'INPUT' ){
            const input =
              <Form.Item label={label} name={field} key={field} initialValue={initialValue}>
                  <Input type="text" placeholder={placeholder} style={{ width: width }} />
              </Form.Item>;
            formItemList.push(input);
        }
        else if( type === 'SELECT' ){
            const select = 
            <FormItem label={label} name={field} key={field} initialValue={initialValue}>
                <Select placeholder={placeholder} style={{ width : width }}>
                    {Utils.getOptionList(list)}
                </Select>
            </FormItem>;
            formItemList.push(select);
        }
        else if( type === 'CHECKBOX' ){
            const checkbox = 
            <FormItem label={label} name={field} key={field} valuePropName="checked" initialValue={initialValue}>
						    <Checkbox>
                    {label}
                </Checkbox>
					  </FormItem>
            formItemList.push(checkbox);
        }
        else if( type === 'DATE' ){
            const date = 
            <FormItem label={label} key={field} >
                <DatePicker format='YYYY-MM-DD HH:mm:ss' placeholder='请选择日期' style={{ width: width }}/>
            </FormItem>
            formItemList.push(date);
        }
      })
    }
    return formItemList;
  }

  render(){
    return(
      <Form layout='inline' ref={c => this.myForm = c}>
          {this.initFormList()}
          <FormItem>
              <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
              <Button onClick={this.reset}>重置</Button>
          </FormItem>
      </Form>
    )
  }
}