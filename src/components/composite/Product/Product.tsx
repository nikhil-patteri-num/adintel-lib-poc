import React, { useEffect, useRef, useState } from 'react';
import './Prdouct.scss';
import { FormGroup, FormItemLabel, TextArea, buttonVariant, Button, Icon, CheckboxInput } from '../../core';
import { DynamicSearch } from '../../core/DynamicRenderer/DynamicSearch/DynamicSearch';
import { checkExactSearchMatch, getDropdownClassesCompatibleData, getDropdownCompatibleData} from '../../utility/CommonMethods';
// import { DynamicMultiSelectSearch } from '../../core/DynamicRenderer/DynamicMultiSelectSearch/DynamicMultiselectSearch';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { DropdownSearchField } from '../../core/Dropdown/SearchDropdown/DropdownSearch';
import { MultiSelect } from '../../core/MultiSelect';
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
  shortcutsaveflg:boolean;
}

export const Product = (props: IProductProps) => {
  const { dropdownData, selectedRowData, isLoading, showEmptyOption, productTypeId, showEmptySelected, Brand, productValiationflg,shortcutsaveflg } = props;
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
  const [producttypeidnew,setproducttypeidnew]:any=useState(0);
  const [descriptorsTypeList, setdescriptorsTypeList]: any = useState({ label: '', value: 0 });
  const [descriptorsTypeListID, setdescriptorsTypeListID]: any = useState([]);
  const [productNameList, setproductNameList]: any = useState({ label: '', value: 0 });
  const [descriptorsList, setdescriptorsList]: any = useState({ label: '', value: 0 });
  const [descriptorsListNew, setdescriptorsListNew]:any = useState([]);
  const [showfreproducttype, setshowfreproducttype] = useState(true);
  const [productAlready, setproductAlready] = useState(true);
  const [productTypesForPreviousData, setProductTypesForPreviousData]: any = useState([]);
  // const [descriptorsTypeListData, setDescriptorsTypeListData]: any = useState([]);
  const [showfrebrand, setShowfrebrand] = useState<boolean>(true);
  const buttonRef:any =useRef(null);
   useEffect(() => {
    if (dropdownData?.ProductTypesForPreviousProductDropdown?.length)
      setProductTypesForPreviousData(
        dropdownData.ProductTypesForPreviousProductDropdown
      );
   }, [dropdownData?.ProductTypesForPreviousProductDropdown]);
   
  //  useEffect(() => {
  //   if (dropdownData?.referredToClassDataValidation?.length)
  //   setDescriptorsTypeListData(
  //       dropdownData.referredToClassDataValidation?.descriptorsType
  //     );
  //  }, [dropdownData?.referredToClassDataValidation]);

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
    productTypeName: '',
    brandname:''
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
      formData.descriptorsList = (descriptorsList!==null && descriptorsList.value!==0)?descriptorsList:[];
      formData.descriptorsTypeList = (descriptorsTypeList!==null && descriptorsTypeList.value!==0)?descriptorsTypeList:[];
      formData.classId = formData.classIddisplay?.value.toString();
      if(formData.productTypeId.toString().includes('--')==true)
      {
      if(formData.productTypeId.split('--').length>1)
      {
      formData.productTypeId=formData.productTypeId.split('--')[0];
      }
      }
      props.onCreateProductSave(formData);
    }
  };

  useEffect(() => {
    if (formData.classIddisplay?.value != 0 && formData.classIddisplay.label != '') {
      setFormData({
        ...formData,
        productTypeId: productTypeId?.productTypeId,
        productType: productTypeId?.productType
      })
      setproductNameList({ label: productTypeId?.product_n, value: productTypeId?.productname_id })
      setproductTypeList({ label: productTypeId?.productType, value: productTypeId?.productTypeId });
      setdescriptortypeenable(false);
      if (productTypeId?.descriptorsType != null && productTypeId?.descriptorsType?.length > 0) {
        setdescriptorsTypeList(getDropdownCompatibleData(productTypeId?.descriptorsType, { label: 'label', value: 'value' }));
       // setDescriptorsTypeListData(getDropdownCompatibleData(productTypeId?.descriptorsType, { label: 'label', value: 'value' }));
      } else {
        setdescriptorsTypeList([]);
        setdescriptorsTypeListID([]);
      }
      if (productTypeId?.descriptors != null && productTypeId?.descriptors?.length > 0) {
        setvaliddescriptors(true);
        setdescriptorsList(getDropdownCompatibleData(productTypeId?.descriptors, { label: 'label', value: 'value' }));
        setdescriptorsListNew(getDropdownCompatibleData(productTypeId?.descriptors, { label: 'label', value: 'value' }));
      } else {
        setvaliddescriptors(true);
        setdescriptorsList({ label: '', value: 0 });
        setdescriptorsListNew([]);
      }
      setclassurlupdate(productTypeId?.class_instruction_url);
      const payload = {
        descriptorsTypeList: descriptorsTypeListID.length>0?descriptorsTypeListID:[],
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
      // onFieldsTextChange('brandname', Brand?.Brand?.split(' ')[0]);
      const value = { search_text: Brand?.Brand, name: 'brand' }
      // value['name'] = 'brand';
      props.onchange(value);
    }
  }, [Brand]);

  useEffect(() => {
    const payload = {
      descriptorsTypeList: descriptorsTypeListID.length>0?descriptorsTypeListID:[],
      descriptorsList: descriptorsList,
      productname: formData.productname,
      productType: formData.productType
    };
    productnameformation(payload);
  }, [producatname_n]);

  useEffect(() => {
    if (shortcutsaveflg == true) {
      buttonRef.current.click();
    }
  }, [shortcutsaveflg]);

  useEffect(() => {
    if (producttypeidnew.length > 0) {
      if (producttypeidnew.split('--')[0] != 'null' && formData.productType != producttypeidnew.split('--')[1]) {
        setFormData({
          ...formData,
          productTypeId: producttypeidnew.split('--')[0],
          productType: producttypeidnew.split('--')[1],
        })
        const payload = {
          descriptorsTypeList: descriptorsTypeListID.length>0?descriptorsTypeListID:[],
          descriptorsList: descriptorsList,
          productname: formData.productname,
          productType: producttypeidnew.split('--')[1],
        };
        productnameformation(payload);
      }
    }
  }, [producttypeidnew]);

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
    if (descriptorsTypeListID.length && (!descriptorsList.length || descriptorsTypeListID.length !== descriptorsList.length)) {
      setvaliddescriptors(false);
      return false;
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
        descriptorslist = descriptorslist + obj['label'].split(' : ')[1] + ' - ';
      }
      const desclist = descriptorslist.substring(0, descriptorslist.length - 3).split('-').sort();
      descriptorslist='';
      for (let obj of desclist) {
        descriptorslist = descriptorslist + obj.trim() + ' - ';
      }
      descriptorslist= descriptorslist.substring(0, descriptorslist.length - 3);

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



// const handleOnChangeMultiSearchDes = (value: any) => {
//     value['name'] = 'descriptor';
//     value['classId'] = formData.classIddisplay?.value;
//     value['descriptorsTypeList'] = descriptorsTypeList;
//     value['descriptorsList'] = descriptorsList;
//     props.onchange(value);
//   }
  const handleOnChangeMultiSearchBrand = (value: any) => {
    value['name'] = 'brand';
    props.onchange(value);
    if (value != null && value != '' && value != '0') {
      setvalidBrandID(true);
    } else {
      setvalidBrandID(false);
    }
    onFieldsTextChange('brandname', value.search_text);
  }

  // const handleOnChangeMultiSearchDestype = (value: any) => {
  //   value['name'] = 'descriptorsType';
  //   value['classId'] = formData.classIddisplay?.value;
  //   props.onchange(value);

  // }

  const handleOnChangeMultiSearchProducttype = (value: any) => {
    value['name'] = 'producttypeName';
    value['classId'] = formData.classIddisplay?.value;
    props.onchange(value);
    if (value != null && value != '' && value != '0') {
      setvalidClass(true);
    }
    else {
      setvalidClass(false);
    }
   
    onFieldsTextChange(value.name, value.search_text);
  }

  const handleOnChange = (value: any) => {
    props.onchange(value,formData.classId);
    if (value != null && value != '' && value != '0') {
      setvalidClass(true);
    }
    else {
      setvalidClass(false);
    }

    onFieldsTextChange(value.name, value.search_text);
  }
  const ondescriptorsTypeClick = (values: any) => {
    //setdescriptorsTypeList(values);
    if (values != null && values != '' && values != undefined) {
      setdescriptorsenable(false);
      const value:any={};
      value['name'] = 'descriptor';
      value['classId'] = formData.classIddisplay?.value;
      value['descriptorsTypeList'] = values;
      value['descriptorsList'] = null;
      props.onchange(value);
      setdescriptorsTypeListID(values);
    }
    else {
      setdescriptorsList({ label: '', value: 0 });
       setdescriptorsListNew([]);
      setvaliddescriptors(true);
      setdescriptorsenable(true);
      setdescriptorsTypeListID([]);
    }

  }
  const ondescriptorsClick = (values: any) => {
    setvaliddescriptors(true);
    if (values != null && values.length > 1) {
      descriptorsTypeListID.forEach((element: any) => {
        let indexcount = values.filter((item: any) => item.value.split('-')[1].includes(element.value)).length;
        let count = 0;
        values.forEach((item: any) => {
          if (Number(item.value.split('-')[1]) === element.value) {
            count++;
            if (count !== indexcount) {
              item.checked = false;
            } else {
              item.checked = true;
            }
          }
        });
      });
      values = values.filter((item: any) => item.checked == true);
    }
    setdescriptorsList(values);
    setdescriptorsListNew(values);
    const payload = {
      descriptorsTypeList: descriptorsTypeListID.length>0?descriptorsTypeListID:[],
      descriptorsList: values,
      productname: formData.productname,
      productType: formData.productType
    };
    productnameformation(payload);
  }
  const onClassSelect = (values: any) => {
    setFormData({
      ...formData,
      classIddisplay: { label: values.label, value: values.value },
    });
    setProductTypesForPreviousData([]);
    //setDescriptorsTypeListData([]);
    if (values.label != "" && values.label != null) {
      values['descriptorsTypeList'] = descriptorsTypeListID;
      values['descriptorsList'] = (descriptorsList.value!=0 && descriptorsList.label!="")?descriptorsList:[];
      props.onchange(values);
      setdescriptortypeenable(false);
    }
    else {
      setdescriptortypeenable(true);
      setclassurlupdate('');
      setdescriptorsTypeList([]);
      setdescriptorsList({ label: '', value: 0 });
      setdescriptorsListNew([]);
      setproducttypeidnew(0);
      setFormData({
      ...formData,
      productTypeId:'',
      productType: '',
    });
      const payload = {
        descriptorsTypeList: descriptorsTypeListID.length>0?descriptorsTypeListID:[],
        descriptorsList: (formData.descriptorsList.length>0)?formData.descriptorsList:[],
        productname: formData.productname,
        productType: formData.productType,
      };
      productnameformation(payload);
      
      values['name'] = 'descriptorsType';
      values['classId'] = formData.classIddisplay?.value;
      props.onchange(values);
    }


  }
  const onproducttype = (values: any) => {
    setFormData({
      ...formData,
      productTypeId: values.value,
      productType: values.label
    });
    setproductTypeList(values);
    setproducttypeidnew(values.value+'--'+values.label);
    const payload = {
      descriptorsTypeList: descriptorsTypeListID.length>0?descriptorsTypeListID:[],
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
    });
    setproductNameList(values);
    const payload = {
      descriptorsTypeList: descriptorsTypeListID.length>0?descriptorsTypeListID:[],
      descriptorsList: descriptorsList,
      productname: values.label,
      productType: formData.productType,
    };
    if (values.value != null && values.value != '' && values.value != '0') {
      setvalidProductName(true);
    } else {
      setvalidProductName(false);
      setBrandList({ label: '', value: 0 });
    }
    productnameformation(payload);
    if (values.label != "" && values.label != null) {
      props.onchange(values);
    }
  }

  const addNewProductType = (values: any) => {
    setFormData({
      ...formData,
      productTypeId: values.value,
      productType: values.label
    });

    setproductTypeList({ label: values.label, value: -1 });
    const payload = {
      descriptorsTypeList: descriptorsTypeListID.length>0?descriptorsTypeListID:[],
      descriptorsList: descriptorsList,
      productname: formData.productname,
      productType: values.label,
    };
    productnameformation(payload);
  };

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
      descriptorsTypeList: descriptorsTypeListID.length>0?descriptorsTypeListID:[],
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

   const onBrandaddname = () => {
    setFormData({
      ...formData,
      brandname:textFormData.brandname,
      brandId: '-1'
    });
    setBrandList({ label: textFormData.brandname, value: -1 });
    if (textFormData.brandname != null && textFormData.brandname != '' && textFormData.brandname != '0') {
      setvalidBrandID(true);
    } else {
      setvalidBrandID(false);
    }
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

  const getCommonBrandData = () => {
    return dropdownData?.referredToBrandDropdownList?.length > 0 ? {
      entities: getDropdownCompatibleData(
        dropdownData.referredToBrandDropdownList,
        {
          label: 'companydisplayName',
          value: 'companyId'
        }
      ),
      isSearchComplete: false,
      createButtonText: checkExactSearchMatch(
        textFormData.brandname,
        dropdownData.referredToBrandDropdownList,
        'companydisplayName'
      )
        ? null
        : 'Add New',
      onCreateButtonClick: () => {
        onBrandaddname();
      }
    } : {
      entities: [],
      isSearchComplete: true,
      createButtonText: "Add New Text",
      onCreateButtonClick: () => { onBrandaddname() }
    }
  }

  const getBrandOptions = () => {
    return dropdownData?.referredToBrandDropdownList?.length > 0 ?
      getDropdownCompatibleData(dropdownData.referredToBrandDropdownList, {
        label: 'companydisplayName',
        value: 'companyId'
      }) : [];
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
                  {/* <a href="https://ktglbuc.sharepoint.com/:w:/s/VivvixUnifiedTaxonomy/EcIdGtpaDrxJuPnFK1lNq7gBcCCIOBZtZMsbBrQ78Smw1Q?e=1e2yhE" target="_blank" className='heyperlinkgeneral removeunderline'>General Guidelines</a> */}
                  <a href="https://ktglbuc.sharepoint.com/:w:/r/sites/VivvixUnifiedTaxonomy/_layouts/15/Doc.aspx?sourcedoc=%7BD1CD9409-1EBC-45DB-A783-C439D20E9A50%7D&file=General%20Guidelines.docx&action=default&mobileredirect=truev" target="_blank" className='heyperlinkgeneral removeunderline'>General Guidelines</a>
                  <a href={classurlupdate} target="_blank" className={classurlupdate ? 'heyperlink removeunderline' : 'heyperlink removeunderline  heyperlinknew'}>Class Instructions</a></p>
              </div>
            </div>
          </div>
          <div className={`${isProductmode ? 'childprd checkboxdesignproduct' : 'child'}`} >
          <FormGroup>
          <FormItemLabel >Previously Used</FormItemLabel>
          <CheckboxInput customClass='checkboxdesignproducttype'
                  id={'checkbox'}
                  checked={showfreproducttype}
                  label={''}
                  onChange={(event: any) => setshowfreproducttype(event.target.checked)} />
           </FormGroup>      
          </div>
          <div className={`${isProductmode ? 'childprd productypeDesignchanges' : 'child'}`} >
            <FormGroup>
              <FormItemLabel isMandatory>Product Type</FormItemLabel>
              <div
                className={`${
                  showfreproducttype ? 'producttypehide' : 'producttypeshow'
                }`}
              >
                <DynamicSearch
                  id={'productTypeId'}
                  name={'producttypeName'}
                  fieldName={'producttypeName'}
                  value={productTypeList}
                  setValue={(selectedOption) => onproducttype(selectedOption)}
                  getMultiselectSearchResults={(value: { search_text: any }) => {
                    handleOnChangeMultiSearchProducttype({
                      searchValue: value.search_text,
                    });
                    setTextFormData({
                      ...textFormData,
                      productTypeName: value.search_text,
                    });
                  }}
                  commonData={
                    dropdownData?.referredToProductTypesForProductDropdownList?.length > 0
                      ? {
                          entities: getDropdownCompatibleData(
                            dropdownData.referredToProductTypesForProductDropdownList,
                            {
                              label: 'producttypeName',
                              value: 'producttypeId',
                            }
                          ),
                          isSearchComplete:false,
                          createButtonText: checkExactSearchMatch(
                          textFormData.productTypeName,
                          dropdownData.referredToProductTypesForProductDropdownList,
                            'producttypeName'
                          )
                            ? null
                          : 'Add New',
                          onCreateButtonClick: () => {
                            addNewProductType({
                              label: textFormData.productTypeName,
                              value: -1,
                            });
                          }
                        }
                      : { entities: [],
                        isSearchComplete: true,
                        createButtonText:"Add New Text",
                        onCreateButtonClick: () => {
                          addNewProductType({
                            label: textFormData.productTypeName,
                            value: -1,
                          });
                        }
                      }
                  }
                  disabled={false}
                />
              </div>
              <div
                className={`${
                  showfreproducttype ? 'producttypeshow' : 'producttypehide'
                }`}
              >
                <DropdownSearchField
                  id={'productTypeId'}
                  options={
                    productTypesForPreviousData?.length
                      ? getDropdownCompatibleData(productTypesForPreviousData, {
                          label: 'producttypeName',
                          value: 'producttypeId',
                        })
                      : []
                  }
                  onClick={(value) => {
                    const getSelectedItem = productTypesForPreviousData?.filter(
                      (item: any) => item.producttypeId == value
                    );
                    onproducttype({
                      label: getSelectedItem[0].producttypeName,
                      value: getSelectedItem[0].producttypeId,
                    });
                  }}
                  value={productTypeList.value}
                  placeholder={'Select a Status'}
                />
              </div>
              {showfreproducttype && showEmptySelected == 'ProductType' &&
                showEmptyOption &&
                !isLoading && (
                  <div className="empty-optionproduct">No results found!</div>
                )}
              {showEmptySelected == 'ProductType' && isLoading && (
                <div className="empty-optionproduct">Loading...</div>
              )}
              {showfreproducttype && (
                <span className={validProductType ? 'span' : 'errorspan'}>
                  Please Enter Valid Product Type
                </span>)
              }   
            </FormGroup>
          </div>
          <div className={`${isProductmode ? 'childprd' : 'child'}`} >
            <FormGroup>
              <FormItemLabel>Descriptor Type(s)</FormItemLabel>
              <MultiSelect
                      id='descriptortypeList'
                      key={dropdownData?.referredToDescriptorTypeDropdownList}
                      defaultValues={descriptorsTypeListID}
                      onClick={(value: any) => ondescriptorsTypeClick(value)}
                      isPartiallyDisabled={descriptortypeenable}
                      options={
                        descriptorsTypeList?.length
                          ? getDropdownCompatibleData(descriptorsTypeList, {
                              label: 'label',
                              value: 'value',
                            })
                          : []
                      }
                    />
              {showEmptySelected == 'DescriptorType' && showEmptyOption && !isLoading && (<div className='empty-optionproduct'>No results found!</div>)}
              {showEmptySelected == 'DescriptorType' && isLoading && (<div className='empty-optionproduct'>Loading...</div>)}
            </FormGroup>
          </div>
          <div className={`${isProductmode ? 'childprd' : 'child'}`} >
            <FormGroup>
              <FormItemLabel isMandatory={descriptorsTypeListID?.length}>Descriptor(s)</FormItemLabel>
              <MultiSelect
                    id='descriptorListproduct'
                    key={dropdownData?.referredToDescriptorDropdownList||null}
                    defaultValues={descriptorsListNew||[]}
                    onClick={options => ondescriptorsClick(options)}
                    options={dropdownData?.referredToDescriptorDropdownList||[]}
                    isPartiallyDisabled={descriptorsenable ? true : false}
                    isSelectallVisible={false}
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
                      ),
                      isSearchComplete: false,
                      createButtonText: checkExactSearchMatch(
                       textFormData.productName,
                       dropdownData.referredToProductNameDropdownList,
                       'productName'
                     )
                       ? null
                     : 'Add New',
                     onCreateButtonClick: () => {
                       onproductaddname();
                     }
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
              <FormItemLabel>Previously Used</FormItemLabel>
              <CheckboxInput customClass='checkboxdesignproducttype'
                id={'checkbox_brand'}
                checked={showfrebrand}
                label={''}
                onChange={(event: any) => setShowfrebrand(event.target.checked)} />
            </FormGroup>
            <FormGroup>
              <FormItemLabel isMandatory>Brand</FormItemLabel>
              {!showfrebrand ? <DynamicSearch
                id={'brand'}
                name={'companyName'}
                fieldName={'companyName'}
                value={BrandList}
                setValue={selectedOption => onbrandname(selectedOption)}
                getMultiselectSearchResults={handleOnChangeMultiSearchBrand}
                commonData={getCommonBrandData()}
                disabled={false}
              /> :
              <DropdownSearchField
                id={'brandId'}
                options={getBrandOptions()}
                onClick={(value) => {
                  const getSelectedItem = dropdownData?.referredToBrandDropdownList?.filter(
                    (item: any) => item.companyId == value
                  );
                  onbrandname({
                    label: getSelectedItem[0].companydisplayName,
                    value: getSelectedItem[0].companyId,
                  });
                }}
                value={BrandList.value}
                placeholder={'Select a Brand'}
              />}
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
              <div hidden>
               <button ref={buttonRef} onClick={onSaveClick}> Self Click </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
