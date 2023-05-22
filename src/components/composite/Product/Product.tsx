import React, { useState} from 'react';
import './Prdouct.scss';
import {
  FormGroup,
  FormItemLabel,Dropdown,TextArea,CheckboxInput
} from '../../core';


export interface IProductProps {
}



export const Product = (props: IProductProps) => { 
  const { 
  } = props;
  const [category, setCategory] = useState();
  const [ProductType, setProductType] = useState();
  const [DescriptorType, setDescriptorType] = useState();
  const [Descriptor, setDescriptor] = useState();
  const [ProductName, setProductName] = useState();
  const [Brand, setBrand] = useState();
  
  return (
    <>
      <div className='Productdetails'>
      <FormGroup>
          <FormItemLabel isMandatory>Category</FormItemLabel>
          <Dropdown
            id={'ProductCategory'}
            value={category}
            options={[]}
            onClick={(value: any) => setCategory(value)}
            placeholder={'Search for Category'}
          />
        </FormGroup>
        <div className='role-container-right'>
        <p>
  <a href="#b" className='removeunderline'>Default Link Color</a>
  <a href="#b" className='heyperlink removeunderline'>Changed Link Color</a></p>
        </div>
        <FormGroup>
          <FormItemLabel isMandatory>Product Type</FormItemLabel>
          <Dropdown
            id={'ProductType'}
            value={ProductType}
            options={[]}
            onClick={(value: any) => setProductType(value)}
            placeholder={'Search for Product Type'}
          />
        </FormGroup>
        <FormGroup>
          <FormItemLabel isMandatory>Descriptor Type</FormItemLabel>
          <Dropdown
            id={'DescriptorType'}
            value={DescriptorType}
            options={[]}
            onClick={(value: any) => setDescriptorType(value)}
            placeholder={'Search for Descriptor Type'}
          />
        </FormGroup>
        <FormGroup>
          <FormItemLabel isMandatory>Descriptor</FormItemLabel>
          <Dropdown
            id={'Descriptor'}
            value={Descriptor}
            options={[]}
            onClick={(value: any) => setDescriptor(value)}
            placeholder={'Search for Descriptor'}
          />
        </FormGroup>
        <FormGroup>
          <FormItemLabel isMandatory>Product Name</FormItemLabel>
          <Dropdown
            id={'ProductName'}
            value={ProductName}
            options={[]}
            onClick={(value: any) => setProductName(value)}
            placeholder={'Search for Product Name'}
          />
        </FormGroup>
        <FormGroup>
          <FormItemLabel isMandatory>Brand</FormItemLabel>
          <Dropdown
            id={'Brand'}
            value={Brand}
            options={[]}
            onClick={(value: any) => setBrand(value)}
            placeholder={'Search for Brand'}
          />
        </FormGroup>
        <FormGroup >
        <FormItemLabel>Comment</FormItemLabel>
        <TextArea
            id={'mapmodreason'}
            name={'mapmodreason'}
            rows={5}
            columns={250}
           
          />
         </FormGroup>
         <FormGroup >
        <FormItemLabel>Product</FormItemLabel>
       
        {'< Product Name > : < Product Type > : < Product Descriptor >'}
       <div className='checkboxalignment'>
        <CheckboxInput
                  id={'checkbox'}
                  checked={true}
                  label={''}
                  value={true}
                />
        </div>
         </FormGroup>
        
      </div>
    </>
  );
};
