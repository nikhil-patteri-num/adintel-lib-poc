import React, {  useState } from 'react';
import './Prdouct.scss';
import { FormGroup, FormItemLabel, Dropdown, TextArea, CheckboxInput, TextInput, inputType, buttonVariant, Button } from '../../core';
import { DynamicSearch } from '../../core/DynamicRenderer/DynamicSearch/DynamicSearch';
import { getDropdownCompatibleData } from '../../utility/CommonMethods';
import { DynamicMultiSelectSearch } from '../../core/DynamicRenderer/DynamicMultiSelectSearch/DynamicMultiselectSearch';
export interface IProductProps {
  isEditmode: boolean;
  isProductmode: boolean;
  dropdownData:any;
  onchange:any;
  onCreateProductSave: (payload: any) => void;
  onEditProductSave: (payload: any) => void;
  onClose: () => void;
  selectedRowData?: any;
}

export const Product = (props: IProductProps) => {
  const { isEditmode, isProductmode,dropdownData, selectedRowData} = props;
  const [Rank, setRank] = useState(true);
  const [Markets, setMarkets] = useState();
  const [isNationalChecked, setIsNational] = useState(true);
  const [formData, setFormData] = useState({
    classId:'',
    productTypeId:'',
    descriptorsTypeList: [],
    descriptorsList: [],
    productnameId:'',
    brandId:'',
    newComment: '',
    createUser: '',
    createDate: '',
    changeUser: '',
    changeDate: '',
    previousComments: '',
    status:'',
    licensorBrand:'',
    LicenseeBrand:'',
    ProductTags:'',
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
  };
  const onConfirmSaveClick = () => {
    if (isEditmode) {
      props.onEditProductSave({ id: selectedRowData.id, ...formData });
    } else {
      props.onCreateProductSave(formData);
    }
  };
  const isValidInputs = (): boolean => {
    // Regular expression which accepts all characters except foreign accent marks
    const regex = /^[^\u00C0-\u02AF\u1D2C-\u1D61\u1E00-\u1EFF]+$/;
    if (!formData.classId) {
      alert('This is an alert message!');
      return false;
    } else if (!regex.test(formData.classId)) {
     
      return false;
    }
    return true;
  };

 
  
  const handleOnChangeMultiSearchDes = (value: any) => {
    value['name']='descriptor';
    props.onchange(value);
  }
  const handleOnChangeMultiSearchBrand = (value: any) => {
    value['name']='brand';
    props.onchange(value);
  }
   const handleOnChangeMultiSearchDestype = (value: any) => {
     value['name']='descriptorsType';
     props.onchange(value);

   }
 
   const handleOnChange = (value: string) => {
     props.onchange(value);
  
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
                setValue={selectedOption =>
                  setFormData({
                    ...formData,
                    classId: selectedOption.value
                  })
                }
                 getMultiselectSearchResults={handleOnChange}
                 commonData={
                  dropdownData?.classNameDropdownList
                    ? {
                        entities: getDropdownCompatibleData(
                          dropdownData.classNameDropdownList,
                          {
                            label: 'classCode',
                            value: 'classId'
                          }
                        )
                      }
                    : { entities: [] }
                }
                disabled={false}
              />
            </FormGroup>
            <div className={`${!isProductmode ? 'hide' : ''}`}>
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
              <DynamicSearch
                id={'productTypeId'}
                name={'producttypeName'}
                fieldName={'producttypeName'}
                value={formData.productTypeId}
                setValue={selectedOption =>
                  setFormData({
                    ...formData,
                    productTypeId: selectedOption.value
                  })
                }
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
                            label: 'descriptortypeName',
                            value: 'descriptortypeId'
                          }
                        )
                      }
                    : { entities: [] }
                }
                getMultiselectSearchResults={(value: { search_text: any; }) =>
                 handleOnChangeMultiSearchDestype({ searchValue: value.search_text })
                }
              />
             
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
                            label: 'descriptorName',
                            value: 'descriptorId'
                          }
                        )
                      }
                    : { entities: [] }
                }
                getMultiselectSearchResults={(value: { search_text: any; }) =>
                 handleOnChangeMultiSearchDes({ searchValue: value.search_text })
                }
              />

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
                setValue={selectedOption =>
                  setFormData({
                    ...formData,
                    productnameId: selectedOption.value
                  })
                }
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
            </FormGroup>
          </div>
          <div className={`${isProductmode ? 'childprd' : 'child'}`}>
            <FormGroup>
              <FormItemLabel isMandatory>Brand</FormItemLabel>  
              <DynamicSearch
                id={'brand'}
                name={'companyName'}
                fieldName={'companyName'}
                value={formData.brandId}
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
            </FormGroup>
          </div>
          {(!isProductmode) && (
            <div className='child'>
              <FormGroup>
                <FormItemLabel>Licensee Brand</FormItemLabel>
               <DynamicSearch
                id={'LicenseeBrand'}
                name={'companyName'}
                fieldName={'companyName'}
                value={formData.brandId}
                setValue={selectedOption =>
                  setFormData({
                    ...formData,
                    brandId: selectedOption.value
                  })
                }
                 getMultiselectSearchResults={handleOnChangeMultiSearchBrand}
                 commonData={
                  dropdownData?.licenseeBrandDropdownList
                    ? {
                        entities: getDropdownCompatibleData(
                          dropdownData.licenseeBrandDropdownList,
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


              </FormGroup>
            </div>
          )}
          {(!isProductmode) && (
            <div className='child'>
              <FormGroup>
                <FormItemLabel>Licensor Brand</FormItemLabel>
                
                <DynamicSearch
                id={'LicensorBrand'}
                name={'companyName'}
                fieldName={'companyName'}
                value={formData.brandId}
                setValue={selectedOption =>
                  setFormData({
                    ...formData,
                    brandId: selectedOption.value
                  })
                }
                 getMultiselectSearchResults={handleOnChangeMultiSearchBrand}
                 commonData={
                  dropdownData?.licensorBrandDropdownList
                    ? {
                        entities: getDropdownCompatibleData(
                          dropdownData.licensorBrandDropdownList,
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
              </FormGroup>
            </div>
          )}
          {(!isProductmode) && (
            <div className='child'>
              <FormGroup>
                <FormItemLabel>Product Tags</FormItemLabel>
                <DynamicSearch
                id={'ProductTags'}
                name={'tag_n'}
                fieldName={'tag_n'}
                value={formData.brandId}
                setValue={selectedOption =>
                  setFormData({
                    ...formData,
                    brandId: selectedOption.value
                  })
                }
                 getMultiselectSearchResults={handleOnChangeMultiSearchBrand}
                 commonData={
                  dropdownData?.referredToProductTagDropdownList
                    ? {
                        entities: getDropdownCompatibleData(
                          dropdownData.referredToProductTagDropdownList,
                          {
                            label: 'tag_n',
                            value: 'tag_id'
                          }
                        )
                      }
                    : { entities: [] }
                }
                disabled={false}
              />
              </FormGroup>
            </div>
          )}
          {(!isProductmode) && (
            <div className='child checkboxalignment'>
              <FormGroup >
                <div>
                  <FormItemLabel>National</FormItemLabel>
                  <CheckboxInput customClass='checkboxdesign'
                    id={'checkbox'}
                    checked={isNationalChecked}
                    label={''}
                    onChange={(event: any) => setIsNational(event.target.checked)}
                  />
                </div>
              </FormGroup>
              <FormGroup>
                <FormItemLabel>Rank</FormItemLabel>
                <CheckboxInput
                  customClass='checkboxdesign'
                  id={'Rank'}
                  checked={Rank}
                  label={''}
                  //value={Rank}
                  onChange={(event: any) => setRank(event.target.checked)}
                />
              </FormGroup>
            </div>
          )}

          <div className={`${isProductmode ? 'childprd' : 'child'}`}>
            <FormGroup >
              <FormItemLabel>{`${isProductmode ? 'New Product Listing : ' : 'Product Preview'}`}</FormItemLabel>
              {(!isProductmode) && (
                <TextInput
                  id={'ProductPreview'}
                  type={inputType.text}
                  name={'ProductPreview'}
                  value={''}
                  maxLength={150}
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
        </div>
        <div className={`${isProductmode ? '' : 'right'}`}>

          {(!isProductmode) && (
            <div className='child'>
              <FormGroup>
                <FormItemLabel isMandatory>Status</FormItemLabel>
                <Dropdown
                id={'status'}
                searchOption={true}
                options={
                  props.dropdownData?.statusList
                    ? getDropdownCompatibleData(props.dropdownData?.statusList, {
                        label: 'entitystateName',
                        value: 'entitystateId'
                      })
                    : []
                }
                onClick={(value: any) =>
                  setFormData({
                    ...formData,
                    status: value
                  })
                }
                value={formData.status}
                placeholder={'Select a Status'}
              />
              </FormGroup>
            </div>
          )}
          {(!isProductmode) && (
            <div className='child'>
              <FormGroup>
                <FormItemLabel>Referred to</FormItemLabel>
                <DynamicSearch
                id={'referredto'}
                name={'companyName'}
                fieldName={'companyName'}
                value={formData.brandId}
                setValue={selectedOption =>
                  setFormData({
                    ...formData,
                    brandId: selectedOption.value
                  })
                }
                 getMultiselectSearchResults={handleOnChangeMultiSearchBrand}
                 commonData={
                  dropdownData?.referredToProductDropdownList
                    ? {
                        entities: getDropdownCompatibleData(
                          dropdownData.referredToProductDropdownList,
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
              </FormGroup>
            </div>
          )}
          {(!isProductmode) && (
            <div className='child'>
              <FormGroup >
                <FormItemLabel>Markets</FormItemLabel>
                <Dropdown
                  id={'Markets'}
                  value={Markets}
                  options={[]}
                  onClick={(value: any) => setMarkets(value)}
                  placeholder={'Search for Markets'}
                  disabled={isNationalChecked}
                />
              </FormGroup>
            </div>
          )}
          {(isEditmode) && (!isProductmode) && (
            <div className='child'>
              <FormGroup>
                <FormItemLabel>
                  Recent Creatives
                </FormItemLabel>
                <TextInput
                  id={'RecentCreatives'}
                  type={inputType.text}
                  name={'RecentCreatives'}
                  value={''}
                  maxLength={150}
                />
              </FormGroup>
            </div>
          )}
          {(isEditmode) && (!isProductmode) && (
            <div className='child'>
              <FormGroup>
                <FormItemLabel>
                  Activity
                </FormItemLabel>
                <TextInput
                  id={'Activity'}
                  type={inputType.text}
                  name={'Activity'}
                  value={''}
                  maxLength={150}
                />
              </FormGroup>
            </div>
          )}
          {(isEditmode) && (!isProductmode) && (
            <div className='userAndDateFields'>
              <div className='child'>
                <FormGroup>
                  <FormItemLabel>
                    Create User
                  </FormItemLabel>
                  <TextInput
                    id={'CreateUser'}
                    type={inputType.text}
                    name={'CreateUser'}
                    value={''}
                    maxLength={150}
                    disabled={true}
                  />
                </FormGroup>
              </div>
              <div className='child'>
                <FormGroup>
                  <FormItemLabel> Create Date </FormItemLabel>
                  <TextInput
                    id={'CreateDate'}
                    type={inputType.text}
                    name={'CreateDate'}
                    value={''}
                    maxLength={150}
                    disabled={true}
                  />
                </FormGroup>
              </div>
              <div className='child'>
                <FormGroup>
                  <FormItemLabel> Change User </FormItemLabel>
                  <TextInput
                    id={'ChangeUser'}
                    type={inputType.text}
                    name={'ChangeUser'}
                    value={''}
                    maxLength={150}
                    disabled={true}
                  />
                </FormGroup>
              </div>
              <div className='child'>
                <FormGroup>
                  <FormItemLabel> Change Date </FormItemLabel>
                  <TextInput
                    id={'ChangeDate'}
                    type={inputType.text}
                    name={'ChangeDate'}
                    value={''}
                    maxLength={150}
                    disabled={true}
                  />
                </FormGroup>
              </div>
            </div>
          )}
          {(isEditmode) && (!isProductmode) && (
            <div className='child'>
              <FormGroup >
                <FormItemLabel>Previous Comments</FormItemLabel>
                <TextArea
                  id={'PreviousComments'}
                  name={'PreviousComments'}
                  rows={7}
                  columns={250}
                  disabled={true}
                />
              </FormGroup>
            </div>
          )}
          <div>
          <div className='child'>
            <FormGroup>
              <FormItemLabel>{`${isEditmode ? 'New Comment' : 'Comment'}`}</FormItemLabel>
              <TextArea
                id={'NewComment'}
                name={'NewComment'}
                rows={4}
                columns={250}
              />
            </FormGroup>
          </div>
          <div className='profile-footer'>
        <Button id='cancel-btn' variant={buttonVariant.primary} onClick={onCancelButtonClick}>
          Cancel
        </Button>
        <Button
          id='save-btn'
          variant={buttonVariant.secondary}
          onClick={onSaveClick}
        >
          {isEditmode ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
          </div>
        
        </div>
      </div>
    </>
  );
};
