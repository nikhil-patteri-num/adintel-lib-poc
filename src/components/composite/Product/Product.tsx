import React, { useState} from 'react';
import './Prdouct.scss';
import {
  FormGroup,
  FormItemLabel,Dropdown,TextArea,CheckboxInput,TextInput,inputType
} from '../../core';


export interface IProductProps {
isEditmode: boolean;
isProductmode:boolean;
}



export const Product = (props: IProductProps) => { 
  const {isEditmode, isProductmode } = props;
  const [ProductType, setProductType] = useState();
  const [DescriptorType, setDescriptorType] = useState();
  const [Brand, setBrand] = useState();
  const [ClassName,setClassName]=useState();
  return (
    <>
     <div id="content"  className={`${!isEditmode && isProductmode ? 'contentstyle' : ''}`}>
     <div id="left">
  <div className='Productdetails'>
      {/* <FormGroup>
          <FormItemLabel isMandatory>Category</FormItemLabel>
          <Dropdown
            id={'ProductCategory'}
            value={category}
            options={[]}
            onClick={(value: any) => setCategory(value)}
            placeholder={'Search for Category'}
          />
        </FormGroup>  */}
        {/* <div className='role-container-right'>
        <p>
  <a href="#b" className='removeunderline'>Default Link Color</a>
  <a href="#b" className='heyperlink removeunderline'>Changed Link Color</a></p>
        </div> */}
        <FormGroup>
          <FormItemLabel isMandatory>Class Name</FormItemLabel>
          <Dropdown
            id={'ClassName'}
            value={ClassName}
            options={[]}
            onClick={(value: any) => setClassName(value)}
            placeholder={'Search for Class Name'}
          />
        </FormGroup>
        <FormGroup>
          <FormItemLabel isMandatory>Product Name</FormItemLabel>
          <TextInput
            id={'ProductName'}
            type={inputType.text}
            name={'ProductName'}
            value={''}
            maxLength={50}
          />
        </FormGroup>
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
          <FormItemLabel isMandatory>Descriptor Type(s)</FormItemLabel>
          <Dropdown
            id={'DescriptorType'}
            value={DescriptorType}
            options={[]}
            onClick={(value: any) => setDescriptorType(value)}
            placeholder={'Search for Descriptor Type'}
          />
        </FormGroup>
        {/* <FormGroup>
          <FormItemLabel isMandatory>Descriptor</FormItemLabel>
          <Dropdown
            id={'Descriptor'}
            value={Descriptor}
            options={[]}
            onClick={(value: any) => setDescriptor(value)}
            placeholder={'Search for Descriptor'}
          />
        </FormGroup> */}
        {/* <FormGroup>
          <FormItemLabel isMandatory>Product Name</FormItemLabel>
          <Dropdown
            id={'ProductName'}
            value={ProductName}
            options={[]}
            onClick={(value: any) => setProductName(value)}
            placeholder={'Search for Product Name'}
          />
        </FormGroup> */}
        <FormGroup>
          <FormItemLabel isMandatory>Licensee Brand</FormItemLabel>
          <Dropdown
            id={'LicenseeBrand'}
            value={Brand}
            options={[]}
            onClick={(value: any) => setBrand(value)}
            placeholder={'Search for Licensee Brand'}
          />
        </FormGroup>
        <FormGroup>
          <FormItemLabel isMandatory>Licensor Brand</FormItemLabel>
          <Dropdown
            id={'LicensorBrand'}
            value={Brand}
            options={[]}
            onClick={(value: any) => setBrand(value)}
            placeholder={'Search for Licensor Brand'}
          />
        </FormGroup>
        <FormGroup  customClass='checkboxalignment2'>
        <div >
        <FormItemLabel>National</FormItemLabel>
        <CheckboxInput customClass='checkboxdesign'
                  id={'checkbox'}
                  checked={true}
                  label={''}
                  value={true}
                />
       
        </div>
        </FormGroup>
        <FormGroup>
          <FormItemLabel isMandatory>Rank</FormItemLabel>
          <Dropdown
            id={'Rank'}
            options={[]}
            onClick={(value: any) => setProductType(value)}
            placeholder={'Search for Rank'}
          />
        </FormGroup>
        <FormGroup>
          <FormItemLabel isMandatory> Product Tags</FormItemLabel>
          <Dropdown
            id={'ProductTags'}
            options={[]}
            onClick={(value: any) => setProductType(value)}
            placeholder={'Search for Product Tags'}
          />
        </FormGroup>
        <FormGroup>
          <FormItemLabel isMandatory>Status</FormItemLabel>
          <Dropdown
            id={'Status'}
            options={[]}
            onClick={(value: any) => setProductType(value)}
            placeholder={'Search for Status'}
          />
        </FormGroup>
        <FormGroup>
          <FormItemLabel isMandatory>Referred to</FormItemLabel>
          <Dropdown
            id={'Referredto'}
            options={[]}
            onClick={(value: any) => setProductType(value)}
            placeholder={'Search for Referred to'}
          />
        </FormGroup>
         <FormGroup >
        <FormItemLabel>Product Preview</FormItemLabel>
        {'< Product Name > : < Product Type > : < Product Descriptor >'}
       {/* <div className='checkboxalignment2'>
        <CheckboxInput 
                  id={'checkbox'}
                  checked={true}
                  label={''}
                  value={true}
                />
        </div> */}
         </FormGroup>
        
      </div>
      </div>

  <div id="right">
  {(isEditmode) && (!isProductmode) && (
  <FormGroup>
          <FormItemLabel isMandatory={true}>
          Create User
          </FormItemLabel>
          <TextInput
            id={'CreateUser'}
            type={inputType.text}
            name={'CreateUser'}
            value={''}
            maxLength={50}
          />
        </FormGroup>
         )} 
          {(isEditmode) && (!isProductmode) && (
        <FormGroup>
        <FormItemLabel isMandatory={true}>
           Create Date
          </FormItemLabel>
          <TextInput
            id={'CreateDate'}
            type={inputType.text}
            name={'CreateDate'}
            value={''}
            maxLength={50}
          />
        </FormGroup>
          )} 
           {(isEditmode) && (!isProductmode) && (
        <FormGroup>
          <FormItemLabel isMandatory={true}>
            Change User
          </FormItemLabel>
          <TextInput
            id={'ChangeUser'}
            type={inputType.text}
            name={'ChangeUser'}
            value={''}
            maxLength={50}
          />
        </FormGroup>
        )}
          {(isEditmode) && (!isProductmode) && (
        <FormGroup>
        <FormItemLabel isMandatory={true}>
            Change Date
          </FormItemLabel>
          <TextInput
            id={'ChangeDate'}
            type={inputType.text}
            name={'ChangeDate'}
            value={''}
            maxLength={50}
          />
        </FormGroup>
         )}
        <FormGroup>
          <FormItemLabel isMandatory>Markets</FormItemLabel>
          <Dropdown
            id={'Markets'}
            options={[]}
            onClick={(value: any) => setProductType(value)}
            placeholder={'Search for Markets'}
          />
        </FormGroup>
        {(isEditmode) && (!isProductmode) && (
        <FormGroup>
        <FormItemLabel isMandatory={true}>
        Recent Creatives
          </FormItemLabel>
          <TextInput
            id={'RecentCreatives'}
            type={inputType.text}
            name={'RecentCreatives'}
            value={''}
            maxLength={50}
          />
        </FormGroup>
          )}
            {(isEditmode) && (!isProductmode) && (
        <FormGroup>
        <FormItemLabel isMandatory={true}>
        Activity
          </FormItemLabel>
          <TextInput
            id={'Activity'}
            type={inputType.text}
            name={'Activity'}
            value={''}
            maxLength={50}
          />
        </FormGroup>
       )}
       {(isEditmode) && (!isProductmode) && (
        <FormGroup >
          
        <FormItemLabel>Previous Comments</FormItemLabel>
        <TextArea
            id={'PreviousComments'}
            name={'PreviousComments'}
            rows={5}
            columns={250}
           
          />
         </FormGroup>
         )}
  <FormGroup >
        <FormItemLabel>{`${isEditmode? 'New Comment' : 'Comment'}`}</FormItemLabel>
        <TextArea
            id={'NewComment'}
            name={'NewComment'}
            rows={5}
            columns={250}
           
          />
         </FormGroup>
  </div>
      </div>
    </>
  );
};
