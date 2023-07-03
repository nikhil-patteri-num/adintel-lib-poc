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
  const [Descriptor,setDescriptor]=useState();
  const [ProductName,setProductName]=useState();
  const [LicenseeBrand,setLicenseeBrand]=useState();
  const [LicensorBrand,setLicensorBrand]=useState();
  const [Rank,setRank]=useState();
  const [ProductTags,setProductTags]=useState();
  const [Status,setStatus]=useState();
  const [Referredto,setReferredto]=useState();
  const [Markets,setMarkets]=useState();
  return (
    <>
     
  <div className='container'>
  <div  className={`${isProductmode ? 'childprd' : 'child'}`} >
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
        <div  className={`${!isProductmode ? 'hide' : ''}`}>
       <div className='role-container-right'>
        <p>
  <a href="#b" className='removeunderline'>General guidlines</a>
  <a href="#b" className='heyperlink removeunderline'>Category Instructions</a></p>
        </div> 
        </div>
        </div>
       
        
  
        <div className={`${isProductmode ? 'childprd' : 'child'}`} >
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
        </div>
        
    
        <div className={`${isProductmode ? 'childprd' : 'child'}`} >
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
        </div>
        <div className={`${isProductmode ? 'childprd' : 'child'}`} >
        <FormGroup>
          <FormItemLabel isMandatory>Descriptor(s)</FormItemLabel>
          <Dropdown
            id={'Descriptor'}
            value={Descriptor}
            options={[]}
            onClick={(value: any) => setDescriptor(value)}
            placeholder={'Search for Descriptor Type'}
          />
        </FormGroup>
        </div>
        <div className={`${isProductmode ? 'childprd' : 'child'}`} >
        <FormGroup>
          <FormItemLabel isMandatory>Product Name</FormItemLabel>
           <Dropdown
            id={'ProductName'}
            value={ProductName}
            options={[]}
            onClick={(value: any) => setProductName(value)}
            placeholder={'Search for ProductName'}
          />
        </FormGroup>
        </div>
        {(!isProductmode) && (
        <div className='child'>
        <FormGroup>
          <FormItemLabel isMandatory>Licensee Brand</FormItemLabel>
          <Dropdown
            id={'LicenseeBrand'}
            value={LicenseeBrand}
            options={[]}
            onClick={(value: any) => setLicenseeBrand(value)}
            placeholder={'Search for Licensee Brand'}
          />
        </FormGroup>
        </div>
         )} 
         {(!isProductmode) && (
        <div className='child'>
        <FormGroup>
          <FormItemLabel isMandatory>Licensor Brand</FormItemLabel>
          <Dropdown
            id={'LicensorBrand'}
            value={LicensorBrand}
            options={[]}
            onClick={(value: any) => setLicensorBrand(value)}
            placeholder={'Search for Licensor Brand'}
          />
        </FormGroup>
        <FormGroup  customClass='checkboxalignmentbr'>
        <div className='lgbrandallignment' >
        <FormItemLabel>National</FormItemLabel>
        <CheckboxInput customClass='checkboxdesign'
                  id={'checkbox'}
                  checked={true}
                  label={''}
                  value={true}
                />
       
        </div>
        </FormGroup>
        </div>
         )} 
       
        <div className={`${isProductmode ? 'childprd' : 'child'}`}>
        <FormGroup>
          <FormItemLabel isMandatory>Brand</FormItemLabel>
          <Dropdown
            id={'Brand'}
            options={[]}
            value={Brand}
            onClick={(value: any) => setBrand(value)}
            placeholder={'Search for Brand'}
          />
        </FormGroup>
        </div>
        {(!isProductmode) && (
        <div className='child'>
        <FormGroup>
          <FormItemLabel isMandatory>Rank</FormItemLabel>
          <Dropdown
            id={'Rank'}
            options={[]}
            value={Rank}
            onClick={(value: any) => setRank(value)}
            placeholder={'Search for Rank'}
          />
        </FormGroup>
        </div>
         )} 
        {(!isProductmode) && (
        <div className='child'>
        <FormGroup>
          <FormItemLabel isMandatory>Product Tags</FormItemLabel>
          <Dropdown
            id={'ProductTags'}
            value={ProductTags}
            options={[]}
            onClick={(value: any) => setProductTags(value)}
            placeholder={'Search for Product Tags'}
          />
        </FormGroup>
        </div>
         )} 
        {(!isProductmode) && (
        <div className='child'>
        <FormGroup>
          <FormItemLabel isMandatory>Status</FormItemLabel>
          <Dropdown
            id={'Status'}
            value={Status}
            options={[]}
            onClick={(value: any) => setStatus(value)}
            placeholder={'Search for Status'}
          />
        </FormGroup>
        </div>
         )} 
         {(!isProductmode) && (
        <div className='child'>
        <FormGroup>
          <FormItemLabel isMandatory>Referred to</FormItemLabel>
          <Dropdown
            id={'Referredto'}
            value={Referredto}
            options={[]}
            onClick={(value: any) => setReferredto(value)}
            placeholder={'Search for Referred to'}
          />
        </FormGroup>
        </div>
         )} 
        <div className={`${isProductmode ? 'childprd' : 'child'}`}>
         <FormGroup >
        <FormItemLabel>{`${isProductmode? 'New Product Listing : ' : 'Product Preview'}`}</FormItemLabel>
        {(!isProductmode) && (
        <TextInput 
            id={'ProductPreview'}
            type={inputType.text}
            name={'ChangeDate'}
            value={''}
            maxLength={50}
            disabled={true}
          />
          )} 
          {(isProductmode) && (
        <div>{'< Product Name > : < Product Type > : < Product Descriptor >'} </div> 
         )} 
          {(isProductmode) && (
       <div className='checkboxalignmentpr'>
        <CheckboxInput 
                  id={'checkbox'}
                  checked={true}
                  label={''}
                  value={true}
                />
        </div> 
         )} 
         </FormGroup>
        
         </div>
         {(!isProductmode) && (
           <div className='child'>
        <FormGroup >
          <FormItemLabel isMandatory>Markets</FormItemLabel>
          <Dropdown
            id={'Markets'}
            value={Markets}
            options={[]}
            onClick={(value: any) => setMarkets(value)}
            placeholder={'Search for Markets'}
          />
        </FormGroup>
        </div>
         )}
  {(isEditmode) && (!isProductmode) && (
     <div className='child'>
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
        </div>
         )} 
         
        {(isEditmode) && (!isProductmode) && (
            <div className='child'>
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
        </div>
          )} 
              {(isEditmode) && (!isProductmode) && (
            <div className='child'>
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
        </div>
        )}
          {(isEditmode) && (!isProductmode) && (
            <div className='child'>
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
        </div>
         )}
        
        {(isEditmode) && (!isProductmode) && (
           <div className='child'>
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
        </div>
          )}
           {(isEditmode) && (!isProductmode) && (
               <div className='child'>
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
        </div>
       )}
       {(isEditmode) && (!isProductmode) && (
         <div className='child'>
        <FormGroup >
          
        <FormItemLabel>Previous Comments</FormItemLabel>
        <TextArea
            id={'PreviousComments'}
            name={'PreviousComments'}
            rows={5}
            columns={250}
           
          />
         </FormGroup>
         </div>
         )}
          <div className='child'>
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
