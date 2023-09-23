import React, {  useEffect, useState } from 'react';
import './Prdouct.scss';
import { FormGroup, FormItemLabel,  TextArea, buttonVariant, Button, Icon } from '../../core';
import { DynamicSearch } from '../../core/DynamicRenderer/DynamicSearch/DynamicSearch';
import { getDropdownClassesCompatibleData, getDropdownCompatibleData } from '../../utility/CommonMethods';
import { DynamicMultiSelectSearch } from '../../core/DynamicRenderer/DynamicMultiSelectSearch/DynamicMultiselectSearch';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
export interface IProductProps {
  dropdownData:any;
  onchange:any;
  onCreateProductSave: (payload: any) => void;
  onEditProductSave: (payload: any) => void;
  onClose: () => void;
  isLoading: boolean;
  showEmptyOption:boolean;
  selectedRowData?: any;
  productTypeId:any;
  classurl:any;
  showEmptySelected:string,
  Brand:any
}

export const Product = (props: IProductProps) => {
  const {dropdownData, selectedRowData,isLoading,showEmptyOption,productTypeId,classurl,showEmptySelected,Brand} = props;
  const isEditmode=false;
  const isProductmode=true;
  const [producatname_n, setproducatname_n] = useState('');
  const [productTypeList,setproductTypeList]:any=useState({ label: '', value: 0 });
  const [BrandList,setBrandList]:any=useState({ label: '', value: 0 });
  const [validProduct,setValidProduct]= useState(false);
  const [validClass,setvalidClass]= useState(true);
  const [validProductType,setvalidProductType]= useState(true);
  const [validProductName,setvalidProductName]= useState(true);
  const [validBrandID,setvalidBrandID]= useState(true);
  const [formData, setFormData] = useState({
    classId:'',
    productTypeId:'',
    descriptorsTypeList: [],
    descriptorsList: [],
    productnameId:'',
    productname:'',
    productType:'',
    brandId:'',
    newComment: '',
    status:-1,
    display_n:''
  });
  const onSaveClick = () => {
    if (isValidInputs()) {
      if (isEditmode) {
      } else {
        onConfirmSaveClick();
      }
    } else {
      //MessageService.showToastMessage(ERROR_MESSAGES.MandatoryFields);
    }
  };
  const onCancelButtonClick = () => {
    props.onClose();
  };
  const onConfirmSaveClick = () => {
    if (isEditmode) {
      props.onEditProductSave({ id: selectedRowData.id, ...formData });
    } else {
      formData.display_n=producatname_n;
      if(isProductmode)
      {
       formData.status=-1;
      }
      else
      {
        formData.status=1;
      }
      setValidProduct(false);
      props.onCreateProductSave(formData);
    }
  };
  useEffect(() => {
   
    setFormData({
      ...formData,
      productTypeId:productTypeId?.productTypeId,
      productType:productTypeId?.productType
    })
    setproductTypeList({label: productTypeId?.productType, value: productTypeId?.productTypeId});
    const payload = {
      descriptorsTypeList:formData.descriptorsTypeList  ,
      descriptorsList:formData.descriptorsList ,
      productname:formData.productname,
      productType:productTypeId?.productType,
    };
    productnameformation(payload);
  
  }, [productTypeId]);
  useEffect(() => {
   
    setFormData({
      ...formData,
      brandId:Brand?.BrandId
    })
    setBrandList({label: Brand?.Brand, value: Brand?.BrandId});
  
  }, [Brand]);

  const isValidInputs = (): boolean => {
    if (!formData.classId) {
       setvalidClass(false);
    } 
    if (!formData.productTypeId) {
      setvalidProductType(false);
   } 
   if (!formData.productnameId) {
    setvalidProductName(false);
    } 
    if (!formData.brandId) {
      setvalidBrandID(false);
    }
    if(!formData.classId && !formData.productTypeId && !formData.productnameId && !formData.brandId ) 
    {
      return false;
    }
    else
    {
    return true;
    }
  };
   
  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>, fieldKey: any) => {
    setFormData({
      ...formData,
      [fieldKey]: event.target.value
    });
  };
  const productnameformation = (payload:any) => {
   let descriptorslist='';
   if(payload.descriptorsList!== undefined  && payload.descriptorsList!==null)
   {
   for(let obj of payload.descriptorsList){
    descriptorslist=descriptorslist+obj['label']+' - ';
   }
   descriptorslist=descriptorslist.substring(0,descriptorslist.length-3);
   }

   let productname='';
   if(payload.productname!== undefined &&  payload.productname!== null)
   {
    productname=payload.productname;
   }
   let productType='';
   if(payload.productType!== undefined &&  payload.productType!== null)
   {
    productType=payload.productType;
   }
   if(productType!=='' && productname!=='')
   {
     setValidProduct(true);
   }
   else
   {
    setValidProduct(false);
   }
   if(descriptorslist!='')
   {
    if(productType=='')
    {
      setproducatname_n(productname+' : '+ descriptorslist);
    }
    else
    {
    setproducatname_n(productname+' : '+productType +' : '+ descriptorslist);
    }
   }
   else
   {
    if(productname!='' && productType=='')
    {
      setproducatname_n(productname);
    } 
    else if (productType!='' && productname=='')
    {
      setproducatname_n(productType);
    }
    else if (productType!='' && productname!='')
    {
      setproducatname_n(productname+' : '+productType);
    }
   
   }
  };

  
  
  const handleOnChangeMultiSearchDes = (value: any) => {
    value['name']='descriptor';
    value['classId']=formData.classId;
    value['descriptorsTypeList']=formData.descriptorsTypeList;
    props.onchange(value);
  }
  const handleOnChangeMultiSearchBrand = (value: any) => {
    value['name']='brand';
    props.onchange(value);
    if(value!=null && value!=''&& value!='0' )
     {
       setvalidBrandID(true);
     }
     else
     {
      setvalidBrandID(false);
     }
  }
   const handleOnChangeMultiSearchDestype = (value: any) => {
     value['name']='descriptorsType';
     value['classId']=formData.classId;
     props.onchange(value);

   }
 
   const handleOnChange = (value: string) => {
     props.onchange(value);
     if(value!=null && value!=''&& value!='0' )
     {
       setvalidClass(true);
     }
     else
     {
      setvalidClass(false);
     }
   }
   const ondescriptorsTypeClick = (values: any) => {
    setFormData({
      ...formData,
      descriptorsTypeList: values
    });
   
  }
    const ondescriptorsClick = (values: any) => {
      setFormData({
        ...formData,
        descriptorsList: values
      });
      const payload = {
        descriptorsTypeList: formData.descriptorsTypeList ,
        descriptorsList: values,
        productname:formData.productname,
        productType:formData.productType
      };
      
      productnameformation(payload);
  }
  const onClassSelect = (values: any) => {
    setFormData({
      ...formData,
      classId:values.value
    })
    if(values.label!="" && values.label!=null)
    {
     props.onchange(values);
    }
    else
    {
      setFormData({
        ...formData,
        descriptorsList: [],
        descriptorsTypeList: [],
      });
    }
   
    
   }
  const onproducttype = (values: any) => {
    setFormData({
      ...formData,
      productTypeId: values.value,
      productType: values.label,
      descriptorsList:[],
      descriptorsTypeList:[]
    });
    setproductTypeList(values);
    const payload = {
      descriptorsTypeList:formData.descriptorsTypeList  ,
      descriptorsList:formData.descriptorsList ,
      productname:formData.productname,
      productType:values.label,
    };
    if(values.value!=null && values.value!=''&& values.value!='0' )
{
  setvalidProductType(true);
}
else
{
  setvalidProductType(false);
}
    productnameformation(payload);
  }
