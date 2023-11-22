import React, { useEffect, useState } from 'react';
import './Prdouct.scss';
import { FormGroup, FormItemLabel, TextArea, buttonVariant, Button, Icon } from '../../core';
import { DynamicSearch } from '../../core/DynamicRenderer/DynamicSearch/DynamicSearch';
import { getDropdownClassesCompatibleData, getDropdownCompatibleData } from '../../utility/CommonMethods';
import { DynamicMultiSelectSearch } from '../../core/DynamicRenderer/DynamicMultiSelectSearch/DynamicMultiselectSearch';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
export interface IProductProps {
  dropdownData: any;
  onchange: any;
  onCreateProductSave: (payload: any) => void;
  onEditProductSave: (payload: any) => void;
  onClose: () => void;
  isLoading: boolean;
  showEmptyOption: boolean;
  selectedRowData?: any;
  productTypeId: any;
  classurl: any;
  showEmptySelected: string,
  Brand: any,
  productValiationflg: boolean;
}

export const Product = (props: IProductProps) => {
  const { dropdownData, selectedRowData, isLoading, showEmptyOption, productTypeId, showEmptySelected, Brand, productValiationflg } = props;
  const isEditmode = false;
  const isProductmode = true;
  const [producatname_n, setproducatname_n] = useState('');
  const [productTypeList, setproductTypeList]: any = useState({ label: '', value: 0 });
  const [BrandList, setBrandList]: any = useState({ label: '', value: 0 });
  const [validProduct, setValidProduct] = useState(false);
  const [validClass, setvalidClass] = useState(true);
  const [validProductType, setvalidProductType] = useState(true);
  const [validProductName, setvalidProductName] = useState(true);
  const [validBrandID, setvalidBrandID] = useState(true);
  const [classurlupdate, setclassurlupdate] = useState('');
  const [validdescriptors, setvaliddescriptors] = useState(true);
  const [descriptorsenable, setdescriptorsenable] = useState(true);
  const [descriptortypeenable, setdescriptortypeenable] = useState(true);
  const [descriptorsTypeList, setdescriptorsTypeList]: any = useState({ label: '', value: 0 });
  const [productNameList, setproductNameList]: any = useState({ label: '', value: 0 });
  const [descriptorsList, setdescriptorsList]: any = useState({ label: '', value: 0 });
  const [productAlready, setproductAlready] = useState(true);
  const [formData, setFormData] = useState({
    classIddisplay: { label: '', value: 0 },
    classId: '',
    productTypeId: '',
    descriptorsTypeList: [],
    descriptorsList: [],
    productnameId: '',
    productname: '',
    productType: '',
    brandId: '',
    brandname:'',
    newComment: '',
    status: -1,
    display_n: ''
  });

  // hold form fields text values
  const [textFormData, setTextFormData] = useState({
    productName: '',
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
      formData.display_n = producatname_n;
      if (isProductmode) {
        formData.status = -1;
      }
      else {
        formData.status = 1;
      }
      formData.descriptorsList = descriptorsList;
      formData.descriptorsTypeList = descriptorsTypeList;
      formData.classId = formData.classIddisplay?.value.toString();
      props.onCreateProductSave(formData);
    }
  };
  useEffect(() => {
    if (!formData.classIddisplay?.value && formData.classIddisplay.label != '') {
      setFormData({
        ...formData,
        productTypeId: productTypeId?.productTypeId,
        productType: productTypeId?.productType
      })
      setproductTypeList({ label: productTypeId?.productType, value: productTypeId?.productTypeId });
      setclassurlupdate(productTypeId?.class_instruction_url);
      const payload = {
        descriptorsTypeList: descriptorsTypeList,
        descriptorsList: descriptorsList,
        productname: formData.productname,
        productType: productTypeId?.productType,
      };
      if (productTypeId?.productType != null && productTypeId?.productType != '') {
        setvalidProductType(true);
      }
      productnameformation(payload);
    }
  }, [productTypeId]);
  useEffect(() => {
    setValidProduct(productValiationflg);
    setproductAlready(true);
  }, [productValiationflg]);
  useEffect(() => {

    setFormData({
      ...formData,
      brandId: Brand?.BrandId
    })
    setBrandList({ label: Brand?.Brand, value: Brand?.BrandId });
    if (Brand?.BrandId != null && Brand?.BrandId != '') {
      setvalidBrandID(true);
    }
  }, [Brand]);

  useEffect(() => {
    const payload = {
      descriptorsTypeList: descriptorsTypeList,
      descriptorsList: descriptorsList,
      productname: formData.productname,
      productType: formData.productType
    };
    productnameformation(payload);
  }, [producatname_n]);

  const isValidInputs = (): boolean => {
    if (!formData.classIddisplay?.value) {
      setvalidClass(false);
    }
    if (!formData.productTypeId) {
      setvalidProductType(false);
    }
    if (!formData.productnameId && !formData.productname) {
      setvalidProductName(false);
    }
    if (!formData.brandId && !formData.brandname) {
      setvalidBrandID(false);
    }
    if (!descriptorsTypeList != null && descriptorsTypeList.length > 0) {
      if (!descriptorsList == null || descriptorsList.length == 0) {
        setvaliddescriptors(false);
        return false;
      }

    }
    if(validProduct!=true)
    {
      setproductAlready(validProduct);
      return false;
    }
    if (!formData.classIddisplay?.value && !formData.productTypeId && !formData.productnameId && !formData.brandId) {
      return false;
    }
    else {
      return true;
    }
  };

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>, fieldKey: any) => {
    setFormData({
      ...formData,
      [fieldKey]: event.target.value
    });
  };
  const productnameformation = (payload: any) => {
    let descriptorslist = '';
    if (payload.descriptorsList !== undefined && payload.descriptorsList !== null && payload.descriptorsList.length > 0) {
      for (let obj of payload.descriptorsList) {
        descriptorslist = descriptorslist + obj['label'] + ' - ';
      }
      descriptorslist = descriptorslist.substring(0, descriptorslist.length - 3);
    }

    let productname = '';
    if (payload.productname !== undefined && payload.productname !== null && payload.productname !== '') {
      productname = payload.productname;
    }
    let productType = '';
    if (payload.productType !== undefined && payload.productType !== null && payload.productType !== '') {
      productType = payload.productType;
    }
    if (descriptorslist != '') {
      if (productname !== '' && productType == '' && descriptorslist !== '') {
        setproducatname_n(productname + ' : ' + descriptorslist);
      }
      else if (productType !== '' && productname == '' && descriptorslist !== '') {
        setproducatname_n(productType + ' : ' + descriptorslist);
      }
      else if (productType == '' && productname == '' && descriptorslist !== '') {
        setproducatname_n(descriptorslist);
      }
      else {
        setproducatname_n(productname + ' : ' + productType + ' : ' + descriptorslist);
      }
      if (productType !== '' && productname !== '' && descriptorslist !== '') {
        const payload = {
          classId: formData.classIddisplay?.value,
          productName: productname + ' : ' + productType + ' : ' + descriptorslist,
          parameter: 'ProductExistsValidation'
        };
        props.onchange(payload);
      }
      else {
        setValidProduct(false);
      }
    }
    else {
      if (productname != '' && productType == '') {
        setproducatname_n(productname);
        setValidProduct(false);
      }
      else if (productType != '' && productname == '') {
        setproducatname_n(productType);
        setValidProduct(false);
      }
      else {
        if (productType != '' && productname != '') {
          setproducatname_n(productname + ' : ' + productType);
          const payload = {
            classId: formData.classIddisplay?.value,
            productName: productname + ' : ' + productType,
            parameter: 'ProductExistsValidation'
          };
          props.onchange(payload);

        }
        else {
          setproducatname_n('');
        }
      }
    }
  };



  const handleOnChangeMultiSearchDes = (value: any) => {
    value['name'] = 'descriptor';
    value['classId'] = formData.classIddisplay?.value;
    value['descriptorsTypeList'] = descriptorsTypeList;
    value['descriptorsList'] = descriptorsList;
    props.onchange(value);
  }
  const handleOnChangeMultiSearchBrand = (value: any) => {
    value['name'] = 'brand';
    props.onchange(value);
    if (value != null && value != '' && value != '0') {
      setvalidBrandID(true);
    }
    else {
      setvalidBrandID(false);
    }
  }
  const handleOnChangeMultiSearchDestype = (value: any) => {
    value['name'] = 'descriptorsType';
    value['classId'] = formData.classIddisplay?.value;
    props.onchange(value);

  }

  const handleOnChange = (value: any) => {
    props.onchange(value);
    if (value != null && value != '' && value != '0') {
      setvalidClass(true);
    }
    else {
      setvalidClass(false);
    }

    onFieldsTextChange(value.name, value.search_text);
  }
  const ondescriptorsTypeClick = (values: any) => {
    setdescriptorsTypeList(values);
    if (values != null && values != '' && values != undefined) {
      setdescriptorsenable(false);
    }
    else {
      setdescriptorsList({ label: '', value: 0 })
      setdescriptorsenable(true);
    }

  }
  const ondescriptorsClick = (values: any) => {
    setdescriptorsList(values);
    const payload = {
      descriptorsTypeList: descriptorsTypeList,
      descriptorsList: values,
      productname: formData.productname,
      productType: formData.productType
    };

    productnameformation(payload);
    if (descriptorsTypeList.length > 0) {
      if (values != null && values != '' && values != undefined) {
        setvaliddescriptors(true);
      }
      else {
        setvaliddescriptors(false);
      }
    }

  }
  const onClassSelect = (values: any) => {
    setFormData({
      ...formData,
      classIddisplay: { label: values.label, value: values.value },
    });
    if (values.label != "" && values.label != null) {
      props.onchange(values);
      setdescriptortypeenable(false);
    }
    else {
      setdescriptortypeenable(true);
      setFormData({
        ...formData,
        productTypeId: '',
        productType: ''
      });
      setdescriptorsTypeList({ label: '', value: 0 });
      setproductTypeList({ label: '', value: 0 });
      setdescriptorsList({ label: '', value: 0 });
      setclassurlupdate('');
      setproducatname_n('');
      const payload = {
        descriptorsTypeList: '',
        descriptorsList: '',
        productname: formData.productname,
        productType: '',
      };
      productnameformation(payload);
    }


  }
  const onproducttype = (values: any) => {
    setFormData({
      ...formData,
      productTypeId: values.value,
      productType: values.label
    });
    setproductTypeList(values);
    const payload = {
      descriptorsTypeList: descriptorsTypeList,
      descriptorsList: descriptorsList,
      productname: formData.productname,
      productType: values.label,
    };
    if (values.value != null && values.value != '' && values.value != '0') {
      setvalidProductType(true);
    }
    else {
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
    
    if(values.value == null || values.value == 0 || values.value == ''){
      setFormData({
        ...formData,
        productnameId:'-1',
        productname: textFormData.productName,
        brandname:textFormData.productName,
        brandId: '-1'
      });  
    }
    
    setproductNameList(values);
    const payload = {
      descriptorsTypeList: descriptorsTypeList,
      descriptorsList: descriptorsList,
      productname: values.label,
      productType: formData.productType,
    };
    if (values.value != null && values.value != '' && values.value != '0') {
      setvalidProductName(true);
    }
    else {
      setvalidProductName(false);
    }
    productnameformation(payload);
    if (values.label != "" && values.label != null) {
      props.onchange(values);
    }
  }

  const onproductaddname = () => {
    setFormData({
      ...formData,
      productnameId:'-1',
      productname: textFormData.productName,
      brandname:textFormData.productName,
      brandId: '-1'
    });
    // when new product name added populate the same text for brandname with brandid as -1
    setBrandList({ label: textFormData.productName, value: -1 });
    setproductNameList({ label: textFormData.productName, value: -1 });
    const payload = {
      descriptorsTypeList: descriptorsTypeList,
      descriptorsList: descriptorsList,
      productname: textFormData.productName,
      productType: formData.productType,
    };
    if (textFormData.productName != null && textFormData.productName != '' && textFormData.productName != '0') {
      setvalidProductName(true);
    }
    else {
      setvalidProductName(false);
    }
    productnameformation(payload);
   
  }
  const onbrandname = (values: any) => {
    setFormData({
      ...formData,
      brandId: values.value
    })
    setBrandList(values);
    if (values.label != "" && values.label != null) {
      setvalidBrandID(true);
    }
    else {
      setvalidBrandID(false);
    }
  }

  const onFieldsTextChange = (fieldKey:any, value:any) => {
    setTextFormData({
      ...textFormData,
      [fieldKey]: value
    });
  };

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
                value={formData.classIddisplay}
                searchCharLimit={2}
                setValue={selectedOption => onClassSelect(selectedOption)}
                getMultiselectSearchResults={handleOnChange}
                commonData={
                  dropdownData?.classNameDropdownList
                    ? {
                      entities: getDropdownClassesCompatibleData(
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
              {showEmptySelected == 'Class' && showEmptyOption && !isLoading && (<div className='empty-optionproduct'>No results found!</div>)}
              {showEmptySelected == 'Class' && isLoading && (<div className='empty-optionproduct'>Loading...</div>)}
              <span className={validClass ? 'span' : 'errorspan'} >Please Enter Valid Class</span>
            </FormGroup>
            <div className={`${!isProductmode ? 'hide' : ''}`}>
              <div className='role-container-right'>
                <p>
                  <a href="https://ktglbuc.sharepoint.com/:w:/s/VivvixUnifiedTaxonomy/EcIdGtpaDrxJuPnFK1lNq7gBcCCIOBZtZMsbBrQ78Smw1Q?e=1e2yhE" target="_blank" className='heyperlinkgeneral removeunderline'>General guidlines</a>
                  <a href={classurlupdate} target="_blank" className={classurlupdate ? 'heyperlink removeunderline' : 'heyperlink removeunderline  heyperlinknew'}>Class Instructions</a></p>
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
              {showEmptySelected == 'ProductType' && showEmptyOption && !isLoading && (<div className='empty-optionproduct'>No results found!</div>)}
              {showEmptySelected == 'ProductType' && isLoading && (<div className='empty-optionproduct'>Loading...</div>)}
              <span className={validProductType ? 'span' : 'errorspan'} >Please Enter Valid Product Type</span>
            </FormGroup>
          </div>
          <div className={`${isProductmode ? 'childprd' : 'child'}`} >
            <FormGroup>
              <FormItemLabel>Descriptor Type(s)</FormItemLabel>
              <DynamicMultiSelectSearch
                id={`descriptortypeList`}
                value={descriptorsTypeList}
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
                disabled={descriptortypeenable}
                getMultiselectSearchResults={(value: { search_text: any; }) =>
                  handleOnChangeMultiSearchDestype({ searchValue: value.search_text })
                }
              />
              {showEmptySelected == 'DescriptorType' && showEmptyOption && !isLoading && (<div className='empty-optionproduct'>No results found!</div>)}
              {showEmptySelected == 'DescriptorType' && isLoading && (<div className='empty-optionproduct'>Loading...</div>)}
            </FormGroup>
          </div>
          <div className={`${isProductmode ? 'childprd' : 'child'}`} >
            <FormGroup>
              <FormItemLabel>Descriptor(s)</FormItemLabel>
              <DynamicMultiSelectSearch
                id={`descriptorListproduct`}
                value={descriptorsList}
                setValue={options => ondescriptorsClick(options?.mcssValues)}
                commonData={
                  props.dropdownData?.referredToDescriptorDropdownList
                    ? {
                      entities: getDropdownCompatibleData(
                        props.dropdownData?.referredToDescriptorDropdownList,
                        {
                          label: 'label',
                          value: 'value'
                        }
                      )
                    }
                    : { entities: [] }
                }
                disabled={descriptorsenable ? true : false}
                getMultiselectSearchResults={(value: { search_text: any; }) =>
                  handleOnChangeMultiSearchDes({ searchValue: value.search_text })
                }
              />
              {showEmptySelected == 'Descriptor' && showEmptyOption && !isLoading && (<div className='empty-optionproduct'>No results found!</div>)}
              {showEmptySelected == 'Descriptor' && isLoading && (<div className='empty-optionproduct'>Loading...</div>)}
              <span className={validdescriptors ? 'span' : 'errorspan'} >Please Enter Valid Descriptor</span>
            </FormGroup>
          </div>
          <div className={`${isProductmode ? 'childprd' : 'child'}`} >
            <FormGroup>
              <FormItemLabel isMandatory>Product Name</FormItemLabel>
              <DynamicSearch
                id={'productnameId'}
                name={'productName'}
                fieldName={'productName'}
                value={productNameList}
                setValue={selectedOption => onproductname(selectedOption)}
                getMultiselectSearchResults={handleOnChange}              
                commonData={
                  dropdownData?.referredToProductNameDropdownList?.length > 0
                    ? {
                        entities: getDropdownCompatibleData(  
                        dropdownData.referredToProductNameDropdownList,
                        {
                          label: 'productName',
                          value: 'productnameId'
                        }
                      )
                    }
                    : { 
                      entities: [],
                      isSearchComplete: true,
                      createButtonText:"Add New Text",
                      onCreateButtonClick: () => {onproductaddname()},              
                    }
                  
                }
                disabled={false}
              />
              {showEmptySelected == 'ProductName' && showEmptyOption && !isLoading && (<div className='empty-optionproduct'>No results found!</div>)}
              {showEmptySelected == 'ProductName' && isLoading && (<div className='empty-optionproduct'>Loading...</div>)}
              <span className={validProductName ? 'span' : 'errorspan'} >Please Enter Valid Product Name</span>
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
                setValue={selectedOption => onbrandname(selectedOption)}
                getMultiselectSearchResults={handleOnChangeMultiSearchBrand}
                commonData={
                  dropdownData?.referredToBrandDropdownList
                    ? {
                      entities: getDropdownCompatibleData(
                        dropdownData.referredToBrandDropdownList,
                        {
                          label: 'companydisplayName',
                          value: 'companyId'
                        }
                      )
                    }
                    : { entities: [] }
                }
                disabled={false}
              />
              {showEmptySelected == 'BrandId' && showEmptyOption && !isLoading && (<div className='empty-optionproduct'>No results found!</div>)}
              {showEmptySelected == 'BrandId' && isLoading && (<div className='empty-optionproduct'>Loading...</div>)}
              <span className={validBrandID ? 'span' : 'errorspan'} >Please Enter Valid Brand</span>
            </FormGroup>
          </div>
          <div className='child productpreview'>

            <FormGroup>
              <FormItemLabel isMandatory >Product Preview</FormItemLabel>
              <div>
                <div className='productdisplaycolor' > {producatname_n} </div>
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
            <span className={productAlready ? 'span' : 'errorspan'} >Product already exists </span>
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