const onproductname = (values: any) => {
 setFormData({
   ...formData,
   productnameId: values.value,
   productname: values.label
 })
 const payload = {
  descriptorsTypeList:formData.descriptorsTypeList ,
  descriptorsList: formData.descriptorsList,
  productname:values.label,
  productType:formData.productType,
};
if(values.value!=null && values.value!=''&& values.value!='0' )
{
  setvalidProductName(true);
}
else
{
  setvalidProductName(false);
}
 productnameformation(payload);
 if(values.label!="" && values.label!=null)
    {
     props.onchange(values);
    }
}
  
   
  return (
    <>
      <div className={`${isProductmode ? 'container' : 'content'}`}>
        <div className={`${isProductmode ? 'pleft' : 'left'}`}>
          <div className={`${isProductmode ? 'childprd' : 'child'}`} >
            <FormGroup>
              <FormItemLabel isMandatory>Class Name</FormItemLabel>
              <DynamicSearch
                id={'classId'}
                name={'classCode'}
                fieldName={'classCode'}
                value={formData.classId}
                setValue={selectedOption => onClassSelect(selectedOption)}
                 getMultiselectSearchResults={handleOnChange}
                 commonData={
                  dropdownData?.classNameDropdownList
                    ? {
                        entities:getDropdownClassesCompatibleData(
                          dropdownData.classNameDropdownList,
                          {
                            label: 'className',
                            value: 'classId',
                            code: 'classCode'
                          }
                        )
                      }
                    : { entities: [] }
                }
                disabled={false}
              />
               {showEmptySelected=='Class' && showEmptyOption &&!isLoading && (<div className='empty-option'>No results found!</div>)}
               {showEmptySelected=='Class' && isLoading && (<div className='empty-option'>Loading...</div>)}
              <span className={validClass?'span':'errorspan'} >Please Enter Valid Class</span>
            </FormGroup>
            <div className={`${!isProductmode ? 'hide' : ''}`}>
              <div className='role-container-right'>
                <p>
                  <a href="#b" target="_blank" className='heyperlinkgeneral removeunderline'>General guidlines</a>
                  <a href={classurl} target="_blank"  className={classurl?'heyperlink removeunderline': 'heyperlink removeunderline  heyperlinknew'}>Class Instructions</a></p>
              </div>
            </div>
          </div>
          <div className={`${isProductmode ? 'childprd productypeDesignchanges' : 'child'}`} >
            <FormGroup>
              <FormItemLabel isMandatory>Product Type</FormItemLabel>
              <DynamicSearch
                id={'productTypeId'}
                name={'producttypeName'}
                fieldName={'producttypeName'}
                value={productTypeList}
                setValue={selectedOption => onproducttype(selectedOption)}
                 getMultiselectSearchResults={handleOnChange}
                 commonData={
                  dropdownData?.referredToProductTypeDropdownList
                    ? {
                        entities: getDropdownCompatibleData(
                          dropdownData.referredToProductTypeDropdownList,
                          {
                            label: 'producttypeName',
                            value: 'producttypeId'
                          }
                        )
                      }
                    : { entities: [] }
                }
                disabled={false}
              />
               {showEmptySelected=='ProductType' && showEmptyOption &&!isLoading && (<div className='empty-option'>No results found!</div>)}
               {showEmptySelected=='ProductType' && isLoading && (<div className='empty-option'>Loading...</div>)}
                 <span className={validProductType?'span':'errorspan'} >Please Enter Valid Product Type</span>
            </FormGroup>
          </div>
          <div className={`${isProductmode ? 'childprd' : 'child'}`} >
            <FormGroup>
              <FormItemLabel>Descriptor Type(s)</FormItemLabel>
              <DynamicMultiSelectSearch
                id={`descriptortypeList`}
                value={formData.descriptorsTypeList}
                setValue={options => ondescriptorsTypeClick(options?.mcssValues)}
                commonData={
                  dropdownData?.referredToDescriptorTypeDropdownList
                    ? {
                        entities: getDropdownCompatibleData(
                          dropdownData?.referredToDescriptorTypeDropdownList,
                          {
                            label: 'label',
                            value: 'value'
                          }
                        )
                      }
                    : { entities: [] }
                }
                disabled={formData.classId?false:true}
                getMultiselectSearchResults={(value: { search_text: any; }) =>
                 handleOnChangeMultiSearchDestype({ searchValue: value.search_text })
                }
              />
              {showEmptySelected=='DescriptorType' &&showEmptyOption &&!isLoading && (<div className='empty-option'>No results found!</div>)}
               {showEmptySelected=='DescriptorType' && isLoading && (<div className='empty-option'>Loading...</div>)}
            </FormGroup>
          </div>
          <div className={`${isProductmode ? 'childprd' : 'child'}`} >
            <FormGroup>
              <FormItemLabel>Descriptor(s)</FormItemLabel>
<DynamicMultiSelectSearch
                id={`descriptorList`}
                value={formData.descriptorsList}
                setValue={options => ondescriptorsClick(options?.mcssValues)}
                commonData={
                  dropdownData?.referredToDescriptorDropdownList
                    ? {
                        entities: getDropdownCompatibleData(
                          dropdownData?.referredToDescriptorDropdownList,
                          {
                            label: 'label',
                            value: 'value'
                          }
                        )
                      }
                    : { entities: [] }
                }
                disabled={formData?.descriptorsTypeList?.length>0?false:true}
                getMultiselectSearchResults={(value: { search_text: any; }) =>
                 handleOnChangeMultiSearchDes({ searchValue: value.search_text })
                }
              />
              {showEmptySelected=='Descriptor' && showEmptyOption &&!isLoading && (<div className='empty-option'>No results found!</div>)}
               {showEmptySelected=='Descriptor' && isLoading && (<div className='empty-option'>Loading...</div>)}
            </FormGroup>
          </div>
          <div className={`${isProductmode ? 'childprd' : 'child'}`} >
            <FormGroup>
              <FormItemLabel isMandatory>Product Name</FormItemLabel>
              <DynamicSearch
                id={'productnameId'}
                name={'productName'}
                fieldName={'productName'}
                value={formData.productnameId}
                setValue={selectedOption => onproductname(selectedOption)}
                 getMultiselectSearchResults={handleOnChange}
                 commonData={
                  dropdownData?.referredToProductNameDropdownList
                    ? {
                        entities: getDropdownCompatibleData(
                          dropdownData.referredToProductNameDropdownList,
                          {
                            label: 'productName',
                            value: 'productnameId'
                          }
                        )
                      }
                    : { entities: [] }
                }
                disabled={false}
              />
               {showEmptySelected=='ProductName' && showEmptyOption &&!isLoading && (<div className='empty-option'>No results found!</div>)}
               {showEmptySelected=='ProductName' && isLoading && (<div className='empty-option'>Loading...</div>)}
                 <span className={validProductName?'span':'errorspan'} >Please Enter Valid Product Name</span>
            </FormGroup>
          </div>
          <div className={`${isProductmode ? 'childprd' : 'child'}`}>
            <FormGroup>
              <FormItemLabel isMandatory>Brand</FormItemLabel>  
              <DynamicSearch
                id={'brand'}
                name={'companyName'}
                fieldName={'companyName'}
                value={BrandList}
                setValue={selectedOption =>
                  setFormData({
                    ...formData,
                    brandId: selectedOption.value
                  })
                }
                 getMultiselectSearchResults={handleOnChangeMultiSearchBrand}
                 commonData={
                  dropdownData?.referredToBrandDropdownList
                    ? {
                        entities: getDropdownCompatibleData(
                          dropdownData.referredToBrandDropdownList,
                          {
                            label: 'companyName',
                            value: 'companyId'
                          }
                        )
                      }
                    : { entities: [] }
                }
                disabled={false}
              />
               {showEmptySelected=='BrandId' && showEmptyOption &&!isLoading && (<div className='empty-option'>No results found!</div>)}
               {showEmptySelected=='BrandId' && isLoading && (<div className='empty-option'>Loading...</div>)}
              <span className={validBrandID?'span':'errorspan'} >Please Enter Valid Brand</span>
            </FormGroup>
          </div>
          <div className='child productpreview'>
          
          <FormGroup>
          <FormItemLabel isMandatory >Product Preview</FormItemLabel>
            <div>
            <div className='productdisplaycolor' > { producatname_n} </div>
            </div>
          </FormGroup>
          <FormGroup>
          <div className='tickdesign'>
            <div className='productpreviewnew'  > {validProduct ? (
      <Icon className='custom-search-query-statusupadte-valid' icon={faCheckCircle} />
    ) : (
      <Icon className='custom-search-query-statusupadte-invalid' icon={faTimesCircle} />
    )}</div>
            </div>
          </FormGroup>
        </div>
        </div>
        <div className={`${isProductmode ? '' : 'right'}`}>
          <div>
          <div className='child'>
            <FormGroup>
              <FormItemLabel>{`${isEditmode ? 'New Comment' : 'Comment'}`}</FormItemLabel>
              <TextArea
                id={'NewComment'}
                name={'NewComment'}
                rows={4}
                columns={250}
                value={formData.newComment}
                onChange={event => onFieldChange(event, 'newComment')}
              />
            </FormGroup>
          </div>
          <div className='product-footernew'>
        <Button id='cancel-btn' customClass='submitbuttondesign' variant={buttonVariant.primary} onClick={onCancelButtonClick}>
          Cancel
        </Button>
        <Button
          id='save-btn'
          variant={buttonVariant.secondary}
          onClick={onSaveClick}
        >
          {isEditmode ? 'Submit' : 'Submit'}
        </Button>
      </div>
          </div>
        
        </div>
      </div>
    </>
  );
};
